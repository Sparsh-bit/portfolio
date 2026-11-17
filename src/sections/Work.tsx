import { HorizontalScroll, RollText } from "@/components/Anim";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { projects, type Project } from "@/lib/data";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/** Work: pinned sideways-scrolling rail of project cards (anime.js onScroll sync) on desktop; swipeable on mobile. */
export function Work() {
  return (
    <section id="work" className="bg-cream grain py-24 md:py-0 lg:py-0">
      <HorizontalScroll
        className="lg:py-0"
        head={
          <div className="wrap">
            <p className="t-mono flex items-center gap-3 uppercase">
              <span className="h-px w-10 bg-teal" aria-hidden /> Selected work // 02
            </p>
            <h2 className="t-h1 mt-6 max-w-[16ch]">
              Things I've <span className="serif-it text-gold-ink">shipped</span>
            </h2>
            <p className="t-lead mt-4 max-w-lg">A curated selection of digital and visual experiences — keep scrolling, the rail moves sideways.</p>
            <Link to="/work" className="link mt-5" data-reveal="fade">
              View the full work archive <ArrowRight size={15} className="arr" />
            </Link>
          </div>
        }
      >
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        <a href="https://github.com/Sparsh-bit" target="_blank" rel="noreferrer" className="group flex h-full min-h-[380px] w-[300px] shrink-0 flex-col items-start justify-between rounded-2xl border border-dashed border-line bg-white p-7 transition-colors hover:border-teal-ink">
          <p className="font-display text-2xl font-[620] tracking-[-.02em] text-ink">More on<br />GitHub</p>
          <div className="flex items-center gap-2 text-teal-ink">
            <span className="text-sm font-[550]"><RollText>@Sparsh-bit</RollText></span>
            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </a>
      </HorizontalScroll>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <a href={p.link} target="_blank" rel="noreferrer" data-cursor="view" className="group relative flex h-full min-h-[380px] w-[min(78vw,420px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(14,21,23,.35)] lg:w-[420px]">
      <BorderBeam size={90} duration={9} colorFrom={p.accent} colorTo="#5FC4BE" className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* cover (client sites ship a live screenshot) */}
      <div className="relative h-[168px] w-full shrink-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.accent}18, ${p.accent}06)` }}>
        {p.image ? (
          <img src={p.image} alt={`${p.title} — live website`} className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-[1.7rem] font-[630] tracking-[-.03em]" style={{ color: p.accent }}>{p.title}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between">
            <span className="t-mono uppercase">{p.kind === "client" ? "Client website" : p.year}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-teal-ink group-hover:text-teal-ink" aria-hidden>
              <ArrowUpRight size={16} />
            </span>
          </div>
          <h3 className="t-h3 mt-5 text-ink">{p.title}</h3>
          <p className="t-body mt-2 line-clamp-3">{p.description}</p>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {p.kind === "client" && <span className="chip !border-teal/50 !bg-teal-soft !text-teal-ink">{p.year}</span>}
          {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
      <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 rounded-b-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" style={{ background: p.accent }} aria-hidden />
    </a>
  );
}
