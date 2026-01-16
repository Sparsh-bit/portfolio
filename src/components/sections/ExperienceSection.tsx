"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import FloatingShapes from "@/components/ui/FloatingShapes";

/**
 * Experience & Education Section
 * Uses a timeline layout inspired by the reference template.
 * Client component due to Framer Motion and 3D shapes.
 */

const timelineData = [
    {
        type: "work",
        title: "IoT Engineer Intern",
        organization: "509 Army Base Workshop (Indian Army)",
        period: "June 2025 – July 2025",
        description: "Designed and developed an IoT-based prototype for paratroopers, focused on real-time monitoring and operational safety. Worked with defense-grade sensors and microcontrollers.",
        badges: ["IoT", "Embedded Systems", "Defense Tech"]
    },
    {
        type: "education",
        title: "B.Tech in Computer Science",
        organization: "GLA University, Mathura",
        period: "2023 – 2027",
        description: "Specializing in AI/ML & IIoT. Focusing on advanced computing paradigms and industrial internet of things.",
        badges: ["AI/ML", "IIoT", "3.8 GPA"]
    }
];

const TimelineItem = ({ item, index }: { item: typeof timelineData[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="relative pl-12 pb-16 last:pb-0 group"
        >
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-2 bottom-0 w-[1px] bg-white/10 group-last:hidden" />

            {/* Timeline Dot */}
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full border border-white/20 bg-[#020202] flex items-center justify-center group-hover:border-gold/50 transition-colors duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors duration-500" />
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{item.title}</h3>
                        <p className="text-white/60 font-medium text-sm flex items-center gap-2">
                            {item.type === 'work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                            {item.organization}
                        </p>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-white/40 px-3 py-1 rounded-full border border-white/10 bg-black/20 whitespace-nowrap max-w-fit">
                        {item.period}
                    </span>
                </div>

                <p className="text-white/70 leading-relaxed mb-6 text-sm font-light">
                    {item.description}
                </p>

                <div className="flex flex-wrap gap-3">
                    {item.badges.map((badge) => (
                        <span key={badge} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold/80">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function ExperienceSection() {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section ref={containerRef} id="experience" className="w-full py-32 px-6 md:px-16 bg-[#020202] relative overflow-hidden">
            <FloatingShapes />
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <span className="text-gold tracking-[0.5em] text-[10px] font-bold uppercase block mb-4">
                        Career Path // 02
                    </span>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-cinzel font-black text-white leading-none tracking-tighter uppercase">
                        Experience & <span className="text-white/40">Education</span>
                    </h2>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </section>
    );
}
