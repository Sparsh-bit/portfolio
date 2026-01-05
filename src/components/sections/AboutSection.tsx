"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CinematicImage = ({ src }: { src: string }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent opacity-10 rounded-full blur-[80px]" />

            <div className="relative w-full aspect-[4/5] max-w-sm group overflow-hidden rounded-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                >
                    <img
                        src={src}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt="Cinematography Gear"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                </motion.div>

                {/* Industrial Framing */}
                <div className="absolute -inset-4 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/30" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30" />

                    <div className="absolute -top-8 left-0 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gold rounded-full" />
                        <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-gold/50">Core: Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

    return (
        <section ref={containerRef} id="about" className="min-h-screen w-full py-32 px-6 md:px-16 flex items-center justify-center bg-[#020202] relative overflow-hidden">

            {/* Spectral Background Portrait */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.2] grayscale contrast-[1.2]"
            >
                <img
                    src="/images/bg_portrait_vertical.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-[1.3] translate-x-[5%] -rotate-90"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#020202] via-transparent to-[#020202]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]" />
            </motion.div>

            <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gold/[0.03] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl w-full grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">
                <motion.div
                    style={{ y }}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-gold tracking-[0.5em] text-[10px] font-bold uppercase block mb-8 flex items-center gap-3">
                        <div className="w-10 h-[1px] bg-gold/50" /> Bio // 01
                    </span>
                    <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-cinzel font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase py-1">
                        <span className="block">Visual</span>
                        <span className="text-white/40 block">Architect</span>
                    </h2>

                    <div className="space-y-10 max-w-lg">
                        <p className="text-[clamp(1rem,1.5vw,1.3rem)] text-white/90 leading-relaxed font-light tracking-wide">
                            I'm <span className="text-gold font-bold italic">Sparsh Sharma</span>, a multi-disciplinary UI/UX Designer
                            and Cinematographer at the intersection of aesthetic emotion and technical precision.
                        </p>
                        <p className="text-white/40 text-[12px] leading-loose tracking-[0.2em] font-black uppercase border-l-2 border-gold/40 pl-8">
                            Whether behind the lens or crafting digital interfaces, I build narratives that transcend
                            the medium through light, motion, and intentional design.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center"
                >
                    <CinematicImage src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200" />
                </motion.div>
            </div>

            <div className="absolute right-10 bottom-10 opacity-[0.08] pointer-events-none select-none hidden lg:block">
                <span className="text-[10rem] font-cinzel font-black text-white leading-none">01</span>
            </div>
        </section>
    );
}
