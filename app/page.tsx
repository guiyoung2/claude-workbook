import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

// 랜딩 페이지
export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <main className="max-w-4xl mx-auto px-4">
      {/* Hero 섹션 */}
      <section className="py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Claude Workbook</h1>
        <p className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
          Claude Code를 배우며 정리한 개인 학습 노트입니다.
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
          CLI 사용법부터 에이전트 활용까지 — 직접 써보며 익힌 것들을 기록합니다.
        </p>
        <Link href="/posts" className={buttonVariants()}>
          글 목록 보기
        </Link>
      </section>

      {/* 최근 글 섹션 */}
      {recentPosts.length > 0 && (
        <section className="pb-24">
          <h2 className="text-xl font-semibold mb-6">최근 글</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/posts" className={buttonVariants({ variant: "outline" })}>
              전체 글 보기
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
