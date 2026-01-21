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

/**
 * We support ALL env var names that have existed in this project.
 * This prevents "works locally but not prod" when Vercel is set differently.
 */
function resolveWpBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_WP_BASE_URL || // ✅ new (your current working one)
    process.env.NEXT_PUBLIC_WP_SITE_URL || // ✅ some versions you tried
    process.env.NEXT_PUBLIC_WP_API_URL || // ✅ older
    process.env.NEXT_PUBLIC_WORDPRESS_URL || // ✅ older
    "";

  const base = normalizeBaseUrl(raw);

  // If someone sets ".../wp-json", normalize it back to the site root.
  if (base.endsWith("/wp-json")) {
    return base.slice(0, -"/wp-json".length);
  }

  return base;
}

const WP_BASE_URL = resolveWpBaseUrl();

/**
 * IMPORTANT:
 * - This is server-side fetching (Next.js App Router)
 * - We force no-store so production doesn't "freeze" fallback content.
 */
async function safeWpFetch<T>(path: string): Promise<T | null> {
  if (!WP_BASE_URL) {
    console.error(
      `[WP] Missing WP base URL. Set one of: NEXT_PUBLIC_WP_BASE_URL / NEXT_PUBLIC_WP_SITE_URL / NEXT_PUBLIC_WP_API_URL / NEXT_PUBLIC_WORDPRESS_URL`,
    );
    return null;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${WP_BASE_URL}/wp-json/wp/v2${cleanPath}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
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

  const cats = await safeWpFetch<Array<{ id: number; slug: string }>>(
    `/categories?slug=${encodeURIComponent(categorySlug)}`,
  );

  const categoryId = Array.isArray(cats) && cats[0]?.id ? cats[0].id : null;

  if (!categoryId) {
    console.error(
      `[WP] Category slug not found: "${categorySlug}". Check WP category slug exactly.`,
    );
    return [];
  }

  const posts = await safeWpFetch<WordPressPost[]>(
    `/posts?categories=${categoryId}&per_page=${limit}&status=publish&_embed`,
  );

  return Array.isArray(posts) ? posts : [];
}
