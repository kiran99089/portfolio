import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import DynamicGalaxyCanvas from "@/components/canvas/DynamicGalaxyCanvas";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import TerminalOverlay from "@/components/ui/TerminalOverlay";
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

/* =========================================================
   SEO METADATA
   ========================================================= */

export const metadata: Metadata = {
  title: "Eegala Kiran | Computer Science Student & Developer",

  description:
    "Eegala Kiran is a final-year B.Tech Computer Science student and developer passionate about Full-Stack Development, AI/ML, Cloud, and DevOps.",

  verification: {
    google: "iLW6TS13kPveFbYW771_5jKs3Zo2UHhkiPKOC_r_AsA",
  },

  keywords: [
    "Eegala Kiran",
    "Kiran Eegala",
    "Eegala Kiran Portfolio",
    "Kiran Eegala Portfolio",
    "Computer Science Student",
    "Full-Stack Developer",
    "AI ML Developer",
    "Web Developer",
    "Software Developer",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "TypeScript Developer",
    "AWS",
    "DevOps",
  ],

  authors: [
    {
      name: "Eegala Kiran",
    },
  ],

  creator: "Eegala Kiran",
  publisher: "Eegala Kiran",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Eegala Kiran | Computer Science Student & Developer",

    description:
      "Portfolio of Eegala Kiran — Computer Science student and developer building modern web, AI, cloud, and software solutions.",

    url: "https://eegala-kiran.vercel.app",

    siteName: "Eegala Kiran Portfolio",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Eegala Kiran | Computer Science Student & Developer",

    description:
      "Portfolio of Eegala Kiran — Computer Science student and developer passionate about Full-Stack Development, AI/ML, Cloud, and DevOps.",
  },

  alternates: {
    canonical:
      "https://eegala-kiran.vercel.app",
  },
};

/* =========================================================
   STRUCTURED DATA
   ========================================================= */

const jsonLd = {
  "@context": "https://schema.org",

  "@type": "Person",

  name: "Eegala Kiran",

  alternateName: [
    "Kiran Eegala",
    "EEGALA KIRAN",
  ],

  url: "https://eegala-kiran.vercel.app",

  jobTitle: portfolioData.personal.role,

  email: portfolioData.personal.email,

  sameAs: [
    portfolioData.personal.github,
    portfolioData.personal.linkedin,
  ],

  knowsAbout: [
    "Full-Stack Development",
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "AWS",
    "DevOps",
    "Cloud Computing",
  ],
};

/* =========================================================
   ROOT LAYOUT
   ========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} dark scroll-smooth`}
    >
      <head>
        {/* Person Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="bg-[#030308] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden min-h-screen">
        <CustomCursor />

        <ScrollProgressBar />

        <CommandPalette />

        <TerminalOverlay />

        <SmoothScrollProvider>
          {/* Fixed GLSL Galaxy Background */}
          <DynamicGalaxyCanvas />

          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}