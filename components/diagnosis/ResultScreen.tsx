import Image from "next/image";
import type { ReactNode } from "react";
import type { DiagnosisResult } from "@/lib/types";

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

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[11px] font-semibold tracking-[0.24em] text-foreground/65">
      {children}
    </h2>
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

  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#f8faff]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(77,140,255,0.07)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 flex justify-center">
          <Image
            src="/images/another-status-logo-color.png"
            alt="Another Status"
            width={840}
            height={180}
            priority
            className="h-auto w-[150px] sm:w-[180px]"
          />
        </header>

        {/* 結果公開エリア：世界線識別〜市場価値 */}
        <section aria-labelledby="reveal-heading" className="mb-12 text-center">
          <SectionHeading>
            <span id="reveal-heading">WORLDLINE ID</span>
          </SectionHeading>
          <p className="mt-2 font-display text-sm tracking-[0.18em] text-primary-purple">
            {worldlineId}
          </p>
          <p className="mt-1 text-[14px] text-foreground/60">{worldlineName}</p>

          <h1 className="mt-5 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            {registeredName}
          </h1>
          <p className="mt-3">
            <span className="inline-block rounded-full border border-primary-purple/25 bg-gradient-to-r from-primary-blue/[0.08] to-primary-purple/[0.1] px-3.5 py-1 font-display text-[10px] tracking-[0.22em] text-primary-purple">
              RANK {rank}
            </span>
          </p>
          <p className="mt-2 text-[14px] text-foreground/55">{positions.join(" / ")}</p>

          <div
            aria-hidden
            className="relative mx-auto mt-5 flex h-48 w-48 items-center justify-center sm:mt-6 sm:h-56 sm:w-56"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border border-primary-purple/15"
            />
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full border border-primary-blue/10"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.12)_0%,rgba(77,140,255,0.06)_45%,transparent_70%)]"
            />
            <Image
              src="/images/another-status-symbol.png"
              alt=""
              width={512}
              height={512}
              className="relative z-10 h-auto w-[100px] sm:w-[120px]"
            />
          </div>

          <p className="mt-5 font-display text-[11px] tracking-[0.2em] text-foreground/65">
            想定市場価値
          </p>
          <p className="mt-2 bg-gradient-to-r from-primary-blue via-accent-blue to-primary-purple bg-clip-text text-4xl font-bold tracking-wide text-transparent sm:text-5xl">
            {valuationAmount}
          </p>
        </section>

        {/* 5. 査定根拠 */}
        <section aria-labelledby="assessments-heading" className="mb-10">
          <SectionHeading>
            <span id="assessments-heading">査定根拠</span>
          </SectionHeading>
          <ul className="mt-5 space-y-4">
            {assessments.map((assessment) => (
              <li
                key={`${assessment.realTrait}-${assessment.translatedAbility}`}
                className="rounded-2xl border border-[#e8e6f4] bg-white px-4 py-4 shadow-[0_1px_4px_rgba(23,26,59,0.04)] sm:px-5 sm:py-5"
              >
                <p className="text-[14px] leading-7 text-foreground/70 sm:text-sm">
                  {assessment.realTrait}
                </p>
                <div
                  aria-hidden
                  className="my-2.5 flex items-center gap-2 text-primary-purple/40"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-primary-blue/20 to-primary-purple/30" />
                  <span className="text-xs">→</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-primary-purple/30 to-primary-blue/20" />
                </div>
                <p className="text-[14px] font-medium leading-7 text-foreground sm:text-sm">
                  {assessment.translatedAbility}
                </p>
                <p className="mt-2 font-display text-xs tracking-wide text-primary-blue">
                  {assessment.amount}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. 減額 */}
        <section aria-labelledby="deduction-heading" className="mb-10">
          <SectionHeading>
            <span id="deduction-heading">減額</span>
          </SectionHeading>
          <div
            className="mt-4 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] px-4 py-3.5 sm:px-5"
          >
            <p className="text-[14px] leading-6 text-foreground/65 sm:text-[15px]">
              {deduction.reason}
            </p>
            <p className="mt-1.5 font-display text-[12px] tracking-wide text-foreground/55">
              {deduction.amount}
            </p>
          </div>
        </section>

        {/* 7. 当事者断定ストーリー */}
        <section aria-labelledby="story-heading" className="mb-10">
          <SectionHeading>
            <span id="story-heading">当事者断定ストーリー</span>
          </SectionHeading>
          <p className="mt-5 max-w-prose text-[15px] leading-[1.85] text-foreground/80 sm:mx-auto sm:text-[15px] sm:leading-8">
            {story}
          </p>
        </section>

        {/* 8. エピソード */}
        <section aria-labelledby="episodes-heading" className="mb-10">
          <SectionHeading>
            <span id="episodes-heading">エピソード</span>
          </SectionHeading>
          <ol className="mt-5 space-y-4">
            {episodes.map((episode, index) => {
              const { heading, body } = parseEpisode(episode);
              const episodeLabel = `EPISODE ${String(index + 1).padStart(2, "0")}`;

              return (
                <li
                  key={episodeLabel}
                  className="rounded-2xl border border-[#e8e6f4] bg-white px-4 py-4 shadow-[0_1px_4px_rgba(23,26,59,0.04)] sm:px-5 sm:py-5"
                >
                  <p className="font-display text-[10px] tracking-[0.2em] text-primary-purple/70">
                    {episodeLabel}
                  </p>
                  {heading && (
                    <p className="mt-2 text-[14px] font-medium leading-7 text-foreground sm:text-sm">
                      {heading}
                    </p>
                  )}
                  <p
                    className={`text-[14px] leading-7 text-foreground/75 sm:text-sm ${
                      heading ? "mt-1.5" : "mt-2"
                    }`}
                  >
                    {body}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* 9. 選手取扱要領 */}
        <section aria-labelledby="handling-heading" className="mb-10">
          <SectionHeading>
            <span id="handling-heading">選手取扱要領</span>
          </SectionHeading>
          <ol className="mt-5 space-y-3">
            {handlingGuide.map((item, index) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-[#e8e6f4] bg-white px-4 py-3.5 text-[14px] leading-7 text-foreground/75 shadow-[0_1px_4px_rgba(23,26,59,0.04)] sm:text-sm"
              >
                <span className="shrink-0 font-display text-[11px] tracking-wide text-primary-blue/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 10. ステータス */}
        <section aria-labelledby="stats-heading" className="mb-10">
          <SectionHeading>
            <span id="stats-heading">ステータス</span>
          </SectionHeading>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-xl border border-[#e8e6f4] bg-white px-3 py-3.5 shadow-[0_1px_4px_rgba(23,26,59,0.04)]"
              >
                <p className="text-[11px] text-foreground/50">{stat.label}</p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">
                  {stat.value}
                </p>
                <div
                  aria-hidden
                  className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/[0.06]"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-blue to-primary-purple"
                    style={{
                      width: `${Math.min(100, typeof stat.value === "number" ? stat.value : 0)}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 11. 固有スキル */}
        <section aria-labelledby="skills-heading" className="mb-10">
          <SectionHeading>
            <span id="skills-heading">固有スキル</span>
          </SectionHeading>
          <ul className="mt-5 space-y-3">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="rounded-2xl border border-[#e8e6f4] bg-white px-4 py-4 shadow-[0_1px_4px_rgba(23,26,59,0.04)] sm:px-5"
              >
                <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-primary-purple">
                  {skill.name}
                </p>
                <p className="mt-2 text-[14px] leading-7 text-foreground/75 sm:text-sm">
                  {skill.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 12. 最終システム判定 */}
        <section aria-labelledby="verdict-heading" className="mb-12">
          <SectionHeading>
            <span id="verdict-heading">最終システム判定</span>
          </SectionHeading>
          <p className="mt-5 max-w-prose text-[14px] leading-7 text-foreground/65 sm:mx-auto sm:text-[15px] sm:leading-8">
            {finalSystemVerdict}
          </p>
        </section>

        {/* 13. SCOUT REPORT */}
        <section
          aria-labelledby="scout-heading"
          className="mb-8 overflow-hidden rounded-xl border border-primary-blue/15 bg-white shadow-[0_2px_16px_rgba(23,26,59,0.06)]"
        >
          <div
            aria-hidden
            className="h-1 bg-gradient-to-r from-primary-blue via-accent-blue to-primary-purple"
          />
          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <div className="flex items-start justify-between gap-4 border-b border-foreground/[0.08] pb-5">
              <Image
                src="/images/another-status-logo-color.png"
                alt="Another Status"
                width={840}
                height={180}
                className="h-auto w-[120px] sm:w-[140px]"
              />
              <p
                id="scout-heading"
                className="pt-1 font-display text-[10px] font-semibold tracking-[0.28em] text-foreground/65"
              >
                SCOUT REPORT
              </p>
            </div>

            <div className="mt-5 space-y-1 border-b border-foreground/[0.06] pb-5">
              <p className="font-display text-[11px] tracking-[0.14em] text-foreground/50">
                {worldlineName}
              </p>
              <p className="text-base font-semibold text-foreground sm:text-lg">{registeredName}</p>
              <p className="font-display text-[10px] tracking-[0.2em] text-primary-purple">
                RANK {rank}
              </p>
              <p className="mt-2 font-display text-lg tracking-wide text-primary-blue sm:text-xl">
                {valuationAmount}
              </p>
            </div>

            <ul className="mt-5 space-y-3 border-b border-foreground/[0.06] pb-5">
              {scoutAssessments.map((assessment) => (
                <li
                  key={assessment.translatedAbility}
                  className="flex items-start justify-between gap-4"
                >
                  <p className="flex-1 text-[14px] leading-6 text-foreground/75">
                    {assessment.translatedAbility}
                  </p>
                  <p className="shrink-0 font-display text-[11px] tracking-wide text-primary-blue">
                    {assessment.amount}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-b border-foreground/[0.06] pb-5">
              <p className="text-[14px] leading-6 text-foreground/65">{deduction.reason}</p>
              <p className="mt-1 font-display text-[11px] tracking-wide text-foreground/50">
                {deduction.amount}
              </p>
            </div>

            <p className="mt-5 whitespace-pre-line text-[14px] leading-7 text-foreground/70">
              {scoutReportCopy}
            </p>
          </div>
        </section>

        {/* 14. WORLDLINE STORY */}
        <section
          aria-labelledby="story-card-heading"
          className="relative mb-10 overflow-hidden rounded-3xl border border-primary-purple/12 bg-white p-6 shadow-[0_4px_24px_rgba(124,92,255,0.07)] sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(77,140,255,0.06)_0%,transparent_70%)]"
          />

          <div className="relative">
            <div className="flex flex-col items-center gap-4 text-center">
              <Image
                src="/images/another-status-logo-color.png"
                alt="Another Status"
                width={840}
                height={180}
                className="h-auto w-[120px] sm:w-[140px]"
              />
              <p
                id="story-card-heading"
                className="font-display text-[10px] font-semibold tracking-[0.28em] text-foreground/65"
              >
                WORLDLINE STORY
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[14px] text-foreground/55">{worldlineName}</p>
              <p className="mt-1.5 text-base font-semibold text-foreground sm:text-lg">
                {registeredName}
              </p>
            </div>

            <p className="mt-6 whitespace-pre-line text-center text-[14px] leading-8 text-foreground/75 sm:text-[15px]">
              {worldlineStoryCopy}
            </p>

            <div className="mt-6 rounded-2xl border border-primary-purple/10 bg-gradient-to-br from-primary-blue/[0.04] to-primary-purple/[0.06] px-4 py-4 sm:px-5 sm:py-5">
              {representativeEpisode.heading && (
                <p className="text-[14px] font-medium leading-7 text-foreground">
                  {representativeEpisode.heading}
                </p>
              )}
              <p
                className={`text-[14px] leading-7 text-foreground/75 sm:text-[15px] ${
                  representativeEpisode.heading ? "mt-1.5" : ""
                }`}
              >
                {representativeEpisode.body}
              </p>
            </div>

            <p className="mt-5 rounded-2xl border border-[#e8e6f4] bg-white/80 px-4 py-3.5 text-[14px] leading-7 text-foreground/70 sm:px-5">
              {handlingGuide[3]}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
