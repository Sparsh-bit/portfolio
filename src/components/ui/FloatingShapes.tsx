"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Icosahedron args={[1, 0]} ref={meshRef}>
                <MeshDistortMaterial
                    color="#D4AF37"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={1}
                />
            </Icosahedron>
        </Float>
    );
}

export default function FloatingShapes() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#FF8C00" />
                <group position={[2, 1, 0]}>
                    <AnimatedShape />
                </group>
                <group position={[-2, -1, -2]} scale={0.5}>
                    <AnimatedShape />
                </group>
            </Canvas>
        </div>
    );
}
