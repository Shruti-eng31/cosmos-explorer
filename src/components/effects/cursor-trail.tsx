"use client";

import { useCursorTrail } from "@/hooks/use-cursor-trail";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CursorTrail() {
  const particles = useCursorTrail();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const color = resolvedTheme === "dark" ? "#00D4FF" : "#6366f1";

  return (
    <div className="cursor-trail hidden md:block">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: color,
            opacity: 0.4,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
