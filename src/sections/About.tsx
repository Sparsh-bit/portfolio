import { useRef } from "react";
import { Link } from "react-router-dom";
import { tilt3d, motionOff } from "@/hooks/motion";
import { useEffect } from "react";
import { Eyebrow } from "@/components/Chrome";
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";
import { profile } from "@/lib/data";
import { MapPin, ArrowRight } from "lucide-react";

/** About: Lightswind word-blur reveal + 3D-tilt portrait. */
export function About() {
  const portrait = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!portrait.current || motionOff()) return;
    return tilt3d(portrait.current, 6);
  }, []);

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Eyebrow>Bio // 01</Eyebrow>
          <h2 className="t-h1 mt-6">
            The <span className="serif-it text-gold-ink">visual</span> architect
          </h2>

          <div className="mt-8 max-w-xl [&_span]:text-ink">
            <ScrollReveal
              textClassName="text-[1.05rem] leading-[1.75] text-body"
              baseOpacity={0.12}
              blurStrength={3}
              staggerDelay={0.018}
            >
              {profile.bio[0]}
            </ScrollReveal>
          </div>

          <p className="t-body mt-6 max-w-xl border-l-2 border-teal pl-6" data-reveal="up">
            {profile.bio[1]}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2" data-reveal="stagger">
            {["Business-first interfaces", "Motion as a language", "Type-safe engineering", "AI-assisted workflows"].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[.95rem] font-[550] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden /> {t}
              </li>
            ))}
          </ul>

          <p className="t-mono mt-10 flex items-center gap-2 uppercase" data-reveal="fade">
            <MapPin size={14} className="text-teal-ink" /> {profile.location}
          </p>
          <Link to="/backstory" className="link mt-6" data-reveal="fade">
            Read the full backstory <ArrowRight size={15} className="arr" />
          </Link>
        </div>

        <div className="flex items-start justify-center lg:pt-10" data-reveal="media">
          <div ref={portrait} className="relative w-full max-w-sm [perspective:900px]" style={{ transformStyle: "preserve-3d" }}>
            <div className="shot img-zoom relative cursor-pointer overflow-hidden rounded-2xl" data-cursor="view">
              <img src="/portrait.png" alt="Portrait of Sparsh Sharma" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl bg-teal-soft" aria-hidden />
            <p className="t-mono absolute -right-2 top-4 rotate-90 uppercase" aria-hidden>Sparsh — systems &amp; craft</p>
          </div>
        </div>
      </div>
    </section>
  );
}
