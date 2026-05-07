'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

// 하이드레이션 불일치 방지용 다크모드 토글
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Claude Workbook
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            글 목록
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
