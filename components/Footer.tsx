import { huayraData } from "@/data/carData";

export function Footer() {
  return (
    <footer
      id="contact"
      className="overflow-hidden border-t border-pagani-red bg-white px-4 py-12 sm:px-8 sm:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-pagani-red to-transparent sm:mb-12" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <span
              className="grid size-10 shrink-0 place-items-center border border-pagani-red bg-pagani-red text-xs font-black text-white sm:size-12 sm:text-sm"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              P
            </span>
            <div className="min-w-0">
              <p
                className="text-xs font-black tracking-[0.18em] text-near-black sm:text-sm sm:tracking-[0.26em]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                PAGANI AUTOMOBILI S.P.A.
              </p>
              <p
                className="mt-2 text-base font-medium text-mid-gray sm:text-lg"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {huayraData.tagline} · {huayraData.origin}
              </p>
            </div>
          </div>

          <a
            href="mailto:atelier@pagani.example"
            className="inline-flex w-full justify-center bg-pagani-red px-5 py-4 text-center text-[11px] font-black tracking-[0.18em] text-white transition-colors hover:bg-pagani-red-bright sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.22em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            CONTACT THE ATELIER
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-gray pt-6 text-sm font-semibold text-mid-gray sm:mt-16 md:flex-row md:justify-between">
          <p style={{ fontFamily: "var(--font-rajdhani)" }}>
            Portfolio showcase · Pagani Huayra BC Macchina Volante
          </p>
          <p style={{ fontFamily: "var(--font-rajdhani)" }}>
            Next.js · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis
          </p>
        </div>
      </div>
    </footer>
  );
}
