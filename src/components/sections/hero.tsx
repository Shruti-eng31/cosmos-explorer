"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Rocket } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useMagnetic } from "@/hooks/use-magnetic";

const Earth3D = dynamic(() => import("@/components/3d/earth").then((m) => m.Earth3D), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full skeleton animate-pulse-glow" />
    </div>
  ),
});

const HeroScene = dynamic(
  () => import("@/components/3d/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const mouse = useMousePosition();
  const normalizedX = typeof window !== "undefined" ? (mouse.x / window.innerWidth - 0.5) * 2 : 0;
  const normalizedY = typeof window !== "undefined" ? (mouse.y / window.innerHeight - 0.5) * 2 : 0;

  const primaryBtnRef = useMagnetic(0.25);
  const secondaryBtnRef = useMagnetic(0.25);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden flex flex-col justify-center bg-black text-white">
      {/* Remove aurora-bg temporarily as it relies on CSS variables that may be white in light mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-[#0a0f1d] to-[#05070d] opacity-90" />
      
      <HeroScene />

      <motion.div style={{ scale, opacity, y }} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <Earth3D
          className="w-full h-full transform translate-y-[20%] scale-[1.2] md:scale-100"
          mouseX={normalizedX}
          mouseY={normalizedY}
        />
      </motion.div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        <motion.div className="max-w-5xl pointer-events-auto w-full px-4">
          <motion.span
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-[12vh] md:top-[16vh] left-0 right-0 w-full text-center inline-block text-xs md:text-sm lg:text-base font-semibold tracking-[0.3em] uppercase text-[#4da6ff] drop-shadow-md"
          >
            Welcome to the Cosmos
          </motion.span>

          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] drop-shadow-xl max-w-full overflow-hidden break-words px-2 flex flex-col items-center justify-center gap-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">Explore</span>
            <span className="bg-gradient-to-r from-[#4da6ff] to-[#8b5cf6] bg-clip-text text-transparent">Beyond Earth</span>
          </motion.h1>

          <motion.p 
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md px-4"
          >
            Journey through planets, missions, discoveries, and the future of humanity in space.
          </motion.p>

          <motion.div 
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button ref={primaryBtnRef as React.RefObject<HTMLButtonElement>} size="lg" className="w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-xl transition-all">
              <Rocket className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
            <Button
              ref={secondaryBtnRef as React.RefObject<HTMLButtonElement>}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Launch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase text-[var(--text-muted)]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-[var(--accent-primary)] flex justify-center pt-1"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--accent-primary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
