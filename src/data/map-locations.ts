export interface MapLocation {
  id: string;
  name: string;
  type: "launch" | "observatory" | "agency" | "tracking";
  lat: number;
  lng: number;
  description: string;
}

export const mapLocations: MapLocation[] = [
  { id: "kennedy", name: "Kennedy Space Center", type: "launch", lat: 28.57, lng: -80.65, description: "Primary NASA launch facility" },
  { id: "cape-canaveral", name: "Cape Canaveral", type: "launch", lat: 28.39, lng: -80.61, description: "Historic US launch site" },
  { id: "baikonur", name: "Baikonur Cosmodrome", type: "launch", lat: 45.96, lng: 63.31, description: "World's first spaceport" },
  { id: "jiuquan", name: "Jiuquan Satellite Launch Center", type: "launch", lat: 40.96, lng: 100.29, description: "China's first launch site" },
  { id: "kourou", name: "Guiana Space Centre", type: "launch", lat: 5.24, lng: -52.77, description: "ESA's primary launch site" },
  { id: "mauna-kea", name: "Mauna Kea Observatories", type: "observatory", lat: 19.82, lng: -155.47, description: "World-class astronomical observatory" },
  { id: "paranal", name: "Paranal Observatory", type: "observatory", lat: -24.63, lng: -70.40, description: "Home of the Very Large Telescope" },
  { id: "nasa-hq", name: "NASA Headquarters", type: "agency", lat: 38.88, lng: -77.02, description: "US space agency headquarters" },
  { id: "esa-hq", name: "ESA Headquarters", type: "agency", lat: 48.85, lng: 2.35, description: "European Space Agency" },
  { id: "jaxa", name: "JAXA Tsukuba", type: "agency", lat: 36.07, lng: 140.13, description: "Japan Aerospace Exploration Agency" },
];
