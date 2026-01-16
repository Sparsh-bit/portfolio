"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Expertise", href: "/#skills" },
    { name: "Portfolio", href: "/#projects" },
    { name: "Connect", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 ${isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
                    }`}
            >
                <div className="flex justify-between items-center max-w-[1600px] mx-auto">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 cursor-pointer"
                    >
                        <div className="relative">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                            <div className="absolute inset-0 w-1.5 h-1.5 bg-gold rounded-full animate-ping opacity-30" />
                        </div>
                        <span className="font-cinzel text-lg md:text-xl font-black text-white tracking-[0.3em] group-hover:text-gold transition-all duration-500 overflow-visible py-1">
                            SPARSH
                        </span>
                    </Link>

                    {/* Desktop Center Nav - Hidden as we use Floating Dock */}
                    <div className="hidden lg:flex gap-12 items-center">
                        {/* Links removed for Floating Dock */}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/cinematography"
                            className="group flex items-center gap-3 px-8 py-3 bg-white/[0.02] border border-white/10 text-white text-[8.5px] font-bold tracking-[0.3em] uppercase rounded-sm hover:bg-white hover:text-black transition-all duration-700"
                        >
                            Showreel
                            <ArrowUpRight size={12} className="group-hover:rotate-45 transition-transform duration-500" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white/80 hover:text-gold transition-all duration-300 p-2"
                        onClick={() => setMobileMenuOpen(true)}
                        style={{
                            filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.3))`
                        }}
                    >
                        <Menu size={24} strokeWidth={1} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-black p-10 overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] border border-white/[0.02] rounded-full animate-[spin_60s_linear_infinite]" />
                        </div>

                        {/* Top Bar */}
                        <div className="flex justify-between items-center relative z-10">
                            <span className="font-cinzel text-lg font-black text-white tracking-[0.3em]">SPARSH</span>
                            <button
                                className="text-white/80 hover:text-gold transition-all duration-300 p-3 backdrop-blur-sm bg-black/10 rounded-sm border border-white/10 hover:border-gold/50 hover:scale-110"
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    filter: `drop-shadow(0 0 10px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 30px rgba(212, 175, 55, 0.2))`
                                }}
                            >
                                <X size={40} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Middle Links */}
                        <div className="flex flex-col gap-6 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.2, duration: 0.7 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-4xl md:text-7xl font-cinzel text-white/10 hover:text-gold transition-all duration-700 tracking-tighter uppercase leading-none block py-1"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative z-10 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-end gap-8"
                        >
                            <div className="space-y-3">
                                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/20">Studio Portfolio</p>
                                <p className="text-lg font-cinzel text-white/80">Cinematography // Art</p>
                            </div>
                            <Link
                                href="/cinematography"
                                className="w-full md:w-auto px-12 py-5 bg-gold text-black font-bold text-[10px] tracking-[0.4em] uppercase rounded-sm flex items-center justify-center gap-3 hover:bg-white transition-all duration-500"
                            >
                                View Showreel
                                <ArrowUpRight size={16} />
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
