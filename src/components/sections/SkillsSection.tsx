"use client";

import { motion } from "framer-motion";
import { Code2, Camera, Palette, Lightbulb, Framer, Zap } from "lucide-react";

const skills = [
    { icon: Camera, name: "Cinematography", color: "#D4AF37", desc: "Digital cinematography & master-class lighting design." },
    { icon: Code2, name: "Development", color: "#FF8C00", desc: "Building high-performance, accessible Next.js applications." },
    { icon: Palette, name: "Color Grading", color: "#D4AF37", desc: "Expert color theory and custom LUT development." },
    { icon: Lightbulb, name: "AI Strategy", color: "#FF8C00", desc: "Integrating Generative AI into creative workflows." },
    { icon: Framer, name: "Figma Design", color: "#D4AF37", desc: "Architecting high-fidelity interfaces and design systems." },
    { icon: Zap, name: "Innovation", color: "#FF8C00", desc: "Pushing the boundaries of interactive storytelling." },
];

export default function SkillsSection() {
    return (
        <section id="skills" className="min-h-screen w-full py-32 px-6 md:px-16 flex items-center justify-center bg-[#050505] relative overflow-hidden">

            {/* Logic & Vision Background */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                viewport={{ once: true }}
                className="absolute inset-0 z-0 pointer-events-none grayscale contrast-[1.2]"
            >
                <img
                    src="/images/bg_face_2.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-[2.4] translate-x-[-10%] rotate-90 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </motion.div>

            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-gold/[0.03] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-24 max-w-3xl"
                >
                    <span className="text-gold tracking-[0.5em] text-[10px] font-bold uppercase block mb-8 flex items-center gap-3">
                        <div className="w-10 h-[1px] bg-gold/50" /> Mastery // 02
                    </span>
                    <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-cinzel font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase py-1">
                        Systems <br />
                        <span className="text-white/20">& Logic</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.8 }}
                                className="group relative"
                            >
                                <div className="flex flex-col gap-8 border-l-2 border-white/5 pl-8 transition-all duration-500 group-hover:border-gold/50 bg-white/[0.01] hover:bg-white/[0.03] py-6 rounded-r-lg">
                                    <div className="relative w-fit">
                                        <Icon
                                            size={38}
                                            strokeWidth={1}
                                            style={{ color: skill.color }}
                                            className="transition-transform duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-40 transition-all duration-700 scale-150" style={{ backgroundColor: skill.color }} />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[1.4rem] font-cinzel font-bold text-white group-hover:text-gold transition-colors uppercase tracking-[0.15em] leading-none">
                                            {skill.name}
                                        </h3>
                                        <p className="text-white/60 text-[12px] tracking-[0.05em] font-medium leading-relaxed uppercase max-w-[260px]">
                                            {skill.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tech Stack Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-12 relative"
                >
                    <div className="max-w-sm">
                        <h4 className="text-white text-xl font-cinzel font-bold mb-8 tracking-[0.4em] uppercase">Architecture</h4>
                        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-bold leading-relaxed border-l-2 border-gold/40 pl-6">
                            Leveraging industrial-grade frameworks to bridge imagination and high-performance execution.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-x-12 gap-y-8 max-w-xl md:justify-end">
                        {["Next.js", "Three.js", "Framer", "Tailwind", "Python", "CapCut", "Resolve"].map((tech) => (
                            <span
                                key={tech}
                                className="text-[11px] font-black tracking-[0.5em] uppercase text-white/80 hover:text-gold transition-all duration-500 cursor-default hover:scale-110"
                                style={{
                                    textShadow: `
                                        0 0 10px rgba(255, 255, 255, 0.4),
                                        0 0 20px rgba(255, 255, 255, 0.3),
                                        0 0 30px rgba(255, 255, 255, 0.2),
                                        0 0 40px rgba(212, 175, 55, 0.15)
                                    `
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="absolute top-0 right-0 -translate-y-full opacity-[0.08] hidden lg:block pointer-events-none select-none">
                        <span className="text-[12rem] font-black font-cinzel text-white leading-none tracking-tighter">02</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
