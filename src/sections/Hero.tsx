import { useEffect, useRef, useState } from "react";
import { animate, onScroll, stagger } from "animejs";
import { motionOff } from "@/hooks/motion";
import { scrollToId } from "@/components/SmoothScroll";
import { Spotlight, Scramble } from "@/components/Anim";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import TextScrollMarquee from "@/components/lightswind/text-scroll-marquee";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { CountUp } from "@/components/lightswind/count-up";
import { profile, stats } from "@/lib/data";
import { ArrowDownRight, ArrowRight, Workflow, Figma, MonitorSmartphone } from "lucide-react";

const MARQUEE = ["UI/UX DESIGN", "FRONTEND DEVELOPMENT", "ERP SYSTEMS", "CRM PLATFORMS", "POS & BILLING", "PROMPT ENGINEERING", "BOOKING SYSTEMS", "CLOUD DEPLOYMENT"];

/** The landing hero: anime.js word-mask intro, pointer spotlight, Lightswind grid + beam + marquee. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Idle float on the availability badge + slow drift of the hero glass card (anime.js, loops)
  useEffect(() => {
    if (motionOff()) return;
    const a = animate(".hero-float", { translateY: [-6, 6], duration: 3400, alternate: true, ease: "inOutQuad", loop: true });
    return () => { a.revert(); };
  }, []);

  // Number strip counts in on view (anime.js onScroll)
  useEffect(() => {
    if (motionOff() || !root.current) return;
    const a = animate(root.current!.querySelectorAll(".stat-num"), { opacity: [0, 1], translateY: [14, 0], duration: 700, delay: stagger(90), ease: "outQuart",
      autoplay: onScroll({ target: root.current!.querySelector(".stats-row")!, enter: { container: "bottom-=80", target: "top" }, repeat: false, sync: "play complete" }) });
    return () => { a.revert(); };
  }, []);

  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-paper grain pt-32 md:pt-40">
      <Spotlight />
      {/* Lightswind interactive grid backdrop — capped to the hero viewport area, tinted teal, fading into paper */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[820px] opacity-50 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" aria-hidden>
        <InteractiveGridLazy gridColor="rgba(14,21,23,.07)" effectColor="rgba(32,115,110,.28)" fadeColor="#F3EFE9" />
      </div>
      {/* soft teal + gold washes */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-teal/15 blur-[140px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]" aria-hidden />

      <div className="wrap relative z-10">
        <p className="t-mono flex items-center gap-3 uppercase">
          <span className="h-px w-10 bg-teal" aria-hidden />
          <Scramble text="Portfolio — 2026" />
        </p>

        <h1 className="hero-h t-hero mt-6 max-w-[13ch] opacity-0" style={{ opacity: 0 }}>
          Design that moves. <span className="serif-it text-gold-ink">Code that holds.</span>
        </h1>

        <div className="hero-in mt-8 flex flex-col gap-8 opacity-0" style={{ opacity: 0 }}>
          <p className="t-lead max-w-xl">
            I'm <strong className="font-[600] text-ink">{profile.name}</strong> — a UI/UX designer and frontend developer.
            I build the <span className="serif-it text-gold-ink">ERPs, CRMs and booking systems</span> businesses run on — plus the websites that make them stand out.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton variant="dark" size="lg" onClick={() => scrollToId("booking")}>
              Book a project <ArrowRight size={16} className="arr" />
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" onClick={() => scrollToId("work")}>
              View work <ArrowDownRight size={16} className="arr" />
            </MagneticButton>
            <span className="script hidden select-none text-[2.4rem] leading-none text-ink/70 sm:inline-block" aria-hidden>Sparsh</span>
          </div>

          {/* Availability badge with Lightswind border beam */}
          <div className="hero-float relative w-fit">
            <div className="relative overflow-hidden rounded-xl border border-line bg-white px-4 py-3">
              <BorderBeam size={60} duration={7} colorFrom="#5FC4BE" colorTo="#20736E" />
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-ink" />
                </span>
                <p className="text-[13px] font-[550] text-ink">Open for new projects — ERPs, CRMs, business websites & booking systems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Craft trio */}
        <div className="hero-in mt-14 grid gap-3 opacity-0 sm:grid-cols-3" style={{ opacity: 0 }}>
          {[
            { icon: Figma, k: "Design", v: "Figma systems, prototypes, motion-first UX" },
            { icon: MonitorSmartphone, k: "Build", v: "React 19 + Next.js, TypeScript, type-safe" },
            { icon: Workflow, k: "Systems", v: "ERP · CRM · POS platforms in production" },
          ].map((c) => (
            <div key={c.k} className="card flex items-start gap-3 p-4">
              <c.icon size={18} className="mt-0.5 text-teal-ink" strokeWidth={1.8} />
              <div>
                <p className="text-sm font-[600] text-ink">{c.k}</p>
                <p className="t-mono mt-0.5 leading-relaxed">{c.v}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row — Lightswind CountUp */}
        <div className="stats-row mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 pb-16 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-num opacity-0">
              <p className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-[630] tracking-[-.03em] text-ink">
                <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} duration={1.6} />
              </p>
              <p className="t-mono mt-1 max-w-[18ch] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skill marquee — Lightswind TextScrollMarquee */}
      <div className="relative z-10 border-y border-line bg-white py-4">
        <TextScrollMarquee baseVelocity={1.2} scrollDependent className="font-mono !text-[13px] tracking-[.18em] text-mute">
          {MARQUEE.join("  ✦  ")}
        </TextScrollMarquee>
      </div>

      <div className="scroll-cue pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mute max-lg:hidden" aria-hidden>
        <i />
      </div>
    </section>
  );
}

/** Lazy wrapper: the Lightswind grid animates on pointer move; harmless if it never mounts. */
function InteractiveGridLazy(props: Record<string, unknown>) {
  const [Comp, setComp] = useState<null | React.ComponentType>(null);
  useEffect(() => {
    let alive = true;
    import("@/components/lightswind/interactive-grid-background").then((m) => { if (alive) setComp(() => m.default); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  const C: any = Comp;
  return C ? <C {...props} /> : null;
}
