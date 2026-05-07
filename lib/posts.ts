import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  order: number;
}

export interface Post extends PostMeta {
  content: string;
}

// content/ 폴더의 모든 MDX 파일 메타데이터 반환 (order 오름차순, 동률은 date 내림차순)
export function getAllPosts(): PostMeta[] {
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        order: (data.order as number) ?? 0,
      };
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

// 특정 slug의 MDX 파일 메타데이터 + 본문 반환
export function getPostBySlug(slug: string): Post {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    order: (data.order as number) ?? 0,
    content,
  };
}
