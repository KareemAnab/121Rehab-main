import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeBaseUrl(url: string) {
  return (url || "")
    .trim()
    .replace(/\/wp-json.*$/, "")
    .replace(/\/+$/, "");
}

export async function GET() {
  // ✅ NEW key (bypasses poisoned old keys)
  const wpBaseNew = process.env.NEXT_PUBLIC_WP_BASE_URL || "";

  // Old keys (kept only for visibility/debug)
  const wpApiOld = process.env.NEXT_PUBLIC_WP_API_URL || "";
  const wpUrlOld = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

  const base = normalizeBaseUrl(wpBaseNew || wpApiOld || wpUrlOld);
  const url = base
    ? `${base}/wp-json/wp/v2/posts?per_page=1&status=publish`
    : "";

  const payload: any = {
    ok: false,
    deployment: {
      VERCEL_ENV: process.env.VERCEL_ENV || null,
      VERCEL_URL: process.env.VERCEL_URL || null,
      VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || null,
    },
    seenEnv: {
      NEXT_PUBLIC_WP_BASE_URL: wpBaseNew,
      NEXT_PUBLIC_WP_API_URL: wpApiOld,
      NEXT_PUBLIC_WORDPRESS_URL: wpUrlOld,
    },
    computed: { base, url },
  };

  const resHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  };

  if (!base) {
    return NextResponse.json(
      { ...payload, error: "Missing WP base URL env var" },
      { status: 200, headers: resHeaders },
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

    payload.ok = res.ok;
    payload.status = res.status;
    payload.sample = Array.isArray(json)
      ? {
          id: json?.[0]?.id,
          slug: json?.[0]?.slug,
          title: json?.[0]?.title?.rendered,
        }
      : json;
    payload.rawPreview = text.slice(0, 200);

    return NextResponse.json(payload, { status: 200, headers: resHeaders });
  } catch (err: any) {
    payload.error = String(err?.message || err);
    return NextResponse.json(payload, { status: 200, headers: resHeaders });
  }
}
