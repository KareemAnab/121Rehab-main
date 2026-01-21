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
  return (url || "")
    .trim()
    .replace(/\/wp-json.*$/, "")
    .replace(/\/+$/, "");
}

/**
 * ✅ Preferred (new) key: NEXT_PUBLIC_WP_BASE_URL
 * ✅ Fallbacks (old keys): NEXT_PUBLIC_WP_API_URL, NEXT_PUBLIC_WORDPRESS_URL
 *
 * IMPORTANT:
 * - Do NOT throw at import time (breaks build).
 * - If missing, return empty results and log once.
 */
const WP_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_WP_BASE_URL ||
    process.env.NEXT_PUBLIC_WP_API_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    "",
);

const API_BASE = WP_BASE_URL ? `${WP_BASE_URL}/wp-json/wp/v2` : "";

let warnedMissing = false;

async function safeWpFetch<T>(path: string): Promise<T | null> {
  if (!API_BASE) {
    if (!warnedMissing) {
      warnedMissing = true;
      console.warn(
        "[WP] Missing WP env var. Set NEXT_PUBLIC_WP_BASE_URL (preferred) or NEXT_PUBLIC_WP_API_URL / NEXT_PUBLIC_WORDPRESS_URL.",
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
        `[WP] Fetch failed ${res.status} ${res.statusText} :: ${url} :: ${text.slice(
          0,
          200,
        )}`,
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
  if (!blogCategoryId) return [];

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
