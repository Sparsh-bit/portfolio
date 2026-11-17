import { useRef } from "react";
import { tilt3d } from "@/hooks/motion";
import { Eyebrow } from "@/components/Chrome";
import { ShinyText } from "@/components/lightswind/shiny-text";
import { skills } from "@/lib/data";
import { Code2, Layout, PenTool, Cpu, Cloud, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [Code2, Layout, PenTool, Cpu, Cloud, GitBranch];

/** Skills: staggered reveal grid, each card with a spring 3D tilt and Lightswind shiny headings. */
export function Skills() {
  return (
    <section id="skills" className="bg-white py-24 md:py-32">
      <div className="wrap">
        <Eyebrow>Capabilities // 03</Eyebrow>
        <h2 className="t-h1 mt-6 max-w-[16ch]">
          What I bring to a <span className="serif-it text-gold-ink">build</span>
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {skills.map((s, i) => <SkillCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ s, i }: { s: (typeof skills)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[i % ICONS.length];

  return (
    <div
      ref={ref}
      onMouseEnter={() => { if (ref.current) tilt3d(ref.current, 7); }}
      className="group relative rounded-2xl border border-line bg-white p-6 transition-colors duration-300 hover:border-teal/60"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${s.color}14`, color: s.color }}>
        <Icon size={20} strokeWidth={1.9} />
      </div>
      <h3 className="mt-5 font-display text-[1.15rem] font-[600] tracking-[-.02em]">
        <ShinyText baseColor="#0E1517" shineColor="#20736E">{s.name}</ShinyText>
      </h3>
      <p className="t-body mt-2">{s.desc}</p>
    </div>
  );
}
