import fs from "fs";
import path from "path";
import matter from "gray-matter";

const skillsDir = path.join(process.cwd(), "skills");

export interface SkillMeta {
  slug: string;
  title: string;
  name: string;
  description: string;
  category: string;
  installCmd?: string;
  github?: string;
  date: string;
}

export interface Skill extends SkillMeta {
  content: string;
}

// skills/ 폴더의 모든 MDX 파일 메타데이터 반환 (date 내림차순)
export function getAllSkills(): SkillMeta[] {
  if (!fs.existsSync(skillsDir)) return [];

  const files = fs
    .readdirSync(skillsDir)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(skillsDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title as string,
        name: data.name as string,
        description: data.description as string,
        category: (data.category as string) ?? "general",
        installCmd: data.installCmd as string | undefined,
        github: data.github as string | undefined,
        date:
          data.date instanceof Date
            ? data.date.toISOString().split("T")[0]
            : String(data.date),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

// 특정 slug의 스킬 MDX 메타데이터 + 본문 반환
export function getSkillBySlug(slug: string): Skill {
  const filePath = path.join(skillsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    name: data.name as string,
    description: data.description as string,
    category: (data.category as string) ?? "general",
    installCmd: data.installCmd as string | undefined,
    github: data.github as string | undefined,
    date:
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date),
    content,
  };
}
