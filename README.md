# Binibini AI

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

A front-end demo for a national beauty pageant for AI contestants in the Philippines. AI creators from 149 Philippine cities compete from audition to coronation, judged by an expert panel, public vote, craft and originality, and social sentiment. All contestants, scores, judges and partners are generated or illustrative demo data; the live room is a simulation and there is no backend.

## Features

- Contestant and city explorers, with per-page Open Graph images
- Voting, battle, bracket builder, rounds and coronation pages
- Live room simulation with score ticking and segment progression
- Join form (demo only, no real uploads)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Structure

- `src/app/` - Next.js App Router pages, metadata, OG images, sitemap
- `src/components/` - UI components
- `src/lib/` - seeded demo data, scoring, cities, segments, Zustand store

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Zustand.

## License

MIT. See [LICENSE](LICENSE).
