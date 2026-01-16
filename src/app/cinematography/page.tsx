"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, X, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";

const videos = [
    {
        id: 1,
        title: "Parampara",
        category: "Short Film",
        duration: "1:18",
        url: "https://drive.google.com/file/d/1V6Zabah4h0_BlnXaMVxs0jotmkkQ2qak/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1600",
        description: "An exploration of cultural heritage and visual lineage in modern storytelling."
    },
    {
        id: 2,
        title: "Chaar Dham",
        category: "Cinematic Landscape",
        duration: "0:44",
        url: "https://drive.google.com/file/d/1pIkAZ8xrfg8nGX2nryWmuXdQSf-nvIBa/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
        description: "A spiritual journey captured through epic vistas and intentional stillness."
    },
    {
        id: 3,
        title: "TED-X GLAU",
        category: "Motion Graphics",
        duration: "0:44",
        url: "https://drive.google.com/file/d/17nWYz85o3Nn3fekNf3v_JHGustd377iD/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
        description: "Dynamic visual identity and title sequence for the prestigious global talk series."
    },
    {
        id: 4,
        title: "Vrindavan Charodaya",
        category: "Documentary",
        duration: "1:22",
        url: "https://drive.google.com/file/d/1qGT_I9WyF-jI0TOxYf93peL50-LuArJJ/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1600",
        description: "Uncovering the architectural rhythm and devotional energy of sacred temples."
    },
];

export default function CinematographyPage() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleVideoClick = (url: string) => {
        if (url.startsWith("http")) {
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            setSelectedVideo(url);
            setVideoError(false);
        }
    };

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

                    <motion.div
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.2 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover grayscale"
                            alt="Cinematography setup"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 max-w-7xl w-full pt-20"
                >
                    <Link href="/" className="inline-flex items-center gap-3 text-white/20 hover:text-gold transition-all mb-12 group">
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" strokeWidth={1} size={16} />
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase">Return</span>
                    </Link>

                    <h1 className="text-[clamp(3rem,10vw,8rem)] font-cinzel font-black mb-10 tracking-tighter leading-[0.95] uppercase py-2">
                        Cinema <br />
                        <span className="text-gold">Fades</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6">
                        <div className="w-12 h-[1px] bg-gold/20" />
                        <p className="text-white/20 text-[9px] sm:text-[10px] tracking-[0.8em] uppercase font-bold">
                            Vol. 01 // Archive
                        </p>
                        <div className="w-12 h-[1px] bg-gold/20" />
                    </div>
                </motion.div>
            </section>

            {/* Video Grid Collection */}
            <section className="py-32 px-6 md:px-16 max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                        >
                            <div
                                className="relative aspect-[16/9] overflow-hidden bg-zinc-950 rounded-sm cursor-pointer border border-white/5"
                                onClick={() => handleVideoClick(video.url)}
                            >
                                <img
                                    src={video.thumbnail}
                                    className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-out"
                                    alt={video.title}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-40" />

                                <div className="absolute top-6 left-6 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-600/60" />
                                    <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/50">4K Master</span>
                                </div>

                                <div className="absolute bottom-6 right-6 bg-black/80 px-4 py-1.5 text-[9px] font-bold tracking-[0.3em] text-white/60">
                                    {video.duration}
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                                    <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                        <Play fill="#D4AF37" size={24} className="text-gold ml-0.5" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 space-y-5">
                                <div className="flex items-center gap-5">
                                    <span className="text-gold text-[9px] font-bold tracking-[0.4em] uppercase font-cinzel opacity-60">
                                        {video.category}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                </div>
                                <h3 className="text-[1.75rem] font-cinzel font-bold text-white tracking-tight leading-none">
                                    {video.title}
                                </h3>
                                <p className="text-gray-500 text-[11px] leading-relaxed max-w-lg font-light tracking-[0.02em] uppercase border-l border-white/5 pl-6">
                                    {video.description}
                                </p>
                                <div className="pt-4">
                                    <button
                                        onClick={() => handleVideoClick(video.url)}
                                        className="group/btn flex items-center gap-4 text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 hover:text-white transition-all duration-500"
                                    >
                                        Watch Production
                                        <div className="w-8 h-[1px] bg-white/10 transition-all group-hover/btn:w-16 group-hover/btn:bg-gold" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-6 lg:p-24"
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 lg:top-12 lg:right-12 text-white/10 hover:text-white transition-all z-[110] p-4"
                        >
                            <X size={40} strokeWidth={1} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-[1600px] aspect-video bg-black rounded-sm overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)] ring-1 ring-white/5"
                        >
                            {!videoError ? (
                                <video
                                    src={selectedVideo}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                    onError={() => setVideoError(true)}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-8 text-center p-12 bg-zinc-950">
                                    <AlertCircle size={60} className="text-red-500/10" strokeWidth={1} />
                                    <h3 className="text-2xl font-cinzel font-bold text-white uppercase tracking-widest">Asset Error</h3>
                                    <button
                                        onClick={() => setSelectedVideo(null)}
                                        className="px-12 py-4 bg-white text-black text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-gold transition-all"
                                    >
                                        Back
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-12 opacity-60">Acquisition</span>
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-cinzel font-bold text-white mb-16 leading-[1.1] uppercase">Elevate your <br /><span className="text-white/20">presence.</span></h2>
                    <Link
                        href="/#contact"
                        className="group relative inline-flex items-center gap-10 py-5 px-12 border border-white/5 hover:border-gold/30 transition-all duration-700 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-700">Collaborate</span>
                        <ArrowUpRight size={16} className="relative z-10 text-white group-hover:text-black transition-all group-hover:rotate-45" />
                    </Link>
                </div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}
