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
