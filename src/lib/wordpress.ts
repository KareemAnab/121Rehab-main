// src/lib/wordpress.ts

export type WordPressPost = {
  id: number;
  slug: string;
  date?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  acf?: Record<string, any>;
  _embedded?: any;
};

function normalizeBaseUrl(url: string) {
  return (url || "").trim().replace(/\/+$/, "");
}

// One source of truth (but supports your two env names)
const WP_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_WP_API_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    "",
);

// This keeps behavior safe: return null/[] instead of throwing in production UI
async function safeWpFetch<T>(path: string): Promise<T | null> {
  if (!WP_BASE_URL) return null;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const base = (WP_BASE_URL || "").trim().replace(/\/+$/, "");

  // If someone accidentally sets WP_BASE_URL to ".../wp-json", don't double it.
  const normalizedBase = base.endsWith("/wp-json")
    ? base.slice(0, -"/wp-json".length)
    : base;

  const url = `${normalizedBase}/wp-json/wp/v2${cleanPath}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      // Helpful server log (shows in Vercel logs)
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

export async function getPosts(limit = 12): Promise<WordPressPost[]> {
  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?per_page=${limit}&status=publish&_embed`,
  );
  return Array.isArray(posts) ? posts : [];
}

export async function getPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  if (!slug) return null;

  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed`,
  );

  if (!Array.isArray(posts) || posts.length === 0) return null;
  return posts[0];
}

export async function getPostsByCategorySlug(
  categorySlug: string,
  limit = 6,
): Promise<WordPressPost[]> {
  if (!categorySlug) return [];

  const categories = await safeWpFetch<Array<{ id: number }>>(
    `/categories?slug=${encodeURIComponent(categorySlug)}`,
  );

  const categoryId =
    Array.isArray(categories) && categories[0]?.id ? categories[0].id : null;
  if (!categoryId) return [];

  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?categories=${categoryId}&per_page=${limit}&status=publish&_embed`,
  );

  return Array.isArray(posts) ? posts : [];
}
