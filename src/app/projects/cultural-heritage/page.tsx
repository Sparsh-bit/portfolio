"use client";

import { motion, useSpring } from "framer-motion";
import { ChevronLeft, ArrowUpRight, Globe, BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";

const CaseStudy = ({ title, subtitle, description, imageSrc, tech, link }: any) => (
    <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-10"
            >
                <div className="space-y-4">
                    <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase block">{subtitle}</span>
                    <h2 className="text-[clamp(2rem,5vw,4rem)] font-cinzel font-black text-white leading-[0.9] uppercase">{title}</h2>
                </div>

                <p className="text-white/40 text-sm leading-loose tracking-widest uppercase border-l-2 border-gold/40 pl-8">
                    {description}
                </p>

                <div className="flex flex-wrap gap-8">
                    {tech.map((t: string) => (
                        <div key={t} className="flex items-center gap-3 text-white/20 text-[9px] font-bold tracking-[0.4em] uppercase">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                            {t}
                        </div>
                    ))}
                </div>

                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase text-gold hover:text-white transition-all duration-500 group"
                    >
                        View Live Experience
                        <div className="w-6 h-[1px] bg-gold group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                    </a>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative aspect-video bg-zinc-950 rounded-sm overflow-hidden border border-white/10 shadow-2xl group"
            >
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[2s] ease-out scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-8 left-8 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/40">Cultural Tech</span>
                </div>
            </motion.div>
        </div>
    </section>
);

const InteractiveMotionScene = () => {
    const springX = useSpring(0, { stiffness: 60, damping: 30 });
    const springY = useSpring(0, { stiffness: 60, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;
            springX.set(x * 25);
            springY.set(y * 25);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [springX, springY]);

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            className="relative w-full h-[65vh] md:h-[88vh] flex items-center justify-center z-10"
        >
            {/* Figma-inspired Cultural Heritage Glows */}
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/15 via-transparent to-transparent blur-[120px] rounded-full scale-110 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-teal-500/8 via-transparent to-green-500/8 opacity-70 blur-[80px] rounded-full" />

            <div className="relative w-full h-full max-w-[750px] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Advanced Cultural Heritage Composition */}
                    <div className="relative w-full h-full">

                        {/* Central Heritage Core */}
                        <motion.div
                            animate={{
                                rotateY: 360,
                                rotateX: [0, 15, 0, -15, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                rotateY: { duration: 16, repeat: Infinity, ease: "linear" },
                                rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56"
                        >
                            <div className="w-full h-full bg-gradient-to-br from-emerald-500/25 to-teal-500/15 rounded-full border-2 border-emerald-400/40 backdrop-blur-sm shadow-2xl" />
                            {/* Animated Heritage Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border-2 border-teal-400/30 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-6 border border-green-400/40 rounded-full"
                            />
                        </motion.div>

                        {/* Floating Cultural Elements */}
                        <motion.div
                            animate={{
                                rotateX: 360,
                                rotateY: 180,
                                x: [0, 30, 0, -30, 0],
                                y: [0, -20, 0, 20, 0],
                                rotateZ: [0, 45, 0, -45, 0]
                            }}
                            transition={{
                                rotateX: { duration: 12, repeat: Infinity, ease: "linear" },
                                rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                                x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                rotateZ: { duration: 14, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/4 left-1/4 w-24 h-24 border-3 border-teal-400/50 transform-gpu"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-transparent rotate-45" />
                            <div className="absolute inset-2 border-2 border-teal-400/25 rotate-12" />
                            <div className="absolute inset-4 bg-gradient-to-tl from-teal-500/10 to-transparent rotate-90" />
                        </motion.div>

                        <motion.div
                            animate={{
                                rotateZ: 360,
                                scale: [1, 1.2, 1],
                                x: [0, -35, 0, 35, 0],
                                borderRadius: ["0%", "50%", "0%"]
                            }}
                            transition={{
                                rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                                borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute bottom-1/4 right-1/4 w-18 h-18 bg-gradient-to-br from-green-500/25 to-emerald-500/15 border-2 border-green-400/40 shadow-xl"
                        >
                            <div className="absolute inset-1 bg-gradient-to-tl from-emerald-500/15 to-transparent rounded-sm" />
                        </motion.div>

                        {/* Complex Preservation Structures */}
                        <motion.div
                            animate={{
                                rotateX: 360,
                                rotateY: 360,
                                rotateZ: [0, 180, 360],
                                opacity: [0.4, 0.9, 0.4]
                            }}
                            transition={{
                                rotateX: { duration: 22, repeat: Infinity, ease: "linear" },
                                rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
                                rotateZ: { duration: 28, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/3 right-1/3 w-28 h-28 border-2 border-emerald-400/35 transform-gpu"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-2 border border-emerald-400/25 rotate-x-45 rotate-y-45" />
                            <div className="absolute inset-4 border border-teal-400/25 rotate-x-90" />
                            <div className="absolute inset-6 border border-green-400/25 rotate-y-90" />
                        </motion.div>

                        {/* Animated Heritage Particles */}
                        {Array.from({ length: 16 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: [0, (Math.random() - 0.5) * 120, 0],
                                    y: [0, (Math.random() - 0.5) * 120, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.5, 0.5]
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                className="absolute w-2 h-2 bg-gradient-to-r from-teal-400/50 to-emerald-400/50 rounded-full blur-sm"
                                style={{
                                    left: `${25 + Math.random() * 50}%`,
                                    top: `${25 + Math.random() * 50}%`
                                }}
                            />
                        ))}

                        {/* Dynamic Cultural Paths */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            <motion.path
                                d="M15,50 Q35,25 50,50 T85,50"
                                stroke="rgba(16, 185, 129, 0.3)"
                                strokeWidth="1"
                                fill="none"
                                animate={{ pathLength: [0, 1, 0], opacity: [0.2, 0.6, 0.2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M25,25 L50,25 L50,75 L25,75 Z"
                                stroke="rgba(20, 184, 166, 0.3)"
                                strokeWidth="1"
                                fill="none"
                                animate={{ pathLength: [0, 1, 0], opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="8"
                                stroke="rgba(34, 197, 94, 0.4)"
                                strokeWidth="1"
                                fill="none"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Morphing Heritage Shapes */}
                        <motion.div
                            animate={{
                                borderRadius: ["0%", "50%", "25%", "0%"],
                                rotate: [0, 90, 180, 270, 360],
                                scale: [1, 1.1, 0.9, 1]
                            }}
                            transition={{
                                borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 16, repeat: Infinity, ease: "linear" },
                                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/6 left-1/6 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30"
                        />
                    </div>

                    {/* Professional Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#020202] via-[#020202]/70 to-transparent pointer-events-none" />
                </motion.div>

                {/* Premium Framing */}
                <div className="absolute -inset-14 border border-white/[0.05] rounded-xl pointer-events-none hidden xl:block" />
                <div className="absolute -inset-18 border border-white/[0.02] rounded-xl pointer-events-none hidden xl:block" />
                <div className="absolute -inset-22 border border-emerald-400/[0.03] rounded-xl pointer-events-none hidden xl:block" />
            </div>
        </motion.div>
    );
};

export default function CulturalHeritage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-gold selection:text-black font-montserrat overflow-x-hidden">
            <Navbar />

            {/* Premium Hero */}
            <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
                <InteractiveMotionScene />

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
                        Cultural Heritage <br />
                        <span className="text-gold">Platform</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6">
                        <div className="w-12 h-[1px] bg-gold/20" />
                        <p className="text-white/20 text-[9px] sm:text-[10px] tracking-[0.8em] uppercase font-bold">
                            Vol. 05 // Digital Preservation
                        </p>
                        <div className="w-12 h-[1px] bg-gold/20" />
                    </div>
                </motion.div>
            </section>

            {/* Case Studies */}
            <div className="pb-40">
                <CaseStudy
                    title="Interactive Cultural Archive"
                    subtitle="Digital Heritage Preservation"
                    description="Immersive platform for exploring traditional art forms, featuring 3D reconstructions, audio narratives, and interactive storytelling experiences."
                    imageSrc="https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&q=80&w=2000"
                    tech={["WebGL", "Three.js", "Audio Processing", "Cultural Data"]}
                />

                <CaseStudy
                    title="Narrative Experience Engine"
                    subtitle="Storytelling Through Technology"
                    description="Advanced storytelling system that combines traditional narratives with modern interactive experiences, preserving cultural wisdom for future generations."
                    imageSrc="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
                    tech={["React", "Animation Libraries", "Cultural Research", "UX Design"]}
                />
            </div>

            {/* Bottom Navigation */}
            <section className="py-48 text-center bg-[#050505] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-12 opacity-60">Complete Portfolio</span>
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-cinzel font-bold text-white mb-16 leading-[1.1] uppercase">Return to <br /><span className="text-white/20">Main Portfolio.</span></h2>
                    <Link
                        href="/#projects"
                        className="group relative inline-flex items-center gap-10 py-5 px-12 border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-700">View All Works</span>
                        <ArrowUpRight size={16} className="relative z-10 text-white group-hover:text-black transition-all group-hover:rotate-45" />
                    </Link>
                </div>

                {/* Background Heritage Motif */}
                <div className="absolute inset-0 opacity-[0.1] grayscale pointer-events-none select-none">
                    <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-gold/5" />
                </div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}