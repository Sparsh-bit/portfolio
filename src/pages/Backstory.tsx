import { profile, backstory, experience } from "@/lib/data";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { Eyebrow } from "@/components/Chrome";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Briefcase, GraduationCap, Braces, FileCode2, Sparkles } from "lucide-react";

/** Backstory — the full story, sourced from the old portfolio (no resume PDF). */
export default function Backstory() {
  const navigate = useNavigate();

  return (
    <div className="bg-white pb-24 pt-36 md:pt-44">
      <div className="wrap">
        {/* Hero */}
        <Eyebrow>The backstory // full story</Eyebrow>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h1 className="t-h1 max-w-[20ch]">
              The person behind the <span className="serif-it text-gold-ink">pixels</span>
            </h1>
            <p className="t-mono mt-5 uppercase">{backstory.headline}</p>
            <p className="t-lead mt-6 max-w-2xl border-l-2 border-teal pl-6" data-reveal="up">
              {backstory.summary}
            </p>
          </div>
          <div data-reveal="media">
            <div className="shot img-zoom relative overflow-hidden rounded-2xl" data-cursor="view">
              <img src="/portrait.png" alt="Portrait of Sparsh Sharma" className="aspect-[4/5] w-full object-cover" />
            </div>
            <p className="t-mono mt-3 text-center uppercase">Sparsh Sharma · {profile.location}</p>
          </div>
        </div>

        {/* Capabilities */}
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {backstory.capabilities.map((c) => (
            <li key={c} className="flex items-center gap-2.5 rounded-xl border border-line bg-fog px-4 py-3 text-[.93rem] font-[550] text-ink">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden /> {c}
            </li>
          ))}
        </ul>

        {/* Work — full bullets */}
        <h2 className="t-h2 mt-24">Experience in <span className="serif-it text-gold-ink">detail</span></h2>
        <div className="mt-10 space-y-4" data-reveal="stagger">
          {backstory.work.map((w) => (
            <article key={w.role} className="card p-6 md:p-8">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-display text-[1.3rem] font-[600] tracking-[-.02em] text-ink">{w.role}</h3>
                <span className="t-mono uppercase">{w.period}</span>
              </div>
              <p className="text-sm font-[550] text-teal-ink">{w.org}</p>
              <ul className="mt-4 max-w-3xl space-y-2.5">
                {w.bullets.map((b) => (
                  <li key={b.slice(0, 24)} className="flex gap-3 t-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Education */}
        <h2 className="t-h2 mt-24">Where it's <span className="serif-it text-gold-ink">studied</span></h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2" data-reveal="stagger">
          <article className="card p-6 md:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft text-teal-ink"><GraduationCap size={19} strokeWidth={1.9} /></div>
            <h3 className="t-h3 mt-5 text-ink">{backstory.education.degree}</h3>
            <p className="text-sm font-[550] text-teal-ink">{backstory.education.field}</p>
            <p className="t-body mt-3">{backstory.education.org} · <span className="t-mono uppercase">{backstory.education.period}</span></p>
          </article>
          <article className="card p-6 md:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft text-teal-ink"><Briefcase size={19} strokeWidth={1.9} /></div>
            <h3 className="t-h3 mt-5 text-ink">{experience[0].role}</h3>
            <p className="text-sm font-[550] text-teal-ink">{experience[0].org}</p>
            <p className="t-body mt-3">{experience[0].summary}</p>
          </article>
        </div>

        {/* AI & prompt engineering */}
        <div className="mt-24 rounded-3xl bg-slate grain p-8 text-white md:p-12">
          <p className="t-mono flex items-center gap-3 uppercase !text-gold" data-reveal="fade">
            <span className="h-px w-10 bg-gold" aria-hidden /> <Sparkles size={15} /> Prompt engineering // the AI craft
          </p>
          <h2 className="t-h2 mt-5 max-w-[22ch] text-white">
            Prompts as <span className="serif-it text-gold">engineering artefacts</span> — not chat-box strings
          </h2>
          <p className="t-lead mt-4 max-w-xl !text-white/60">
            {backstory.prompts.intro}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {backstory.prompts.points.map((pt, i) => {
              const Icon = [FileCode2, Braces, Sparkles][i];
              return (
                <article key={pt.title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] p-6 transition-colors duration-500 hover:border-gold/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.06] text-gold">
                    <Icon size={18} strokeWidth={1.9} />
                  </div>
                  <h3 className="mt-5 font-display text-[1.05rem] font-[600] tracking-[-.02em] text-white">{pt.title}</h3>
                  <p className="t-body mt-2 !text-white/60">{pt.desc}</p>
                </article>
              );
            })}
          </div>

          <p className="t-mono mt-8 uppercase !text-white/40" data-reveal="fade">
            Evidence: InterviewOS prompt library · provider-agnostic AI layer · schema-validated model responses
          </p>
        </div>

        {/* Socials + CTA */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Elsewhere // follow along</Eyebrow>
            <div className="mt-8 space-y-3">
              {profile.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-line p-5 transition-all duration-500 hover:border-teal/60 hover:bg-teal-soft/40">
                  <div>
                    <h3 className="font-display text-lg font-[600] tracking-[-.02em] text-ink">{s.name}</h3>
                    <p className="t-mono mt-1 uppercase">{s.handle}</p>
                  </div>
                  <ArrowUpRight size={20} className="text-mute transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-ink" />
                </a>
              ))}
            </div>
          </div>
          <div className="card flex flex-col items-start justify-center gap-5 p-8">
            <h3 className="t-h3 text-ink">That's the story so far.</h3>
            <p className="t-body">The next chapter could be your website. Book a free 60-minute call.</p>
            <MagneticButton variant="dark" size="lg" onClick={() => navigate("/#booking")}>
              Book a project <ArrowRight size={16} className="arr" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
