"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CursorRobot from "@/components/ui/CursorRobot";

/**
 * Floating Particles Component
 */
const FloatingParticles = () => {
    const [particles, setParticles] = useState<Array<{ x: number, y: number, scale: number, delay: number, duration: number }>>([]);

    useEffect(() => {
        // Generate particles only on client
        setParticles([...Array(15)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
        })));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold/40 rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        scale: p.scale,
                    }}
                    animate={{
                        y: [0, -500],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

/**
 * Animated Geometric Shapes
 */
const GeometricShapes = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Rotating Ring */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-64 h-64"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-full h-full rounded-full border border-gold/10" />
            </motion.div>

            {/* Pulsing Circle */}
            <motion.div
                className="absolute bottom-1/3 right-1/3 w-40 h-40"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-gold/20 to-transparent blur-xl" />
            </motion.div>

            {/* Floating Squares */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border border-gold/10"
                    style={{
                        width: 20 + i * 15,
                        height: 20 + i * 15,
                        top: `${20 + i * 15}%`,
                        right: `${10 + i * 10}%`,
                    }}
                    animate={{
                        rotate: [0, 90, 180, 270, 360],
                        y: [0, -20, 0, 20, 0],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}

            {/* Animated Lines */}
            <svg className="absolute top-0 right-0 w-full h-full opacity-20">
                <motion.line
                    x1="70%"
                    y1="10%"
                    x2="90%"
                    y2="40%"
                    stroke="url(#goldGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.line
                    x1="80%"
                    y1="60%"
                    x2="95%"
                    y2="80%"
                    stroke="url(#goldGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
                        <stop offset="50%" stopColor="#C9A227" stopOpacity="1" />
                        <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

/**
 * Magnetic Button Component for Premium Interactivity
 */
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const btnRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = btnRef.current?.getBoundingClientRect();
        if (rect) {
            const x = clientX - (rect.left + rect.width / 2);
            const y = clientY - (rect.top + rect.height / 2);
            setPosition({ x: x * 0.35, y: y * 0.35 });
        }
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={btnRef}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * Enhanced Interactive Video with Motion Graphics
 */
const InteractiveVideo = () => {
    const springX = useSpring(0, { stiffness: 40, damping: 20 });
    const springY = useSpring(0, { stiffness: 40, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;
            springX.set(x * 15);
            springY.set(y * 15);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [springX, springY]);

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            className="relative w-full h-[65vh] md:h-[88vh] flex items-center justify-center z-10"
        >
            {/* Cinematic Background Glows */}
            <div className="absolute inset-0 bg-gold/10 blur-[140px] rounded-full scale-110 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-gold/20 via-transparent to-transparent opacity-50 blur-[100px] rounded-full" />

            <div className="relative w-full h-full max-w-[650px] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* 3D Interactive Robot - cursor following */}
                    <CursorRobot className="w-full h-full" />
                    {/* Seamless Bottom Blend */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent pointer-events-none" />
                </motion.div>

                {/* Technical Framing */}
                <div className="absolute -inset-10 border border-white/[0.08] rounded-sm pointer-events-none hidden xl:block" />
            </div>
        </motion.div>
    );
};

const BackgroundFace = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -150]);
    const scale = useTransform(scrollY, [0, 1000], [1.5, 1.7]);

    return (
        <motion.div
            style={{ y, scale }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.2] grayscale contrast-[1.2]"
        >
            <img
                src="/images/bg_face_1.jpg"
                alt=""
                className="w-full h-full object-cover translate-x-[5%] rotate-90 scale-[1.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
        </motion.div>
    );
};

export default function Hero3D() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-[#020202] overflow-hidden flex items-center justify-center px-6 md:px-16 lg:px-24">

            <BackgroundFace />

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Geometric Motion Graphics */}
            <GeometricShapes />

            {/* Atmosphere Overlays */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none z-10" />

            <motion.div
                style={{ opacity: contentOpacity, y: textY }}
                className="max-w-[1700px] w-full grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-24 items-center relative z-20"
            >
                {/* Left Column: Typography */}
                <div className="flex flex-col justify-center text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-gold tracking-[0.6em] text-[11px] font-bold uppercase block mb-8 flex items-center gap-5">
                            <div className="w-14 h-[1px] bg-gold/60" /> Designer & Cinematographer
                        </span>

                        <h1 className="text-[clamp(4rem,11vw,9rem)] font-cinzel font-black text-white leading-[0.82] tracking-tighter uppercase mb-12 flex flex-col items-start select-none">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                                className="block drop-shadow-[0_25px_60px_rgba(255,255,255,0.15)]"
                            >
                                SPARSH
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-gold"
                            >
                                SHARMA
                            </motion.span>
                        </h1>

                        <div className="space-y-6 mb-16 border-l-2 border-gold/20 pl-8">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black tracking-[0.5em] text-gold uppercase block">System // Architect</span>
                                <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase block">Module // Visual Logic</span>
                            </div>
                            <p className="text-[12px] text-white/50 tracking-[0.2em] uppercase max-w-xs font-bold leading-relaxed">
                                Engineering high-performance digital systems with cinematic precision.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-12 items-center">
                            <MagneticButton>
                                <Link
                                    href="/#projects"
                                    className="group relative inline-flex items-center gap-8 py-6 px-14 bg-white text-black transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative text-[11px] font-black tracking-[0.45em] uppercase transition-colors duration-500 group-hover:text-black">Explore Work</span>
                                    <ArrowUpRight size={18} className="relative z-10 transition-all group-hover:rotate-45" strokeWidth={3} />
                                </Link>
                            </MagneticButton>

                            <Link
                                href="/cinematography"
                                className="text-[11px] font-bold tracking-[0.6em] uppercase text-white/60 hover:text-gold transition-all duration-500 flex items-center gap-5 group"
                            >
                                Showreel
                                <div className="h-[1px] w-12 bg-white/20 group-hover:w-24 group-hover:bg-gold transition-all duration-700" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Holographic Avatar Video */}
                <div className="order-1 lg:order-2 flex justify-center items-center relative w-full h-[60vh] md:h-[80vh]">
                    <CursorRobot
                        className="w-full h-full"
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gold/20 pointer-events-none hidden xl:block" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-gold/20 pointer-events-none hidden xl:block" />
                </div>
            </motion.div>

            {/* Animated Tech Lines on Right Side */}
            <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none hidden lg:block overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                        style={{
                            top: `${10 + i * 12}%`,
                            left: "20%",
                            width: "60%",
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Side Metadata */}
            <div className="absolute top-1/2 right-14 -translate-y-1/2 hidden xl:flex flex-col gap-16 opacity-40">
                <span className="[writing-mode:vertical-lr] text-[10px] font-black tracking-[1.2em] uppercase text-white pointer-events-none select-none">38.8977° N, 77.0365° W — EST. 2025</span>
                <div className="w-[1px] h-40 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
        </section>
    );
}
