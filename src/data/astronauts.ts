export interface Astronaut {
  id: string;
  name: string;
  nationality: string;
  agency: string;
  birthYear: number;
  missions: string[];
  bio: string;
  achievements: string[];
  image: string;
}

export const astronauts: Astronaut[] = [
  {
    id: "armstrong",
    name: "Neil Armstrong",
    nationality: "American",
    agency: "NASA",
    birthYear: 1930,
    missions: ["Gemini 8", "Apollo 11"],
    bio: "First human to walk on the Moon. A test pilot and aerospace engineer who made history on July 20, 1969.",
    achievements: ["First Moon landing", "NASA Distinguished Service Medal", "Congressional Space Medal of Honor"],
    image: "/neil_armstrong.png",
  },
  {
    id: "glenn",
    name: "John Glenn",
    nationality: "American",
    agency: "NASA",
    birthYear: 1921,
    missions: ["Mercury-Atlas 6", "STS-95"],
    bio: "First American to orbit Earth and later became the oldest person to fly in space at age 77.",
    achievements: ["First American orbital flight", "Senator for Ohio", "Oldest person in space"],
    image: "/john_glenn.png",
  },
  {
    id: "ride",
    name: "Sally Ride",
    nationality: "American",
    agency: "NASA",
    birthYear: 1951,
    missions: ["STS-7", "STS-41-G"],
    bio: "First American woman in space. A physicist who inspired generations of women in STEM.",
    achievements: ["First American woman in space", "Youngest American astronaut at launch", "Founded Sally Ride Science"],
    image: "/sally_ride.png",
  },
  {
    id: "peake",
    name: "Tim Peake",
    nationality: "British",
    agency: "ESA",
    birthYear: 1972,
    missions: ["Soyuz TMA-19M", "Expedition 46/47"],
    bio: "First British ESA astronaut to visit the ISS. Ran the London Marathon from space in 2016.",
    achievements: ["First British ISS resident", "Ran marathon in space", "Military helicopter pilot"],
    image: "/tim_peake.png",
  },
  {
    id: "koch",
    name: "Christina Koch",
    nationality: "American",
    agency: "NASA",
    birthYear: 1979,
    missions: ["Soyuz MS-12", "Expedition 59/60/61"],
    bio: "Holds the record for longest single spaceflight by a woman at 328 days. Electrical engineer and spacewalk veteran.",
    achievements: ["Longest female spaceflight", "6 spacewalks", "First all-female spacewalk"],
    image: "/christina_koch.png",
  },
  {
    id: "gagarin",
    name: "Yuri Gagarin",
    nationality: "Soviet",
    agency: "Roscosmos",
    birthYear: 1934,
    missions: ["Vostok 1"],
    bio: "First human in space. Completed one orbit of Earth on April 12, 1961, becoming an international hero.",
    achievements: ["First human in space", "Hero of the Soviet Union", "International Space Day namesake"],
    image: "/yuri_gagarin.png",
  },
];
