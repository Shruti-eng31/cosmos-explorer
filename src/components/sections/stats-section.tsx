"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { stats } from "@/data/stats";
import { SectionHeader } from "@/components/ui/section-header";
import { useInView } from "@/hooks/use-in-view";

function StatCard({ label, value, suffix, delay }: { label: string; value: number; suffix: string; delay: number }) {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass gradient-border rounded-3xl p-8 text-center"
    >
      <p className="text-4xl md:text-5xl font-bold gradient-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
        {count}{suffix}
      </p>
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="section-padding aurora-bg relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="By the Numbers"
          title="Space Statistics"
          description="The incredible scale of humanity's journey into the cosmos."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
