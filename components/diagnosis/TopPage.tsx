import Image from "next/image";
import Link from "next/link";

export function TopPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#171a3b] text-white">
      {/* Background visual */}
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

      {/* Deep navy overlay: keeps the copy readable while letting the
          portal's glow breathe through, darkest where the text sits. */}
      <div aria-hidden className="top-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex justify-center px-6 pt-12 sm:pt-16">
          <Image
            src="/images/another-status-logo-color.png"
            alt="Another Status — AI Multiverse Profile"
            width={840}
            height={180}
            priority
            className="h-auto w-[230px] drop-shadow-[0_1px_6px_rgba(255,255,255,0.25)] sm:w-[300px]"
          />
        </header>

        <div className="animate-fade-slide-in flex flex-1 flex-col items-center justify-end gap-9 px-6 pb-16 pt-24 text-center sm:gap-10 sm:pb-24">
          <div className="max-w-sm space-y-5 sm:max-w-2xl">
            <h1 className="text-balance text-[1.6rem] font-bold leading-[1.65] tracking-wide sm:text-4xl sm:leading-[1.6]">
              <span className="whitespace-nowrap">人は、一つの世界だけでは</span>
              <br className="sm:hidden" />
              語れない。
            </h1>
            <p className="text-[13px] leading-8 text-white/80 sm:text-[15px]">
              今のあなたが持つ性格も、癖も、迷いも。
              <br />
              世界が変われば、
              <br className="sm:hidden" />
              <span>それはまったく違う才能に</span>
              <span className="whitespace-nowrap">なるかもしれません。</span>
            </p>
          </div>

          <Link
            href="/diagnosis/questions"
            className="btn-primary inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-sm font-medium tracking-[0.08em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171a3b]"
          >
            会いにいく
            <span aria-hidden className="text-base leading-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
