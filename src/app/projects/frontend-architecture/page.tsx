"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ArrowUpRight, ExternalLink, Github, Code2, Layers, Cpu, Database } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";

// Project Data
const projects = [
    {
        id: 1,
        title: "Immersive Portfolio",
        category: "WebGL Experience",
        tech: "Next.js • Three.js",
        image: "/images/projects/portfolio-hero.png",
        description: "A high-performance personal brand experience featuring physics-based interactions and cinematic lighting.",
        stats: { score: "98", metric: "Lighthouse" }
    },
    {
        id: 2,
        title: "Petro Dashboard",
        category: "Enterprise SaaS",
        tech: "React • Node.js",
        image: "/images/projects/petro-dashboard.png",
        description: "B2B fuel reconciliation platform with real-time analytics and role-based access control.",
        stats: { score: "94", metric: "Performance" }
    },
    {
        id: 3,
        title: "Magh Mela Portal",
        category: "Cultural Platform",
        tech: "Next.js • Supabase",
        image: "/images/projects/magh-mela-hero.png",
        description: "Digital platform for India's largest religious gathering with real-time crowd management.",
        stats: { score: "96", metric: "SEO Score" }
    },
    {
        id: 4,
        title: "Authentication Flow",
        category: "Security System",
        tech: "JWT • OAuth 2.0",
        image: "/images/projects/petro-login.png",
        description: "Enterprise-grade authentication with multi-factor security and seamless user experience.",
        stats: { score: "100", metric: "Security" }
    },
];

export default function FrontendArchitecture() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-gold selection:text-black font-montserrat overflow-x-hidden">
            <Navbar />

            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-[#020202] z-10" />

                    {/* Spectral Face Background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 grayscale contrast-[1.2] z-0"
                    >
                        <img
                            src="/images/bg_face_2.jpg"
                            alt=""
                            className="w-full h-full object-cover scale-[2.4] translate-x-[5%] rotate-90"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 max-w-7xl w-full pt-20"
                >
                    <Link href="/#projects" className="inline-flex items-center gap-3 text-white/20 hover:text-gold transition-all mb-12 group">
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" strokeWidth={1} size={16} />
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase">Return to Works</span>
                    </Link>

                    <h1 className="text-[clamp(3rem,10vw,8rem)] font-cinzel font-black mb-10 tracking-tighter leading-[0.95] uppercase py-2">
                        Frontend <br />
                        <span className="text-gold">Architecture</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6">
                        <div className="w-12 h-[1px] bg-gold/20" />
                        <p className="text-white/20 text-[9px] sm:text-[10px] tracking-[0.8em] uppercase font-bold">
                            Vol. 02 // Interface Logic
                        </p>
                        <div className="w-12 h-[1px] bg-gold/20" />
                    </div>
                </motion.div>
            </section>

            {/* Projects Grid */}
            <section className="py-32 px-6 md:px-16 max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Project Image */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 rounded-sm cursor-pointer border border-white/5">
                                <img
                                    src={project.image}
                                    className="w-full h-full object-cover object-top grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-out"
                                    alt={project.title}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />

                                {/* Tech Badge */}
                                <div className="absolute top-6 left-6 flex items-center gap-3">
                                    <Code2 size={12} className="text-gold/60" />
                                    <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/50">{project.tech}</span>
                                </div>

                                {/* Stats Badge */}
                                <div className="absolute bottom-6 right-6 bg-black/80 px-4 py-2 flex items-center gap-3">
                                    <span className="text-gold text-lg font-bold">{project.stats.score}</span>
                                    <span className="text-[8px] font-bold tracking-[0.2em] text-white/40 uppercase">{project.stats.metric}</span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                                    <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                        <ArrowUpRight size={24} className="text-gold" />
                                    </div>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="mt-10 space-y-5">
                                <div className="flex items-center gap-5">
                                    <span className="text-gold text-[9px] font-bold tracking-[0.4em] uppercase font-cinzel opacity-60">
                                        {project.category}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                </div>

                                <h3 className="text-[1.75rem] font-cinzel font-bold text-white tracking-tight leading-none">
                                    {project.title}
                                </h3>

                                <p className="text-gray-500 text-[11px] leading-relaxed max-w-lg font-light tracking-[0.02em] uppercase border-l border-white/5 pl-6">
                                    {project.description}
                                </p>

                                <div className="pt-4">
                                    <button className="group/btn flex items-center gap-4 text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 hover:text-white transition-all duration-500">
                                        View Case Study
                                        <div className="w-8 h-[1px] bg-white/10 transition-all group-hover/btn:w-16 group-hover/btn:bg-gold" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    className="absolute inset-0 grayscale z-0"
                >
                    <img
                        src="/images/bg_face_1.jpg"
                        alt=""
                        className="w-full h-full object-cover scale-[1.5] -rotate-12"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                </motion.div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-6 opacity-60">Technology</span>
                        <h2 className="text-[clamp(2rem,5vw,4rem)] font-cinzel font-bold text-white uppercase tracking-wider mb-6">
                            Modern <span className="text-white/20">Stack</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Layers, label: "Next.js 15", desc: "React Framework" },
                            { icon: Cpu, label: "TypeScript", desc: "Type Safety" },
                            { icon: Database, label: "Supabase", desc: "Backend" },
                            { icon: Code2, label: "TailwindCSS", desc: "Styling" },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group text-center p-8 border border-white/5 hover:border-gold/20 transition-all duration-500"
                            >
                                <tech.icon className="w-8 h-8 mx-auto mb-6 text-gold/40 group-hover:text-gold transition-colors" />
                                <div className="text-white font-bold mb-2">{tech.label}</div>
                                <div className="text-white/30 text-[10px] uppercase tracking-widest">{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-48 text-center bg-[#020202] relative overflow-hidden">
                {/* Spectral CTA Background */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    className="absolute inset-0 grayscale contrast-[1.2] z-0"
                >
                    <img
                        src="/images/bg_face_3.jpg"
                        alt=""
                        className="w-full h-full object-cover scale-[2.8] translate-x-[5%] rotate-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </motion.div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-12 opacity-60">Next Chapter</span>
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-cinzel font-bold text-white mb-16 leading-[1.1] uppercase">
                        Explore the <br /><span className="text-white/20">Cinematography.</span>
                    </h2>
                    <Link
                        href="/cinematography"
                        className="group relative inline-flex items-center gap-10 py-5 px-12 border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-700">View Showreel</span>
                        <ArrowUpRight size={16} className="relative z-10 text-white group-hover:text-black transition-all group-hover:rotate-45" />
                    </Link>
                </div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}
