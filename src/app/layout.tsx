import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DynamicGalaxyCanvas from "@/components/canvas/DynamicGalaxyCanvas";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import TerminalOverlay from "@/components/ui/TerminalOverlay";
// import Preloader from "@/components/ui/Preloader";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { portfolioData } from "@/data/portfolio";

const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KIRAN EEGALA",
  description:
    "Portfolio of Kiran Eegala - Final-year B.Tech CSE student & Developer specializing in Full-Stack web development, AI/ML engineering, and high-performance digital experiences.",

  verification: {
    google: "google638069445fbeda38.html",
  },

  keywords: [
    "Kiran Eegala",
    "EEGALA KIRAN",
    "Developer Portfolio",
    "Full-Stack Developer",
    "AI ML Engineer",
    "Next.js",
    "Three.js",
    "React",
    "TypeScript",
  ],

  authors: [{ name: "Kiran Eegala" }],

  openGraph: {
    title: "KIRAN EEGALA | Developer Portfolio",
    description: "Turning Ideas into Intelligent, Scalable Experiences.",
    url: "https://kiran-eegala.vercel.app",
    siteName: "Kiran Eegala Portfolio",
    locale: "en_US",
    type: "website",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioData.personal.name,
  jobTitle: portfolioData.personal.role,
  email: portfolioData.personal.email,
  sameAs: [portfolioData.personal.github, portfolioData.personal.linkedin],
  knowsAbout: [
    "Full-Stack Development",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030308] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden min-h-screen">
        {/* <Preloader /> */}
        <CustomCursor />
        <ScrollProgressBar />
        <CommandPalette />
        <TerminalOverlay />
        <SmoothScrollProvider>
          {/* Fixed GLSL Galaxy Canvas Background */}
          <DynamicGalaxyCanvas />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
