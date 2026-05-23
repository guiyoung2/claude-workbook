// 스킬 카테고리 색상 매핑 (skill | plugin)
export const categoryStyle: Record<string, { badge: string; bar: string }> = {
  skill: {
    badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/30",
    bar: "bg-blue-500",
  },
  plugin: {
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/30",
    bar: "bg-violet-500",
  },
};

export function getCategoryStyle(category: string) {
  return (
    categoryStyle[category.toLowerCase()] ?? {
      badge: "bg-slate-500/15 text-slate-600 dark:text-slate-400 ring-1 ring-slate-500/30",
      bar: "bg-slate-500",
    }
  );
}
