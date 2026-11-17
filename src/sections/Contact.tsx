import { Eyebrow } from "@/components/Chrome";
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { RollText, Scramble } from "@/components/Anim";
import { scrollToId } from "@/components/SmoothScroll";
import { Link } from "react-router-dom";
import { profile } from "@/lib/data";
import { ArrowUpRight, Mail, MapPin, BookOpen } from "lucide-react";

/** Contact: big serif close, social rails, resume. */
export function Contact() {
  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="wrap">
        <Eyebrow>Correspondence // 06</Eyebrow>

        <div className="mt-8 [&_span]:text-ink">
          <ScrollReveal
            textClassName="t-h1"
            baseOpacity={0.1}
            blurStrength={4}
            size="lg"
          >
            Let's make something people remember.
          </ScrollReveal>
        </div>

        <p className="t-lead mt-6 max-w-xl" data-reveal="up">
          Open for creative commissions, technical collaborations and freelance builds. The fastest route is the <button className="link" onClick={() => scrollToId("booking")}>booking section</button>.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2" data-reveal="up">
          {/* direct rows */}
          <div className="space-y-8">
            <a href={`mailto:${profile.email}`} className="group flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fog transition-colors group-hover:bg-teal-soft"><Mail size={20} strokeWidth={1.6} /></div>
              <div>
                <p className="t-mono uppercase">Direct mail</p>
                <p className="font-display text-xl font-[600] tracking-[-.02em] text-ink md:text-2xl"><RollText>{profile.email}</RollText></p>
              </div>
            </a>
            <Link to="/backstory" className="group flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fog transition-colors group-hover:bg-teal-soft"><BookOpen size={20} strokeWidth={1.6} /></div>
              <div>
                <p className="t-mono uppercase">The full story</p>
                <p className="font-display text-xl font-[600] tracking-[-.02em] text-ink md:text-2xl"><RollText>Read my backstory</RollText></p>
              </div>
            </Link>
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fog"><MapPin size={20} strokeWidth={1.6} /></div>
              <div>
                <p className="t-mono uppercase">Residence</p>
                <p className="font-display text-xl font-[600] tracking-[-.02em] text-ink md:text-2xl">{profile.location}</p>
              </div>
            </div>
          </div>

          {/* social rails */}
          <div className="space-y-3">
            {profile.socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-line p-6 transition-all duration-500 hover:border-teal/60 hover:bg-teal-soft/40">
                <div>
                  <h3 className="font-display text-lg font-[600] tracking-[-.02em] text-ink">{s.name}</h3>
                  <p className="t-mono mt-1 uppercase"><Scramble text={s.handle} /></p>
                </div>
                <ArrowUpRight size={20} className="text-mute transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-ink" />
              </a>
            ))}
            <MagneticButton variant="dark" size="lg" className="w-full" onClick={() => scrollToId("booking")}>
              Book a project <ArrowUpRight size={16} className="arr" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream py-10">
      <div className="wrap flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="t-mono uppercase">© {new Date().getFullYear()} {profile.name}</p>
        <nav className="flex items-center gap-5" aria-label="Footer">
          <Link to="/" className="t-mono uppercase transition-colors hover:text-ink">Home</Link>
          <Link to="/work" className="t-mono uppercase transition-colors hover:text-ink">Work</Link>
          <Link to="/backstory" className="t-mono uppercase transition-colors hover:text-ink">Backstory</Link>
        </nav>
        <p className="t-mono uppercase">React · anime.js · Lightswind · Neon Postgres</p>
      </div>
    </footer>
  );
}
