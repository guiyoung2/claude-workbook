import fs from "fs";
import path from "path";
import matter from "gray-matter";

const referencesDir = path.join(process.cwd(), "content", "references");

export interface ReferenceMeta {
  slug: string;
  name: string;
  url: string;
  description: string;
  features: string[];
  tags: string[];
  comment: string;
  date: string;
}

// content/references/ 폴더의 모든 MDX 메타데이터 반환 (date 내림차순)
export function getAllReferences(): ReferenceMeta[] {
  if (!fs.existsSync(referencesDir)) return [];

  const files = fs
    .readdirSync(referencesDir)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(referencesDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        name: data.name as string,
        url: data.url as string,
        description: data.description as string,
        features: (data.features as string[]) ?? [],
        tags: (data.tags as string[]) ?? [],
        comment: (data.comment as string) ?? "",
        date:
          data.date instanceof Date
            ? data.date.toISOString().split("T")[0]
            : String(data.date),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 특정 slug의 레퍼런스 메타데이터 반환
export function getReferenceBySlug(slug: string): ReferenceMeta {
  const filePath = path.join(referencesDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return {
    slug,
    name: data.name as string,
    url: data.url as string,
    description: data.description as string,
    features: (data.features as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    comment: (data.comment as string) ?? "",
    date:
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date),
  };
}
