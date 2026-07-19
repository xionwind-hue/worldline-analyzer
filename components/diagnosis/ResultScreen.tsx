import type { DiagnosisResult } from "@/lib/types";

type ResultScreenProps = {
  result: DiagnosisResult;
};

export function ResultScreen({ result }: ResultScreenProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 animate-fade-slide-in">
      <div className="gradient-border w-full rounded-3xl bg-white/50 p-8 shadow-[0_24px_80px_rgba(23,26,59,0.08)] backdrop-blur-md sm:p-12">
        <div className="mb-8 text-center">
          <p className="font-display text-xs tracking-[0.28em] text-primary-blue">
            STEP 1 COMPLETE
          </p>
          <p className="mt-2 font-display text-[11px] tracking-[0.2em] text-foreground/45">
            BASE PERSONALITY TYPE IDENTIFIED
          </p>
        </div>

        <div className="animate-result-flicker space-y-6 text-center">
          <p className="font-display text-xs tracking-[0.24em] text-primary-purple">
            DIAGNOSIS RESULT
          </p>

          <h2 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            <span className="gradient-text">『{result.personalityName}』</span>
          </h2>

          <div className="mx-auto grid max-w-sm grid-cols-2 gap-4 pt-4">
            <div className="rounded-2xl border border-primary-blue/15 bg-white/70 px-4 py-5">
              <p className="font-display text-[10px] tracking-[0.2em] text-foreground/45">
                EGO SCORE
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary-blue">
                {result.ego >= 0 ? "+" : ""}
                {result.ego}
              </p>
              <p className="mt-1 font-display text-xs tracking-wider text-foreground/55">
                {result.egoLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-primary-purple/15 bg-white/70 px-4 py-5">
              <p className="font-display text-[10px] tracking-[0.2em] text-foreground/45">
                PACE SCORE
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary-purple">
                {result.pace >= 0 ? "+" : ""}
                {result.pace}
              </p>
              <p className="mt-1 font-display text-xs tracking-wider text-foreground/55">
                {result.paceLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-foreground/8 bg-foreground/[0.03] px-5 py-4 text-center">
          <p className="font-display text-[11px] tracking-[0.22em] text-foreground/50">
            SYSTEM HALTED — AWAITING STEP 2 PROTOCOL
          </p>
          <p className="mt-2 text-xs leading-6 text-foreground/55">
            ベース性格の算出が完了しました。詳細解析は次フェーズで展開予定です。
          </p>
        </div>
      </div>
    </div>
  );
}
