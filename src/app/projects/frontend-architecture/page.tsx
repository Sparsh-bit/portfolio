"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import ThreeDCarousel from "@/components/ThreeDCarousel";

export default function FrontendArchitecture() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-gold selection:text-black font-montserrat overflow-x-hidden">
            <Navbar />

            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Spectral Face Background */}
                    <div className="absolute inset-0 grayscale contrast-[1.2] opacity-[0.2] z-0 pointer-events-none">
                        <img
                            src="/images/bg_face_2.jpg"
                            alt=""
                            className="w-full h-full object-cover scale-[2.4] translate-x-[5%] rotate-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-[#020202]" />
                    </div>
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

            {/* 3D Carousel Section */}
            <div className="pb-40 relative z-30">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase block">Interactive Gallery</span>
                    <h3 className="text-[2rem] font-cinzel font-bold text-white uppercase tracking-wider">Project Archive</h3>
                </div>

                <ThreeDCarousel
                    items={[
                        {
                            src: "/images/projects/petro-login.png",
                            title: "Secure Auth Gateway",
                            desc: "Enterprise-grade authentication system with advanced security protocols and seamless user onboarding."
                        },
                        {
                            src: "/images/projects/petro-dashboard.png",
                            title: "PetroLedger Analytics",
                            desc: "Real-time visualization of fuel logistics, revenue metrics, and inventory data."
                        },
                        {
                            src: "/images/projects/magh-mela-hero.png",
                            title: "Magh Mela Experience",
                            desc: "A digital heritage platform capturing the spiritual essence of the world's largest gathering."
                        },
                        {
                            src: "/images/projects/portfolio-hero.png",
                            title: "Immersive 3D Portfolio",
                            desc: "WebGL-powered personal brand experience featuring physics-based interactions and cinematic lighting."
                        },
                        {
                            src: "/images/projects/petro-signup.png",
                            title: "Onboarding Flow",
                            desc: "Frictionless multi-step registration process designed for high conversion and user clarity."
                        }
                    ]}
                />
            </div>

            {/* Bottom Navigation */}
            <section className="py-48 text-center bg-[#050505] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-12 opacity-60">Next Chapter</span>
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-cinzel font-bold text-white mb-16 leading-[1.1] uppercase">Explore the <br /><span className="text-white/20">Cinematography.</span></h2>
                    <Link
                        href="/cinematography"
                        className="group relative inline-flex items-center gap-10 py-5 px-12 border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-700">View Showreel</span>
                        <ArrowUpRight size={16} className="relative z-10 text-white group-hover:text-black transition-all group-hover:rotate-45" />
                    </Link>
                </div>

                {/* Background Eyes Motif */}
                <div className="absolute inset-0 opacity-[0.1] grayscale pointer-events-none select-none">
                    <img src="/images/bg_eyes.png" alt="" className="w-full h-full object-cover -rotate-90 scale-150" />
                </div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}
