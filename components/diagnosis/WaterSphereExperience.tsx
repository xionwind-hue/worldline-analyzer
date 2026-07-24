"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./WaterSphereExperience.module.css";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const range = (progress: number, start: number, end: number) =>
  clamp((progress - start) / (end - start));

const reveal = (
  progress: number,
  enterStart: number,
  enterEnd: number,
  leaveStart: number,
  leaveEnd: number,
) => {
  const enter = range(progress, enterStart, enterEnd);
  const leave = 1 - range(progress, leaveStart, leaveEnd);
  return Math.min(enter, leave);
};

type LightFieldProps = {
  progress: number;
  reducedMotion: boolean;
};

function LightField({ progress, reducedMotion }: LightFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const particles = Array.from({ length: 132 }, (_, index) => ({
      angle: (index * 2.399963) % (Math.PI * 2),
      distance: 0.035 + ((index * 37) % 100) / 150,
      size: 0.55 + ((index * 19) % 20) / 9,
      speed: 0.22 + ((index * 13) % 17) / 30,
      phase: (index * 0.731) % (Math.PI * 2),
      tint: index % 4,
    }));

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawRibbon = (
      time: number,
      offset: number,
      baseY: number,
      amplitude: number,
      widthScale: number,
      alpha: number,
    ) => {
      const gradient = context.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(189, 231, 255, 0)");
      gradient.addColorStop(0.18, `rgba(203, 243, 255, ${alpha * 0.68})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.78, `rgba(226, 213, 255, ${alpha * 0.6})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      const phase = time * 0.00032 + offset;
      const y1 = baseY + Math.sin(phase) * amplitude;
      const y2 = baseY + Math.sin(phase + 1.7) * amplitude;
      const y3 = baseY + Math.cos(phase * 0.8 + 0.6) * amplitude;

      context.save();
      context.beginPath();
      context.moveTo(-width * 0.1, y1);
      context.bezierCurveTo(
        width * 0.2,
        y2 - amplitude,
        width * 0.34,
        y3 + amplitude,
        width * 0.52,
        y2,
      );
      context.bezierCurveTo(
        width * 0.72,
        y1 - amplitude,
        width * 0.88,
        y3 + amplitude,
        width * 1.1,
        y1,
      );
      context.strokeStyle = gradient;
      context.lineWidth = widthScale;
      context.lineCap = "round";
      context.shadowColor = "rgba(224, 246, 255, 0.72)";
      context.shadowBlur = widthScale * 1.8;
      context.stroke();

      context.globalAlpha = 0.72;
      context.lineWidth = Math.max(1.2, widthScale * 0.12);
      context.shadowBlur = widthScale * 0.7;
      context.stroke();
      context.restore();
    };

    const draw = (time: number) => {
      const sceneProgress = progressRef.current;
      context.clearRect(0, 0, width, height);

      const approachAmount = range(sceneProgress, 0.05, 0.74);
      const insideAmount = range(sceneProgress, 0.77, 0.96);
      const travel = 1 + approachAmount * 4.4 + insideAmount * 5.8;
      const centerX = width * 0.5;
      const centerY = height * (0.3 + insideAmount * 0.18);

      drawRibbon(
        time,
        0.2,
        height * (0.47 + insideAmount * 0.06),
        height * 0.045,
        18 + approachAmount * 9,
        0.28 + approachAmount * 0.2,
      );
      drawRibbon(
        time,
        2.3,
        height * (0.62 - approachAmount * 0.12),
        height * 0.035,
        10 + approachAmount * 7,
        0.2 + approachAmount * 0.17,
      );
      if (sceneProgress > 0.48) {
        drawRibbon(
          time,
          4.5,
          height * 0.34,
          height * 0.028,
          8 + approachAmount * 6,
          range(sceneProgress, 0.48, 0.7) * 0.28,
        );
      }

      particles.forEach((particle) => {
        const drift = reducedMotion ? 0 : time * 0.00008 * particle.speed;
        const distance =
          particle.distance * Math.min(width, height) * travel +
          Math.sin(drift * 3 + particle.phase) * 12;
        const angle = particle.angle + drift;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance * 0.62;
        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) return;

        const colors = [
          "205, 246, 255",
          "255, 255, 255",
          "224, 215, 255",
          "255, 237, 217",
        ];
        const pulse =
          0.55 +
          (reducedMotion ? 0.25 : Math.sin(time * 0.0015 + particle.phase) * 0.25);
        const size =
          particle.size * (1 + approachAmount * 1.7 + insideAmount * 0.8);

        context.save();
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${colors[particle.tint]}, ${pulse})`;
        context.shadowColor = `rgba(${colors[particle.tint]}, 0.9)`;
        context.shadowBlur = 7 + size * 3;
        context.fill();
        context.restore();
      });

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={styles.lightField} aria-hidden />;
}

type WaterSphereExperienceProps = {
  mobileLayout?: boolean;
};

export function WaterSphereExperience({
  mobileLayout = false,
}: WaterSphereExperienceProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReducedMotion(motionQuery.matches);
    };

    const updateProgress = () => {
      frameRef.current = null;

      if (motionQuery.matches) {
        setProgress(1);
        return;
      }

      const scene = sceneRef.current;
      if (!scene) return;

      const start = scene.offsetTop;
      const distance = scene.offsetHeight - window.innerHeight;
      setProgress(clamp((window.scrollY - start) / distance));
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateMotionPreference();
    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    motionQuery.addEventListener("change", updateMotionPreference);
    motionQuery.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionQuery.removeEventListener("change", updateMotionPreference);
      motionQuery.removeEventListener("change", scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const approach = range(progress, 0.12, 0.72);
  const crossing = range(progress, 0.68, 0.84);
  const arrival = range(progress, 0.78, 0.96);
  const imageScale = 1 + approach * 0.18;
  const sphereScale = mobileLayout
    ? 0.72 + approach * 3.7
    : 0.72 + approach * 7.65;
  const sphereReveal = range(progress, 0.12, 0.34);
  const sphereExit = mobileLayout
    ? range(progress, 0.62, 0.8)
    : arrival;

  const copyOne = reveal(progress, 0, 0.035, 0.16, 0.23);
  const copyTwo = reveal(progress, 0.2, 0.27, 0.36, 0.43);
  const copyThree = reveal(progress, 0.4, 0.47, 0.52, 0.59);
  const copyFour = reveal(progress, 0.56, 0.63, 0.7, 0.78);
  const cta = range(progress, 0.86, 0.96);

  return (
    <main
      className={`${styles.page} ${mobileLayout ? styles.mobileLayout : ""}`}
    >
      <section
        ref={sceneRef}
        className={`${styles.scrollScene} ${mobileLayout ? styles.mobileScrollScene : ""}`}
      >
        <div
          className={`${styles.viewport} ${mobileLayout ? styles.mobileViewport : ""}`}
        >
          <div
            aria-hidden
            className={styles.openingWorld}
            style={{
              opacity: 1 - arrival * 0.88,
              transform: `scale(${imageScale})`,
            }}
          >
            <Image
              src="/images/top/light-veil-opening.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.openingImage}
            />
          </div>

          <div
            aria-hidden
            className={styles.sphereShell}
            style={{
              opacity: sphereReveal * (1 - sphereExit),
              transform: `translate(-50%, -50%) scale(${sphereScale})`,
              filter: `blur(${(1 - sphereReveal) * 7}px)`,
            }}
          >
            <div className={styles.sphereCore} />
            <div className={styles.sphereGlow} />
            <div className={styles.sphereShimmer} />
          </div>

          <div
            aria-hidden
            className={styles.membrane}
            style={{
              opacity: Math.sin(crossing * Math.PI) * 0.9,
              transform: `scale(${0.62 + crossing * 1.05})`,
            }}
          />

          <LightField progress={progress} reducedMotion={reducedMotion} />

          <div
            aria-hidden
            className={styles.insideWorld}
            style={{ opacity: arrival }}
          >
            <div className={styles.insideGlow} />
            <div className={styles.insideRibbonOne} />
            <div className={styles.insideRibbonTwo} />
            <div className={styles.pearls} />
          </div>

          <div
            aria-hidden
            className={styles.lightWash}
            style={{ opacity: Math.sin(crossing * Math.PI) * 0.55 }}
          />

          <header
            className={styles.header}
            style={{ opacity: 1 - range(progress, 0.08, 0.18) }}
          >
            <Image
              src="/images/another-status-logo-color.png"
              alt="Another Status"
              width={840}
              height={180}
              priority
              className={styles.logo}
            />
          </header>

          <div className={styles.copyLayer} aria-live="polite">
            <p
              className={styles.primaryCopy}
              style={{
                opacity: copyOne,
                transform: `translateY(${(1 - copyOne) * 14}px)`,
              }}
            >
              {mobileLayout ? (
                <>
                  人は、一つの世界だけでは
                  <br />
                  語れない。
                </>
              ) : (
                "人は、一つの世界だけでは語れない。"
              )}
            </p>

            <p
              className={styles.secondaryCopy}
              style={{
                opacity: copyTwo,
                transform: `translateY(${(1 - copyTwo) * 14}px)`,
              }}
            >
              {mobileLayout ? (
                <>
                  今のあなたが持つ性格も、
                  <br />
                  癖も、迷いも。
                </>
              ) : (
                "今のあなたが持つ性格も、癖も、迷いも。"
              )}
            </p>

            <p
              className={styles.primaryCopy}
              style={{
                opacity: copyThree,
                transform: `translateY(${(1 - copyThree) * 14}px)`,
              }}
            >
              世界が変われば、
            </p>

            <p
              className={styles.secondaryCopy}
              style={{
                opacity: copyFour,
                transform: `translateY(${(1 - copyFour) * 14}px)`,
              }}
            >
              {mobileLayout ? (
                <>
                  それはまったく違う才能に
                  <br />
                  なるかもしれません。
                </>
              ) : (
                "それはまったく違う才能になるかもしれません。"
              )}
            </p>

            <div
              className={styles.arrival}
              style={{
                opacity: cta,
                transform: `translateY(${(1 - cta) * 16}px)`,
                pointerEvents: cta > 0.9 ? "auto" : "none",
              }}
            >
              <p className={styles.arrivalLabel}>THE NEXT WORLDLINE</p>
              <Link
                href="/diagnosis/questions"
                className={styles.cta}
                tabIndex={cta > 0.9 ? 0 : -1}
              >
                会いにいく
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div
            className={styles.scrollGuide}
            style={{ opacity: 1 - range(progress, 0.02, 0.12) }}
          >
            <span>SCROLL</span>
            <i aria-hidden />
          </div>

          <nav className={styles.progress} aria-label="体験の進行状況">
            {[0, 1, 2, 3, 4].map((step) => {
              const active = progress >= step / 5 - 0.02;
              return (
                <span
                  key={step}
                  className={active ? styles.progressActive : undefined}
                />
              );
            })}
          </nav>

          {reducedMotion && (
            <p className={styles.motionNote}>
              動きを減らす設定に合わせ、最終画面を表示しています
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
