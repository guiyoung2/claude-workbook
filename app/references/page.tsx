import { getAllReferences } from "@/lib/references";
import { ReferenceCard } from "@/components/reference-card";

// 레퍼런스 목록 페이지
export default function ReferencesPage() {
  const references = getAllReferences();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">레퍼런스</h1>
      <p className="text-muted-foreground mb-8">
        유용한 도구와 사이트를 발견하면 기록하는 공간입니다.
      </p>
      {references.length === 0 ? (
        <p className="text-sm text-muted-foreground">등록된 레퍼런스가 없습니다.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {references.map((ref) => (
            <li key={ref.slug}>
              <ReferenceCard reference={ref} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
