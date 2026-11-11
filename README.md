# SoldrinAI website

Multi-page product showcase for SoldrinAI. Vite + React + TypeScript + React Router.

Pages: Home, Products, Product detail (`/products/:slug`), What I build, About, Contact.

## Add a product
Append one object to `src/data/products.ts` (name, steps, links and an animated `demo`). The Products page, its detail page and the home page pick it up automatically.

## Edit copy
Everything else (hero text, stats, capabilities, about timeline, contact links) lives in `src/data/site.ts`.

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build
```

Deployed on Vercel (framework preset: Vite). `vercel.json` rewrites all paths to `index.html` so deep links work.
