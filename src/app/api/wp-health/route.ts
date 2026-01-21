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
  const wpBaseNew = process.env.NEXT_PUBLIC_WP_BASE_URL || "";
  const base = normalizeBaseUrl(wpBaseNew);

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
    },
    computed: { base, url },
  };

  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  };

  if (!base) {
    payload.error =
      "NEXT_PUBLIC_WP_BASE_URL is missing at runtime. Add it in Vercel (Production/Preview/Development) and redeploy.";
    return NextResponse.json(payload, { status: 200, headers });
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
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

    return NextResponse.json(payload, { status: 200, headers });
  } catch (err: any) {
    payload.error = String(err?.message || err);
    return NextResponse.json(payload, { status: 200, headers });
  }
}
