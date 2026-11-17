import { useEffect } from "react";
import Lenis from "lenis";
import { motionOff } from "@/hooks/motion";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Buttery inertial scrolling (Lenis). Disabled for reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (motionOff()) return;
    lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.9 });
    let id = 0;
    const raf = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}

export const lockScroll = (lock: boolean) => {
  if (lock) { lenis?.stop(); document.documentElement.style.overflow = "hidden"; }
  else { lenis?.start(); document.documentElement.style.overflow = ""; }
};

/** Smooth-scroll to an in-page anchor through Lenis (falls back to native). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.1 });
    // Safety net: if the animation can't progress (rAF throttled/paused in background tabs),
    // force a native jump and resync Lenis so the anchor always works. Re-measured each attempt
    // because fonts/images/reveals keep shifting the layout after mount. Two attempts, so at
    // least one fires even when the browser clamps timers in hidden pages.
    const forceArrive = () => {
      const nowY = el.getBoundingClientRect().top + window.scrollY - 72;
      if (Math.abs(window.scrollY - nowY) > 40 && lenis) {
        lenis.stop(); // kills the stalled animation and syncs state
        window.scrollTo(0, nowY);
        lenis.start();
      }
    };
    setTimeout(forceArrive, 380);
    setTimeout(forceArrive, 1500);
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
