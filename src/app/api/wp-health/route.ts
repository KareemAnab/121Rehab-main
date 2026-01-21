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
  const raw =
    process.env.NEXT_PUBLIC_WP_API_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    "";

  const base = normalizeBaseUrl(raw);

  if (!base) {
    return NextResponse.json(
      { ok: false, error: "Missing WP base URL env var" },
      { status: 500 },
    );
  }

  const url = `${base}/wp-json/wp/v2/posts?per_page=1&status=publish`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        // Some hosts block unknown UA; this helps.
        "User-Agent": "Mozilla/5.0 (Vercel; WP Health Check)",
      },
    });

    const text = await res.text();

    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      // not JSON
    }

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        url,
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
      { ok: false, url, error: String(err?.message || err) },
      { status: 200 },
    );
  }
}
