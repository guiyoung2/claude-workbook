import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import type { ReferenceMeta } from "@/lib/references";

// 레퍼런스 목록 카드 컴포넌트
export function ReferenceCard({ reference }: { reference: ReferenceMeta }) {
  return (
    <Link href={`/references/${reference.slug}`} className="block group h-full">
      <Card className="relative h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ring-border hover:ring-foreground/20 dark:ring-white/10 dark:hover:ring-white/20">
        {/* 좌측 세로 Terra Cotta 액센트 바 */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-60 transition-opacity duration-200 group-hover:opacity-100"
        />

        <CardHeader className="pl-5 pt-4 pb-0 gap-0">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-foreground/70">
              {reference.name}
            </CardTitle>
            <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground mt-0.5" />
          </div>
          <div className="mt-2.5 mb-2.5 h-px bg-border" />
          <CardDescription className="text-xs leading-relaxed line-clamp-3">
            {reference.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pl-5 text-xs gap-1.5 flex-wrap">
          {reference.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/15 px-2 py-0.5 text-primary ring-1 ring-primary/30 font-medium"
            >
              {tag}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
