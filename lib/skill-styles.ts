// 스킬 카테고리별 색상 매핑 (badge, accent bar)
export const categoryStyle: Record<string, { badge: string; bar: string }> = {
  workflow: {
    badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/30",
    bar: "bg-blue-500",
  },
  productivity: {
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30",
    bar: "bg-emerald-500",
  },
  debugging: {
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/30",
    bar: "bg-rose-500",
  },
  testing: {
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/30",
    bar: "bg-violet-500",
  },
  documentation: {
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30",
    bar: "bg-amber-500",
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
