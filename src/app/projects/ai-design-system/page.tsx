"use client";

import { motion, useSpring } from "framer-motion";
import { ChevronLeft, ArrowUpRight, Code2, Palette, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";

const Interactive3DScene = () => {
    const springX = useSpring(0, { stiffness: 50, damping: 25 });
    const springY = useSpring(0, { stiffness: 50, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;
            springX.set(x * 20);
            springY.set(y * 20);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [springX, springY]);

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            className="relative w-full h-[65vh] md:h-[88vh] flex items-center justify-center z-10"
        >
            {/* Figma-inspired Background Glows */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-[100px] rounded-full scale-110 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-purple-500/5 via-transparent to-cyan-500/5 opacity-60 blur-[60px] rounded-full" />

            <div className="relative w-full h-full max-w-[700px] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Premium 3D AI Composition */}
                    <div className="relative w-full h-full">

                        {/* Central Neural Network Sphere */}
                        <motion.div
                            animate={{
                                rotateY: 360,
                                rotateX: [0, 10, 0, -10, 0]
                            }}
                            transition={{
                                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                                rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                        >
                            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full border border-blue-500/30 backdrop-blur-sm shadow-2xl" />
                            {/* Neural Network Nodes */}
                            <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-2">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className="w-3 h-3 bg-blue-400/60 rounded-full"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating Geometric Elements */}
                        <motion.div
                            animate={{
                                rotateX: 360,
                                rotateY: 180,
                                x: [0, 20, 0, -20, 0],
                                y: [0, -15, 0, 15, 0]
                            }}
                            transition={{
                                rotateX: { duration: 15, repeat: Infinity, ease: "linear" },
                                rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
                                x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-cyan-400/40 transform-gpu"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rotate-45" />
                            <div className="absolute inset-2 border border-cyan-400/20 rotate-12" />
                        </motion.div>

                        <motion.div
                            animate={{
                                rotateZ: 360,
                                scale: [1, 1.1, 1],
                                x: [0, -25, 0, 25, 0]
                            }}
                            transition={{
                                rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-lg border border-purple-500/30 shadow-lg"
                        >
                            <div className="absolute inset-1 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-md" />
                        </motion.div>

                        {/* Wireframe Data Flow */}
                        <motion.div
                            animate={{
                                rotateX: 360,
                                rotateY: 360,
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{
                                rotateX: { duration: 25, repeat: Infinity, ease: "linear" },
                                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute top-1/3 right-1/3 w-24 h-24 border border-blue-400/30 transform-gpu"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-2 border border-blue-400/20 rotate-x-45 rotate-y-45" />
                            <div className="absolute inset-4 border border-cyan-400/20 rotate-x-90" />
                        </motion.div>

                        {/* Floating Data Particles */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: [0, Math.random() * 100 - 50, 0],
                                    y: [0, Math.random() * 100 - 50, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeInOut"
                                }}
                                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`
                                }}
                            />
                        ))}

                        {/* Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            <motion.path
                                d="M20,50 Q50,20 80,50 Q50,80 20,50"
                                stroke="rgba(59, 130, 246, 0.2)"
                                strokeWidth="0.5"
                                fill="none"
                                animate={{ pathLength: [0, 1, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M30,30 L70,30 L70,70 L30,70 Z"
                                stroke="rgba(139, 92, 246, 0.2)"
                                strokeWidth="0.5"
                                fill="none"
                                animate={{ pathLength: [0, 1, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                        </svg>
                    </div>

                    {/* Figma-style Subtle Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent pointer-events-none" />
                </motion.div>

                {/* Professional Framing */}
                <div className="absolute -inset-12 border border-white/[0.06] rounded-lg pointer-events-none hidden xl:block" />
                <div className="absolute -inset-16 border border-white/[0.03] rounded-lg pointer-events-none hidden xl:block" />
            </div>
        </motion.div>
    );
};

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
                        View Live Demo
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
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/40">AI System</span>
                </div>
            </motion.div>
        </div>
    </section>
);

export default function AIDesignSystem() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-gold selection:text-black font-montserrat overflow-x-hidden">
            <Navbar />

            {/* Premium Hero */}
            <section className="relative h-screen w-full bg-[#020202] overflow-hidden flex items-center justify-center px-6 md:px-16 lg:px-24">

                {/* Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.2] grayscale contrast-[1.2]">
                    <img
                        src="/images/bg_face_1.jpg"
                        alt=""
                        className="w-full h-full object-cover translate-x-[5%] rotate-90 scale-[1.35]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
                </div>

                {/* Atmosphere Overlays */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none z-10" />

                <div className="max-w-[1700px] w-full grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-24 items-center relative z-20">
                    {/* Left Column: Typography */}
                    <div className="flex flex-col justify-center text-left order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-blue-400 tracking-[0.6em] text-[11px] font-bold uppercase block mb-8 flex items-center gap-5">
                                <div className="w-14 h-[1px] bg-blue-400/60" /> AI & Machine Learning
                            </span>

                            <h1 className="text-[clamp(4rem,11vw,9rem)] font-cinzel font-black text-white leading-[0.82] tracking-tighter uppercase mb-12 flex flex-col items-start select-none">
                                <motion.span
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 1 }}
                                    className="block drop-shadow-[0_25px_60px_rgba(255,255,255,0.15)]"
                                >
                                    AI DESIGN
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="text-blue-400"
                                >
                                    SYSTEM
                                </motion.span>
                            </h1>

                            <div className="space-y-6 mb-16 border-l-2 border-blue-400/20 pl-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase block">Neural Networks // Smart Design</span>
                                    <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase block">Adaptive Interfaces // AI Logic</span>
                                </div>
                                <p className="text-[12px] text-white/50 tracking-[0.2em] uppercase max-w-xs font-bold leading-relaxed">
                                    Engineering intelligent design systems with machine learning precision and human-centered innovation.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-12 items-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/#projects"
                                        className="group relative inline-flex items-center gap-8 py-6 px-14 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-400/60 text-white transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <span className="relative text-[11px] font-black tracking-[0.45em] uppercase transition-colors duration-500 group-hover:text-white">Explore AI Work</span>
                                        <ArrowUpRight size={18} className="relative z-10 transition-all group-hover:rotate-45" strokeWidth={3} />
                                    </Link>
                                </motion.div>

                                <Link
                                    href="/projects/motion-graphics-engine"
                                    className="text-[11px] font-bold tracking-[0.6em] uppercase text-white/60 hover:text-blue-400 transition-all duration-500 flex items-center gap-5 group"
                                >
                                    Motion Engine
                                    <div className="h-[1px] w-12 bg-white/20 group-hover:w-24 group-hover:bg-blue-400 transition-all duration-700" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: AI 3D Scene */}
                    <div className="order-1 lg:order-2 flex justify-center items-center relative">
                        <Interactive3DScene />

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-blue-400/20 pointer-events-none hidden xl:block" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-purple-400/20 pointer-events-none hidden xl:block" />
                    </div>
                </div>

                {/* Side Metadata */}
                <div className="absolute top-1/2 right-14 -translate-y-1/2 hidden xl:flex flex-col gap-16 opacity-40">
                    <span className="[writing-mode:vertical-lr] text-[10px] font-black tracking-[1.2em] uppercase text-white pointer-events-none select-none">AI/ML // 2025 — INTELLIGENT DESIGN</span>
                    <div className="w-[1px] h-40 bg-gradient-to-b from-blue-400/60 to-transparent" />
                </div>
            </section>

            {/* Case Studies */}
            <div className="pb-40">
                <CaseStudy
                    title="Neural Component Generator"
                    subtitle="AI-Powered Development"
                    description="Automated component generation using machine learning algorithms to create accessible, performant UI components with intelligent design decisions."
                    imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
                    tech={["Machine Learning", "React", "TypeScript", "Accessibility"]}
                />

                <CaseStudy
                    title="Adaptive Design Tokens"
                    subtitle="Dynamic Styling System"
                    description="Self-evolving design token system that adapts to user preferences, accessibility needs, and contextual requirements in real-time."
                    imageSrc="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=2000"
                    tech={["CSS Variables", "JavaScript", "AI Algorithms"]}
                />
            </div>

            {/* Bottom Navigation */}
            <section className="py-48 text-center bg-[#050505] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-12 opacity-60">Next Innovation</span>
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-cinzel font-bold text-white mb-16 leading-[1.1] uppercase">Explore Motion <br /><span className="text-white/20">Graphics Engine.</span></h2>
                    <Link
                        href="/projects/motion-graphics-engine"
                        className="group relative inline-flex items-center gap-10 py-5 px-12 border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-700">View Engine</span>
                        <ArrowUpRight size={16} className="relative z-10 text-white group-hover:text-black transition-all group-hover:rotate-45" />
                    </Link>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.1] grayscale pointer-events-none select-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
                </div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}