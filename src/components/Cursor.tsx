import { useEffect, useRef } from "react";
import { motionOff } from "@/hooks/motion";

/** Ink dot cursor (CosmicMuse-style) — grows over interactive elements, shows "View" over project media. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (motionOff() || window.matchMedia("(hover: none)").matches) return;
    const el = ref.current!;
    let x = -100, y = -100, cx = -100, cy = -100, id = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      el.style.opacity = "1";
      const t = (e.target as HTMLElement).closest("a,button,[data-cursor],input,select,label") as HTMLElement | null;
      el.classList.toggle("is-hover", !!t && t.dataset.cursor !== "view");
      el.classList.toggle("is-view", t?.dataset.cursor === "view");
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      id = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    id = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(id); };
  }, []);

  return <div ref={ref} className="cm-cursor hidden md:flex" style={{ opacity: 0 }} aria-hidden />;
}
