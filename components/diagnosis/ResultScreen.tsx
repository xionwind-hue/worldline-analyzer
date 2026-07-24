"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DiagnosisResult } from "@/lib/types";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const desktopBackgroundImage = getImageProps({
  src: "/images/result/scbg-03-desktop-bg.jpg",
  alt: "",
  width: 2560,
  height: 1440,
  priority: true,
  sizes: "100vw",
});

const mobileBackgroundImage = getImageProps({
  src: "/images/result/scbg-03-mobile-bg.jpg",
  alt: "",
  width: 1080,
  height: 1920,
  priority: true,
  sizes: "100vw",
});

const desktopCharacterImage = getImageProps({
  src: "/images/result/scbg-03-desktop-character.png",
  alt: "",
  width: 2560,
  height: 1440,
  priority: true,
  sizes: "100vw",
});

const mobileCharacterImage = getImageProps({
  src: "/images/result/scbg-03-mobile-character.png",
  alt: "",
  width: 1080,
  height: 1920,
  priority: true,
  sizes: "100vw",
});

type ResultScreenProps = {
  result: DiagnosisResult;
};

function parseEpisode(episode: string): { heading?: string; body: string } {
  const newlineIndex = episode.indexOf("\n");
  if (newlineIndex === -1) {
    return { body: episode };
  }

  return {
    heading: episode.slice(0, newlineIndex),
    body: episode.slice(newlineIndex + 1),
  };
}

function EncyclopediaChapterHeading({
  id,
  title,
  chapter,
}: {
  id: string;
  title: string;
  chapter: string;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-end justify-between gap-4">
        <h2
          id={id}
          className="font-display text-[13px] font-semibold tracking-[0.14em] text-[#1a47a8] sm:text-[14px] lg:text-[15px]"
        >
          {title}
        </h2>
        <span
          aria-hidden
          className="font-display text-[3.5rem] font-light leading-none tracking-tight text-[#346bff]/[0.20] sm:text-[4.5rem]"
        >
          {chapter}
        </span>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-[#346bff]/55 via-[#6ba3ff]/28 to-transparent" />
    </div>
  );
}

type ScrollRevealVariant = "rise" | "from-left" | "from-right" | "scale";

function getScrollRevealClassName(
  variant: ScrollRevealVariant,
  isVisible: boolean,
): string {
  switch (variant) {
    case "rise":
      return isVisible
        ? "opacity-100 translate-y-0 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none"
        : "opacity-0 translate-y-6 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none";
    case "from-left":
      return isVisible
        ? "opacity-100 translate-x-0 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none"
        : "opacity-0 -translate-x-7 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none";
    case "from-right":
      return isVisible
        ? "opacity-100 translate-x-0 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none"
        : "opacity-0 translate-x-7 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none";
    case "scale":
      return isVisible
        ? "opacity-100 translate-y-0 scale-100 transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none"
        : "opacity-0 translate-y-4 scale-[0.97] transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none";
  }
}

function ScrollReveal({
  children,
  variant,
}: {
  children: ReactNode;
  variant: ScrollRevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={getScrollRevealClassName(variant, isVisible)}>
      {children}
    </div>
  );
}

export function ResultScreen({ result }: ResultScreenProps) {
  const {
    worldlineId,
    worldlineName,
    registeredName,
    rank,
    positions,
    valuationAmount,
    assessments,
    deduction,
    story,
    episodes,
    handlingGuide,
    stats,
    skills,
    finalSystemVerdict,
    scoutReportCopy,
    worldlineStoryCopy,
  } = result.content;

  const representativeEpisode = parseEpisode(episodes[2]);
  const scoutAssessments = assessments.slice(0, 2);

  const [revealStage, setRevealStage] = useState(0);

  useEffect(() => {
    const bgTimer = window.setTimeout(() => setRevealStage(1), 30);
    const charTimer = window.setTimeout(() => setRevealStage(2), 400);
    const logoTimer = window.setTimeout(() => setRevealStage(3), 900);
    const panelTimer = window.setTimeout(() => setRevealStage(4), 1200);

    return () => {
      window.clearTimeout(bgTimer);
      window.clearTimeout(charTimer);
      window.clearTimeout(logoTimer);
      window.clearTimeout(panelTimer);
    };
  }, []);

  const bgVisible = revealStage >= 1;
  const charVisible = revealStage >= 2;
  const logoVisible = revealStage >= 3;
  const panelVisible = revealStage >= 4;

  return (
    <main className="overflow-x-hidden bg-[#f8faff]">
      {/* 結果公開ファーストビュー */}
      <section
        aria-labelledby="result-reveal-heading"
        className="relative min-h-svh w-full overflow-hidden"
      >
        {/* 背景：pictureでモバイル／デスクトップを出し分け */}
        <div
          className={`absolute inset-0 transition-all duration-[1200ms] ease-out motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
            bgVisible ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
          }`}
        >
          <picture className="absolute inset-0 block h-full w-full">
            <source
              media={DESKTOP_MEDIA_QUERY}
              srcSet={desktopBackgroundImage.props.srcSet}
            />
            <img
              {...mobileBackgroundImage.props}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>

        {/* 人物：pictureでモバイル／デスクトップを出し分け */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            charVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <picture className="absolute inset-0 block h-full w-full">
            <source
              media={DESKTOP_MEDIA_QUERY}
              srcSet={desktopCharacterImage.props.srcSet}
            />
            <img
              {...mobileCharacterImage.props}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>

        {/* ロゴ */}
        <div
          className={`absolute left-5 top-6 z-20 transition-opacity duration-500 ease-out motion-reduce:opacity-100 motion-reduce:transition-none lg:left-8 lg:top-8 ${
            logoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/images/another-status-logo-white.png"
            alt="Another Status"
            width={840}
            height={180}
            priority
            className="h-auto w-[118px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.42)] sm:w-[136px] lg:w-[148px]"
          />
        </div>

        {/* ガラスパネル */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 px-5 pb-8 pt-16 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none lg:bottom-[7%] lg:left-[5%] lg:right-auto lg:max-w-2xl lg:px-0 lg:pb-0 lg:pt-0 ${
            panelVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-[#5b9fff]/30 bg-gradient-to-b from-[#0d2a4f]/82 via-[#123d6e]/68 to-[#1a5290]/42 px-5 py-5 shadow-[0_10px_40px_rgba(13,42,79,0.45),0_0_48px_rgba(52,107,255,0.2)] backdrop-blur-md sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            <h1
              id="result-reveal-heading"
              className="text-2xl font-bold leading-snug tracking-wide text-white sm:text-3xl lg:text-4xl"
            >
              {registeredName}
            </h1>

            <p className="mt-3 font-display text-[10px] tracking-[0.2em] text-[#a8c8ff]/80 lg:text-[11px]">
              想定市場価値
            </p>
            <p className="mt-1 bg-gradient-to-r from-[#8eb4ff] via-[#a8c8ff] to-white bg-clip-text text-3xl font-bold tracking-wide text-transparent sm:text-4xl lg:text-5xl">
              {valuationAmount}
            </p>

            <div className="mt-5 space-y-1.5 border-t border-white/12 pt-4">
              <p className="font-display text-[10px] tracking-[0.2em] text-white/60 lg:text-[11px]">
                WORLDLINE ID
              </p>
              <p className="font-display text-sm tracking-[0.14em] text-[#8eb4ff] lg:text-base">
                {worldlineId}
              </p>
              <p className="text-[14px] text-white/75 lg:text-[15px]">{worldlineName}</p>
            </div>

            <p className="mt-4">
              <span className="inline-block rounded-full border border-[#4d8cff]/45 bg-[#346bff]/25 px-3 py-1 font-display text-[10px] tracking-[0.2em] text-[#a8c8ff] lg:text-[11px]">
                RANK {rank}
              </span>
            </p>

            <p className="mt-3 text-[14px] text-white/70 lg:text-[15px]">{positions.join(" / ")}</p>
          </div>
        </div>

        {/* 下部グラデーション：明るい図鑑エリアへ接続 */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 bg-gradient-to-t from-[#f8faff] via-[#f8faff]/80 to-transparent sm:h-36"
        />
      </section>

      <div className="relative mx-auto w-[92%] max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,255,0)_0%,rgba(238,245,255,0.55)_12%,rgba(248,250,255,0.9)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(77,140,255,0.09)_0%,transparent_68%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 bottom-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(52,107,255,0.07)_0%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#346bff]/15 to-transparent"
        />

        <div className="relative z-10">
          {/* 01. 市場価値査定台帳（査定根拠＋減額） */}
          <ScrollReveal variant="rise">
            <section
              aria-labelledby="assessment-ledger-heading"
              className="mb-14 sm:mb-16"
            >
            <EncyclopediaChapterHeading
              id="assessment-ledger-heading"
              title="査定根拠"
              chapter="01"
            />

            <div className="overflow-hidden rounded-sm border border-[#346bff]/22 bg-white/90 shadow-[0_3px_28px_rgba(52,107,255,0.09)] backdrop-blur-sm">
              <ul className="divide-y divide-[#346bff]/14">
                {assessments.map((assessment) => (
                  <li
                    key={`${assessment.realTrait}-${assessment.translatedAbility}`}
                    className="px-5 py-5 sm:px-7 sm:py-6"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
                      <p className="text-[14px] leading-[1.85] text-foreground/80 sm:text-[15px] lg:text-[16px] lg:flex-1">
                        {assessment.realTrait}
                      </p>

                      <div
                        aria-hidden
                        className="flex items-center gap-2 text-[#346bff]/45 lg:w-16 lg:shrink-0 lg:justify-center"
                      >
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#346bff]/35 to-[#346bff]/35 lg:hidden" />
                        <span className="font-display text-xs text-[#346bff]/55">→</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#346bff]/35 to-[#346bff]/35 lg:hidden" />
                        <span className="hidden h-px w-full bg-[#346bff]/30 lg:block" />
                      </div>

                      <div className="lg:flex-1">
                        <p className="text-[14px] font-medium leading-[1.85] text-foreground/90 sm:text-[15px] lg:text-[16px]">
                          {assessment.translatedAbility}
                        </p>
                        <p className="mt-2 text-right font-display text-xs tracking-wide text-[#2a5bd7] sm:mt-2.5">
                          {assessment.amount}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-[#346bff]/12 bg-[#eef3fb]/90 px-5 py-5 sm:px-7 sm:py-6">
                <p
                  id="deduction-heading"
                  className="font-display text-[10px] tracking-[0.22em] text-[#346bff]/65"
                >
                  減額
                </p>
                <p className="mt-3 max-w-3xl text-[14px] leading-[1.85] text-foreground/80 sm:text-[15px] lg:text-[16px]">
                  {deduction.reason}
                </p>
                <p className="mt-2 font-display text-[12px] tracking-wide text-foreground/65">
                  {deduction.amount}
                </p>

                <div className="mt-6 border-t border-[#346bff]/10 pt-5">
                  <p className="font-display text-[10px] tracking-[0.22em] text-[#346bff]/65">
                    想定市場価値
                  </p>
                  <p className="mt-2 font-display text-xl tracking-wide text-[#2a5bd7] sm:text-2xl">
                    {valuationAmount}
                  </p>
                </div>
              </div>
            </div>
          </section>
          </ScrollReveal>

          {/* 02. 当事者断定ストーリー */}
          <ScrollReveal variant="from-right">
          <section aria-labelledby="story-heading" className="mb-14 sm:mb-16">
            <div className="relative overflow-hidden rounded-sm border border-[#346bff]/20 bg-gradient-to-br from-[#eef5ff] via-white to-[#f8faff] px-5 py-8 shadow-[0_3px_24px_rgba(52,107,255,0.08)] sm:px-9 sm:py-11">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(107,163,255,0.30)_0%,transparent_68%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 right-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(52,107,255,0.16)_0%,transparent_70%)]"
              />

              <div className="relative">
                <EncyclopediaChapterHeading
                  id="story-heading"
                  title="当事者断定ストーリー"
                  chapter="02"
                />
                <p className="max-w-3xl text-[15px] leading-[1.9] text-foreground/85 lg:text-[16px]">
                  {story}
                </p>
              </div>
            </div>
          </section>
          </ScrollReveal>

          {/* 03. エピソード */}
          <ScrollReveal variant="from-left">
          <section aria-labelledby="episodes-heading" className="mb-14 sm:mb-16">
            <div className="overflow-hidden rounded-sm border border-[#346bff]/20 bg-white/88 px-5 py-8 shadow-[0_3px_24px_rgba(52,107,255,0.08)] backdrop-blur-sm sm:px-9 sm:py-10">
              <EncyclopediaChapterHeading
                id="episodes-heading"
                title="エピソード"
                chapter="03"
              />

              <ol className="relative ml-1 border-l border-[#346bff]/25 pl-6 sm:ml-2 sm:pl-8">
                {episodes.map((episode, index) => {
                  const { heading, body } = parseEpisode(episode);
                  const episodeLabel = `EPISODE ${String(index + 1).padStart(2, "0")}`;
                  const isLast = index === episodes.length - 1;

                  return (
                    <li
                      key={episodeLabel}
                      className={`relative pb-8 ${isLast ? "" : "mb-0 border-b border-[#346bff]/8"}`}
                    >
                      <span
                        aria-hidden
                        className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border border-[#346bff]/35 bg-[#eef5ff] sm:-left-[calc(2rem+5px)]"
                      />
                      <p className="font-display text-[10px] tracking-[0.2em] text-[#346bff]/70">
                        {episodeLabel}
                      </p>
                      {heading && (
                        <p className="mt-2 text-[14px] font-medium leading-[1.85] text-foreground/90 sm:text-[15px] lg:text-[16px]">
                          {heading}
                        </p>
                      )}
                      <p
                        className={`text-[14px] leading-[1.85] text-foreground/82 sm:text-[15px] lg:text-[16px] ${
                          heading ? "mt-1.5" : "mt-2"
                        }`}
                      >
                        {body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
          </ScrollReveal>

          {/* 04. 選手取扱要領 */}
          <ScrollReveal variant="rise">
          <section aria-labelledby="handling-heading" className="mb-14 sm:mb-16">
            <div className="overflow-hidden rounded-sm border border-[#346bff]/20 bg-white/90 shadow-[0_3px_24px_rgba(52,107,255,0.08)] backdrop-blur-sm">
              <div className="border-b border-[#346bff]/10 bg-[#f4f8ff]/80 px-5 py-5 sm:px-8">
                <EncyclopediaChapterHeading
                  id="handling-heading"
                  title="選手取扱要領"
                  chapter="04"
                />
              </div>

              <ol className="divide-y divide-[#346bff]/10">
                {handlingGuide.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 px-5 py-4 sm:gap-5 sm:px-8 sm:py-5"
                  >
                    <span className="shrink-0 font-display text-lg font-semibold leading-none tracking-wide text-[#346bff] sm:text-xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] leading-[1.85] text-foreground/82 sm:text-[15px] lg:text-[16px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          </ScrollReveal>

          {/* 05. ステータス */}
          <ScrollReveal variant="scale">
          <section aria-labelledby="stats-heading" className="mb-14 sm:mb-16">
            <EncyclopediaChapterHeading
              id="stats-heading"
              title="ステータス"
              chapter="05"
            />

            <div className="overflow-hidden rounded-sm border border-[#1a3d7a]/45 bg-gradient-to-br from-[#0a1f3d] via-[#0f2d5c] to-[#123a6e] shadow-[0_4px_32px_rgba(10,31,61,0.38)]">
              <ul className="grid grid-cols-2 gap-px bg-white/[0.12] lg:grid-cols-3">
                {stats.map((stat) => (
                  <li key={stat.label} className="bg-white/[0.06] px-4 py-5 sm:px-6 sm:py-6">
                    <p className="text-[11px] leading-snug text-white/70 sm:text-xs">
                      {stat.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl">
                      {stat.value}
                    </p>
                    <div
                      aria-hidden
                      className="mt-3 h-1 overflow-hidden rounded-full bg-white/15"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#8eb4ff] to-[#c5dcff]"
                        style={{
                          width: `${Math.min(100, typeof stat.value === "number" ? stat.value : 0)}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          </ScrollReveal>

          {/* 06. 固有スキル */}
          <ScrollReveal variant="scale">
          <section aria-labelledby="skills-heading" className="mb-14 sm:mb-16">
            <EncyclopediaChapterHeading
              id="skills-heading"
              title="固有スキル"
              chapter="06"
            />

            <div className="overflow-hidden rounded-sm border border-[#1a3d7a]/45 bg-gradient-to-br from-[#0a1f3d] via-[#0f2d5c] to-[#123a6e] shadow-[0_4px_32px_rgba(10,31,61,0.38)]">
              <ul className="grid grid-cols-1 gap-px bg-white/[0.12] lg:grid-cols-2">
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="bg-white/[0.06] px-5 py-6 sm:px-7 sm:py-7"
                  >
                    <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-[#a8c8ff] sm:text-[13px]">
                      {skill.name}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.85] text-white/80 sm:text-[15px]">
                      {skill.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          </ScrollReveal>

          {/* 07. 最終システム判定 */}
          <ScrollReveal variant="rise">
          <section aria-labelledby="verdict-heading" className="mb-14 sm:mb-16">
            <EncyclopediaChapterHeading
              id="verdict-heading"
              title="最終システム判定"
              chapter="07"
            />

            <div className="relative overflow-hidden rounded-sm border border-[#346bff]/28 bg-gradient-to-br from-[#e8f2ff] via-[#f4f9ff] to-white px-6 py-8 shadow-[0_3px_24px_rgba(52,107,255,0.1)] sm:px-10 sm:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-sm border border-[#346bff]/28"
              />
              <Image
                src="/images/another-status-symbol.png"
                alt=""
                width={256}
                height={256}
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 opacity-[0.11] sm:right-6 sm:top-6 sm:h-40 sm:w-40"
              />

              <div className="relative">
                <p className="font-display text-xs tracking-[0.2em] text-[#1a47a8] sm:text-sm">
                  RANK {rank}
                </p>
                <p className="mt-6 max-w-3xl text-[14px] leading-[1.9] text-foreground/85 sm:text-[15px] lg:text-[16px]">
                  {finalSystemVerdict}
                </p>
              </div>
            </div>
          </section>
          </ScrollReveal>

          {/* 08. SCOUT REPORT */}
          <ScrollReveal variant="from-left">
          <section aria-labelledby="scout-heading" className="mb-14 sm:mb-16">
            <EncyclopediaChapterHeading
              id="scout-heading"
              title="SCOUT REPORT"
              chapter="08"
            />

            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#346bff]/14 bg-[#e8f0fc]/80"
              />
              <div className="relative overflow-hidden border border-[#346bff]/24 bg-gradient-to-b from-white to-[#f8faff] shadow-[0_3px_20px_rgba(52,107,255,0.1)]">
                <div aria-hidden className="h-1 bg-[#346bff]/70" />

                <div className="px-5 py-6 sm:px-8 sm:py-8">
                  <div className="flex items-start justify-between gap-4 border-b border-[#346bff]/12 pb-5">
                    <Image
                      src="/images/another-status-logo-color.png"
                      alt="Another Status"
                      width={840}
                      height={180}
                      className="h-auto w-[120px] sm:w-[140px]"
                    />
                  </div>

                  <div className="mt-5 space-y-1 border-b border-[#346bff]/10 pb-5">
                    <p className="font-display text-[11px] tracking-[0.14em] text-foreground/50">
                      {worldlineName}
                    </p>
                    <p className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                      {registeredName}
                    </p>
                    <p className="font-display text-[10px] tracking-[0.2em] text-[#1a47a8] sm:text-[11px]">
                      RANK {rank}
                    </p>
                    <p className="mt-2 text-right font-display text-xl font-semibold tracking-wide text-[#1a47a8] sm:text-2xl lg:text-3xl">
                      {valuationAmount}
                    </p>
                  </div>

                  <ul className="mt-5 divide-y divide-[#346bff]/12 border-b border-[#346bff]/12 pb-5">
                    {scoutAssessments.map((assessment) => (
                      <li
                        key={assessment.translatedAbility}
                        className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <p className="flex-1 text-[14px] leading-[1.75] text-foreground/82 sm:text-[15px] lg:text-[16px]">
                          {assessment.translatedAbility}
                        </p>
                        <p className="shrink-0 text-right font-display text-[11px] tracking-wide text-[#2a5bd7]">
                          {assessment.amount}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-b border-[#346bff]/12 pb-5">
                    <p className="text-[14px] leading-[1.75] text-foreground/80 sm:text-[15px] lg:text-[16px]">
                      {deduction.reason}
                    </p>
                    <p className="mt-1 text-right font-display text-[11px] tracking-wide text-foreground/60">
                      {deduction.amount}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl whitespace-pre-line text-[14px] leading-[1.85] text-foreground/82 sm:text-[15px] lg:text-[16px]">
                    {scoutReportCopy}
                  </p>
                </div>
              </div>
            </div>
          </section>
          </ScrollReveal>

          {/* 09. WORLDLINE STORY */}
          <ScrollReveal variant="from-right">
          <section aria-labelledby="story-card-heading" className="mb-10 sm:mb-14">
            <EncyclopediaChapterHeading
              id="story-card-heading"
              title="WORLDLINE STORY"
              chapter="09"
            />

            <div className="relative overflow-hidden rounded-sm border border-[#346bff]/22 bg-[#fffdf8] shadow-[0_3px_24px_rgba(52,107,255,0.09)]">
              <div className="flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-[46%] lg:shrink-0">
                  <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[28rem]">
                    <Image
                      src="/images/result/scbg-03-desktop.jpg"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-[#346bff]/30 to-transparent lg:block"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 hidden w-5 bg-gradient-to-l from-[#0d2a4f]/[0.14] via-[#0d2a4f]/[0.06] to-transparent lg:block"
                  />
                </div>

                <div className="flex-1 bg-gradient-to-br from-[#fffdf8] to-white px-5 py-6 sm:px-8 sm:py-8">
                  <p className="font-display text-[11px] tracking-[0.14em] text-foreground/55">
                    {worldlineName}
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-foreground sm:text-xl">
                    {registeredName}
                  </p>

                  <p className="mt-6 max-w-3xl whitespace-pre-line text-[14px] leading-[1.85] text-foreground/82 sm:text-[15px] lg:text-[16px]">
                    {worldlineStoryCopy}
                  </p>

                  <div className="mt-6 border-t border-[#346bff]/12 pt-5">
                    {representativeEpisode.heading && (
                      <p className="text-[14px] font-medium leading-[1.85] text-foreground/90 sm:text-[15px] lg:text-[16px]">
                        {representativeEpisode.heading}
                      </p>
                    )}
                    <p
                      className={`text-[14px] leading-[1.85] text-foreground/82 sm:text-[15px] lg:text-[16px] ${
                        representativeEpisode.heading ? "mt-1.5" : ""
                      }`}
                    >
                      {representativeEpisode.body}
                    </p>
                  </div>

                  <p className="mt-5 border-t border-[#346bff]/12 pt-5 text-[14px] leading-[1.85] text-foreground/78 sm:text-[15px] lg:text-[16px]">
                    {handlingGuide[3]}
                  </p>
                </div>
              </div>
            </div>
          </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
