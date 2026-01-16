"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { Home, User, Briefcase, Code, Mail, Award, Layers } from "lucide-react";

/**
 * Floating Dock Component
 * Emulating the bottom navigation from the reference template
 */

const items = [
    { name: "Home", icon: Home, href: "/#" },
    { name: "About", icon: User, href: "/#about" },
    { name: "Experience", icon: Briefcase, href: "/#experience" },
    { name: "Projects", icon: Layers, href: "/#projects" },
    { name: "Contact", icon: Mail, href: "/#contact" },
];

function DockIcon({ mouseX, item }: { mouseX: any; item: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link href={item.href}>
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center relative group cursor-pointer hover:bg-white/20 hover:border-gold/50 transition-colors"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <item.icon className="text-white group-hover:text-gold transition-colors duration-300 w-5 h-5 md:w-6 md:h-6" />

                {/* Tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: -15, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute -top-8 left-1/2 px-3 py-1 bg-black/80 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap pointer-events-none"
                        >
                            {item.name}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
}

export default function FloatingDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 pb-3">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl px-4 pb-3 pt-3 shadow-2xl shadow-gold/5"
            >
                {items.map((item) => (
                    <DockIcon key={item.name} mouseX={mouseX} item={item} />
                ))}
            </motion.div>
        </div>
    );
}
