"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { planets, type Planet } from "@/data/planets";
import { SectionHeader } from "@/components/ui/section-header";
import { X } from "lucide-react";

function PlanetFullscreen({ planet, onClose }: { planet: Planet; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[var(--bg-primary)] overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] p-3 rounded-full glass glow-blue"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative h-[60vh] aurora-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden glow-blue"
            style={{ boxShadow: `0 0 80px ${planet.color}40` }}
          >
            <Image src={planet.image} alt={planet.name} fill className="object-cover" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[var(--bg-primary)] to-transparent">
          <h2 className="text-5xl md:text-7xl font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
            {planet.name}
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">{planet.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Distance", value: planet.distance },
            { label: "Diameter", value: planet.diameter },
            { label: "Gravity", value: planet.gravity },
            { label: "Moons", value: planet.moons.toString() },
          ].map((item) => (
            <div key={item.label} className="glass rounded-2xl p-5 text-center">
              <p className="text-2xl font-bold gradient-text">{item.value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Discoveries</h3>
            <ul className="space-y-2">
              {planet.discoveries.map((d) => (
                <li key={d} className="text-[var(--text-secondary)] flex gap-2">
                  <span className="text-[var(--accent-primary)]">◆</span> {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Related Missions</h3>
            <div className="flex flex-wrap gap-2">
              {planet.relatedMissions.map((m) => (
                <span key={m} className="glass px-4 py-2 rounded-full text-sm">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PlanetsSection() {
  const [fullscreen, setFullscreen] = useState<Planet | null>(null);

  return (
    <section id="planets" className="section-padding relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Worlds Beyond"
          title="Discover the Planets"
          description="Each world tells a unique story in the grand tapestry of our solar system."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planets.map((planet, i) => (
            <motion.button
              key={planet.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, rotateY: 5 }}
              onClick={() => setFullscreen(planet)}
              className="group relative glass gradient-border rounded-3xl overflow-hidden text-left perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={planet.image}
                  alt={planet.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${planet.color}40, transparent)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: planet.color }} />
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {planet.name}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{planet.description}</p>
              </div>
              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-3xl"
                style={{ backgroundColor: planet.color }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {fullscreen && (
        <PlanetFullscreen planet={fullscreen} onClose={() => setFullscreen(null)} />
      )}
    </section>
  );
}
