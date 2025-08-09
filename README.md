# Fitness Class Scheduler

A modern Angular application for managing fitness class schedules with a clean, responsive design using Tailwind CSS, animations, and dark mode.

## Demo

- Live: [Add Netlify URL here]
- Code: [Add GitHub URL here]

![App Screenshot](public/preview.png)

## Features

- 🏋️ Clean, modern UI with Tailwind CSS
- 🌙 Dark mode with persistent preference
- 🧩 Standalone Angular components
- 💾 LocalStorage persistence
- 🗂️ Table and Card views
- 🎞️ Subtle animations for row add/remove
- 📱 Fully responsive layout

## Tech Stack

- Angular 20 (standalone components)
- Tailwind CSS (class-based dark mode)
- TypeScript
- LocalStorage API

## Project Structure

```
/src
  /app
    /components
      /header          - Header + dark mode toggle
      /class-card      - Card display for classes
      /schedule-table  - Table view with remove action
      /add-class-form  - Form for adding classes
    /pages
      /home           - Home page (layout, state)
    app.component.ts
    app.component.html
    styles.css
```

## Run Locally

```bash
npm install
npm start
# open http://localhost:4200
```

## Production Build

```bash
ng build --configuration production
# output: dist/fitness-class-scheduler
```

## Deploy to Netlify

- Build Command: `npm run build` (or `ng build --configuration production`)
- Publish Directory: `dist/fitness-class-scheduler/browser`

If you use a Netlify config file, add this `netlify.toml` at the repo root:

```toml
[build]
  command = "npm run build"
  publish = "dist/fitness-class-scheduler/browser"
```

## SEO

`src/index.html` includes `<title>`, description, favicon, and Open Graph tags. Replace `[Link to preview image]` with your hosted screenshot URL.
