"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

// Robot Head Component - Follows cursor
function RobotHead({ mousePos }: { mousePos: { x: number; y: number } }) {
    const headRef = useRef<THREE.Group>(null);
    const eyeLeftRef = useRef<THREE.Mesh>(null);
    const eyeRightRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!headRef.current) return;

        // Smooth head rotation following cursor
        const targetRotationY = mousePos.x * 0.4;
        const targetRotationX = mousePos.y * 0.3;

        headRef.current.rotation.y = THREE.MathUtils.lerp(
            headRef.current.rotation.y,
            targetRotationY,
            0.08
        );
        headRef.current.rotation.x = THREE.MathUtils.lerp(
            headRef.current.rotation.x,
            targetRotationX,
            0.08
        );

        // Eye pupil movement
        if (eyeLeftRef.current && eyeRightRef.current) {
            const eyeOffsetX = mousePos.x * 0.15;
            const eyeOffsetY = -mousePos.y * 0.1;
            eyeLeftRef.current.position.x = -0.25 + eyeOffsetX;
            eyeLeftRef.current.position.y = 0.1 + eyeOffsetY;
            eyeRightRef.current.position.x = 0.25 + eyeOffsetX;
            eyeRightRef.current.position.y = 0.1 + eyeOffsetY;
        }
    });

    return (
        <group ref={headRef} position={[0, 1.2, 0]}>
            {/* Head - Main Screen */}
            <mesh>
                <boxGeometry args={[1.4, 1, 0.8]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Screen Face */}
            <mesh position={[0, 0, 0.41]}>
                <planeGeometry args={[1.2, 0.8]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Eyes Container */}
            <group position={[0, 0, 0.42]}>
                {/* Left Eye Socket */}
                <mesh position={[-0.3, 0.1, 0]}>
                    <circleGeometry args={[0.18, 32]} />
                    <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
                </mesh>
                {/* Left Pupil */}
                <mesh ref={eyeLeftRef} position={[-0.25, 0.1, 0.01]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

                {/* Right Eye Socket */}
                <mesh position={[0.3, 0.1, 0]}>
                    <circleGeometry args={[0.18, 32]} />
                    <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
                </mesh>
                {/* Right Pupil */}
                <mesh ref={eyeRightRef} position={[0.25, 0.1, 0.01]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            </group>

            {/* Antenna */}
            <mesh position={[0, 0.65, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.85, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} metalness={1} roughness={0.2} />
            </mesh>

            {/* Side Panels */}
            <mesh position={[-0.75, 0, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.4]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0.75, 0, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.4]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
            </mesh>
        </group>
    );
}

// Robot Neck
function RobotNeck() {
    return (
        <group position={[0, 0.5, 0]}>
            <mesh>
                <cylinderGeometry args={[0.15, 0.2, 0.4, 16]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Neck Rings */}
            {[0.1, 0, -0.1].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.18, 0.02, 8, 32]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
                </mesh>
            ))}
        </group>
    );
}

// Robot Body
function RobotBody() {
    return (
        <group position={[0, -0.3, 0]}>
            {/* Main Torso */}
            <mesh>
                <boxGeometry args={[1.2, 1.2, 0.8]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Chest Panel */}
            <mesh position={[0, 0.1, 0.41]}>
                <boxGeometry args={[0.8, 0.6, 0.02]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Power Core */}
            <mesh position={[0, 0.1, 0.43]}>
                <circleGeometry args={[0.15, 32]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.6} />
            </mesh>

            {/* Gold Trim Lines */}
            <mesh position={[0, 0.55, 0.41]}>
                <boxGeometry args={[1.0, 0.03, 0.02]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.55, 0.41]}>
                <boxGeometry args={[1.0, 0.03, 0.02]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </mesh>

            {/* Shoulder Joints */}
            <mesh position={[-0.7, 0.4, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0.7, 0.4, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </mesh>
        </group>
    );
}

// Complete Robot Assembly with entrance animation
function Robot({ mousePos, isVisible }: { mousePos: { x: number; y: number }; isVisible: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const [scale, setScale] = useState(0);
    const [posY, setPosY] = useState(-2);

    useFrame((_, delta) => {
        if (isVisible) {
            // Animate scale from 0 to 0.85
            setScale(prev => THREE.MathUtils.lerp(prev, 0.85, delta * 2));
            // Animate position from below to normal
            setPosY(prev => THREE.MathUtils.lerp(prev, -0.2, delta * 2));
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
            <group ref={groupRef} position={[0, posY, 0]} scale={scale}>
                <RobotHead mousePos={mousePos} />
                <RobotNeck />
                <RobotBody />
            </group>
        </Float>
    );
}

// Scene Setup
function Scene({ mousePos, isVisible }: { mousePos: { x: number; y: number }; isVisible: boolean }) {
    return (
        <>
            <color attach="background" args={["#020202"]} />
            <fog attach="fog" args={["#020202", 5, 15]} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <spotLight
                position={[5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={1}
                color="#ffffff"
            />
            <spotLight
                position={[-5, 3, 2]}
                angle={0.5}
                penumbra={1}
                intensity={0.5}
                color="#D4AF37"
            />
            <pointLight position={[0, 2, 3]} intensity={0.5} color="#D4AF37" />

            <Robot mousePos={mousePos} isVisible={isVisible} />

            <ContactShadows
                position={[0, -1.8, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
                far={4}
                color="#D4AF37"
            />

            <Environment preset="city" />
        </>
    );
}

export default function CursorRobot({ className }: { className?: string }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Premium loading sequence
    useEffect(() => {
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        const visibleTimer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(visibleTimer);
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            {/* Premium Loading State */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                    >
                        {/* Initializing Animation */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Outer Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-full border-2 border-gold/20 border-t-gold"
                            />
                            {/* Inner Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border border-gold/30 border-b-gold"
                            />
                            {/* Center Dot */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold"
                            />
                        </motion.div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-8 text-[10px] text-gold/60 tracking-[0.5em] uppercase font-bold"
                        >
                            Initializing
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Glow - animates in */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <div className="w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]" />
            </motion.div>

            {/* Canvas Container with fade in */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full h-full"
            >
                <Canvas
                    camera={{ position: [0, 0.8, 4.5], fov: 40 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Scene mousePos={mousePos} isVisible={isVisible} />
                </Canvas>
            </motion.div>

            {/* Status Indicator - appears after robot */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
            >
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-gold"
                />
                <span className="text-[9px] text-white/40 tracking-[0.4em] uppercase font-bold">Active</span>
            </motion.div>
        </div>
    );
}
