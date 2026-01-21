import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeBaseUrl(url: string) {
  return (url || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/wp-json$/, "");
}

export async function GET() {
  // Only these two are allowed.
  const wpApi = process.env.NEXT_PUBLIC_WP_API_URL || "";
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

  const base = normalizeBaseUrl(wpApi || wpUrl);
  const url = base
    ? `${base}/wp-json/wp/v2/posts?per_page=1&status=publish`
    : "";

  // Return what the server *actually* sees (no secrets here, just URLs)
  const debug = {
    seenEnv: {
      NEXT_PUBLIC_WP_API_URL: wpApi,
      NEXT_PUBLIC_WORDPRESS_URL: wpUrl,
    },
    computed: {
      base,
      url,
    },
  };

  if (!base) {
    return NextResponse.json(
      { ok: false, ...debug, error: "Missing env vars" },
      { status: 200 },
    );
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Vercel; WP Health Check)",
      },
    });

    const text = await res.text();
    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {}

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        ...debug,
        sample: Array.isArray(json)
          ? {
              id: json?.[0]?.id,
              slug: json?.[0]?.slug,
              title: json?.[0]?.title?.rendered,
            }
          : json,
        rawPreview: text.slice(0, 200),
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, ...debug, error: String(err?.message || err) },
      { status: 200 },
    );
  }
}
