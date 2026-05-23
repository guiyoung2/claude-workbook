import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import type { PostMeta } from "@/lib/posts";

// 글 목록 카드 컴포넌트
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group h-full">
      <Card className="relative h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ring-border hover:ring-foreground/20 dark:ring-white/10 dark:hover:ring-white/20">
        {/* 좌측 세로 Terra Cotta 액센트 바 */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-60 transition-opacity duration-200 group-hover:opacity-100"
        />

        <CardHeader className="pl-5 pt-4 pb-0 gap-0">
          <CardTitle className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-foreground/70">
            {post.title}
          </CardTitle>
          <div className="mt-2.5 mb-2.5 h-px bg-border" />
          <CardDescription className="text-xs leading-relaxed line-clamp-3">
            {post.description}
          </CardDescription>
        </CardHeader>

        {post.category && (
          <CardFooter className="pl-5 text-xs">
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary ring-1 ring-primary/30 font-medium">
              {post.category}
            </span>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
