import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

// 글 목록 페이지
export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">글 목록</h1>
      <p className="text-muted-foreground mb-8">
        Claude Code를 학습하며 정리한 노트 모음입니다.
      </p>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
