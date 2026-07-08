"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { galleryItems, galleryCategories } from "@/data/gallery";
import { SectionHeader } from "@/components/ui/section-header";

export function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState<Set<string>>(new Set());

  const filtered = filter === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="section-padding relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Cosmic Beauty"
          title="Gallery"
          description="Stunning imagery from across the universe, captured by humanity's greatest eyes in the sky."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white glow-blue"
                  : "glass text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                {!loaded.has(item.id) && (
                  <div className={`skeleton w-full ${
                    item.aspect === "tall" ? "h-80" : item.aspect === "wide" ? "h-48" : "h-64"
                  }`} />
                )}
                <div className={`relative ${
                  item.aspect === "tall" ? "h-80" : item.aspect === "wide" ? "h-48" : "h-64"
                }`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={() => setLoaded((prev) => new Set(prev).add(item.id))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-white/60 text-sm">{item.category}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
