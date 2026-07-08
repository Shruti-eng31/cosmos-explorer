import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navigation } from "@/components/layout/navigation";
import { CursorTrail } from "@/components/effects/cursor-trail";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COSMOS — Explore Beyond Earth",
  description:
    "A premium immersive space exploration experience. Journey through planets, missions, discoveries, and the future of humanity in space.",
  keywords: ["space", "NASA", "planets", "astronomy", "exploration", "solar system", "missions"],
  openGraph: {
    title: "COSMOS — Explore Beyond Earth",
    description: "Journey through the cosmos in this immersive space exploration experience.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Navigation />
            <CursorTrail />
            <main>{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
