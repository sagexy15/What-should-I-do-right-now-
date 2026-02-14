# What should I do right now?

A cozy, minimal website that gently suggests small, kind actions — for when you feel stuck, overwhelmed, tired, or unsure what to do next. No productivity pressure, no streaks, no metrics. Just soft nudges from a friend.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## What's included

- **Right now (Home)** — "tell me" / "another one" for a single gentle suggestion; optional mood check-in.
- **Lately** — Recent suggestions with soft timestamps ("a few minutes ago", "earlier today"). Stored in `localStorage`.
- **About** — Short philosophy: not about doing more; doing nothing is allowed.
- **Settings** — Dark mode, calming vs energizing suggestions, minimal vs playful tone.

Suggestions are static for the MVP; you can later plug in an LLM API for dynamic suggestions. Tone stays gentle and non-judgmental.

## Stack

- React 18 + Vite
- React Router 6
- Tailwind CSS
- Fonts: Neco (headings), Pally (body) via Fontshare
