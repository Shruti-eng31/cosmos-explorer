"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Pause, Play, Sun, Moon as MoonIcon } from "lucide-react";

const Earth3D = dynamic(() => import("@/components/3d/earth").then((m) => m.Earth3D), {
  ssr: false,
  loading: () => <div className="w-full h-full skeleton rounded-3xl" />,
});

export function EarthViewerSection() {
  const [paused, setPaused] = useState(false);
  const [showDayNight, setShowDayNight] = useState(true);

  return (
    <section id="earth" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          label="Our Home"
          title="3D Earth Experience"
          description="Rotate, zoom, and explore our beautiful blue planet in stunning detail."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden gradient-border"
        >
          <Earth3D className="w-full h-full" isPaused={paused} isNight={!showDayNight} />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            <button
              onClick={() => setPaused(!paused)}
              className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:glow-blue transition-all"
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={() => setShowDayNight(!showDayNight)}
              className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:glow-blue transition-all"
            >
              {showDayNight ? <MoonIcon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              Day/Night
            </button>
          </div>

          <div className="absolute top-6 left-6 glass rounded-2xl p-4 space-y-2">
            <p className="text-xs text-[var(--text-muted)]">ISS Position</p>
            <p className="text-sm font-medium">Tracking Active</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-4 rounded-full bg-[var(--accent-primary)] animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
