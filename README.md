# Factor1 Digital Website

Static site built with [Nuxt 3](https://nuxt.com), [Three.js](https://threejs.org), [GSAP](https://greensock.com/gsap), and [Tailwind CSS](https://tailwindcss.com).

## Tech Stack

- **Nuxt 3** — Vue.js framework with static generation (`nuxt generate`)
- **Three.js** — 3D WebGL rendering
- **GSAP + ScrollTrigger** — Scroll-driven animations
- **Tailwind CSS** — Utility-first styling

## Development

```bash
npm install
npm run dev        # http://localhost:3100
```

## Build & Deploy

```bash
npm run generate   # Outputs to .output/public/

# Deploy to BunnyCDN (copy .env.example → .env and fill in values)
cp .env.example .env
# edit .env
bash scripts/deploy.sh
```

## pm2 Dev Server

A `ecosystem.config.cjs` is included for pm2. On the server:

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

Dev preview available at `http://161.35.135.225:3100`
