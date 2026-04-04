# Naman Portfolio — Overview & Implementation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Architecture & Data Flow](#4-architecture--data-flow)
5. [Routing & Pages](#5-routing--pages)
6. [Component Implementation](#6-component-implementation)
7. [AI Feature: Dynamic Content Tailoring](#7-ai-feature-dynamic-content-tailoring)
8. [Data Layer](#8-data-layer)
9. [Styling & Design System](#9-styling--design-system)
10. [Forms & Validation](#10-forms--validation)
11. [Custom Hooks](#11-custom-hooks)
12. [Configuration](#12-configuration)
13. [Scripts & Development](#13-scripts--development)

---

## 1. Project Overview

**Naman Sharma's Personal Portfolio Website** is a modern, AI-powered single-page application built with Next.js. It is designed to showcase Naman's professional background as an **SAP Enthusiast and BTP CAPM Developer**.

### What it does

- Presents Naman's complete professional profile: hero introduction, about me, education, internships, certifications, achievements, skills, projects, GitHub activity, and a contact form.
- Integrates **Google Gemini AI** (via Genkit) to dynamically rewrite the "About Me" summary and project descriptions based on the visitor's professional profile (Recruiter, Developer, or Project Manager).
- Provides a seamless, accessible, and responsive user experience with dark/light theme support.

### Key Differentiator

Most portfolios are static. This portfolio uses **AI-driven content personalization**: a dropdown in the sticky navigation lets visitors select their role, and the portfolio's text adapts in real time to highlight what matters most to that visitor.

---

## 2. Tech Stack

| Category | Technology | Version |
|---|---|---|
| Frontend Framework | Next.js (App Router) | 15.3.8 |
| UI Library | React | 18.3.1 |
| Language | TypeScript | latest |
| Styling | Tailwind CSS | 3.4.1 |
| Component Library | Radix UI + shadcn/ui | various |
| AI Orchestration | Google Genkit | 1.14.1 |
| LLM | Google Gemini 2.0 Flash | via @genkit-ai/googleai |
| Forms | react-hook-form + Zod | 7.54.2 / 3.24.2 |
| Icons | Lucide React | 0.475.0 |
| Theme | next-themes | 0.3.0 |
| GitHub Activity | react-github-calendar | 4.1.4 |
| Backend/Cloud | Firebase | 11.9.1 |
| Charts | Recharts | 2.15.1 |
| Carousel | Embla Carousel | 8.6.0 |
| Bundler | Turbopack (via Next.js) | — |

---

## 3. Project Structure

```
Naman-Portfolio/
├── docs/
│   ├── blueprint.md          # Original project blueprint
│   └── implementation.md     # This file
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout: metadata, theme, fonts
│   │   ├── page.tsx           # Main home page; orchestrates all sections
│   │   └── actions/
│   │       └── send-contact-email.ts  # Server action (currently disabled)
│   ├── components/
│   │   ├── header.tsx         # Sticky nav with profile selector
│   │   ├── hero.tsx           # Hero banner section
│   │   ├── about.tsx          # About / accordion section
│   │   ├── skills.tsx         # Skills grid
│   │   ├── projects.tsx       # Project cards
│   │   ├── github-activity.tsx # GitHub contribution calendar
│   │   ├── contact.tsx        # Contact form + info
│   │   ├── footer.tsx         # Simple copyright footer
│   │   ├── dynamic-content-toggle.tsx  # AI profile switcher dropdown
│   │   ├── theme-provider.tsx # next-themes wrapper
│   │   └── ui/                # 45 shadcn/Radix UI primitives
│   ├── ai/
│   │   ├── genkit.ts          # Genkit + Google AI initialization
│   │   ├── dev.ts             # Genkit dev server entry point
│   │   └── flows/
│   │       └── tailor-content.ts  # AI flow: content personalization
│   ├── hooks/
│   │   ├── use-toast.ts       # Toast notification state hook
│   │   └── use-mobile.tsx     # Mobile viewport detection hook
│   └── lib/
│       ├── data.ts            # All portfolio content (single source of truth)
│       └── utils.ts           # cn() utility (clsx + tailwind-merge)
├── next.config.ts             # Next.js config (image domains, error suppression)
├── tailwind.config.ts         # Tailwind theme (colors, fonts, animations)
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS config for Tailwind
└── apphosting.yaml            # Firebase App Hosting config
```

---

## 4. Architecture & Data Flow

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   Next.js App Router                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  layout.tsx  (ThemeProvider, Toaster, Arima font)   │     │
│  │                                                     │     │
│  │  ┌──────────────────────────────────────────────┐   │     │
│  │  │  page.tsx  (Client Component)                │   │     │
│  │  │  - State: tailoredContent, isTailoring       │   │     │
│  │  │  - handleProfileChange → tailorContent()     │   │     │
│  │  │                                              │   │     │
│  │  │  Header ─── DynamicContentToggle             │   │     │
│  │  │  Hero                                        │   │     │
│  │  │  About  ← tailored About text                │   │     │
│  │  │  Skills                                      │   │     │
│  │  │  Projects ← tailored project descriptions   │   │     │
│  │  │  GithubActivity                              │   │     │
│  │  │  Contact                                     │   │     │
│  │  │  Footer                                      │   │     │
│  │  └──────────────────────────────────────────────┘   │     │
│  └─────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
                         │
                  Server Action
                         │
┌──────────────────────────────────────────────────────────────┐
│               src/ai/flows/tailor-content.ts                 │
│               (Genkit Flow — runs server-side)               │
│                         │                                    │
│               Google Gemini 2.0 Flash API                    │
└──────────────────────────────────────────────────────────────┘
```

### AI Content Tailoring Data Flow

```
1. User opens profile dropdown in header
2. Selects: "Recruiter" | "Developer" | "Project Manager"
3. page.tsx → handleProfileChange(profile)
4. Extracts original text from portfolioData (src/lib/data.ts)
5. Calls tailorContent() server action with:
   ├── visitorProfile: "Recruiter"
   ├── aboutMeSection: original About text
   └── projectDescriptions: { "FEM S.H.I.E.L.D": "...", ... }
6. tailorContent() → tailorContentFlow (Genkit) → Gemini LLM
7. Gemini returns tailored JSON:
   ├── tailoredAboutMe: "rewritten about me"
   └── tailoredProjectDescriptions: { "FEM S.H.I.E.L.D": "rewritten..." }
8. page.tsx state updated → About & Projects re-render
9. Skeleton loaders shown during async transition (useTransition)
```

---

## 5. Routing & Pages

The portfolio uses Next.js **App Router** and is a **single-page application** with anchor-based section navigation.

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | The entire portfolio (single page) |

### In-page anchor navigation

| Anchor | Section |
|---|---|
| `#hero` | Hero banner |
| `#about` | About me / accordion |
| `#skills` | Skills grid |
| `#projects` | Project cards |
| `#github-activity` | GitHub contribution calendar |
| `#contact` | Contact form |

Navigation links in the header scroll to these anchors using native browser `scroll-smooth` behavior (set on `<html>` via Tailwind).

---

## 6. Component Implementation

### `layout.tsx` — Root Layout

- Sets HTML metadata: title (`"Naman | Portfolio"`) and description.
- Applies `font-arima` class (Google Fonts: Arima) and `antialiased` to `<body>`.
- Wraps children with `ThemeProvider` (dark/light mode) and `Toaster` (notifications).

### `page.tsx` — Home Page

The main client component orchestrating the entire page.

```
State:
  tailoredContent: { aboutMe: string; projectDescriptions: Record<string, string> } | null
  isTailoring: boolean  (managed by React's useTransition)

Prop drilling:
  About    ← tailoredAboutMe (string | null)
  Projects ← tailoredProjectDescriptions (object | null)
  Header   ← handleProfileChange callback + isTailoring flag
```

When `handleProfileChange("Default")` is called, `tailoredContent` is reset to `null` and components fall back to original `portfolioData` text.

### `header.tsx` — Navigation Header

- Sticky top bar with left-side logo/name and right-side links + controls.
- Renders anchor links for About, Skills, Projects, Contact.
- Embeds `<DynamicContentToggle>` for AI profile switching.
- Provides a **"Resume"** download link.

### `hero.tsx` — Hero Section

- Displays Naman's name, job title (`"SAP Enthusiast & BTP CAPM Developer"`), and a subtitle tagline.
- Shows LinkedIn and GitHub icon buttons linking to external profiles.

### `about.tsx` — About Section

- **Professional Summary**: renders `tailoredAboutMe` when available; shows a `<Skeleton>` while tailoring.
- **Accordion panels** (Radix `<Accordion>`):
  - **Education**: B.Tech Poornima University (2023–2027, CGPA 7.41) + 12th CBSE (2022–2023, 89.8%)
  - **Internships**: SAP UI5 Fiori (May 2024) + SAP BTP CAPM (June 2025)
  - **Certifications**: 6 certs including SAP CAP, Generative AI (Google), Design Thinking
  - **Achievements**: Smart India Hackathon + SAP Hackfest 2025 (Round 2)

### `skills.tsx` — Skills Grid

- Displays 7 skill categories as shadcn `<Card>` components in a responsive grid.
- Each card shows a Lucide icon, category name, and a row of `<Badge>` tags for individual skills.
- Categories: Programming Languages, SAP Technologies, Web Development, Cloud & Platforms, Version Control, Frameworks & Tools, Development Methodologies.

### `projects.tsx` — Project Cards

- Renders 4 project cards in a responsive 1–3 column grid.
- Each card contains: title, description (AI-tailored when available, skeleton while loading), tech stack badges, and icon buttons for GitHub and Live Demo links.
- Projects:
  1. **FEM S.H.I.E.L.D** — Women's safety web app (PHP, JavaScript)
  2. **WaterTrack** — Industrial water monitoring on SAP BTP
  3. **Library Bookshop** — Cloud bookshop manager on SAP BTP
  4. **Performance Tracker** — Educational institution portal on SAP BTP

### `github-activity.tsx` — GitHub Calendar

- Wraps the `react-github-calendar` library component.
- Renders Naman's GitHub contribution heatmap (`namansha20`).
- Styled to match the site's color scheme via `colorScheme` prop.

### `contact.tsx` — Contact Form

- Left column: contact info cards (email, phone, location).
- Right column: `react-hook-form` form with Zod validation for Name, Email, Subject, Message.
- On submit, opens a `mailto:` link pre-filled with form values (client-side email; no backend required).
- Uses `useToast` to notify the user after submission.

### `dynamic-content-toggle.tsx` — AI Profile Selector

- Radix `<DropdownMenu>` in the header.
- Options: Default, Recruiter, Developer, Project Manager.
- Shows a spinning `<Loader2>` icon while the AI flow is processing.
- Calls `onProfileChange(profile)` from `page.tsx` on selection.

### `footer.tsx` — Footer

- Single line: `"© {year} Naman Sharma. All rights reserved."`.

---

## 7. AI Feature: Dynamic Content Tailoring

### Genkit Setup (`src/ai/genkit.ts`)

```typescript
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
```

Genkit is initialized once and exported as `ai`. The Google AI plugin automatically reads `GOOGLE_GENAI_API_KEY` from the environment.

### Flow Definition (`src/ai/flows/tailor-content.ts`)

Uses Genkit's `ai.defineFlow` with Zod schemas for type-safe inputs and outputs.

**Input schema:**
```typescript
{
  visitorProfile: string;          // "Recruiter" | "Developer" | "Project Manager"
  aboutMeSection: string;          // Original About Me text
  projectDescriptions: Record<string, string>;  // { title: description }
}
```

**Output schema:**
```typescript
{
  tailoredAboutMe: string;
  tailoredProjectDescriptions: Record<string, string>;
}
```

**Prompt strategy:**  
A Handlebars-style template instructs the LLM to rewrite the content while keeping it accurate and concise, tailored to the selected visitor type's interests and terminology.

**Exported server action:**
```typescript
export async function tailorContent(input: TailorContentInput): Promise<TailorContentOutput> {
  return tailorContentFlow(input);
}
```

The `'use server'` directive marks this as a Next.js Server Action, callable directly from client components.

### Development Workflow

```bash
# Run Genkit dev UI for testing flows
npm run genkit:dev

# Hot-reload Genkit dev server
npm run genkit:watch
```

---

## 8. Data Layer

All portfolio content lives in **`src/lib/data.ts`** as a single exported `portfolioData` object. This is the **single source of truth** for all displayed information.

### Structure

```typescript
portfolioData = {
  hero: {
    name: "Naman Sharma",
    title: "SAP Enthusiast & BTP CAPM Developer",
    subtitle: "...",
    socialLinks: [{ name, url, icon }]
  },
  about: {
    summary: "...",       // AI-tailorable
    education: [...],
    internships: [...],
    certifications: [...],
    achievements: [...]
  },
  skills: [
    {
      category: "Programming Languages",
      icon: Code,
      items: ["Python", "JavaScript", "SQL", ...]
    },
    // 6 more categories
  ],
  projects: [
    {
      title: "FEM S.H.I.E.L.D",
      description: "...",  // AI-tailorable
      technologies: [...],
      githubUrl: "...",
      liveUrl: "..."
    },
    // 3 more projects
  ],
  contact: {
    email: "...",
    phone: "...",
    location: "Jaipur, Rajasthan, India"
  }
}
```

All components import directly from `portfolioData`; AI tailoring only overrides the relevant text fields at runtime without mutating the source data.

---

## 9. Styling & Design System

### Tailwind Configuration

- **Dark mode**: `class` strategy (toggled via `next-themes`)
- **Container**: max-width `1400px` at `2xl` breakpoint
- **Font families**:
  - `font-arima` — body and headings (Google Fonts: Arima, serif)
  - `font-mono` — code blocks
- **Animations**: custom `accordion-down` / `accordion-up` keyframes (0.2s ease-out) from `tailwindcss-animate`

### Color Palette (CSS Variables)

| Token | Light | Purpose |
|---|---|---|
| `--background` | `#E0E0E0` | Page background |
| `--foreground` | `#1A1A1A` | Primary text |
| `--primary` | `#224369` | Dark blue — brand color |
| `--accent` | `#B8860B` | Gold — accents |
| `--card` | white | Card backgrounds |
| `--muted` | light gray | Subtle backgrounds |
| `--border` | `#CCCCCC` | Borders |

All variables have dark-mode counterparts toggled via `.dark` class.

### Responsive Layout

- Mobile-first approach using Tailwind breakpoints.
- Skills grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Projects grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- Header: hamburger-friendly layout via `use-mobile` hook.

---

## 10. Forms & Validation

**Library:** `react-hook-form` with `@hookform/resolvers/zod`

**Contact form schema (Zod):**
```typescript
const formSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
```

**Submission handler:**  
On valid submission, constructs a `mailto:` URL with encoded form values and opens it in a new tab. A toast notification confirms the action. No server endpoint is needed.

---

## 11. Custom Hooks

### `use-toast.ts`

A self-contained toast notification system implemented with React's `useReducer`.

- **Actions:** `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST`
- **Limit:** At most 1 toast shown at a time (`TOAST_LIMIT = 1`)
- **Auto-dismiss:** Toasts are removed after `TOAST_REMOVE_DELAY` (1,000,000 ms)
- **Export:** `useToast()` hook + standalone `toast()` function

### `use-mobile.tsx`

Detects whether the viewport width is below the mobile breakpoint (768px).

```typescript
const isMobile = useIsMobile();  // returns boolean
```

Uses `window.matchMedia` with a `change` event listener that cleans up on unmount.

---

## 12. Configuration

### `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'picsum.photos' },
    ]
  }
};
```

- TypeScript build errors and ESLint violations are suppressed for deployment flexibility.
- Remote image sources (`placehold.co`, `picsum.photos`) are whitelisted for `next/image`.

### `apphosting.yaml`

Configures Firebase App Hosting for deployment:

```yaml
runConfig:
  maxInstances: 1
```

Limits the app to 1 concurrent instance (suitable for a personal portfolio).

### `tsconfig.json`

Standard Next.js TypeScript configuration with:
- `"paths": { "@/*": ["./src/*"] }` — absolute imports via `@/` alias
- `"moduleResolution": "bundler"` — optimized for Turbopack

---

## 13. Scripts & Development

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev --turbopack -p 9002` | Start dev server on port 9002 with Turbopack |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |
| `typecheck` | `tsc --noEmit` | TypeScript type checking |
| `genkit:dev` | `genkit start -- tsx src/ai/dev.ts` | Start Genkit dev UI |
| `genkit:watch` | `genkit start -- tsx --watch src/ai/dev.ts` | Genkit dev with hot reload |

### Environment Variables Required

| Variable | Purpose |
|---|---|
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key for AI content tailoring |

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (port 9002)
npm run dev

# (Optional) Start Genkit dev server to test AI flows
npm run genkit:dev
```
