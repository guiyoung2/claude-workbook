"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Zap, Link2, ArrowRight } from "lucide-react";

// Hero 텍스트 순차 등장
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

// 섹션 카드 순차 등장 (Hero 완료 후)
const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.62 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const sections = [
  {
    title: "글",
    label: "Posts",
    href: "/posts",
    Icon: BookOpen,
    description: "CLI 사용법부터 에이전트 활용까지, 직접 써보며 익힌 것들을 기록합니다.",
  },
  {
    title: "스킬",
    label: "Skills",
    href: "/skills",
    Icon: Zap,
    description: "Claude Code 생산성을 높이는 공식·커스텀 스킬과 플러그인을 소개합니다.",
  },
  {
    title: "레퍼런스",
    label: "References",
    href: "/references",
    Icon: Link2,
    description: "개발에 유용한 도구, 라이브러리, 리소스 링크를 모아둡니다.",
  },
];

// 랜딩 페이지 — 애니메이션 히어로 + 섹션 카드 3종
export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4">
      {/* Hero */}
      <motion.section
        className="py-28 text-center"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/25">
            Personal Learning Notes
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold tracking-tight mb-5"
        >
          Claude Workbook
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
        >
          Claude Code를 배우며 정리한 개인 학습 노트입니다.
        </motion.p>
      </motion.section>

      {/* 섹션 카드 */}
      <motion.section
        className="pb-28"
        variants={cardContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {sections.map(({ title, label, href, Icon, description }) => (
            <motion.div key={href} variants={fadeUp}>
              <Link
                href={href}
                className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-foreground/10 h-full"
              >
                {/* 좌측 액센트 바 */}
                <span className="absolute left-0 inset-y-0 w-[3px] bg-primary opacity-50 group-hover:opacity-100 transition-opacity duration-200 rounded-l-xl" />

                {/* 아이콘 */}
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                {/* 텍스트 */}
                <div className="flex-1">
                  <p className="text-xs font-medium text-primary mb-1">{label}</p>
                  <h2 className="text-lg font-semibold mb-2">{title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>

                {/* 화살표 */}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 self-end" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
