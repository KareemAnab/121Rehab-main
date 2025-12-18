// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/wordpress";
import { HERO_GRADIENT } from "@/lib/theme";

export const revalidate = 60;

type WPPost = {
  title?: { rendered?: string };
  content?: { rendered?: string };
  date?: string;
  acf?: {
    before_video_url?: string;
    after_video_url?: string;
  };
};

function normalizeYouTubeUrl(url: string): string {
  if (!url) return url;

  // youtu.be short links
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // standard watch?v= links
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // already embed or other formats -> return as-is
  return url;
}

function VideoEmbed({ url }: { url: string }) {
  const embedUrl = normalizeYouTubeUrl(url);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
      <iframe
        src={embedUrl}
        title="Before / After video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = (await getPostBySlug(slug)) as WPPost | null;

  if (!post) notFound();

  const title = post.title?.rendered ?? "";
  const content = post.content?.rendered ?? "";
  const date = post.date ? new Date(post.date) : null;

  const beforeUrl = post.acf?.before_video_url || "";
  const afterUrl = post.acf?.after_video_url || "";

  const hasBefore = Boolean(beforeUrl);
  const hasAfter = Boolean(afterUrl);
  const hasVideos = hasBefore || hasAfter;
  const isTwoUp = hasBefore && hasAfter;

  return (
    <div className="bg-white min-h-screen">
      <main>
        {/* 🔴 RED GRADIENT HERO */}
        <section className={`${HERO_GRADIENT} text-white`}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-80 mb-3">
              Our Research &amp; Education
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {title}
            </h1>
            {date && (
              <p className="mt-3 text-sm text-white/80">
                {date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </section>

        {/* Article card */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-10 pb-20">
          <article className="rounded-3xl border border-neutral-100 bg-white shadow-sm p-6 sm:p-8">
            <Link
              href="/blog"
              className="mb-6 inline-flex text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to all articles
            </Link>

            <div
              className="prose prose-pink max-w-none prose-headings:scroll-mt-28"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Videos block (0/1/2 handling) */}
            {hasVideos && (
              <section className="mt-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Before &amp; After
                </h2>

                <div
                  className={`grid gap-8 ${
                    isTwoUp ? "md:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {hasBefore && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-neutral-700">
                        Before
                      </p>
                      <VideoEmbed url={beforeUrl} />
                    </div>
                  )}

                  {hasAfter && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-neutral-700">
                        After
                      </p>
                      <VideoEmbed url={afterUrl} />
                    </div>
                  )}
                </div>
              </section>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}
