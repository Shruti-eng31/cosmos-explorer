"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolarSystem = dynamic(() => import("@/components/3d/solar-system").then(m => m.SolarSystem), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#030508]">
      <div className="w-16 h-16 rounded-full border-4 border-t-[#ffcc00] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
    </div>
  ),
});

export default function WelcomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#030508]">
      <SolarSystem />
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-12 pointer-events-none">
        {/* Top Overlay */}
        <div className="w-full flex justify-between items-start">
          <div className="pointer-events-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">
              Cosmos
            </h1>
            <p className="text-[#4da6ff] tracking-[0.3em] uppercase text-sm mt-2 font-medium">
              A Journey Through Space
            </p>
          </div>
        </div>

        {/* Bottom Overlay */}
        <div className="w-full flex flex-col items-center gap-8 pointer-events-auto">
          <div className="text-center max-w-2xl bg-black/30 p-6 rounded-2xl backdrop-blur-md border border-white/10">
            <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">
              Explore Our Solar System
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Witness the beauty of our planetary neighborhood. From the scorching surface of Mercury to the icy rings of Saturn, embark on a voyage of discovery.
            </p>
          </div>
          
          <Link href="/">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
              Enter Universe
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
