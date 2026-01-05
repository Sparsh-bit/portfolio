"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the outer ring
    const ringX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
    const ringY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });

    useEffect(() => {
        setMounted(true);
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            const isSelectable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isSelectable);
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseOut);
        document.addEventListener("mouseenter", () => setIsVisible(true));

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseOut);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full flex items-center justify-center mix-blend-difference border border-gold/40"
                style={{
                    x: ringX,
                    y: ringY,
                    width: 40,
                    height: 40,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: isHovering ? "rgba(212, 175, 55, 0.15)" : "transparent",
                    borderColor: isHovering ? "rgba(212, 175, 55, 0.8)" : "rgba(212, 175, 55, 0.4)",
                    boxShadow: isHovering ? "0 0 20px rgba(212, 175, 55, 0.3)" : "none",
                }}
                transition={{
                    scale: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 },
                    opacity: { duration: 0.2 },
                    backgroundColor: { duration: 0.3 },
                }}
            />

            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 25 },
                    opacity: { duration: 0.2 },
                }}
            />
        </div>
    );
};

export default CustomCursor;
