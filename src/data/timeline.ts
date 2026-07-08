export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: string;
  image?: string;
}

export const timelineEvents: TimelineEvent[] = [
  { year: 1957, title: "Sputnik 1", description: "First artificial satellite launched by the Soviet Union, beginning the Space Age.", category: "Satellite" },
  { year: 1961, title: "First Human in Space", description: "Yuri Gagarin completes one orbit of Earth aboard Vostok 1.", category: "Human Spaceflight" },
  { year: 1969, title: "Moon Landing", description: "Apollo 11 lands on the Moon. Neil Armstrong takes humanity's first steps on another world.", category: "Moon" },
  { year: 1977, title: "Voyager Launch", description: "Twin Voyager probes begin their grand tour of the outer solar system.", category: "Exploration" },
  { year: 1981, title: "Space Shuttle Era", description: "Columbia launches, beginning 30 years of reusable space shuttle missions.", category: "Human Spaceflight" },
  { year: 1990, title: "Hubble Deployed", description: "Hubble Space Telescope revolutionizes astronomy from orbit.", category: "Telescope" },
  { year: 1998, title: "ISS Assembly Begins", description: "First module of the International Space Station launched.", category: "Station" },
  { year: 2004, title: "Spirit & Opportunity", description: "Mars rovers land, operating far beyond their planned 90-day missions.", category: "Mars" },
  { year: 2012, title: "Curiosity Lands", description: "Car-sized rover lands on Mars using revolutionary sky crane technique.", category: "Mars" },
  { year: 2015, title: "New Horizons at Pluto", description: "First close-up images of Pluto reveal a complex, active world.", category: "Exploration" },
  { year: 2020, title: "Crew Dragon", description: "SpaceX launches first crewed mission from US soil since 2011.", category: "Human Spaceflight" },
  { year: 2021, title: "James Webb Launches", description: "Most powerful space telescope begins observing the early universe.", category: "Telescope" },
  { year: 2024, title: "Artemis Returns", description: "NASA's Artemis program aims to return humans to the Moon.", category: "Moon" },
];
