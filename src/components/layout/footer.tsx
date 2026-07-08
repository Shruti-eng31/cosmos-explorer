"use client";

import { motion } from "framer-motion";
import { Rocket, Twitter, Github, Youtube, Mail, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative overflow-hidden pt-20 pb-8">
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-[var(--accent-primary)]" />
              <span className="text-xl font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                COSMOS
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Exploring the universe through immersive technology and storytelling.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {["Solar System", "Missions", "Planets", "Gallery"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {["NASA API", "Live Data", "Timeline", "Statistics"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Get cosmic updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-full glass text-sm bg-transparent outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              />
              <button className="p-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white hover:glow-blue transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--glass-border)]">
          <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <p className="text-sm text-[var(--text-muted)]">
              © 2026 COSMOS. Built with curiosity and code.
            </p>
            <p className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse flex items-center gap-2">
              <span className="w-6 h-6 rounded-full overflow-hidden border border-pink-500/50 inline-block">
                <img src="/shruti_avatar.png" alt="Shruti Singh" className="w-full h-full object-cover" />
              </span>
              Designed by Shruti Singh
            </p>
          </div>

          <div className="flex gap-4">
            {[Twitter, Github, Youtube, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 rounded-full glass hover:glow-blue transition-all group"
              >
                <Icon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-32 right-12 hidden lg:block opacity-20"
        >
          <Rocket className="w-16 h-16 text-[var(--accent-primary)] rotate-45" />
        </motion.div>
      </div>
    </footer>
  );
}
