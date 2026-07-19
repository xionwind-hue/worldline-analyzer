import Image from "next/image";
import Link from "next/link";

function LogoMark({ className = "" }: { className?: string }) {
  const dots = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 16 + Math.cos(angle) * 11,
      cy: 16 + Math.sin(angle) * 11,
      r: i % 3 === 0 ? 3.1 : 2.2,
    };
  });

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4d8cff" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="url(#logo-grad)" />
      ))}
    </svg>
  );
}

const TELEMETRY = [
  { label: "PROCESSING DATA", status: "SCANNING...", width: "w-[72%]" },
  { label: "BEHAVIOR PATTERN", status: "ANALYZING...", width: "w-[58%]" },
  { label: "POTENTIAL MATCHING", status: "MATCHING...", width: "w-[46%]" },
  { label: "WORLDLINE SEARCH", status: "SEARCHING...", width: "w-[34%]" },
];

export function TopPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#171a3b] text-white">
      {/* Full-bleed background visual */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/portal-2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ============ UI overlay ============ */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header nav */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-12">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <div>
              <p className="font-display text-sm font-bold tracking-[0.14em]">
                WORLDLINE ANALYZER
              </p>
              <p className="mt-0.5 text-[9px] tracking-[0.1em] text-white/45">
                潜在ポテンシャル解放エンジン ――ただし、別世界線で。
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 font-display text-[11px] font-medium tracking-[0.18em] text-white/60 md:flex">
            <span className="cursor-pointer transition-colors hover:text-white">
              ABOUT
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              HOW IT WORKS
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              FAQ
            </span>
            <span className="btn-primary cursor-pointer rounded-full px-5 py-2 text-[11px] tracking-[0.14em] text-white">
              LOG IN
            </span>
          </nav>
        </header>

        {/* Hero body */}
        <div className="flex flex-1 flex-col justify-center px-6 pb-20 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: copy */}
          <section className="max-w-xl">
            <p className="font-display text-[11px] font-medium tracking-[0.3em] text-accent-blue/90">
              STEP 1 — INTUITIVE BASE DIAGNOSIS
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.4] tracking-tight sm:text-5xl lg:text-[3.2rem]">
              <span className="text-white/90">AI があなたの</span>
              <br />
              <span className="gradient-text">サッカー選手の</span>
              <br />
              <span className="gradient-text">「世界線」を解析します</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-8 text-white/60">
              あなたの行動、思考、選択のパターンから
              <br />
              最も適した「サッカー選手の未来」を導き出します。
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/diagnosis/questions"
                className="btn-primary inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-medium tracking-wide text-white"
              >
                診断を始める
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </Link>
              <button
                type="button"
                className="btn-glass-dark inline-flex items-center rounded-full px-7 py-4 text-sm font-medium text-white/80"
              >
                仕組みを見る
              </button>
            </div>
          </section>

          {/* Right: telemetry stack */}
          <aside className="mt-14 flex w-full max-w-[240px] flex-col gap-3 lg:mt-0">
            <div className="glass-card-dark flex items-center justify-between rounded-2xl px-4 py-3">
              <span className="font-display text-[9px] font-semibold tracking-[0.26em] text-white/70">
                SYSTEM STATUS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="animate-scan-blink h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-display text-[9px] tracking-[0.2em] text-emerald-300/90">
                  ONLINE
                </span>
              </span>
            </div>

            {TELEMETRY.map((item, i) => (
              <div key={item.label} className="glass-card-dark rounded-2xl px-4 py-3">
                <p className="font-display text-[9px] font-medium tracking-[0.22em] text-white/40">
                  {item.label}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className="animate-scan-blink h-1.5 w-1.5 rounded-full bg-accent-blue"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                  <span className="font-display text-[11px] font-semibold tracking-[0.16em] text-white/85">
                    {item.status}
                  </span>
                </div>
                <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/10">
                  <div className={`progress-gradient h-full rounded-full ${item.width}`} />
                </div>
              </div>
            ))}

            <div className="glass-card-dark rounded-2xl px-4 py-4">
              <p className="font-display text-[9px] font-medium tracking-[0.24em] text-white/40">
                WORLDLINES ANALYZED
              </p>
              <p className="mt-1.5 font-display text-2xl font-bold leading-none tracking-tight text-white">
                2,347,982
              </p>
              <p className="mt-1.5 text-[10px] text-white/50">
                件の世界線を解析しました
              </p>
            </div>
          </aside>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-display text-[9px] tracking-[0.34em] text-white/35">
            SCROLL
          </span>
          <span className="scroll-line block h-10 w-px bg-white/15" />
        </div>
      </div>
    </div>
  );
}
