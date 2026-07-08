import { NextResponse } from "next/server";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function GET() {
  try {
    const [apodRes, issRes, peopleRes, neoRes] = await Promise.allSettled([
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`, { next: { revalidate: 3600 } }),
      fetch("http://api.open-notify.org/iss-now.json", { next: { revalidate: 30 } }),
      fetch("http://api.open-notify.org/astros.json", { next: { revalidate: 3600 } }),
      fetch(`https://api.nasa.gov/neo/rest/v1/feed/today?api_key=${NASA_API_KEY}`, { next: { revalidate: 3600 } }),
    ]);

    const data: Record<string, unknown> = {
      moonPhase: getMoonPhase(),
    };

    if (apodRes.status === "fulfilled" && apodRes.value.ok) {
      const apod = await apodRes.value.json();
      data.apod = {
        title: apod.title,
        url: apod.url,
        explanation: apod.explanation?.slice(0, 200) + "...",
      };
    }

    if (issRes.status === "fulfilled" && issRes.value.ok) {
      const iss = await issRes.value.json();
      data.iss = {
        latitude: parseFloat(iss.iss_position.latitude),
        longitude: parseFloat(iss.iss_position.longitude),
        altitude: 408,
        velocity: 27600,
      };
    }

    if (peopleRes.status === "fulfilled" && peopleRes.value.ok) {
      const people = await peopleRes.value.json();
      data.people = {
        number: people.number,
        craft: people.people?.[0]?.craft || "ISS",
      };
    }

    if (neoRes.status === "fulfilled" && neoRes.value.ok) {
      const neo = await neoRes.value.json();
      const today = Object.keys(neo.near_earth_objects || {})[0];
      data.neo = {
        count: neo.near_earth_objects?.[today]?.length || 0,
      };
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      apod: { title: "Pillars of Creation", url: "", explanation: "One of the most iconic images from the Hubble Space Telescope..." },
      iss: { latitude: 28.5, longitude: -45.2, altitude: 408, velocity: 27600 },
      people: { number: 7, craft: "ISS" },
      neo: { count: 12 },
      moonPhase: getMoonPhase(),
    });
  }
}

function getMoonPhase(): string {
  const phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  const lp = 2551443;
  const now = Date.now();
  const newMoon = new Date("2000-01-06").getTime();
  const phase = ((now - newMoon) / 1000) % lp;
  const index = Math.floor((phase / lp) * 8);
  return phases[index] || "Waxing Crescent";
}
