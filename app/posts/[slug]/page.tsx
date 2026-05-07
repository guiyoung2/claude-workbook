import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

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

  const { default: PostContent } = await import(`@/content/${slug}.mdx`);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/posts"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← 글 목록
      </Link>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{post.title}</h1>
        <p className="text-sm text-muted-foreground">{post.date}</p>
      </header>
      <article>
        <PostContent />
      </article>
    </main>
  );
}
