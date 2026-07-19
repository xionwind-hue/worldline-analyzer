"use client";

import Image from "next/image";
import { useState } from "react";
import type { Question } from "@/lib/types";
import { OptionCard } from "./OptionCard";

type QuestionScreenProps = {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
};

export function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: QuestionScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (index: number) => {
    if (isTransitioning) return;

    setSelectedIndex(index);
    setIsTransitioning(true);

    window.setTimeout(() => {
      onAnswer(index);
    }, 380);
  };

  const questionNumber = String(questionIndex + 1).padStart(2, "0");
  const totalNumber = String(totalQuestions).padStart(2, "0");

  return (
    <div className="relative min-h-svh bg-[#f8faff]">
      {/* Subtle ambient light — no grid, no loop animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(77,140,255,0.07)_0%,transparent_70%)]"
      />

      <div
        key={question.id}
        className="animate-fade-slide-in relative z-10 mx-auto flex min-h-svh w-full max-w-2xl flex-col px-5 py-8 sm:px-6 sm:py-12"
      >
        {/* Brand */}
        <div className="mb-8">
          <Image
            src="/images/another-status-logo-color.png"
            alt="Another Status"
            width={840}
            height={180}
            className="h-auto w-[150px] sm:w-[180px]"
          />
        </div>

        {/* Question progress */}
        <header className="mb-8 space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-display text-[11px] tracking-[0.2em] text-foreground/55">
              質問 {questionNumber}
              <span className="text-foreground/35"> / {totalNumber}</span>
              <span className="mx-2 text-foreground/30">·</span>
              <span className="text-primary-purple">{question.scanLabel}</span>
            </p>
            <p className="font-display text-[10px] tracking-[0.14em] text-foreground/50">
              {question.category}
            </p>
          </div>

          <div className="h-[3px] overflow-hidden rounded-full bg-foreground/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-blue via-accent-blue to-primary-purple transition-all duration-500"
              style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </header>

        {/* Question text */}
        <div className="mb-7">
          <h2 className="text-lg font-bold leading-[1.75] text-foreground sm:text-xl sm:leading-[1.8]">
            {question.text}
          </h2>
          <p className="mt-3 text-[13px] tracking-wide text-foreground/55">
            考えすぎず、いちばん近いものを。
          </p>
        </div>

        {/* Option cards */}
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <OptionCard
              key={option.id}
              optionId={option.id}
              label={option.label}
              selected={selectedIndex === index}
              onSelect={() => handleSelect(index)}
            />
          ))}
        </div>

        {/* Footer hint */}
        <p className="mt-auto pt-10 text-center text-[11px] tracking-wide text-foreground/50">
          選ぶと、次の問いへ進みます。
        </p>
      </div>
    </div>
  );
}
