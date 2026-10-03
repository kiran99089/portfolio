<<<<<<< HEAD
#  Developer Portfolio — KIRAN EEGALA

An award-level, high-performance developer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, Three.js custom GLSL shaders, Lenis smooth scrolling, and Framer Motion.

## 🚀 Features

- **GLSL Galaxy Background**: Fullscreen volumetric nebula shader with a 3D GPU particle starfield and depth-based parallax streaks.
- **AI Chatbot**: Gemini-powered assistant that answers questions about my skills, projects and education, with rate limiting and input validation.
- **Single Source of Truth**: All personal info, skills, projects, experience, certifications and achievements live in [`src/data/portfolio.ts`](src/data/portfolio.ts).
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-driven navigation to sections and projects, copy email, download resume.
- **Terminal CLI Overlay (`~`)**: Interactive developer terminal with `help`, `about`, `skills`, `projects`, `contact`, `clear`, `exit`.
- **Glassmorphic Bento Grid**: Skills grouped by Languages, Frontend, Backend and AI/ML with ambient hover glow.
- **Case Study Modal**: Problem, solution, key features, tech stack and live/GitHub links for each project.
- **Contact Form**: Next.js API route (`/api/contact`) using Resend, with validation, rate limiting and honeypot spam protection.
- **Accessibility & SEO**: Semantic HTML, focus rings, `prefers-reduced-motion` support, JSON-LD Person schema, Open Graph metadata, `sitemap.ts` and `robots.ts`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Graphics**: Three.js + custom GLSL shaders
- **Animation**: Framer Motion + Lenis
- **AI**: Google Gemini API (chatbot)
- **Email**: Resend (contact form)
- **Icons**: Lucide React
- **Fonts**: Outfit, Inter, JetBrains Mono via `next/font`

---

## 💻 Local Setup

1. **Clone the repository**
```bash
   git clone https://github.com/kiran99089/portfolio.git
   cd portfolio
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create `.env.local`** in the project root
```env
   GEMINI_API_KEY=your_gemini_key
   GEMINI_MODEL=gemini-2.5-flash
   RESEND_API_KEY=your_resend_key
   CONTACT_TO_EMAIL=your_resend_signup_email
```

4. **Start the dev server**
```bash
   npm run dev
```
   Open [http://localhost:3000](http://localhost:3000).

5. **Production build**
```bash
   npm run build
   npm run start
```

---

## ✏️ Editing Content

All content is managed in **`src/data/portfolio.ts`**:

```typescript
export const portfolioData: PortfolioData = {
  personal: {
    name: "KIRAN EEGALA",
    role: "Full-Stack & AI/ML Developer",
    subRoles: ["Full-Stack Developer", "AI-ML Engineer", "Software Engineer"],
    tagline: "Turning Ideas into Intelligent, Scalable Experiences.",
    github: "https://github.com/kiran99089",
    linkedin: "https://www.linkedin.com/in/eegalakiran/",
    resume: "/EEGALA_KIRAN.pdf",
  },
  // Update skills, projects, experience, certifications and achievements here
};
```

---

## 🌐 Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Add these **Environment Variables**:

   | Name | Purpose |
   |---|---|
   | `GEMINI_API_KEY` | Chatbot |
   | `GEMINI_MODEL` | Chatbot model (e.g. `gemini-2.5-flash`) |
   | `RESEND_API_KEY` | Contact form |
   | `CONTACT_TO_EMAIL` | Inbox that receives messages |

4. Click **Deploy**.

> With Resend's free test sender (`onboarding@resend.dev`), `CONTACT_TO_EMAIL` must be the email you signed up to Resend with. To send elsewhere, verify your own domain in Resend.

---

## ⚡ Performance Notes

- **Dynamic imports**: The Three.js canvas loads client-side only (`ssr: false`).
- **DPR cap**: `1.5` on desktop and `1.0` on mobile for smooth 60 FPS.
- **Tab visibility**: The WebGL loop pauses automatically when the tab is hidden.

---

## 📬 Contact

- GitHub: [kiran99089](https://github.com/kiran99089)
- LinkedIn: [eegalakiran](https://www.linkedin.com/in/eegalakiran/)
=======
# portfolio
Cinematic developer portfolio built with Next.js, Three.js GLSL shaders, and Framer Motion, featuring an AI chatbot, command palette, terminal CLI and contact form.
>>>>>>> 5b730ab9e914dfb57d12543df205de8f8b21bc82
