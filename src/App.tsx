import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header, Page } from "@/components/Chrome";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll, getLenis, scrollToId } from "@/components/SmoothScroll";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Backstory from "@/pages/Backstory";
import NotFound from "@/pages/NotFound";
import { Footer } from "@/sections/Contact";

/** Scroll handling across routes: reset to top, honour #hash deep links (through Lenis). */
/** Per-route <title>, meta description, canonical and Open Graph URL. */
const META: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "Sparsh Sharma — UI/UX Designer, Developer & ERP/CRM Builder",
    desc: "Portfolio of Sparsh Sharma — designer & developer building ERPs, CRMs, POS & booking systems and business websites. Book a website build or a booking-system integration directly.",
  },
  "/work": {
    title: "Work — Sparsh Sharma | Platforms, Client Websites & Labs",
    desc: "Live platforms and client websites by Sparsh Sharma — campus ERPs, POS & booking systems, AI interview platforms and public-sector sites. Every card opens the live site.",
  },
  "/backstory": {
    title: "Backstory — Sparsh Sharma",
    desc: "How Sparsh Sharma designs and builds: business-first interfaces, type-safe engineering, motion as a language and prompt engineering as a production discipline.",
  },
  "/404": {
    title: "Page not found — Sparsh Sharma",
    desc: "That page doesn't exist. Head back to the portfolio of Sparsh Sharma — ERPs, CRMs and booking systems for businesses.",
  },
};

function MetaManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = META[pathname] ?? META["/404"];
    const url = `https://sparshsharma.in${pathname === "/404" ? "/" : pathname}`;
    document.title = m.title;
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.content = content;
    };
    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement("link"); el.rel = rel; document.head.appendChild(el); }
      el.href = href;
    };
    setMeta("name", "description", m.desc);
    setMeta("property", "og:title", m.title);
    setMeta("property", "og:description", m.desc);
    setMeta("property", "og:url", url);
    setLink("canonical", url);
  }, [pathname]);
  return null;
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Re-aim as the layout settles (fonts, images, reveals shift positions after mount)
      scrollToId(id);
      const t1 = setTimeout(() => scrollToId(id), 700);
      const t2 = setTimeout(() => scrollToId(id), 1600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  return (
    <>
      <SmoothScroll />
      <MetaManager />
      <ScrollManager />
      <Cursor />
      <Header />
      {/* Remount per route: re-runs the reveal/hero wiring on every page change,
          exactly as a full page load would (content is opacity-0 until wired). */}
      <Page key={pathname}>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/backstory" element={<Backstory />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
      </Page>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
