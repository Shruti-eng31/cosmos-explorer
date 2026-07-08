"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { planets, type Planet } from "@/data/planets";
import { SectionHeader } from "@/components/ui/section-header";
import { Modal } from "@/components/ui/modal";

const SolarSystem3D = dynamic(
  () => import("@/components/3d/solar-system").then((m) => m.SolarSystem3D),
  { ssr: false, loading: () => <div className="w-full h-full skeleton rounded-3xl" /> }
);

function PlanetDetail({ planet }: { planet: Planet }) {
  return (
    <div className="space-y-6">
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <Image src={planet.image} alt={planet.name} fill className="object-cover" />
      </div>
      <p className="text-[var(--text-secondary)] leading-relaxed">{planet.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Distance from Sun", value: planet.distance },
          { label: "Diameter", value: planet.diameter },
          { label: "Gravity", value: planet.gravity },
          { label: "Atmosphere", value: planet.atmosphere },
          { label: "Temperature", value: planet.temperature },
          { label: "Moons", value: planet.moons.toString() },
          { label: "Rotation", value: planet.rotation },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl p-4">
            <p className="text-xs text-[var(--text-muted)] mb-1">{item.label}</p>
            <p className="font-medium text-sm">{item.value}</p>
          </div>
        ))}
      </div>
      <div>
        <h4 className="font-semibold mb-2">Fun Facts</h4>
        <ul className="space-y-2">
          {planet.funFacts.map((fact) => (
            <li key={fact} className="text-sm text-[var(--text-secondary)] flex gap-2">
              <span className="text-[var(--accent-primary)]">✦</span> {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SolarSystemSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPlanet = planets.find((p) => p.id === selected);

  return (
    <section id="solar-system" className="section-padding relative aurora-bg">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Our Neighborhood"
          title="3D Solar System"
          description="Explore our cosmic neighborhood. Click any planet to discover its secrets."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden gradient-border bg-[#030508]"
        >
          <SolarSystem3D
            className="w-full h-full"
            selectedPlanet={selected}
            onPlanetSelect={setSelected}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {planets.map((planet, i) => (
            <motion.button
              key={planet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelected(planet.id)}
              className={`glass rounded-2xl p-4 text-left transition-all ${
                selected === planet.id ? "glow-blue" : ""
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mb-2"
                style={{ backgroundColor: planet.color }}
              />
              <p className="font-semibold text-sm">{planet.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{planet.distance}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedPlanet}
        onClose={() => setSelected(null)}
        title={selectedPlanet?.name}
      >
        {selectedPlanet && <PlanetDetail planet={selectedPlanet} />}
      </Modal>
    </section>
  );
}
