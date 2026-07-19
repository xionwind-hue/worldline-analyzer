"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TransferScreenProps = {
  onComplete: () => void;
};

const TRANSFER_DURATION_MS = 3200;
const START_DELAY_MS = 30;
const GLOW_DELAY_MS = 100;
const GAUGE_DELAY_MS = 150;
const FADE_OUT_DELAY_MS = 2900;

export function TransferScreen({ onComplete }: TransferScreenProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasGlowExpanded, setHasGlowExpanded] = useState(false);
  const [hasGaugeFilled, setHasGaugeFilled] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => setHasStarted(true), START_DELAY_MS);
    const glowTimer = window.setTimeout(() => setHasGlowExpanded(true), GLOW_DELAY_MS);
    const gaugeTimer = window.setTimeout(() => setHasGaugeFilled(true), GAUGE_DELAY_MS);
    const fadeOutTimer = window.setTimeout(() => setIsFadingOut(true), FADE_OUT_DELAY_MS);
    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, TRANSFER_DURATION_MS);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(glowTimer);
      window.clearTimeout(gaugeTimer);
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#f8faff] px-6 text-center transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-8 transition-all duration-[450ms] ease-out motion-reduce:transition-none ${
          hasStarted ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
      >
        {/* Symbol + glow share the same center anchor */}
        <div className="relative flex h-[136px] w-[136px] items-center justify-center sm:h-[160px] sm:w-[160px]">
          <div
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(77,140,255,0.11)_38%,rgba(52,107,255,0.04)_58%,transparent_72%)] blur-[2px] transition-all duration-[1400ms] ease-out motion-reduce:transition-none ${
              hasGlowExpanded ? "scale-100 opacity-100" : "scale-[0.28] opacity-0"
            }`}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-[5%] rounded-full border border-[#171a3b]/10"
          />

          <Image
            src="/images/another-status-symbol.png"
            alt="Another Status"
            width={512}
            height={512}
            priority
            className="relative z-10 h-auto w-full"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-foreground/80">
              WORLD TRANSFER
            </p>
            <p className="text-[13px] leading-7 text-foreground/55">
              あなたの特性を、別世界の才能へ翻訳しています。
            </p>
          </div>

          <div
            aria-hidden
            className="mx-auto h-[2px] w-[240px] overflow-hidden rounded-full bg-[#171a3b]/10 sm:w-[300px]"
          >
            <div
              className={`h-full w-full origin-left bg-gradient-to-r from-primary-blue via-accent-blue to-primary-purple transition-transform duration-[2800ms] ease-out motion-reduce:transition-none ${
                hasGaugeFilled ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
