import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// MDX 요소를 shadcn 디자인 토큰 기반 스타일로 매핑
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-4 scroll-m-20 text-4xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-foreground [&:not(:first-child)]:mt-4">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
    >
      {children}
    </Link>
  ),
  // 인라인 코드
  code: ({ children }) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  ),
  // 코드블록 컨테이너 (step 4에서 rehype-pretty-code로 교체)
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm leading-relaxed">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-1 [&>li]:mt-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-1 [&>li]:mt-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-foreground">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-border pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
