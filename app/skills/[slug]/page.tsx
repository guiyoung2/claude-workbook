import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import { getCategoryStyle } from "@/lib/skill-styles";
import { buttonVariants } from "@/components/ui/button";

export const dynamicParams = false;

// 빌드 시점에 모든 스킬 슬러그를 정적 경로로 등록
export function generateStaticParams() {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

// 페이지별 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getAllSkills().find((s) => s.slug === slug);
  if (!skill) return {};
  return { title: skill.title, description: skill.description };
}

// 스킬 상세 페이지
export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getAllSkills().find((s) => s.slug === slug);
  if (!skill) notFound();

  getSkillBySlug(slug);
  const { default: SkillContent } = await import(`@/skills/${slug}.mdx`);
  const { badge } = getCategoryStyle(skill.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/skills"
        className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← 스킬 목록
      </Link>

      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge}`}>
            {skill.category}
          </span>
          {skill.github && (
            <a
              href={skill.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <ExternalLink className="h-4 w-4 mr-1.5" />
              GitHub
            </a>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{skill.title}</h1>
        <p className="text-muted-foreground">{skill.description}</p>
      </header>

      {skill.installCmd && (
        <div className="mb-8 rounded-lg border border-border bg-muted px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">설치 명령어</p>
          <code className="text-sm font-mono text-foreground">{skill.installCmd}</code>
        </div>
      )}

      <article>
        <SkillContent />
      </article>
    </div>
  );
}
