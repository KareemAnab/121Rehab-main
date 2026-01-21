// src/app/blog/page.tsx
import Link from "next/link";
import { getBlogPosts } from "@/lib/wordpress";
import YouTubeBanner from "@/components/blog/YouTubeBanner";
import { HERO_GRADIENT } from "@/lib/theme";
import {
  MotionArticle,
  MotionDiv,
  MotionLinkButton,
  liftIn,
  enter,
  hover,
} from "@/components/motion/Motion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function isDefaultWPPost(post: any) {
  const title = (post?.title?.rendered ?? "").toLowerCase().trim();
  const slug = (post?.slug ?? "").toLowerCase().trim();
  return title === "hello world!" || slug === "hello-world";
}

export default async function BlogPage() {
  const postsRaw = await getBlogPosts(12);

  const posts = (postsRaw ?? [])
    .filter((p: any) => !isDefaultWPPost(p))
    .slice(0, 6);

  const hasRealPosts = posts.length > 0;

  return (
    <div className="bg-neutral-50">
      <section className={`${HERO_GRADIENT} text-white`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/80">
            Our Research &amp; Education
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
            121 Rehab Blog
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
            Articles, tips, and stories to help you move with confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <YouTubeBanner />
        </div>

        {!hasRealPosts ? (
          <MotionDiv
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
            initial="initial"
            animate="animate"
            variants={liftIn}
            transition={enter}
          >
            <h2 className="text-xl font-semibold text-neutral-900">
              Blog coming soon
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-2xl">
              We’re currently preparing helpful guides on recovery, injury
              prevention, and performance. In the meantime, book an appointment
              and we’ll build a plan tailored to you.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full btn-primary px-5 py-2 text-sm font-semibold shadow-sm transition-colors"
              >
                Book an appointment
              </Link>

              <Link
                href="tel:+19097832204"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:border-[color:var(--brand)] transition-colors"
              >
                Call clinic
              </Link>
            </div>
          </MotionDiv>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post: any) => {
              const title = stripHtml(post?.title?.rendered ?? "");
              const excerptText = stripHtml(post?.excerpt?.rendered ?? "");

              return (
                <MotionArticle
                  key={post.id}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
                  whileHover={{ y: -4 }}
                  transition={hover}
                >
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {title}
                  </h2>

                  <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
                    {excerptText}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex mt-4 text-sm font-semibold text-brand hover:opacity-90"
                  >
                    Read more →
                  </Link>
                </MotionArticle>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
