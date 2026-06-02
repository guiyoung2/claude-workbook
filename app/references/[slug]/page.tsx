import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getAllReferences, getReferenceBySlug } from "@/lib/references";
import { buttonVariants } from "@/components/ui/button";

export const dynamicParams = false;

// 빌드 시점에 모든 레퍼런스 슬러그를 정적 경로로 등록
export function generateStaticParams() {
  return getAllReferences().map((ref) => ({ slug: ref.slug }));
}

// 페이지별 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ref = getAllReferences().find((r) => r.slug === slug);
  if (!ref) return {};
  return { title: ref.name, description: ref.description };
}

// 레퍼런스 상세 페이지
export default async function ReferencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getAllReferences().find((r) => r.slug === slug);
  if (!found) notFound();

  const ref = getReferenceBySlug(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/references"
        className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← 레퍼런스 목록
      </Link>

      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {ref.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ExternalLink className="h-4 w-4 mr-1.5" />
            사이트 방문
          </a>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{ref.name}</h1>
        <p className="text-muted-foreground">{ref.description}</p>
      </header>

      {ref.features.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-3">주요 기능</h2>
          <ul className="space-y-2">
            {ref.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      {ref.comment && (
        <section className="rounded-lg border border-border bg-muted px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">코멘트</p>
          <p className="text-sm leading-relaxed">{ref.comment}</p>
        </section>
      )}

      <footer className="mt-8 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">추가일: {ref.date}</p>
      </footer>
    </div>
  );
}
