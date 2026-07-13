# Settapong Janajina Portfolio

Personal portfolio website rebuilt as a React single-page application with Vite.

## Overview

This portfolio showcases skills, education, featured projects, a Valorant esports platform case study, screenshots, resume download, and contact links.

## Tech Stack

- React
- Vite
- CSS
- Font Awesome

## Project Structure

- `index.html` - Vite entry HTML.
- `src/main.jsx` - React components and interaction logic.
- `src/react-polish.css` - extra motion, polish, and React-specific styling.
- `css/` - original section styling and design system.
- `assets/` - screenshots and resume PDF.
- `context.md` - project context for future work.
- `agent.md` - notes for future coding agents.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages

This project is configured for the repository `zhepS-z/portfolio-page`.

The Vite `base` path is set to `/portfolio-page/`, so production assets load correctly from:

```text
https://zheps-z.github.io/portfolio-page/
```

Deployment is handled by `.github/workflows/deploy.yml`.

To publish:

1. Push the project to the `main` branch.
2. In GitHub, open the repository settings.
3. Go to `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Wait for the `Deploy to GitHub Pages` workflow to finish.
