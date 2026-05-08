import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// MDX 요소를 shadcn 디자인 토큰 기반 스타일로 매핑
const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="mt-8 mb-4 scroll-m-20 text-4xl font-bold tracking-tight text-foreground first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-10 mb-4 scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight text-foreground first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 mb-3 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 scroll-m-20 text-xl font-semibold tracking-tight text-foreground" {...props}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-foreground [&:not(:first-child)]:mt-4">
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const cls = "font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors";
    // 앵커 링크(#id)는 native <a>로 처리해야 in-page 스크롤이 정상 동작함
    if (href?.startsWith("#")) {
      return <a href={href} className={cls} {...props}>{children}</a>;
    }
    return (
      <Link href={href ?? "#"} className={cls} {...props}>
        {children}
      </Link>
    );
  },
  // 인라인 코드 / rehype-pretty-code 코드블록 code는 data-theme 속성으로 구분
  code: ({ children, ...props }) => {
    const isCodeBlock = "data-theme" in props;
    if (isCodeBlock) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      >
        {children}
      </code>
    );
  },
  // 코드블록 컨테이너
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border p-4 font-mono text-sm leading-relaxed"
      {...props}
    >
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
