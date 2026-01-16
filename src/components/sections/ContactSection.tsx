"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/Sparsh-bit",
        handle: "@Sparsh-bit",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/sparsh-sharma-356761289/",
        handle: "Sparsh Sharma",
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: "https://www.instagram.com/cinemafades.official/?igsh=NmM1ejc2ZTduMGw5#",
        handle: "@cinemafades.official",
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="min-h-screen w-full py-32 px-6 md:px-16 flex items-center justify-center bg-[#020202] relative overflow-hidden">

            {/* Correspondence Background */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                viewport={{ once: true }}
                className="absolute inset-0 z-0 pointer-events-none grayscale contrast-[1.2]"
            >
                <img
                    src="/images/bg_face_1.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-[2.4] translate-x-[5%] rotate-90 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
            </motion.div>

            <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gold/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-gold tracking-[0.5em] text-[10px] font-bold uppercase block mb-8 flex items-center gap-3">
                            <div className="w-10 h-[1px] bg-gold/50" /> Correspondence // 04
                        </span>
                        <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-cinzel font-black text-white mb-12 leading-[0.95] tracking-tighter uppercase py-1">
                            Connect <br />
                            <span className="text-white/40">Now</span>
                        </h2>

                        <p className="text-gray-400 text-[clamp(0.9rem,1.2vw,1.1rem)] max-w-sm tracking-[0.05em] font-light leading-relaxed mb-12 uppercase border-l border-white/5 pl-6">
                            Open for creative commissions and technical collaborations.
                        </p>

                        <div className="space-y-10 mb-16">
                            <div className="group flex items-center gap-6 text-white hover:text-gold transition-all duration-500 cursor-pointer">
                                <div className="p-4 bg-white/5 rounded-full group-hover:bg-gold/10 transition-all duration-500 group-hover:scale-105">
                                    <Mail strokeWidth={1} size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gold mb-2">Direct Mail</p>
                                    <div className="relative h-10 flex items-center">
                                        <p className="text-2xl md:text-3xl font-cinzel font-black tracking-tight group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-500 whitespace-nowrap">REVEAL ADDRESS</p>
                                        <a
                                            href="mailto:sparsh42005@gmail.com"
                                            className="absolute inset-0 text-[clamp(1rem,3vw,1.4rem)] font-mono font-bold tracking-tight text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 flex items-center whitespace-nowrap"
                                        >
                                            sparsh42005@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/resume"
                                className="group flex items-center gap-6 text-white hover:text-gold transition-all duration-500 cursor-pointer"
                            >
                                <div className="p-4 bg-white/5 rounded-full group-hover:bg-gold/10 transition-all duration-500 group-hover:scale-105">
                                    <ArrowRight strokeWidth={1} size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gold mb-2">AI Resume</p>
                                    <div className="relative h-10 flex items-center">
                                        <p className="text-2xl md:text-3xl font-cinzel font-black tracking-tight group-hover:text-gold transition-all duration-500 whitespace-nowrap uppercase">View Resume</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex items-center gap-6 text-white">
                                <div className="p-4 bg-white/5 rounded-full">
                                    <MapPin strokeWidth={1} size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 mb-1">Residence</p>
                                    <p className="text-xl md:text-2xl font-cinzel tracking-tight uppercase">Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col"
                    >
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black tracking-[0.8em] uppercase text-gold/60 mb-10 pl-6 border-l-2 border-gold/40">Social Network</h3>
                            <div className="grid gap-8">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative flex items-center justify-between p-10 border border-white/10 hover:border-gold/30 transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03] rounded-sm overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gold/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700 font-black" />
                                            <div className="flex items-center gap-10 relative z-10">
                                                <Icon strokeWidth={1} size={32} className="text-white/40 group-hover:text-gold transition-all duration-700 group-hover:rotate-6 group-hover:scale-110" />
                                                <div>
                                                    <h4 className="text-2xl font-cinzel font-black text-white uppercase tracking-wider group-hover:tracking-widest transition-all duration-700">{link.name}</h4>
                                                    <p className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30 transition-all group-hover:text-gold/80">{link.handle}</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="text-white/10 group-hover:text-gold group-hover:translate-x-3 transition-all duration-700 relative z-10" strokeWidth={1} size={28} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="mt-40 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                    <p className="text-[10px] font-black tracking-[0.6em] uppercase">© 2025 Sparsh Sharma</p>
                    <div className="flex gap-12">
                        <span className="text-[10px] font-black tracking-[0.6em] uppercase hover:text-gold transition-colors cursor-pointer">Privacy</span>
                        <span className="text-[10px] font-black tracking-[0.6em] uppercase hover:text-gold transition-colors cursor-pointer">Terms</span>
                    </div>
                </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
                <span className="text-[20rem] font-black font-cinzel text-white leading-none tracking-tighter">04</span>
            </div>
        </section>
    );
}
