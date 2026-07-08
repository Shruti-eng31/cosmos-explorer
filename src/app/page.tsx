import { Hero } from "@/components/sections/hero";
import { SolarSystemSection } from "@/components/sections/solar-system-section";
import { MissionsSection } from "@/components/sections/missions-section";
import { LiveDataSection } from "@/components/sections/live-data-section";
import { PlanetsSection } from "@/components/sections/planets-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { EarthViewerSection } from "@/components/sections/earth-viewer-section";
import { AstronautsSection } from "@/components/sections/astronauts-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { StatsSection } from "@/components/sections/stats-section";
import { MapSection } from "@/components/sections/map-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SolarSystemSection />
      <MissionsSection />
      <LiveDataSection />
      <PlanetsSection />
      <TimelineSection />
      <EarthViewerSection />
      <AstronautsSection />
      <GallerySection />
      <StatsSection />
      <MapSection />
      <Footer />
    </>
  );
}
