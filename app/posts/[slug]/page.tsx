import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { extractTocItems } from "@/lib/toc";
import { Toc } from "@/components/toc";

export const dynamicParams = false;

// 빌드 시점에 모든 슬러그를 정적 경로로 등록
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 페이지별 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

// MDX 글 상세 페이지
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  const { content } = getPostBySlug(slug);
  const tocItems = extractTocItems(content);

  const { default: PostContent } = await import(`@/content/${slug}.mdx`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex gap-16">
        {/* 본문 영역 */}
        <div className="min-w-0 flex-1">
          <Link
            href="/posts"
            className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← 글 목록
          </Link>
          <header className="mb-10">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </header>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <PostContent />
          </article>
        </div>

        {/* TOC 사이드바 — xl 이상에서만 표시 */}
        <aside className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-20">
            <Toc items={tocItems} />
          </div>
        </aside>
      </div>
    </div>
  );
}
