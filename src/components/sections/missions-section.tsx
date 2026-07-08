"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { missions, type Mission } from "@/data/missions";
import { SectionHeader } from "@/components/ui/section-header";
import { Modal } from "@/components/ui/modal";
import { Calendar, Clock, Building2 } from "lucide-react";

function MissionModalContent({ mission }: { mission: Mission }) {
  return (
    <div className="space-y-6">
      <div className="relative h-56 rounded-2xl overflow-hidden">
        <Image src={mission.image} alt={mission.name} fill className="object-cover" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            mission.status === "active" ? "bg-green-500/20 text-green-400" :
            mission.status === "planned" ? "bg-blue-500/20 text-blue-400" :
            "bg-gray-500/20 text-gray-400"
          }`}>
            {mission.status}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{mission.launchDate}</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{mission.duration}</span>
        <span className="flex items-center gap-2"><Building2 className="w-4 h-4" />{mission.agency}</span>
      </div>

      <p className="text-[var(--text-secondary)] leading-relaxed">{mission.description}</p>

      <div className="grid grid-cols-3 gap-4">
        {mission.stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Objectives</h4>
        <ul className="space-y-1">
          {mission.objectives.map((obj) => (
            <li key={obj} className="text-sm text-[var(--text-secondary)] flex gap-2">
              <span className="text-[var(--accent-primary)]">→</span> {obj}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Achievements</h4>
        <ul className="space-y-1">
          {mission.achievements.map((ach) => (
            <li key={ach} className="text-sm text-[var(--text-secondary)] flex gap-2">
              <span className="text-[var(--accent-secondary)]">★</span> {ach}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MissionsSection() {
  const [selected, setSelected] = useState<Mission | null>(null);

  return (
    <section id="missions" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          label="Human Achievement"
          title="Space Missions"
          description="From Apollo to Artemis — humanity's greatest journeys beyond Earth."
        />

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent-primary)] to-transparent hidden md:block" />

          <div className="space-y-8">
            {missions.map((mission, i) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setSelected(mission)}
                  className="w-full md:w-[45%] glass gradient-border rounded-3xl overflow-hidden text-left group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={mission.image}
                      alt={mission.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs">
                      {mission.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {mission.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{mission.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: mission.status === "completed" ? "100%" : mission.status === "active" ? "70%" : "30%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                        />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] capitalize">{mission.status}</span>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && <MissionModalContent mission={selected} />}
      </Modal>
    </section>
  );
}
