"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, X, AlertCircle, ArrowUpRight, Film, Camera, Clapperboard, Video } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";

const videos = [
    {
        id: 1,
        title: "Parampara",
        category: "Short Film",
        duration: "1:18",
        year: "2024",
        url: "https://drive.google.com/file/d/1V6Zabah4h0_BlnXaMVxs0jotmkkQ2qak/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1600",
        description: "An exploration of cultural heritage and visual lineage in modern storytelling.",
        role: "Director & Cinematographer"
    },
    {
        id: 2,
        title: "Chaar Dham",
        category: "Cinematic Landscape",
        duration: "0:44",
        year: "2024",
        url: "https://drive.google.com/file/d/1pIkAZ8xrfg8nGX2nryWmuXdQSf-nvIBa/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
        description: "A spiritual journey captured through epic vistas and intentional stillness.",
        role: "Director of Photography"
    },
    {
        id: 3,
        title: "TED-X GLAU",
        category: "Motion Graphics",
        duration: "0:44",
        year: "2023",
        url: "https://drive.google.com/file/d/17nWYz85o3Nn3fekNf3v_JHGustd377iD/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
        description: "Dynamic visual identity and title sequence for the prestigious global talk series.",
        role: "Motion Designer"
    },
    {
        id: 4,
        title: "Vrindavan Charodaya",
        category: "Documentary",
        duration: "1:22",
        year: "2023",
        url: "https://drive.google.com/file/d/1qGT_I9WyF-jI0TOxYf93peL50-LuArJJ/view?usp=sharing",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1600",
        description: "Uncovering the architectural rhythm and devotional energy of sacred temples.",
        role: "Director & Editor"
    },
];

const stats = [
    { value: "15+", label: "Productions" },
    { value: "4K", label: "Resolution" },
    { value: "50K+", label: "Views" },
];

const services = [
    { icon: Film, title: "Cinematic Films", desc: "Narrative storytelling with cinematic quality" },
    { icon: Camera, title: "Commercial Shoots", desc: "Brand-focused visual content" },
    { icon: Clapperboard, title: "Music Videos", desc: "Creative direction and production" },
    { icon: Video, title: "Event Coverage", desc: "Professional event documentation" },
];

export default function CinematographyPage() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [videoError, setVideoError] = useState(false);
    const [activeVideo, setActiveVideo] = useState<number | null>(null);

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

            {/* Cinematic Hero - Enhanced */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#020202] z-10" />

                    {/* Spectral Face Background */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.25, scale: 1 }}
                        transition={{ duration: 3 }}
                        className="absolute inset-0 grayscale contrast-[1.2] z-0"
                    >
                        <img
                            src="/images/bg_face_2.jpg"
                            alt=""
                            className="w-full h-full object-cover scale-[2.4] translate-x-[5%] rotate-90"
                        />
                    </motion.div>
                </div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute top-32 left-8 md:left-16 z-30"
                >
                    <Link href="/" className="inline-flex items-center gap-3 text-white/30 hover:text-gold transition-all group">
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} size={18} />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Return Home</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 max-w-7xl w-full"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="w-16 h-[1px] bg-gold/30" />
                            <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase">
                                Vol. 01 // Archive
                            </span>
                            <div className="w-16 h-[1px] bg-gold/30" />
                        </div>

                        <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-cinzel font-black mb-8 tracking-tighter leading-[0.9] uppercase">
                            Cinema <br />
                            <span className="text-gold">Fades</span>
                        </h1>

                        <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-16">
                            A curated collection of cinematic works exploring visual storytelling,
                            cultural narratives, and the art of motion picture.
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex justify-center gap-16 md:gap-24"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-[9px] text-white/30 uppercase tracking-[0.4em]">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/40 to-transparent" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Featured Reel */}
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold text-[9px] font-bold tracking-[0.6em] uppercase block mb-4 opacity-60">Featured</span>
                        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white uppercase tracking-wider">
                            Showreel <span className="text-white/20">2024</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-video rounded-sm overflow-hidden border border-white/5 cursor-pointer group"
                        onClick={() => handleVideoClick(videos[0].url)}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]"
                            alt="Showreel"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-700" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gold/30 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:scale-110 group-hover:border-gold/60 transition-all duration-500"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Play fill="#D4AF37" size={40} className="text-gold ml-2" />
                            </motion.div>
                        </div>

                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                            <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">Director's Cut</span>
                            <h3 className="text-2xl md:text-4xl font-cinzel font-bold text-white">Complete Showreel</h3>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Video Grid Collection */}
            <section className="py-32 px-6 md:px-16 max-w-[1500px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-gold text-[9px] font-bold tracking-[0.6em] uppercase block mb-4 opacity-60">Portfolio</span>
                    <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white uppercase tracking-wider mb-6">
                        Selected <span className="text-white/20">Works</span>
                    </h2>
                    <p className="text-white/40 max-w-lg mx-auto text-sm">
                        Each production represents a unique story told through the lens of artistic vision and technical excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                            onMouseEnter={() => setActiveVideo(video.id)}
                            onMouseLeave={() => setActiveVideo(null)}
                        >
                            <div
                                className="relative aspect-[16/9] overflow-hidden bg-zinc-950 rounded-sm cursor-pointer border border-white/5 hover:border-gold/20 transition-all duration-700"
                                onClick={() => handleVideoClick(video.url)}
                            >
                                <img
                                    src={video.thumbnail}
                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-out"
                                    alt={video.title}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60" />

                                {/* Top Badge */}
                                <div className="absolute top-6 left-6 flex items-center gap-3">
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-red-500"
                                        animate={{ opacity: activeVideo === video.id ? [1, 0.3, 1] : 0.6 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/60">4K Master</span>
                                </div>

                                {/* Year Badge */}
                                <div className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.2em] text-white/40">
                                    {video.year}
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm px-4 py-2 flex items-center gap-3 border border-white/10">
                                    <Play size={10} className="text-gold" fill="#D4AF37" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/80">{video.duration}</span>
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                                    <div className="w-20 h-20 rounded-full border-2 border-gold/40 flex items-center justify-center bg-black/60 backdrop-blur-sm group-hover:border-gold transition-all">
                                        <Play fill="#D4AF37" size={28} className="text-gold ml-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 space-y-5">
                                <div className="flex items-center gap-5">
                                    <span className="text-gold text-[9px] font-bold tracking-[0.4em] uppercase font-cinzel opacity-70">
                                        {video.category}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                    <span className="text-white/30 text-[9px] font-bold tracking-[0.2em] uppercase">
                                        {video.role}
                                    </span>
                                </div>

                                <h3 className="text-[2rem] font-cinzel font-bold text-white tracking-tight leading-none group-hover:text-gold transition-colors duration-500">
                                    {video.title}
                                </h3>

                                <p className="text-gray-500 text-[11px] leading-relaxed max-w-lg font-light tracking-[0.02em] uppercase border-l-2 border-gold/20 pl-6">
                                    {video.description}
                                </p>

                                <div className="pt-4">
                                    <button
                                        onClick={() => handleVideoClick(video.url)}
                                        className="group/btn flex items-center gap-4 text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 hover:text-gold transition-all duration-500"
                                    >
                                        Watch Production
                                        <div className="w-8 h-[1px] bg-white/10 transition-all group-hover/btn:w-20 group-hover/btn:bg-gold" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    className="absolute inset-0 grayscale z-0"
                >
                    <img
                        src="/images/bg_face_1.jpg"
                        alt=""
                        className="w-full h-full object-cover scale-[1.5]"
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
                        <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-6 opacity-60">Services</span>
                        <h2 className="text-[clamp(2rem,5vw,4rem)] font-cinzel font-bold text-white uppercase tracking-wider">
                            What I <span className="text-white/20">Offer</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group text-center p-10 border border-white/5 hover:border-gold/30 transition-all duration-700 bg-black/20 backdrop-blur-sm"
                            >
                                <service.icon className="w-10 h-10 mx-auto mb-8 text-gold/50 group-hover:text-gold transition-colors duration-500" strokeWidth={1} />
                                <div className="text-white font-cinzel font-bold text-lg mb-3">{service.title}</div>
                                <div className="text-white/30 text-[11px] uppercase tracking-wider leading-relaxed">{service.desc}</div>
                            </motion.div>
                        ))}
                    </div>
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
                            className="absolute top-6 right-6 lg:top-12 lg:right-12 text-white/20 hover:text-white transition-all z-[110] p-4"
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
                                    <AlertCircle size={60} className="text-red-500/20" strokeWidth={1} />
                                    <h3 className="text-2xl font-cinzel font-bold text-white uppercase tracking-widest">Asset Error</h3>
                                    <p className="text-white/40 text-sm">Unable to load the video. Please try again.</p>
                                    <button
                                        onClick={() => setSelectedVideo(null)}
                                        className="px-12 py-4 bg-gold text-black text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-white transition-all"
                                    >
                                        Close
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
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold text-[9px] font-bold tracking-[0.8em] uppercase block mb-12 opacity-60">Collaborate</span>
                        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-cinzel font-bold text-white mb-8 leading-[1.1] uppercase">
                            Let's Create <br /><span className="text-gold">Together.</span>
                        </h2>
                        <p className="text-white/40 mb-16 max-w-lg mx-auto">
                            Ready to bring your vision to life? Let's discuss your next cinematic project.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                href="/#contact"
                                className="group relative inline-flex items-center gap-8 py-5 px-14 bg-gold text-black transition-all duration-500 overflow-hidden hover:bg-white"
                            >
                                <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase">Get in Touch</span>
                                <ArrowUpRight size={16} className="relative z-10 transition-all group-hover:rotate-45" />
                            </Link>
                            <Link
                                href="/projects/frontend-architecture"
                                className="group relative inline-flex items-center gap-8 py-5 px-14 border border-white/10 hover:border-gold/40 transition-all duration-500"
                            >
                                <span className="relative text-[10px] font-bold tracking-[0.4em] uppercase text-white">View Web Work</span>
                                <ArrowUpRight size={16} className="text-white/60 group-hover:text-gold transition-all group-hover:rotate-45" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}
