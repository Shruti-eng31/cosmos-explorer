"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { astronauts, type Astronaut } from "@/data/astronauts";
import { SectionHeader } from "@/components/ui/section-header";
import { Modal } from "@/components/ui/modal";

export function AstronautsSection() {
  const [selected, setSelected] = useState<Astronaut | null>(null);

  return (
    <section id="astronauts" className="section-padding aurora-bg relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Heroes of Space"
          title="Astronauts"
          description="The brave pioneers who ventured beyond Earth's atmosphere."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {astronauts.map((astronaut, i) => (
            <motion.button
              key={astronaut.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
              onClick={() => setSelected(astronaut)}
              className="group glass gradient-border rounded-3xl overflow-hidden text-left"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <div className="relative h-64 overflow-hidden rounded-t-3xl border-b border-[var(--glass-border)]">
                <Image
                  src={astronaut.image}
                  alt={astronaut.name}
                  fill
                  className="object-cover crazy-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {astronaut.name}
                  </h3>
                  <p className="text-sm text-white/70">{astronaut.agency} · {astronaut.nationality}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{astronaut.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {astronaut.missions.slice(0, 2).map((m) => (
                    <span key={m} className="text-xs px-2 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="space-y-6">
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
              <Image src={selected.image} alt={selected.name} fill className="object-cover" />
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">{selected.bio}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-[var(--text-muted)]">Agency</p>
                <p className="font-medium">{selected.agency}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-[var(--text-muted)]">Born</p>
                <p className="font-medium">{selected.birthYear}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Missions</h4>
              <div className="flex flex-wrap gap-2">
                {selected.missions.map((m) => (
                  <span key={m} className="glass px-3 py-1 rounded-full text-sm">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Achievements</h4>
              <ul className="space-y-1">
                {selected.achievements.map((a) => (
                  <li key={a} className="text-sm text-[var(--text-secondary)] flex gap-2">
                    <span className="text-[var(--accent-primary)]">★</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
