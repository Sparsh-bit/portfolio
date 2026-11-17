import { useNavigate } from "react-router-dom";
import { projects, type Project } from "@/lib/data";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/** Work page — every project with its live-site cover. */
export default function Work() {
  const navigate = useNavigate();
  const clients = projects.filter((p) => p.kind === "client");
  const lab = projects.filter((p) => p.kind !== "client");

  return (
    <div className="bg-cream pb-24 pt-36 md:pt-44">
      <div className="wrap">
        <p className="t-mono flex items-center gap-3 uppercase">
          <span className="h-px w-10 bg-teal" aria-hidden /> Work archive // all projects
        </p>
        <h1 className="t-h1 mt-6 max-w-[18ch]">
          Everything I've <span className="serif-it text-gold-ink">designed &amp; shipped</span>
        </h1>
        <p className="t-lead mt-4 max-w-xl">
          Client platforms and business websites first, earlier experiments after. Every card opens the live site in a new tab.
        </p>

        {/* Client websites */}
        <h2 className="t-h2 mt-16">Platforms &amp; <span className="serif-it text-gold-ink">client websites</span></h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {clients.map((p, i) => <WorkCard key={p.title} p={p} big i={i} />)}
        </div>

        {/* Lab & earlier work */}
        <h2 className="t-h2 mt-20">Earlier &amp; <span className="serif-it text-gold-ink">lab</span> work</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lab.map((p, i) => <WorkCard key={p.title} p={p} i={i} />)}
        </div>

        {/* CTA */}
        <div className="mt-20 card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h3 className="t-h3 text-ink">Want a site like these?</h3>
            <p className="t-body mt-2 max-w-md">Book a free 60-minute call — website builds and booking-system integrations.</p>
          </div>
          <MagneticButton variant="dark" size="lg" onClick={() => navigate("/#booking")}>
            Book a project <ArrowRight size={16} className="arr" />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ p, big = false, i }: { p: Project; big?: boolean; i: number }) {
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(14,21,23,.35)]"
      data-cursor="view"
      data-reveal="up"
    >
      <BorderBeam size={90} duration={9 + i} colorFrom={p.accent} colorTo="#5FC4BE" className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* cover */}
      <div className={`relative overflow-hidden ${big ? "aspect-[16/10]" : "aspect-[16/9]"}`} style={{ background: `linear-gradient(135deg, ${p.accent}14, ${p.accent}05)` }}>
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.title} — live website`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-[630] tracking-[-.03em]" style={{ color: p.accent }}>{p.title}</span>
          </div>
        )}
      </div>
      {/* body */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <span className="t-mono uppercase">{p.kind === "client" ? "Client website" : p.year}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-teal-ink group-hover:text-teal-ink" aria-hidden>
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div>
          <h3 className="t-h3 text-ink">{p.title}</h3>
          <p className="t-body mt-2">{p.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {p.kind === "client" && <span className="chip !border-teal/50 !bg-teal-soft !text-teal-ink">{p.year}</span>}
          {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
      <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 rounded-b-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" style={{ background: p.accent }} aria-hidden />
    </a>
  );
}
