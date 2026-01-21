import { NextResponse } from "next/server";
import { getBlogPosts, getTestimonials } from "@/lib/wordpress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeBaseUrl(url: string) {
  return (url || "")
    .trim()
    .replace(/\/wp-json.*$/, "")
    .replace(/\/+$/, "");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "testimonials";

  const WP_BASE_URL = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_WP_BASE_URL ||
      process.env.NEXT_PUBLIC_WP_API_URL ||
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "",
  );

  const seenEnv = {
    NEXT_PUBLIC_WP_BASE_URL: process.env.NEXT_PUBLIC_WP_BASE_URL || "",
    NEXT_PUBLIC_WP_API_URL: process.env.NEXT_PUBLIC_WP_API_URL || "",
    NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL || "",
  };

  if (!WP_BASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No WP base URL found. Set NEXT_PUBLIC_WP_BASE_URL (preferred) or NEXT_PUBLIC_WP_API_URL / NEXT_PUBLIC_WORDPRESS_URL.",
        seenEnv,
      },
      { status: 500 },
    );
  }

  try {
    if (mode === "blog") {
      const posts = await getBlogPosts(12);
      return NextResponse.json({
        ok: true,
        mode,
        base: WP_BASE_URL,
        count: posts.length,
        slugs: posts.map((p) => p.slug),
        titles: posts.map((p) => p.title?.rendered),
        seenEnv,
      });
    }

    if (mode === "testimonials") {
      const posts = await getTestimonials(12);
      return NextResponse.json({
        ok: true,
        mode,
        base: WP_BASE_URL,
        count: posts.length,
        slugs: posts.map((p) => p.slug),
        titles: posts.map((p) => p.title?.rendered),
        seenEnv,
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error: `Unknown mode "${mode}". Use ?mode=blog or ?mode=testimonials`,
        seenEnv,
      },
      { status: 400 },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        mode,
        base: WP_BASE_URL,
        error: err?.message || "Unknown error",
        seenEnv,
      },
      { status: 500 },
    );
  }
}
