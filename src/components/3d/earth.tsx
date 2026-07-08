"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

function EarthMesh({ mouseX, mouseY, isPaused, isNight }: { mouseX: number; mouseY: number; isPaused: boolean; isNight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Load textures from local public directory to prevent CORS and fetch errors
  const [colorMap, normalMap, specularMap] = useTexture([
    "/earth-color.jpg",
    "/earth-normal.png",
    "/earth-specular.png"
  ]);

  useFrame((state) => {
    if (meshRef.current && !isPaused) {
      meshRef.current.rotation.y += 0.002;
    }
    if (atmosphereRef.current && !isPaused) {
      atmosphereRef.current.rotation.y += 0.0025;
    }
    // Subtle Parallax effect
    if (groupRef.current) {
      const targetX = mouseX * 0.1;
      const targetY = -mouseY * 0.1;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 1.5, 0]}>
      {/* Main Planet Body */}
      <Sphere ref={meshRef} args={[2.2, 64, 64]}>
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughness={0.6}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Atmosphere Glow */}
      <Sphere ref={atmosphereRef} args={[2.3, 64, 64]}>
        <meshStandardMaterial
          color="#4da6ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Lighting */}
      <directionalLight position={[-5, 5, 10]} intensity={isNight ? 0.2 : 2.5} color={isNight ? "#4da6ff" : "#ffffff"} />
      <pointLight position={[10, 5, 10]} intensity={isNight ? 0.2 : 1.0} color="#4da6ff" />
      <ambientLight intensity={isNight ? 0.05 : 0.4} />
    </group>
  );
}

interface Earth3DProps {
  mouseX?: number;
  mouseY?: number;
  className?: string;
  isPaused?: boolean;
  isNight?: boolean;
}

export function Earth3D({ mouseX = 0, mouseY = 0, className, isPaused = false, isNight = false }: Earth3DProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <EarthMesh mouseX={mouseX} mouseY={mouseY} isPaused={isPaused} isNight={isNight} />
        </Suspense>
      </Canvas>
    </div>
  );
}
