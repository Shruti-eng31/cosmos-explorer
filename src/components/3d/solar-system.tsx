"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, Stars } from "@react-three/drei";
import * as THREE from "three";

// Planet data
const planets = [
  { id: "mercury", radius: 0.1, distance: 3, speed: 1.5, color: "#a8a8a8" },
  { id: "venus", radius: 0.15, distance: 4.5, speed: 1.1, color: "#e0cda5" },
  { id: "earth", radius: 0.18, distance: 6, speed: 0.9, color: "#4da6ff" },
  { id: "mars", radius: 0.12, distance: 7.5, speed: 0.7, color: "#c1440e" },
  { id: "jupiter", radius: 0.5, distance: 11, speed: 0.4, color: "#c88b3a" },
  { id: "saturn", radius: 0.4, distance: 15, speed: 0.3, color: "#e2bf7d", hasRings: true },
  { id: "uranus", radius: 0.25, distance: 19, speed: 0.2, color: "#4f8ef7" },
  { id: "neptune", radius: 0.25, distance: 23, speed: 0.15, color: "#2d4bb8" },
];

function OrbitLine({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="#ffffff"
      opacity={0.15}
      transparent
      lineWidth={1}
    />
  );
}

function Planet({ planet, isSelected, onSelect }: { planet: typeof planets[0], isSelected?: boolean, onSelect?: (id: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Random starting angle so they aren't all aligned
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around the sun
      groupRef.current.rotation.y = randomOffset + state.clock.elapsedTime * planet.speed * 0.2;
    }
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <OrbitLine radius={planet.distance} />
      <group ref={groupRef}>
        <group position={[planet.distance, 0, 0]}>
          <Sphere 
            ref={meshRef} 
            args={[planet.radius * (isSelected ? 1.5 : 1), 32, 32]}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(planet.id);
            }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            <meshBasicMaterial 
              color={planet.color}
            />
          </Sphere>
          
          {planet.hasRings && (
            <mesh rotation={[-Math.PI / 2 + 0.2, 0, 0]}>
              <ringGeometry args={[planet.radius * 1.5, planet.radius * 2.2, 64]} />
              <meshBasicMaterial 
                color={planet.color} 
                transparent 
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
}

function AsteroidBelt() {
  const count = 1500;
  const innerRadius = 8.5;
  const outerRadius = 9.5;

  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.5;
      
      dummy.position.set(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
      
      const scale = 0.01 + Math.random() * 0.04;
      dummy.scale.set(scale, scale, scale);
      
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#888888" roughness={0.8} />
    </instancedMesh>
  );
}

function SolarSystemScene({ selectedPlanet, onPlanetSelect }: { selectedPlanet?: string | null, onPlanetSelect?: (id: string) => void }) {
  return (
    <group rotation={[0.2, 0, 0]}>
      {/* Sun */}
      <Sphere args={[1.5, 64, 64]}>
        <meshBasicMaterial color="#ffcc00" />
      </Sphere>
      {/* Sun Glow */}
      <Sphere args={[1.7, 32, 32]}>
        <meshBasicMaterial 
          color="#ffaa00" 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
        />
      </Sphere>
      
      {planets.map((planet) => (
        <Planet 
          key={planet.id} 
          planet={planet} 
          isSelected={selectedPlanet === planet.id}
          onSelect={onPlanetSelect}
        />
      ))}
      
      <AsteroidBelt />
    </group>
  );
}

// Welcome Page export (Fullscreen)
export function SolarSystem() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030508] z-0">
      <Canvas camera={{ position: [0, 15, 30], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#030508"]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <pointLight position={[0, 0, 0]} intensity={3} color="#fffcf5" distance={100} decay={1.5} />
        <ambientLight intensity={0.1} />
        
        <SolarSystemScene />
      </Canvas>
    </div>
  );
}

// Homepage Section export (Interactive)
export function SolarSystem3D({ 
  className, 
  selectedPlanet, 
  onPlanetSelect 
}: { 
  className?: string; 
  selectedPlanet?: string | null; 
  onPlanetSelect?: (id: string) => void 
}) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 20, 30], fov: 50 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <pointLight position={[0, 0, 0]} intensity={3} color="#fffcf5" distance={100} decay={1.5} />
        <ambientLight intensity={0.2} />
        
        <SolarSystemScene 
          selectedPlanet={selectedPlanet} 
          onPlanetSelect={onPlanetSelect} 
        />
      </Canvas>
    </div>
  );
}
