# Project Context

This portfolio is a React single-page application built with Vite.

## Purpose

The site presents Settapong Janajina as a Computer Engineering student and full-stack web developer. It highlights skills, projects, education, a Valorant esports platform case study, screenshots, resume, and contact links.

## Current Architecture

- `index.html` loads the React app from `src/main.jsx`.
- `src/main.jsx` contains the current React component structure and interaction logic.
- `src/react-polish.css` adds React-era polish: scroll progress, animated hero spotlight, improved cards, contact orbit, and small motion details.
- Existing CSS files in `css/` are still used for the main visual system.
- Static assets live in `assets/`, including project screenshots and the resume PDF.

## Main Interactions

- Smooth section navigation with active nav highlighting.
- Dark and light theme toggle stored in `localStorage`.
- Hero typewriter text.
- Intersection-based reveal animations.
- Scroll progress bar and scroll-to-top button.
- Screenshot lightbox for case study images.

## Development

Install dependencies with `npm install`, run locally with `npm run dev`, and build production files with `npm run build`.

## Deployment

The project is prepared for GitHub Pages on the `zhepS-z/portfolio-page` repository.

- `vite.config.js` sets `base` to `/portfolio-page/`.
- `.github/workflows/deploy.yml` builds the app and deploys `dist` using GitHub Actions.
- Static assets used by React are imported with `new URL(..., import.meta.url)` so Vite includes them in production builds.
