import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// MDX 본문에서 h2/h3 헤딩 추출 (rehype-slug와 동일한 id 생성)
export function extractTocItems(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    // 마크다운 인라인 강조(**/*/~~) 제거
    const text = match[2].trim().replace(/(\*{1,2}|~~)(.+?)\1/g, "$2");
    const id = slugger.slug(text);
    items.push({ id, text, level });
  }

  return items;
}
