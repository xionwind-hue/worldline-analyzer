"use client";

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

  return (
    <div className="relative min-h-screen">
      {/* Ambient tech backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" />
      <div className="pointer-events-none absolute -right-40 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.14)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(77,140,255,0.12)_0%,transparent_70%)]" />

      <div
        key={question.id}
        className="animate-fade-slide-in relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-8 sm:py-12"
      >
        {/* Mini brand header */}
        <div className="mb-10 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple" />
          <span className="font-display text-[11px] font-bold tracking-[0.2em] text-foreground/70">
            WORLDLINE ANALYZER
          </span>
        </div>

        {/* Question meta */}
        <header className="mb-8 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-[11px] tracking-[0.24em] text-foreground/50">
                質問 {questionNumber}{" "}
                <span className="text-foreground/30">
                  / {String(totalQuestions).padStart(2, "0")}
                </span>
              </p>
              <p className="mt-1 font-display text-xs font-semibold tracking-[0.26em] text-primary-purple">
                {question.scanLabel}
              </p>
            </div>
            <p className="font-display text-[10px] tracking-[0.18em] text-foreground/40">
              {question.category}
            </p>
          </div>

          <div className="h-[3px] overflow-hidden rounded-full bg-foreground/[0.06]">
            <div
              className="progress-gradient h-full rounded-full transition-all duration-500"
              style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </header>

        {/* Question text */}
        <div className="mb-8">
          <h2 className="text-lg font-bold leading-8 text-foreground sm:text-xl sm:leading-9">
            {question.text}
          </h2>
          <p className="mt-2.5 font-display text-[10px] tracking-[0.2em] text-foreground/40">
            SELECT WITHIN 3 SECONDS — INTUITIVE RESPONSE REQUIRED
          </p>
        </div>

        {/* Option cards */}
        <div className="flex flex-col gap-3.5">
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

        {/* Footer hint (auto-advance keeps the "次へ" affordance implicit) */}
        <div className="mt-auto flex items-center justify-between pt-10">
          <span className="font-display text-[10px] tracking-[0.2em] text-foreground/35">
            ← BEHAVIOR LOG RECORDING
          </span>
          <span className="btn-primary pointer-events-none inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-medium tracking-wide text-white opacity-90">
            選択で次へ <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
