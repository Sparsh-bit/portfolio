import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useReveals, useHeroIntro } from "@/hooks/motion";
import { SmoothScroll, scrollToId, getLenis } from "@/components/SmoothScroll";
import { RollText, Scramble } from "@/components/Anim";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** Global pages (routed) vs. landing sections (scrolled). */
const PAGES = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/backstory", label: "Backstory" },
];

/** The SS ligature mark — Sparsh Sharma. Luxury seal: squircle disc, hairline gold ring, refined SS curves. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="ss-mark-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A282B" />
          <stop offset="1" stopColor="#0B1214" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#ss-mark-bg)" />
      <rect x="1.75" y="1.75" width="44.5" height="44.5" rx="12.5" fill="none" stroke="#B08A55" strokeOpacity=".55" strokeWidth="1" />
      {/* first S (teal) */}
      <g stroke="#5FC4BE" strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M19 9.5 H12.8 a4.8 4.8 0 0 0 0 9.6 h2.1 a4.8 4.8 0 0 1 0 9.6 H9.5" />
      </g>
      {/* second S (white, offset — the SS ligature) */}
      <g stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity=".95">
        <path d="M39.5 19.3 H33.3 a4.8 4.8 0 0 0 0 9.6 h2.1 a4.8 4.8 0 0 1 0 9.6 H28.6" />
      </g>
      <circle cx="40" cy="9" r="2.1" fill="#5FC4BE" />
    </svg>
  );
}

/** Fixed header that slides away on scroll down and returns on scroll up. */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 480 && y > last && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /** Jump to a landing-page section from any route. */
  const goSection = (id: string) => {
    setOpen(false);
    if (pathname !== "/") navigate(`/#${id}`);
    else scrollToId(id);
  };

  const isHome = pathname === "/";

  const navItems: Array<{ label: string; active: boolean; go: () => void }> = [
    ...PAGES.map((p) => ({
      label: p.label,
      active: p.to === pathname,
      go: () => { setOpen(false); if (p.to === "/") { isHome ? scrollToId("top") : navigate("/"); } else navigate(p.to); },
    })),
    { label: "Booking", active: false, go: () => goSection("booking") },
    { label: "Contact", active: false, go: () => goSection("contact") },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden ? "-translate-y-full" : ""}`}>
      <div className="mx-auto mt-3 max-w-[1280px] px-5 md:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-line bg-white/85 px-4 py-2.5 shadow-[0_8px_30px_-18px_rgba(14,21,23,.25)] backdrop-blur-md">
          <Link to="/" onClick={() => { setOpen(false); if (isHome) scrollToId("top"); }} className="flex items-center gap-2.5" aria-label="Sparsh Sharma — home">
            <Mark size={27} />
            <span className="font-display text-[15px] font-[620] tracking-[-.02em]">Sparsh Sharma</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((n) => (
              <button key={n.label} onClick={n.go} aria-current={n.active ? "page" : undefined} className={`rounded-lg px-3 py-1.5 text-[13.5px] font-[550] transition-colors hover:bg-fog hover:text-ink ${n.active ? "bg-fog text-ink" : "text-body"}`}>
                <RollText>{n.label}</RollText>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MagneticButton variant="primary" size="sm" onClick={() => goSection("booking")} className="hidden md:inline-flex whitespace-nowrap">
              Book a project
            </MagneticButton>
            <button className="btn btn-ghost btn-sm md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white/95 p-2 shadow-lg backdrop-blur-md md:hidden"
              aria-label="Mobile"
            >
              {navItems.map((n) => (
                <button key={n.label} onClick={n.go} className={`rounded-lg px-3 py-2.5 text-left text-sm font-[550] hover:bg-fog ${n.active ? "bg-fog text-ink" : "text-ink"}`}>{n.label}</button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/** Wraps page content and wires the anime.js scroll-reveal engine to the root. */
export function Page({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);
  useHeroIntro(root);
  return <div ref={root}>{children}</div>;
}

/** Small mono eyebrow label with a hairline, revealed with Scramble. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="t-mono flex items-center gap-3 uppercase" data-reveal="fade">
      <span className="h-px w-10 bg-teal" aria-hidden />
      <Scramble text={String(children)} />
    </p>
  );
}

export { SmoothScroll };
