import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';

const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://claude-workbook.vercel.app'),
  title: {
    default: 'Claude Workbook',
    template: '%s | Claude Workbook',
  },
  description: 'Claude Code를 배우며 정리한 개인 학습 노트입니다.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Claude Workbook',
    description: 'Claude Code를 배우며 정리한 개인 학습 노트입니다.',
    url: '/',
    siteName: 'Claude Workbook',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Claude Workbook',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Workbook',
    description: 'Claude Code를 배우며 정리한 개인 학습 노트입니다.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={cn('font-sans', pretendard.variable)}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
