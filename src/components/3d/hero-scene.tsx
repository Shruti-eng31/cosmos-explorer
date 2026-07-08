"use client";

import { Canvas } from "@react-three/fiber";
import { StarField, ShootingStars, FloatingPlanets } from "@/components/3d/star-field";

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.2} />
        <StarField count={4000} />
        <ShootingStars />
        <FloatingPlanets />
      </Canvas>
    </div>
  );
}
