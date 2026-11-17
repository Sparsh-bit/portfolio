import { Eyebrow } from "@/components/Chrome";
import { experience } from "@/lib/data";
import { Briefcase, GraduationCap } from "lucide-react";

/** Experience & education timeline with line-mask reveals. */
export function Experience() {
  return (
    <section id="experience" className="bg-cream py-24 md:py-32">
      <div className="wrap max-w-4xl">
        <Eyebrow>Trajectory // 04</Eyebrow>
        <h2 className="t-h1 mt-6">
          Experience & <span className="serif-it text-gold-ink">education</span>
        </h2>

        <div className="mt-14 space-y-4" data-reveal="stagger">
          {experience.map((e) => (
            <article key={e.role} className="card group flex flex-col gap-4 p-6 transition-colors duration-300 hover:border-teal/50 md:flex-row md:items-start md:gap-8 md:p-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-ink">
                {e.kind === "work" ? <Briefcase size={19} strokeWidth={1.9} /> : <GraduationCap size={19} strokeWidth={1.9} />}
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-display text-[1.25rem] font-[600] tracking-[-.02em] text-ink">{e.role}</h3>
                  <span className="t-mono uppercase">{e.period}</span>
                </div>
                <p className="text-sm font-[550] text-teal-ink">{e.org}</p>
                <p className="t-body mt-3 max-w-2xl">{e.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
