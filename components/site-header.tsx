'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSyncExternalStore } from 'react';

// 하이드레이션 불일치 방지용 다크모드 토글
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // 서버: false, 클라이언트 마운트 후: true — useEffect 없이 하이드레이션 분기
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return <Button variant="ghost" size="icon" className="opacity-0" aria-hidden />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="테마 전환"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

// 사이트 상단 내비게이션 헤더
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Claude Workbook
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            글 목록
          </Link>
          <Link
            href="/skills"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            스킬
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
