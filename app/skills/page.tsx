import { getAllSkills } from "@/lib/skills";
import { SkillCard } from "@/components/skill-card";

// 스킬 & 플러그인 목록 페이지
export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">스킬 & 플러그인</h1>
      <p className="text-muted-foreground mb-8">
        Claude Code 생산성을 높이는 스킬과 플러그인 모음입니다.
      </p>
      {skills.length === 0 ? (
        <p className="text-sm text-muted-foreground">등록된 스킬이 없습니다.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <li key={skill.slug}>
              <SkillCard skill={skill} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
