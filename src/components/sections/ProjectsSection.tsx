"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const projects = [
    {
        title: "Magh Mela Website",
        description: "Designed and delivered a public-facing frontend website for Magh Mela with responsive layouts and UI/UX best practices.",
        tags: ["React", "UI/UX", "Public Sector"],
        link: "https://magh-mela.pages.dev/",
        github: "https://github.com/Sparsh-bit/Magh-Mela"
    },
    {
        title: "New Defence Public School",
        description: "Developed a complete frontend website for an educational institution, focusing on structured content and cross-device compatibility.",
        tags: ["Next.js", "Education", "Frontend"],
        link: "https://new-defence-public-school.pages.dev/",
        github: "https://github.com/Sparsh-bit/NDPS"
    },
    {
        title: "Cinema Fades",
        description: "Professional collection of cinematography work featuring color grading and motion graphics.",
        tags: ["Cinematography", "Color Grading", "After Effects"],
        link: "/cinematography"
    },
    {
        title: "Frontend Architecture",
        description: "Intelligent petrol pump management systems and cultural platforms built with high-performance logic.",
        tags: ["Next.js", "TypeScript", "Architecture"],
        link: "/projects/frontend-architecture",
        github: "https://github.com/Sparsh-bit"
    }
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="p-8 flex flex-col h-full relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <Link href={project.link}>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-gold/20 group-hover:border-gold/30 transition-all duration-500 cursor-pointer">
                                            <ArrowUpRight className="text-white/60 group-hover:text-gold transition-colors" size={18} />
                                        </div>
                                    </Link>

                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-white/20 hover:text-white transition-colors"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>

                                <Link href={project.link} className="block mb-6 flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300 font-cinzel leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed font-light">
                                        {project.description}
                                    </p>
                                </Link>

                                <div className="mt-auto flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white/40 bg-white/5 rounded-full border border-white/5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-[60px] group-hover:bg-gold/20 transition-all duration-700" />
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
