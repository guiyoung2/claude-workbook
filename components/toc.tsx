"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

// 목차 - IntersectionObserver로 현재 섹션 하이라이트
export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        // 뷰포트 상단에 가장 가까운 헤딩을 활성화
        const topmost = intersecting.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="목차">
      <p className="mb-3 text-sm font-semibold text-foreground">목차</p>
      <ul className="space-y-1.5">
        {items.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? "pl-4" : ""}>
            <a
              href={`#${id}`}
              className={cn(
                "block text-sm leading-snug transition-colors hover:text-foreground",
                activeId === id
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
