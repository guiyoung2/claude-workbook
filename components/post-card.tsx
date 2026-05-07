import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import type { PostMeta } from "@/lib/posts";

// 글 목록 카드 컴포넌트
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <Card className="transition-shadow hover:shadow-md hover:ring-foreground/20">
        <CardHeader>
          <CardTitle className="text-base font-semibold group-hover:text-foreground/70 transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground">
          {post.date}
        </CardFooter>
      </Card>
    </Link>
  );
}
