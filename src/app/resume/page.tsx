"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ArrowUpRight, Download, Mail, MapPin, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, Code2, Cpu, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";

// Resume Data extracted from provided resume
const resumeData = {
    name: "Sparsh Sharma",
    title: "Product & UI/UX Engineer | AI-Assisted Design | IoT Systems",
    email: "sparsh42005@gmail.com",
    summary: "Solution-oriented Product & UI/UX Engineer with hands-on experience delivering real-world web and IoT solutions. Proven track record of building end-to-end frontend projects, developing IoT prototypes, and collaborating in defense-grade environments to solve practical, mission-critical problems.",

    experience: [
        {
            role: "IoT Engineer Intern",
            company: "509 Army Base Workshop (Indian Army)",
            period: "June 2025 – July 2025",
            highlights: [
                "Designed and developed an IoT-based prototype for paratroopers, focused on real-time monitoring and operational safety.",
                "Worked with sensors, microcontrollers, and embedded systems in a defense-grade technical environment.",
                "Assisted officers and engineers in testing, calibration, and performance validation of IoT hardware systems.",
                "Gained hands-on exposure to mission-critical systems, documentation standards, and disciplined engineering workflows.",
                "Successfully completed training and evaluation, certified by 509 Army Base Workshop."
            ]
        }
    ],

    projects: [
        {
            title: "Magh Mela Website",
            type: "Contract & Project-Based",
            url: "https://magh-mela.pages.dev/",
            description: "Designed and delivered a public-facing frontend website for Magh Mela with responsive layouts, intuitive navigation, and UI/UX best practices to support high user engagement and accessibility."
        },
        {
            title: "New Defence Public School Website",
            type: "Educational Institution",
            url: "https://new-defence-public-school.pages.dev/",
            description: "Developed a complete frontend website for an educational institution, focusing on clean design, structured content presentation, and cross-device compatibility for students, parents, and staff."
        },
        {
            title: "Personal Portfolio",
            type: "Portfolio Website",
            url: "https://portfolio-216.pages.dev/",
            description: "Designed and built a personal portfolio website to professionally showcase projects, skills, and experience using modern UI/UX principles, performance optimization, and cloud deployment."
        }
    ],

    education: {
        degree: "Bachelor of Technology (B.Tech)",
        field: "Computer Science & Engineering (AI/ML & IIoT)",
        institution: "GLA University, Mathura",
        period: "2023 – 2027"
    },

    skills: [
        { name: "Frontend Web Development & UI/UX Design", icon: Code2 },
        { name: "Responsive Design & Performance Optimization", icon: Globe },
        { name: "Figma (Intermediate) & AI-Assisted Web Design", icon: Cpu },
        { name: "IoT Systems & Embedded Prototyping", icon: Cpu },
        { name: "Cloud Deployment (Cloudflare Pages)", icon: Globe },
        { name: "Git/GitHub & Technical Documentation", icon: FileText }
    ]
};

export default function ResumePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-gold selection:text-black font-montserrat overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-[#020202] z-10" />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 2 }}
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
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute top-32 left-8 md:left-16 z-30"
                >
                    <Link href="/#contact" className="inline-flex items-center gap-3 text-white/30 hover:text-gold transition-all group">
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} size={18} />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Back to Contact</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 max-w-4xl w-full"
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-gold/30" />
                        <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase">
                            AI-Generated Resume
                        </span>
                        <div className="w-12 h-[1px] bg-gold/30" />
                    </div>

                    <h1 className="text-[clamp(3rem,10vw,7rem)] font-cinzel font-black mb-6 tracking-tighter leading-[0.9] uppercase">
                        {resumeData.name.split(' ')[0]} <br />
                        <span className="text-gold">{resumeData.name.split(' ')[1]}</span>
                    </h1>

                    <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
                        {resumeData.title}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`mailto:${resumeData.email}`}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-gold text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all"
                        >
                            <Mail size={14} />
                            Contact Me
                        </a>
                        <a
                            href="/Sparsh_Sharma_Resume.pdf"
                            download="Sparsh_Sharma_Resume.pdf"
                            className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all"
                        >
                            <Download size={14} />
                            Download PDF
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Career Summary */}
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold text-[9px] font-bold tracking-[0.6em] uppercase block mb-6 opacity-60">Career Summary</span>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed border-l-2 border-gold/30 pl-8">
                            {resumeData.summary}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Work Experience */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <Briefcase className="text-gold" size={24} />
                            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white uppercase tracking-wider">
                                Work <span className="text-white/30">Experience</span>
                            </h2>
                        </div>
                    </motion.div>

                    {resumeData.experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="relative pl-8 border-l border-gold/20"
                        >
                            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gold" />

                            <div className="mb-6">
                                <h3 className="text-2xl font-cinzel font-bold text-white mb-2">{exp.role}</h3>
                                <p className="text-gold text-sm font-bold tracking-wider">{exp.company}</p>
                                <p className="text-white/40 text-[11px] uppercase tracking-widest mt-1">{exp.period}</p>
                            </div>

                            <ul className="space-y-4">
                                {exp.highlights.map((highlight, j) => (
                                    <li key={j} className="flex items-start gap-4 text-white/60 text-sm leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-2 flex-shrink-0" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <Code2 className="text-gold" size={24} />
                            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white uppercase tracking-wider">
                                Relevant <span className="text-white/30">Projects</span>
                            </h2>
                        </div>
                    </motion.div>

                    <div className="grid gap-8">
                        {resumeData.projects.map((project, i) => (
                            <motion.a
                                key={i}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="group p-8 border border-white/5 hover:border-gold/30 transition-all duration-500 bg-black/20"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-cinzel font-bold text-white group-hover:text-gold transition-colors">{project.title}</h3>
                                        <p className="text-gold/60 text-[10px] uppercase tracking-widest mt-1">{project.type}</p>
                                    </div>
                                    <ExternalLink size={18} className="text-white/20 group-hover:text-gold transition-colors" />
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed">{project.description}</p>
                                <p className="text-gold/40 text-[10px] mt-4 flex items-center gap-2">
                                    <Globe size={12} />
                                    {project.url}
                                </p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <GraduationCap className="text-gold" size={24} />
                            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white uppercase tracking-wider">
                                Education
                            </h2>
                        </div>

                        <div className="p-10 border border-white/5 bg-[#050505]">
                            <h3 className="text-2xl font-cinzel font-bold text-white mb-2">{resumeData.education.degree}</h3>
                            <p className="text-gold text-sm font-bold tracking-wider mb-4">{resumeData.education.field}</p>
                            <p className="text-white/60">{resumeData.education.institution}</p>
                            <p className="text-white/30 text-[11px] uppercase tracking-widest mt-2">{resumeData.education.period}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <Cpu className="text-gold" size={24} />
                            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white uppercase tracking-wider">
                                Skills
                            </h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resumeData.skills.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="flex items-center gap-4 p-5 border border-white/5 hover:border-gold/20 transition-all group"
                            >
                                <skill.icon size={18} className="text-gold/60 group-hover:text-gold transition-colors" />
                                <span className="text-white/70 text-sm">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-8 uppercase">
                        Let's Work <span className="text-gold">Together</span>
                    </h2>
                    <p className="text-white/40 mb-12">
                        Interested in collaborating? I'm always open to discussing new opportunities and creative projects.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href={`mailto:${resumeData.email}`}
                            className="inline-flex items-center gap-4 px-10 py-4 bg-gold text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all"
                        >
                            <Mail size={16} />
                            Send Email
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sparsh-sharma-356761289/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-4 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all"
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/Sparsh-bit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-4 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all"
                        >
                            <Github size={16} />
                            GitHub
                        </a>
                    </div>
                </motion.div>
            </section>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}
