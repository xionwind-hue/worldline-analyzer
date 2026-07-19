"use client";

import { useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { calculateDiagnosisResult } from "@/lib/scoring";
import type { DiagnosisPhase, ScoreDelta } from "@/lib/types";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";
import { TransferScreen } from "./TransferScreen";

export function DiagnosisFlow() {
  const [phase, setPhase] = useState<DiagnosisPhase>("questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ScoreDelta[]>([]);

  const result = useMemo(
    () => (answers.length === QUESTIONS.length ? calculateDiagnosisResult(answers) : null),
    [answers],
  );

  const handleAnswer = (optionIndex: number) => {
    const question = QUESTIONS[currentQuestionIndex];
    const selectedOption = question.options[optionIndex];
    const nextAnswers = [...answers, selectedOption.scores];

    setAnswers(nextAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    setPhase("transfer");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary-blue/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary-purple/5 blur-3xl" />

      <div className="relative z-10">
        {phase === "questions" && (
          <QuestionScreen
            key={QUESTIONS[currentQuestionIndex].id}
            question={QUESTIONS[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}

        {phase === "transfer" && <TransferScreen onComplete={() => setPhase("result")} />}

        {phase === "result" && result && <ResultScreen result={result} />}
      </div>
    </div>
  );
}
