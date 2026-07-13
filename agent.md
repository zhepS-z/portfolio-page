# Agent Notes

## Working Style

- Preserve the existing portfolio content and design language unless the user asks for a redesign.
- Prefer React components and data arrays over duplicated markup.
- Keep animations smooth and lightweight. Respect `prefers-reduced-motion`.
- Avoid adding heavy animation libraries unless there is a strong reason.

## Important Files

- `src/main.jsx`: component structure, data, and browser interactions.
- `src/react-polish.css`: new motion and visual polish.
- `css/*.css`: original design system and section styles.
- `assets/images/`: case study screenshots.
- `assets/resume/resume.pdf`: downloadable resume.

## Future Improvements

- Split `src/main.jsx` into smaller component files if the portfolio grows.
- Move project, skill, and education data into separate data modules.
- Add real contact form handling if a backend or form service is chosen.
- Consider image optimization for faster loading.
