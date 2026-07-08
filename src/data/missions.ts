export interface Mission {
  id: string;
  name: string;
  agency: string;
  launchDate: string;
  duration: string;
  status: "completed" | "active" | "planned";
  description: string;
  objectives: string[];
  achievements: string[];
  image: string;
  category: string;
  stats: { label: string; value: string }[];
}

export const missions: Mission[] = [
  {
    id: "apollo-11",
    name: "Apollo 11",
    agency: "NASA",
    launchDate: "July 16, 1969",
    duration: "8 days",
    status: "completed",
    description: "First crewed mission to land on the Moon. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above.",
    objectives: ["Land humans on the Moon", "Return safely to Earth", "Conduct scientific experiments"],
    achievements: ["First human Moon landing", "Collected 21.5 kg of lunar samples", "Planted American flag on Moon"],
    image: "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg",
    category: "Apollo",
    stats: [{ label: "Crew", value: "3" }, { label: "Distance", value: "384,400 km" }, { label: "EVA Time", value: "2h 31m" }],
  },
  {
    id: "voyager",
    name: "Voyager Program",
    agency: "NASA",
    launchDate: "August 20, 1977",
    duration: "47+ years",
    status: "active",
    description: "Twin probes that conducted a grand tour of the outer planets and continue sending data from interstellar space.",
    objectives: ["Explore outer planets", "Study heliosphere boundary", "Carry Golden Record to aliens"],
    achievements: ["First close-up images of Uranus & Neptune", "Entered interstellar space", "Longest operating spacecraft"],
    image: "https://images-assets.nasa.gov/image/PIA17046/PIA17046~orig.jpg",
    category: "Voyager",
    stats: [{ label: "Probes", value: "2" }, { label: "Distance", value: "24+ billion km" }, { label: "Instruments", value: "10 each" }],
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    agency: "NASA/ESA",
    launchDate: "April 24, 1990",
    duration: "35+ years",
    status: "active",
    description: "Revolutionary space telescope that has transformed our understanding of the universe with breathtaking deep field images.",
    objectives: ["Observe universe without atmospheric distortion", "Determine expansion rate of universe", "Study galaxy formation"],
    achievements: ["1.5 million observations", "Helped determine universe age", "Captured iconic Pillars of Creation"],
    image: "https://images-assets.nasa.gov/image/STScI-PRC95-45a/STScI-PRC95-45a~orig.jpg",
    category: "Hubble",
    stats: [{ label: "Orbit", value: "547 km" }, { label: "Observations", value: "1.5M+" }, { label: "Papers", value: "20,000+" }],
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    agency: "NASA/ESA/CSA",
    launchDate: "December 25, 2021",
    duration: "3+ years",
    status: "active",
    description: "The most powerful space telescope ever built, observing in infrared to peer through cosmic dust and study the early universe.",
    objectives: ["Study first galaxies", "Analyze exoplanet atmospheres", "Observe star formation"],
    achievements: ["Deepest infrared image ever", "Detected earliest galaxies", "Analyzed exoplanet atmospheres"],
    image: "https://images-assets.nasa.gov/image/PIA25434/PIA25434~orig.jpg",
    category: "James Webb",
    stats: [{ label: "Mirror", value: "6.5m" }, { label: "Distance", value: "1.5M km" }, { label: "Wavelength", value: "Infrared" }],
  },
  {
    id: "perseverance",
    name: "Mars Perseverance",
    agency: "NASA",
    launchDate: "July 30, 2020",
    duration: "4+ years",
    status: "active",
    description: "Advanced Mars rover searching for signs of ancient microbial life and collecting samples for future return to Earth.",
    objectives: ["Search for ancient life", "Collect rock samples", "Test MOXIE oxygen production"],
    achievements: ["Ingenuity first powered flight on Mars", "Collected 20+ sample tubes", "Detected organic molecules"],
    image: "https://images-assets.nasa.gov/image/PIA24420/PIA24420~orig.jpg",
    category: "Mars Rover",
    stats: [{ label: "Instruments", value: "7" }, { label: "Samples", value: "20+" }, { label: "Distance", value: "30+ km" }],
  },
  {
    id: "artemis",
    name: "Artemis Program",
    agency: "NASA",
    launchDate: "November 16, 2022",
    duration: "Ongoing",
    status: "active",
    description: "NASA's program to return humans to the Moon and establish a sustainable lunar presence as a stepping stone to Mars.",
    objectives: ["Land first woman on Moon", "Establish lunar base", "Test technologies for Mars"],
    achievements: ["Artemis I successful uncrewed orbit", "SLS most powerful rocket launched", "Gateway lunar station planned"],
    image: "https://images-assets.nasa.gov/image/artemis_i_liftoff/artemis_i_liftoff~orig.jpg",
    category: "Artemis",
    stats: [{ label: "Missions", value: "3 planned" }, { label: "Crew", value: "4 per mission" }, { label: "Duration", value: "30 days max" }],
  },
  {
    id: "iss",
    name: "International Space Station",
    agency: "NASA/Roscosmos/ESA/JAXA/CSA",
    launchDate: "November 20, 1998",
    duration: "26+ years",
    status: "active",
    description: "The largest human-made object in space, serving as a microgravity laboratory for scientific research and international cooperation.",
    objectives: ["Conduct microgravity research", "Test life support systems", "International cooperation"],
    achievements: ["3,000+ experiments conducted", "Continuous human presence since 2000", "Over 260 visitors from 20 countries"],
    image: "https://images-assets.nasa.gov/image/iss070e025619/iss070e025619~orig.jpg",
    category: "ISS",
    stats: [{ label: "Mass", value: "420 tonnes" }, { label: "Orbit", value: "408 km" }, { label: "Speed", value: "27,600 km/h" }],
  },
  {
    id: "starship",
    name: "Starship",
    agency: "SpaceX",
    launchDate: "2024+",
    duration: "Future",
    status: "planned",
    description: "Fully reusable super heavy-lift launch system designed to carry humans to Mars and enable multi-planetary civilization.",
    objectives: ["Mars colonization", "Fully reusable launch", "100+ ton payload to orbit"],
    achievements: ["Successful test flights", "Largest rocket ever built", "Booster catch demonstrated"],
    image: "https://images-assets.nasa.gov/image/KSC-20230417-PH-KLS01_0076/KSC-20230417-PH-KLS01_0076~orig.jpg",
    category: "Future",
    stats: [{ label: "Height", value: "121m" }, { label: "Payload", value: "150 tonnes" }, { label: "Reusability", value: "100%" }],
  },
];
