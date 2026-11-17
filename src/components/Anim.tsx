import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { animate, createAnimatable, createDraggable, onScroll, stagger, utils } from "animejs";
import { motionOff } from "@/hooks/motion";

/* ───────────────────────── Particle burst (booking success, CTA) ───────────────────────── */

/** Fires a short ring of particles from the centre of `el` (anime.js). */
export function burst(el: Element | null, colors = ["#5FC4BE", "#121C1E", "#20736E", "#5A46E0", "#E0612A"]) {
  if (!el || motionOff()) return;
  const r = el.getBoundingClientRect();
  const host = document.createElement("div");
  host.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;width:0;height:0;pointer-events:none;z-index:200`;
  document.body.appendChild(host);
  const n = 26;
  const dots = Array.from({ length: n }, (_, i) => {
    const d = document.createElement("span");
    const s = 4 + (i % 3) * 2;
    d.style.cssText = `position:absolute;left:${-s / 2}px;top:${-s / 2}px;width:${s}px;height:${s}px;border-radius:${i % 4 === 0 ? "2px" : "50%"};background:${colors[i % colors.length]}`;
    host.appendChild(d); return d;
  });
  dots.forEach((d, i) => {
    const ang = (i / n) * Math.PI * 2, dist = utils.random(50, 120);
    animate(d, { translateX: Math.cos(ang) * dist, translateY: Math.sin(ang) * dist + 20, scale: [1, 0], rotate: utils.random(-180, 180), duration: utils.random(700, 1100), ease: "outExpo" });
  });
  setTimeout(() => host.remove(), 1300);
}

/* ───────────────────────── Rolling link text ───────────────────────── */

/** Text whose letters roll up on hover (anime.js stagger). */
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = children.split("");
  useEffect(() => {
    const el = ref.current?.closest("a,button");
    const host = ref.current;
    if (!el || !host || motionOff()) return;
    const top = host.querySelectorAll(".rt-a"), bot = host.querySelectorAll(".rt-b");
    const on = () => { animate(top, { translateY: ["0%", "-110%"], delay: stagger(16), duration: 380, ease: "outQuart" }); animate(bot, { translateY: ["110%", "0%"], delay: stagger(16), duration: 380, ease: "outQuart" }); };
    el.addEventListener("mouseenter", on);
    return () => el.removeEventListener("mouseenter", on);
  }, [children]);
  return (
    <span ref={ref} className={`relative inline-flex overflow-hidden align-bottom ${className}`} aria-label={children}>
      <span aria-hidden className="inline-flex">{chars.map((c, i) => <span key={i} className="rt-a inline-block whitespace-pre">{c}</span>)}</span>
      <span aria-hidden className="absolute inset-0 inline-flex">{chars.map((c, i) => <span key={i} className="rt-b inline-block whitespace-pre" style={{ transform: "translateY(110%)" }}>{c}</span>)}</span>
    </span>
  );
}

/* ───────────────────────── Horizontal pinned scroll ───────────────────────── */

/** Pins a section and scrolls its track sideways while you scroll down (anime.js onScroll sync). */
export function HorizontalScroll({ children, className = "", head }: { children: ReactNode; className?: string; head?: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = outer.current, t = track.current;
    if (!o || !t || motionOff()) return;
    const dist = () => Math.max(0, t.scrollWidth - t.clientWidth);
    o.style.height = `${window.innerHeight + dist()}px`;
    const a = animate(t, { translateX: [0, -dist()], ease: "linear",
      autoplay: onScroll({ target: o, enter: { container: "top+=64", target: "top" }, leave: { container: "bottom", target: "bottom" }, sync: true }) });
    const b = line.current ? animate(line.current, { scaleX: [0, 1], ease: "linear", autoplay: onScroll({ target: o, enter: { container: "top+=64", target: "top" }, leave: { container: "bottom", target: "bottom" }, sync: true }) }) : null;
    return () => { a.revert(); b?.revert(); o.style.height = ""; };
  }, []);
  return (
    <div ref={outer} className={`relative ${className}`}>
      <div className="lg:sticky lg:top-[64px] lg:flex lg:h-[calc(100vh-64px)] lg:flex-col lg:justify-center">
        {head}
        <div className="wrap mt-10 overflow-hidden">
          <div ref={track} className="flex gap-4 overflow-x-auto pb-2 no-scrollbar lg:overflow-visible">{children}</div>
          <div className="mt-8 hidden h-[2px] rounded-full bg-line lg:block"><div ref={line} className="h-full origin-left rounded-full bg-teal" style={{ transform: "scaleX(0)" }} /></div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Spotlight that follows the pointer ───────────────────────── */

/** A soft teal glow that trails the pointer (anime.js createAnimatable). Parent must be `relative overflow-hidden`. */
export function Spotlight({ color = "rgba(95,196,190,.20)", size = 560 }: { color?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current, host = el?.parentElement;
    if (!el || !host || motionOff() || matchMedia("(hover: none)").matches) return;
    const a = createAnimatable(el, { x: 900, y: 900, opacity: 400, ease: "out(3)" }) as unknown as { x: (v: number) => void; y: (v: number) => void; opacity: (v: number) => void; revert: () => void };
    const move = (e: PointerEvent) => { const r = host.getBoundingClientRect(); a.x(e.clientX - r.left - size / 2); a.y(e.clientY - r.top - size / 2); a.opacity(1); };
    const leave = () => a.opacity(0);
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave);
    return () => { host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); a.revert(); };
  }, [size]);
  return <div ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0 z-0 rounded-full opacity-0" style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 65%)` }} />;
}

/* ───────────────────────── Draggable rail ───────────────────────── */

/** A horizontally draggable rail with momentum (anime.js createDraggable). */
export function DragRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const start = useRef(0);
  const moved = useRef(false);
  useEffect(() => {
    if (!box.current || !rail.current || motionOff()) return;
    const d = createDraggable(rail.current, { container: box.current, y: false, releaseStiffness: 120, releaseDamping: 18,
      cursor: { onHover: "grab", onGrab: "grabbing" } });
    return () => { d.revert(); };
  }, []);
  return (
    <div ref={box} className={`overflow-hidden ${className}`}>
      <div ref={rail} className="flex w-max gap-6 pr-6 [touch-action:pan-y]"
        onPointerDown={(e) => { start.current = e.clientX; moved.current = false; }}
        onPointerMove={(e) => { if (Math.abs(e.clientX - start.current) > 6) moved.current = true; }}
        onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } }}>{children}</div>
    </div>
  );
}

/* ───────────────────────── Decoding label ───────────────────────── */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/—";
/** Small label text that decodes from random glyphs when it scrolls into view (anime.js onScroll). */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    const state = { p: 0 };
    const a = animate(state, { p: [0, 1], duration: 900, ease: "outQuad",
      onUpdate: () => {
        const n = Math.floor(state.p * text.length);
        el.textContent = text.slice(0, n) + text.slice(n).replace(/[^\s]/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).slice(0, Math.max(0, text.length - n));
      },
      onComplete: () => { el.textContent = text; },
      autoplay: onScroll({ target: el, enter: { container: "bottom-=40", target: "top" }, repeat: false, sync: "play complete" }) });
    return () => { a.revert(); el.textContent = text; };
  }, [text]);
  return <span ref={ref} className={className}>{text}</span>;
}
