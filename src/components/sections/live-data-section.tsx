"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Satellite, Users, Image as ImageIcon, Rocket, Calendar,
  AlertTriangle, Sun, Cloud, Moon, Globe,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { useInView } from "@/hooks/use-in-view";

interface LiveData {
  apod?: { title: string; url: string; explanation: string };
  iss?: { latitude: number; longitude: number; altitude: number; velocity: number };
  people?: { number: number; craft: string };
  neo?: { count: number };
  moonPhase?: string;
}

const widgets = [
  { id: "iss", icon: Satellite, label: "ISS Location", key: "iss" as const },
  { id: "people", icon: Users, label: "Astronauts in Space", key: "people" as const },
  { id: "apod", icon: ImageIcon, label: "NASA Image of the Day", key: "apod" as const },
  { id: "neo", icon: AlertTriangle, label: "Near Earth Objects", key: "neo" as const },
  { id: "moon", icon: Moon, label: "Moon Phase", key: "moonPhase" as const },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function LiveDataSection() {
  const [data, setData] = useState<LiveData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/space-data")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="live-data" className="section-padding aurora-bg relative">
      <div className="section-container">
        <SectionHeader
          label="Real-Time Cosmos"
          title="Live Space Data"
          description="Real-time data from NASA and space agencies around the world."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget, i) => {
            const Icon = widget.icon;
            return (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass gradient-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10">
                    <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="font-semibold">{widget.label}</h3>
                </div>

                {loading ? (
                  <div className="space-y-2">
                    <div className="h-8 skeleton rounded-lg" />
                    <div className="h-4 skeleton rounded-lg w-2/3" />
                  </div>
                ) : widget.key === "iss" && data.iss ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold gradient-text">
                      {data.iss.latitude.toFixed(2)}°, {data.iss.longitude.toFixed(2)}°
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Altitude: {data.iss.altitude.toFixed(0)} km · Speed: {data.iss.velocity.toFixed(0)} km/h
                    </p>
                  </div>
                ) : widget.key === "people" && data.people ? (
                  <div>
                    <p className="text-4xl font-bold gradient-text">
                      <AnimatedCounter value={data.people.number} />
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">aboard {data.people.craft}</p>
                  </div>
                ) : widget.key === "apod" && data.apod ? (
                  <div>
                    <p className="font-medium mb-1 line-clamp-1">{data.apod.title}</p>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{data.apod.explanation}</p>
                  </div>
                ) : widget.key === "neo" && data.neo ? (
                  <div>
                    <p className="text-4xl font-bold gradient-text">
                      <AnimatedCounter value={data.neo.count} />
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">objects tracked this week</p>
                  </div>
                ) : widget.key === "moonPhase" ? (
                  <div>
                    <p className="text-2xl font-bold gradient-text">{data.moonPhase || "Waxing Crescent"}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Current lunar phase</p>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">Data unavailable</p>
                )}
              </motion.div>
            );
          })}

          {[
            { icon: Rocket, label: "Latest Launch", value: "Falcon 9", sub: "Starlink Group 6-54" },
            { icon: Calendar, label: "Next Launch", value: "Mar 15", sub: "Artemis II Crew" },
            { icon: Sun, label: "Solar Activity", value: "Moderate", sub: "Kp Index: 3" },
            { icon: Cloud, label: "Mars Weather", value: "-63°C", sub: "Jezero Crater" },
            { icon: Globe, label: "Earth Weather", value: "Clear", sub: "Kennedy Space Center" },
            { icon: Satellite, label: "Satellites", value: "9,000+", sub: "Active in orbit" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (widgets.length + i) * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass gradient-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[var(--accent-secondary)]/10">
                    <Icon className="w-5 h-5 text-[var(--accent-secondary)]" />
                  </div>
                  <h3 className="font-semibold">{item.label}</h3>
                </div>
                <p className="text-2xl font-bold gradient-text">{item.value}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{item.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
