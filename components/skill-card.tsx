import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import type { SkillMeta } from "@/lib/skills";
import { getCategoryStyle } from "@/lib/skill-styles";

// 스킬 목록 카드 컴포넌트
export function SkillCard({ skill }: { skill: SkillMeta }) {
  const { badge, bar } = getCategoryStyle(skill.category);

  return (
    <Link href={`/skills/${skill.slug}`} className="block group h-full">
      <Card className="relative h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ring-border hover:ring-foreground/20 dark:ring-white/10 dark:hover:ring-white/20">
        {/* 카테고리별 좌측 액센트 바 */}
        <span
          aria-hidden
          className={`pointer-events-none absolute left-0 inset-y-0 w-[3px] rounded-l-xl opacity-60 transition-opacity duration-200 group-hover:opacity-100 ${bar}`}
        />

        <CardHeader className="pl-5 pt-4 pb-0 gap-0">
          <CardTitle className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-foreground/70">
            {skill.name}
          </CardTitle>
          <div className="mt-2.5 mb-2.5 h-px bg-border" />
          <CardDescription className="text-xs leading-relaxed line-clamp-3">
            {skill.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pl-5 text-xs gap-2 flex-wrap">
          <span className={`rounded-full px-2 py-0.5 font-medium ${badge}`}>
            {skill.category}
          </span>
          {skill.github && (
            <span className="text-muted-foreground flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              GitHub
            </span>
          )}
          {skill.installCmd && (
            <code className="text-muted-foreground font-mono truncate max-w-[150px]">
              {skill.installCmd}
            </code>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
