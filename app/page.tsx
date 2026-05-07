import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

// 랜딩 페이지
export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Claude Workbook</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Claude Code를 학습하며 정리한 노트 모음입니다.
      </p>
      <Link href="/posts" className={buttonVariants()}>
        글 목록 보기
      </Link>
    </main>
  );
}
