"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const projects = [
    {
        title: "Frontend Architecture",
        description: "Intelligent petrol pump management systems and cultural platforms built with high-performance logic.",
        tags: ["Next.js", "TypeScript", "Architecture"],
        link: "/projects/frontend-architecture",
        github: "https://github.com/Sparsh-bit"
    },
    {
        title: "3D Interactive Portfolio",
        description: "Immersive portfolio experience featuring physics-based animations and Three.js integration.",
        tags: ["React", "Three.js", "Framer Motion"],
        link: "/",
        github: "https://github.com/Sparsh-bit"
    },
    {
        title: "Cinema Fades Showreel",
        description: "Professional collection of cinematography work featuring color grading and motion graphics.",
        tags: ["Cinematography", "Color Grading", "After Effects"],
        link: "/cinematography"
    },
    {
        title: "Magh Mela Project",
        description: "A cultural showcase and platform dedicated to the historic Magh Mela festival.",
        tags: ["React", "Tailwind", "Animations"],
        link: "https://magh-mela.pages.dev/",
        github: "https://github.com/Sparsh-bit/Magh-Mela"
    },
];

export default function ProjectsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.4], [0.98, 1]);

    return (
        <section ref={containerRef} id="projects" className="min-h-screen w-full py-32 px-6 md:px-16 bg-[#020202] overflow-hidden relative">

            {/* Background Visonary Mask */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                viewport={{ once: true }}
                className="absolute inset-0 z-0 pointer-events-none grayscale contrast-[1.3]"
            >
                <img
                    src="/images/bg_face_3.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-[2.8] translate-x-[5%] rotate-90 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
            </motion.div>

            <motion.div style={{ scale }} className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-24 flex flex-col md:flex-row justify-between md:items-end gap-12"
                >
                    <div className="max-w-2xl">
                        <span className="text-gold tracking-[0.5em] text-[10px] font-bold uppercase block mb-8 flex items-center gap-3">
                            <div className="w-10 h-[1px] bg-gold/50" /> Selected Archive // 03
                        </span>
                        <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-cinzel font-black text-white mb-8 leading-[0.95] tracking-tighter uppercase py-1">
                            Works
                        </h2>
                        <p className="text-gray-500 text-[11px] max-w-xs tracking-[0.15em] leading-relaxed uppercase font-medium border-l border-white/5 pl-6">
                            A curated selection of digital and visual experiences blending art with technical precision.
                        </p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative"
                        >
                            <div className="relative border-b-2 border-white/[0.08] pb-16 transition-all duration-700 group-hover:border-gold/40">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                        <div className="h-[1px] w-8 bg-white/10" />
                                    </div>
                                    <div className="flex gap-8 relative z-20">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-white/40 hover:text-white transition-all duration-300 hover:scale-125"
                                            >
                                                <Github size={22} strokeWidth={1} />
                                            </a>
                                        )}
                                        <div className="text-white/40 group-hover:text-gold transition-all duration-300 group-hover:scale-125">
                                            <ArrowUpRight size={26} strokeWidth={1} />
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={project.link}
                                    className="block space-y-8 cursor-pointer"
                                >
                                    <h3 className="text-[clamp(1.8rem,4vw,3.5rem)] font-cinzel font-black text-white group-hover:tracking-wider transition-all duration-1000 uppercase leading-[0.9] pb-4">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-[12px] leading-loose max-w-sm font-medium tracking-[0.1em] uppercase border-l border-gold/20 pl-6">
                                        {project.description}
                                    </p>
                                </Link>

                                <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 group-hover:text-gold/60 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Reveal Glow */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none hidden 2xl:block">
                <span className="text-[15rem] font-cinzel font-black text-white leading-none tracking-tighter">03</span>
            </div>
        </section>
    );
}
