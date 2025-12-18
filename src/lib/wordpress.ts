// src/lib/wordpress.ts

export type WordPressPost = {
  id: number;
  slug: string;
  date?: string;
  title: { rendered: string }; // required
  excerpt: { rendered: string }; // required
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
if (siteUrl.endsWith("/")) {
  siteUrl = siteUrl.slice(0, -1);
}
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
        "[wordpress.ts] Missing WordPress URL. Set NEXT_PUBLIC_WORDPRESS_URL to your site root."
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
        console.warn(
          "[wordpress.ts] WordPress request failed:",
          res.status,
          res.statusText,
          "URL:",
          url
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

// ---------------- BLOG POSTS ----------------

// Fetch blog posts ONLY, excluding posts in the "Testimonials" category
export async function getPosts(limit: number = 6): Promise<WordPressPost[]> {
  // Try to find the "Testimonials" category so we can exclude it
  let testimonialsCategoryId: number | null = null;

  try {
    const categories = await safeWpFetch<any[]>(
      `/categories?slug=testimonials`
    );

    if (Array.isArray(categories) && categories.length > 0) {
      testimonialsCategoryId = categories[0].id;
    }
  } catch {
    testimonialsCategoryId = null;
  }

  // Build the posts query; exclude the testimonials category if we found it
  const query = testimonialsCategoryId
    ? `/posts?per_page=${limit}&status=publish&categories_exclude=${testimonialsCategoryId}&_embed`
    : `/posts?per_page=${limit}&status=publish&_embed`;

  const data = await safeWpFetch<WordPressPost[]>(query);

  if (!Array.isArray(data)) return [];
  return data;
}

// Fetch a single blog post by its slug (used by /blog/[slug])
export async function getPostBySlug(
  slug: string
): Promise<WordPressPost | null> {
  const data = await safeWpFetch<WordPressPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed`
  );
  if (!Array.isArray(data) || data.length === 0) return null;
  return data[0];
}

// ---------------- TESTIMONIALS ----------------

/**
 * Fetch testimonials from WordPress posts in the "Testimonials" category.
 *
 * WordPress setup required:
 *  - Create a category named "Testimonials" with slug "testimonials"
 *  - Create posts under that category:
 *      Title  = patient name
 *      Excerpt = short label
 *      Content = full quote
 */
export async function getTestimonials(
  limit: number = 3
): Promise<WordPressPost[]> {
  // 1) Look up category with slug "testimonials"
  const categories = await safeWpFetch<any[]>(`/categories?slug=testimonials`);

  if (!Array.isArray(categories) || categories.length === 0) {
    // No category set up yet; caller should fall back to defaults
    return [];
  }

  const categoryId = categories[0].id;

  // 2) Fetch posts in that category
  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?categories=${categoryId}&per_page=${limit}&status=publish&_embed`
  );

  if (!Array.isArray(posts)) return [];
  return posts;
}
