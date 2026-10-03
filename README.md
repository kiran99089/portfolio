# Cinematic Developer Portfolio — KIRAN EEGALA

A award-level, high-performance developer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, Three.js custom GLSL fragment/vertex shaders, Lenis smooth scrolling, and Framer Motion.

## 🚀 Live Demo & Features

- **GLSL Galaxy Background Canvas**: Fullscreen volumetric Simplex/FBM nebula shader (purple/violet left, cyan/blue right, magenta center) combined with a 3D GPU forward-travel particle starfield radiating outward with depth-attenuated streak parallax.
- **Single Source of Truth**: All personal information, skills, projects, work experience, certifications, and achievements reside in [`src/data/portfolio.ts`](src/data/portfolio.ts) for effortless editing.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-driven navigation to search sections, jump to projects, copy email, and download resume.
- **Terminal CLI Overlay (`~`)**: Retro developer interactive terminal with commands (`help`, `about`, `skills`, `projects`, `contact`, `clear`, `exit`).
- **Interactive Glassmorphic Bento Grid**: Skills categorized by Languages, Frontend, Backend, and AI/ML with level indicators and ambient hover glow.
- **Case Study Modal**: Featured projects with problem statements, solutions, key features, tech stack wall, and live/GitHub links.
- **Contact API Endpoint**: Functional glass contact form connected to Next.js API route (`/api/contact`) with validation, copy email feedback, and honeypot spam protection.
- **Accessibility & SEO**: Semantic HTML5, keyboard navigation focus rings, `prefers-reduced-motion` detection, JSON-LD Person schema, Open Graph metadata, `sitemap.ts`, and `robots.ts`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **WebGL / 3D Graphics**: Three.js + Custom GLSL Shaders
- **Animations**: Framer Motion + Lenis Smooth Scroll
- **Icons**: Lucide React
- **Typography**: Google Fonts (Outfit, Inter, JetBrains Mono via `next/font`)

---

## 💻 Local Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kiran99089/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build & Verification**:
   ```bash
   npm run build
   npm run start
   ```

---

## ✏️ How to Edit Content

All content is centrally managed in **`src/data/portfolio.ts`**:

```typescript
export const portfolioData: PortfolioData = {
  personal: {
    name: "KIRAN EEGALA",
    role: "Full-Stack & AI/ML Developer",
    subRoles: ["Full-Stack Developer", "AI-ML Engineer", "Software Engineer"],
    tagline: "Turning Ideas into Intelligent, Scalable Experiences.",
    email: "eegalakiran@gmail.com",
    github: "https://github.com/kiran99089",
    linkedin: "https://www.linkedin.com/in/eegalakiran/",
    resume: "/EEGALA_KIRAN.pdf",
    // ...
  },
  // Update skills, projects, experience, certifications, and achievements here!
};
```

---

## 🌐 Deploy to Vercel (Zero Config)

This project is optimized for deployment on **Vercel** with 0 manual configuration required:

1. Push your repository to GitHub / GitLab.
2. Import the project in Vercel Dashboard.
3. Click **Deploy**. Next.js App Router will automatically detect all build parameters.

---

## ⚡ Performance & Quality Verification

- **TypeScript Type Safety**: 100% strictly typed.
- **Dynamic Imports**: Three.js WebGL canvas loaded client-side with `{ ssr: false }`.
- **DPR Cap**: Capped at `1.5` on desktop and `1.0` on mobile devices for smooth 60 FPS performance.
- **Tab Visibility**: WebGL animation loop automatically pauses when tab is hidden (`visibilitychange`).
