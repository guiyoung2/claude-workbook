import { getGroupedSkills } from "@/lib/skills";
import { SkillCard } from "@/components/skill-card";

// 스킬 & 플러그인 목록 페이지
export default function SkillsPage() {
  const { official, custom } = getGroupedSkills();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">스킬 & 플러그인</h1>
      <p className="text-muted-foreground mb-8">
        Claude Code 생산성을 높이는 스킬과 플러그인 모음입니다.
      </p>
      {official.length === 0 && custom.length === 0 ? (
        <p className="text-sm text-muted-foreground">등록된 스킬이 없습니다.</p>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {official.map((skill) => (
              <li key={skill.slug}>
                <SkillCard skill={skill} />
              </li>
            ))}
          </ul>

          {custom.length > 0 && (
            <section className="mt-12">
              <div className="border-t border-border pt-8 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-1">Custom</h2>
                <p className="text-sm text-muted-foreground">
                  공식 마켓플레이스 외 커뮤니티·개인 스킬입니다.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {custom.map((skill) => (
                  <li key={skill.slug}>
                    <SkillCard skill={skill} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}
