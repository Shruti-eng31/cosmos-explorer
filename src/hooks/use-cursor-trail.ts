"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export function useCursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let id = 0;
    const handler = (e: MouseEvent) => {
      const particle: Particle = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      };
      setParticles((prev) => [...prev.slice(-20), particle]);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 50);
    return () => clearTimeout(timer);
  }, [particles]);

  return particles;
}
