import { useEffect, useLayoutEffect, type RefObject, type DependencyList } from "react";
import { animate, createScope, onScroll, splitText, stagger, utils, type Scope } from "animejs";

/** "Static" mode renders every animation in its final state (used for PDF / print export). */
export const isStatic = () => typeof document !== "undefined" && document.documentElement.classList.contains("cm-static");
export const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const motionOff = () => isStatic() || prefersReduced();

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const ENTER = { container: "bottom-=60", target: "top" };

/**
 * Scroll-triggered reveals (anime.js v4 ScrollObserver + TextSplitter). Deliberately small movements.
 *  data-reveal="up|fade|lines|stagger|media"   data-delay="ms"
 */
export function useReveals(root: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useIso(() => {
    const el = root.current;
    if (!el) return;
    if (motionOff()) { el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => (n.style.opacity = "1")); return; }
    const splitters: { revert: () => void }[] = [];
    let alive = true;
    const scope: Scope = createScope({ root: el }).add(() => {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
        const type = n.dataset.reveal;
        const delay = Number(n.dataset.delay || 0);
        // "play complete": play on enter and, if the element is scrolled past before it finishes, jump to the end
        // (the default "play pause" would freeze it half-revealed until the visitor scrolls back)
        const auto = () => onScroll({ target: n, enter: ENTER, repeat: false, sync: "play complete" });
        if (type === "lines") {
          const split = () => {
            const s = splitText(n, { lines: { wrap: "clip" } });
            splitters.push(s);
            utils.set(n, { opacity: 1 });
            s.addEffect((sp: { lines: HTMLElement[] }) => animate(sp.lines, { translateY: ["105%", "0%"], duration: 900, delay: stagger(70, { start: delay }), ease: "outQuart", autoplay: auto() }));
          };
          // In `npm run dev`, React StrictMode runs this effect, reverts it and runs it again. A split made before the fonts
          // load finishes its line pass later, after the revert, and wraps the second split: the heading renders empty.
          // Waiting for the fonts there makes each split complete at once. Production builds split immediately, as before.
          if (import.meta.env.DEV) void document.fonts.ready.then(() => { if (alive) split(); }); else split();
        } else if (type === "stagger") {
          utils.set(n, { opacity: 1 });
          animate(Array.from(n.children), { opacity: [0, 1], translateY: [26, 0], rotateX: [14, 0], perspective: 900, duration: 900, delay: stagger(80, { start: delay }), ease: "outQuart", autoplay: auto() });
        } else if (type === "media") {
          animate(n, { opacity: [0, 1], translateY: [36, 0], scale: [0.97, 1], clipPath: ["inset(8% 4% 8% 4% round 20px)", "inset(0% 0% 0% 0% round 0px)"], duration: 1200, delay, ease: "outQuart", autoplay: auto(),
            onComplete: () => { n.style.clipPath = "none"; } });
          // a lone photo inside a clipped frame drifts slightly against the scroll (depth on every page)
          const pic = n.matches(".overflow-hidden") && n.querySelectorAll("img").length === 1 ? n.querySelector<HTMLImageElement>("img.object-cover") : null;
          if (pic && n.offsetHeight > 220) animate(pic, { translateY: ["-4%", "4%"], scale: [1.09, 1.09], ease: "linear", autoplay: onScroll({ target: n, enter: { container: "bottom", target: "top" }, leave: { container: "top", target: "bottom" }, sync: 0.3 }) });
        } else if (type === "fade") {
          animate(n, { opacity: [0, 1], duration: 900, delay, ease: "outQuad", autoplay: auto() });
        } else {
          animate(n, { opacity: [0, 1], translateY: [18, 0], duration: 850, delay, ease: "outQuart", autoplay: auto() });
        }
      });
    });
    const refresh = () => window.dispatchEvent(new Event("resize"));
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    return () => { alive = false; clearTimeout(t); window.removeEventListener("load", refresh); scope.revert(); splitters.forEach((s) => { try { s.revert(); } catch { /* noop */ } }); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Run an anime.js scope bound to a React ref; cleanup reverts everything. */
export function useAnime(root: RefObject<HTMLElement | null>, fn: (scope: Scope) => void, deps: DependencyList = []) {
  useIso(() => {
    if (!root.current || motionOff()) return;
    const scope = createScope({ root: root.current }).add((s) => { if (s) fn(s); });
    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Subtle pointer-driven 3D tilt with a spring return. */
export function tilt3d(el: HTMLElement, max = 5) {
  if (motionOff() || window.matchMedia("(hover: none)").matches) return () => {};
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    animate(el, { rotateY: px * max * 2, rotateX: -py * max * 2, duration: 700, ease: "outQuart", composition: "replace" });
  };
  const leave = () => animate(el, { rotateY: 0, rotateX: 0, duration: 1000, ease: "outElastic(1, .6)", composition: "replace" });
  el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
  return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
}

/** Hero entrance: headline words rise out of a clip mask, then the `.hero-in` blocks follow (anime.js TextSplitter). */
export function useHeroIntro(root: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useIso(() => {
    const el = root.current;
    if (!el || motionOff()) return;
    const h = el.querySelector<HTMLElement>(".hero-h");
    const sp = h ? splitText(h, { words: { wrap: "clip" } }) : null;
    if (h && sp) {
      h.style.opacity = "1";
      sp.addEffect((x: { words: HTMLElement[] }) => animate(x.words, { translateY: ["110%", "0%"], rotate: [4, 0], duration: 900, delay: stagger(45, { start: 120 }), ease: "outQuart" }));
    }
    const a = animate(el.querySelectorAll(".hero-in"), { opacity: [0, 1], translateY: [14, 0], delay: stagger(90, { start: 420 }), duration: 800, ease: "outQuart" });
    return () => { a.revert(); try { sp?.revert(); } catch { /* noop */ } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
