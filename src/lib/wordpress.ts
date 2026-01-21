// src/lib/wordpress.ts

export type WordPressPost = {
  id: number;
  slug: string;
  date?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  meta?: Record<string, any>;
};

// Resolve WP site URL from multiple possible env vars
const rawSiteUrl =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_WP_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ||
  process.env.NEXT_PUBLIC_WP_SITE_URL ||
  process.env.WORDPRESS_URL ||
  "";

let siteUrl = rawSiteUrl.trim();
if (siteUrl.endsWith("/")) siteUrl = siteUrl.slice(0, -1);
if (siteUrl.toLowerCase().endsWith("/wp-json")) {
  siteUrl = siteUrl.slice(0, -"/wp-json".length);
}

const API_BASE = siteUrl ? `${siteUrl}/wp-json/wp/v2` : "";

/**
 * Safely call the WordPress REST API.
 * - Returns parsed JSON on success
 * - Returns null on error / non-2xx
 * - Never throws; only console.warn in dev
 */
async function safeWpFetch<T = any>(path: string): Promise<T | null> {
  if (!API_BASE) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[wordpress.ts] Missing WordPress URL. Set NEXT_PUBLIC_WORDPRESS_URL to your WP site root.",
      );
    }
    return null;
  }

  const url = API_BASE + path;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        const text = await res.text().catch(() => "");
        console.warn(
          "[wordpress.ts] WordPress request failed:",
          res.status,
          res.statusText,
          "URL:",
          url,
          "Body:",
          text.slice(0, 200),
        );
      }
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[wordpress.ts] Error calling WordPress:", url, err);
    }
    return null;
  }
}

/** Get a category ID by slug (returns null if missing) */
async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  const cats = await safeWpFetch<Array<{ id: number }>>(
    `/categories?slug=${encodeURIComponent(slug)}`,
  );
  const id = Array.isArray(cats) ? cats?.[0]?.id : null;
  return typeof id === "number" ? id : null;
}

// ---------------- BLOG POSTS ----------------

/**
 * Blog page should show ONLY posts in category slug "blog"
 * If that category doesn't exist, we fall back to:
 *  - all posts excluding "testimonials"
 */
export async function getPosts(limit: number = 6): Promise<WordPressPost[]> {
  // Preferred: only "blog" category
  const blogCategoryId = await getCategoryIdBySlug("blog");
  if (blogCategoryId) {
    const blogPosts = await safeWpFetch<WordPressPost[]>(
      `/posts?per_page=${limit}&status=publish&categories=${blogCategoryId}&_embed`,
    );
    return Array.isArray(blogPosts) ? blogPosts : [];
  }

  // Fallback: exclude testimonials
  const testimonialsCategoryId = await getCategoryIdBySlug("testimonials");

  const query = testimonialsCategoryId
    ? `/posts?per_page=${limit}&status=publish&categories_exclude=${testimonialsCategoryId}&_embed`
    : `/posts?per_page=${limit}&status=publish&_embed`;

  const data = await safeWpFetch<WordPressPost[]>(query);
  return Array.isArray(data) ? data : [];
}

// Fetch a single blog post by its slug (used by /blog/[slug])
export async function getPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  const data = await safeWpFetch<WordPressPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed`,
  );
  if (!Array.isArray(data) || data.length === 0) return null;
  return data[0];
}

// ---------------- TESTIMONIALS ----------------

/**
 * Testimonials are WP Posts in category slug "testimonials"
 * - Title   = patient name
 * - Excerpt = short label (optional)
 * - Content = full quote
 */
export async function getTestimonials(
  limit: number = 3,
): Promise<WordPressPost[]> {
  const categoryId = await getCategoryIdBySlug("testimonials");
  if (!categoryId) return [];

  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?categories=${categoryId}&per_page=${limit}&status=publish&_embed`,
  );

  return Array.isArray(posts) ? posts : [];
}
