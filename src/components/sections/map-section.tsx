"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { mapLocations } from "@/data/map-locations";
import { SectionHeader } from "@/components/ui/section-header";
import { Rocket, Telescope, Building, Satellite } from "lucide-react";

const typeIcons = {
  launch: Rocket,
  observatory: Telescope,
  agency: Building,
  tracking: Satellite,
};

const typeColors = {
  launch: "#00D4FF",
  observatory: "#8B5CF6",
  agency: "#6FEAFF",
  tracking: "#F59E0B",
};

export function MapSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filters = ["all", "launch", "observatory", "agency", "tracking"];
  const filtered = activeFilter === "all"
    ? mapLocations
    : mapLocations.filter((l) => l.type === activeFilter);

  const selectedLocation = mapLocations.find((l) => l.id === selected);

  return (
    <section id="map" className="section-padding relative">
      <div className="section-container">
        <SectionHeader
          label="Global Network"
          title="Space Map"
          description="Launch sites, observatories, and space agencies around the world."
        />

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                activeFilter === f
                  ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white"
                  : "glass text-[var(--text-secondary)]"
              }`}
            >
              {f === "all" ? "All Locations" : f}
            </button>
          ))}
        </div>

        <div className="relative glass gradient-border rounded-3xl overflow-hidden h-[500px]">
          <div className="absolute inset-0 aurora-bg opacity-50" />

          <svg viewBox="0 0 1000 500" className="w-full h-full relative z-10">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--glass-border)" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#grid)" />

            <ellipse cx="500" cy="250" rx="480" ry="220" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.2" />
            <ellipse cx="500" cy="250" rx="350" ry="160" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.15" />
            <ellipse cx="500" cy="250" rx="220" ry="100" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.1" />

            {filtered.map((loc) => {
              const x = ((loc.lng + 180) / 360) * 1000;
              const y = ((90 - loc.lat) / 180) * 500;
              const color = typeColors[loc.type];
              const isSelected = selected === loc.id;

              return (
                <g key={loc.id} onClick={() => setSelected(loc.id)} className="cursor-pointer">
                  {isSelected && (
                    <circle cx={x} cy={y} r="20" fill={color} opacity="0.2">
                      <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={x} cy={y} r={isSelected ? 8 : 5} fill={color}>
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </svg>

          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 glass-strong rounded-2xl p-5 z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const Icon = typeIcons[selectedLocation.type];
                  return <Icon className="w-5 h-5" style={{ color: typeColors[selectedLocation.type] }} />;
                })()}
                <h4 className="font-bold">{selectedLocation.name}</h4>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{selectedLocation.description}</p>
              <p className="text-xs text-[var(--text-muted)] mt-2 capitalize">{selectedLocation.type}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
