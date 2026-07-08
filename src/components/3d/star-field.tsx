"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function StarField({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 50 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: (Math.random() - 0.5) * 100,
      startY: Math.random() * 50 + 20,
      startZ: (Math.random() - 0.5) * 50,
      speed: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 10,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const star = stars[i];
      const t = ((state.clock.elapsedTime + star.delay) % 8) / 8;
      child.position.x = star.startX - t * 80;
      child.position.y = star.startY - t * 30;
      child.position.z = star.startZ;
      child.visible = t < 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star) => (
        <mesh key={star.id} position={[star.startX, star.startY, star.startZ]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
          {/* Add a glowing trail using a cylinder */}
          <mesh position={[2, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.01, 0.05, 4, 8]} />
            <meshBasicMaterial color="#6feaff" transparent opacity={0.6} toneMapped={false} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

export function FloatingPlanets() {
  const planets = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 30,
        z: -10 - Math.random() * 30,
        size: 0.2 + Math.random() * 0.8,
        color: ["#E27B58", "#C88B3A", "#4F8EF7", "#FAD5A5", "#8b5cf6", "#00d4ff"][i],
        speed: 0.2 + Math.random() * 0.5,
      })),
    []
  );

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.y = planets[i].y + Math.sin(state.clock.elapsedTime * planets[i].speed) * 0.8;
      child.rotation.y += 0.01;
      child.rotation.x += 0.005;
    });
  });

  return (
    <group ref={groupRef}>
      {planets.map((p) => (
        <mesh key={p.id} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 32, 32]} />
          <meshBasicMaterial 
            color={p.color} 
          />
        </mesh>
      ))}
    </group>
  );
}
