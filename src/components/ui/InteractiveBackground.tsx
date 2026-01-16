"use client";

import React, { useRef, useEffect } from "react";

/**
 * Interactive Background with Cursor Gradient
 */
export default function InteractiveBackground() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Cursor Follower Logic
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;

        const moveCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animatecursor = () => {
            // Smooth lerp
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(animatecursor);
        };

        window.addEventListener("mousemove", moveCursor);
        const animId = requestAnimationFrame(animatecursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            cancelAnimationFrame(animId);
        };
    }, []);

    // Ambient Noise Canvas Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", resize);
        resize();

        const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2,
                alpha: Math.random() * 0.5,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.1})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Interactive Cursor Glow */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent opacity-40 blur-[100px] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-screen"
            />

            {/* Secondary follower for depth */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"
            />

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
        </div>
    );
}
