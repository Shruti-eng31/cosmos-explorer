"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { timelineEvents } from "@/data/timeline";
import { SectionHeader } from "@/components/ui/section-header";
import { Rocket } from "lucide-react";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const rocketX = useTransform(scrollXProgress, [0, 1], ["0%", "95%"]);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="timeline" className="section-padding aurora-bg relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <SectionHeader
          label="Our Journey"
          title="Space Timeline"
          description="From Sputnik to Artemis — the milestones that shaped our cosmic adventure."
        />
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto no-scrollbar pb-8"
      >
        <div className="relative min-w-[1400px] px-12 py-8">
          <div className="absolute top-1/2 left-12 right-12 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)]" />

          <motion.div
            style={{ left: rocketX }}
            className="absolute top-1/2 -translate-y-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Rocket className="w-8 h-8 text-[var(--accent-primary)] rotate-45" />
            </motion.div>
          </motion.div>

          <div className="flex justify-between relative">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center w-28"
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all ${
                    expanded === i
                      ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] scale-150 glow-blue"
                      : "bg-[var(--bg-primary)] border-[var(--accent-primary)] hover:scale-125"
                  }`}
                />
                <span className="mt-4 text-sm font-bold gradient-text">{event.year}</span>
                <span className="mt-1 text-xs text-center text-[var(--text-muted)] line-clamp-2">
                  {event.title}
                </span>

                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-16 w-64 glass gradient-border rounded-2xl p-4 z-20 text-left"
                  >
                    <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)]">{event.description}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                      {event.category}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
