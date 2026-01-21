// src/lib/wordpress.ts

export type WordPressPost = {
  id: number;
  slug: string;
  date?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
};

function normalizeBaseUrl(url: string) {
  // root only (no trailing slash, strip /wp-json if someone accidentally includes it)
  return (url || "")
    .trim()
    .replace(/\/wp-json.*$/, "")
    .replace(/\/+$/, "");
}

// ✅ ONLY these are allowed
const RAW_WP =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "";

const WP_BASE_URL = normalizeBaseUrl(RAW_WP);
const API_BASE = WP_BASE_URL ? `${WP_BASE_URL}/wp-json/wp/v2` : "";

async function safeWpFetch<T>(path: string): Promise<T | null> {
  if (!API_BASE) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[WP] Missing WP base URL env. Set NEXT_PUBLIC_WP_API_URL or NEXT_PUBLIC_WORDPRESS_URL.",
      );
    }
    return null;
  }

  const url = `${API_BASE}${path}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Next.js; WP Fetch)",
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        `[WP] Fetch failed ${res.status} ${res.statusText} :: ${url} :: ${text.slice(0, 200)}`,
      );
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`[WP] Fetch error :: ${url}`, err);
    return null;
  }
}

async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  const cats = await safeWpFetch<Array<{ id: number }>>(
    `/categories?slug=${encodeURIComponent(slug)}`,
  );
  const id = Array.isArray(cats) ? cats?.[0]?.id : null;
  return typeof id === "number" ? id : null;
}

/**
 * ✅ Blog category slug (your WP screenshot): "physical-therapy"
 */
export async function getBlogPosts(limit = 12): Promise<WordPressPost[]> {
  const blogCategoryId = await getCategoryIdBySlug("physical-therapy");

  if (!blogCategoryId) {
    console.warn('[WP] Blog category slug "physical-therapy" not found.');
    return [];
  }

  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?per_page=${limit}&status=publish&categories=${blogCategoryId}&_embed`,
  );

  return Array.isArray(posts) ? posts : [];
}

/**
 * ✅ Testimonials category slug: "testimonials"
 */
export async function getTestimonials(limit = 3): Promise<WordPressPost[]> {
  const categoryId = await getCategoryIdBySlug("testimonials");
  if (!categoryId) return [];

  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?per_page=${limit}&status=publish&categories=${categoryId}&_embed`,
  );

  return Array.isArray(posts) ? posts : [];
}

export async function getPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  const data = await safeWpFetch<WordPressPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed`,
  );
  if (!Array.isArray(data) || data.length === 0) return null;
  return data[0];
}
