# FLM Hub

First to Last Mile — enterprise logistics orchestration portal boilerplate.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **shadcn/ui** primitives (Button, Card, Input, Label, Table)
- **Lucide React** icons
- **Static export** ready for Cloudflare Pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy (Cloudflare Pages)

```bash
npm run build
```

Static export runs automatically on `next build` (production). Output is written to `out/`.

### Cloudflare Pages setup

1. **Connect repo** — Framework preset: **Next.js (Static HTML Export)** (or build command `npm run build`, output directory `out`). Do **not** use the full Next.js Workers preset.
2. **Functions** — `functions/api/leads.ts` is deployed automatically as `POST /api/leads`
3. **Environment variables** (Cloudflare dashboard → Settings → Environment variables):

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_EDGE_FUNCTION_NAME` | Edge function name, e.g. `submit-lead` |

Lead records use `client_id: flm_hub` and `source: flm-hub-schedule-pickup` (set in `functions/api/leads.ts`).

4. **Supabase** — deploy the `submit-lead` edge function; it inserts into the `leads` table.

### Lead flow

```
Schedule Pickup  →  modal form  →  POST /api/leads
                                        ↓
                                 Cloudflare Pages Function
                                        ↓
                                 Supabase submit-lead edge function
                                        ↓
                                 leads table
```

## Dev troubleshooting

### Site shows 404 on Cloudflare Pages

Usually the build did not produce `out/index.html`. Check the Cloudflare deploy log, then confirm:

| Setting | Required value |
|---------|----------------|
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` or `npx next build` |
| Build output directory | `out` |

If the preset is the full **Next.js** adapter (Workers), or the output directory is `.next`, the root URL will 404.

If you see `ENOENT` errors for `.next/static/development/_buildManifest.js.tmp.*`:

```bash
npm run dev:clean
```

**Cause:** Static export mode was previously active during `next dev`, which conflicts with the dev manifest writer (worse with Turbopack). This project now enables export only on `npm run build`.

Optional faster dev bundler (use only if stable on your machine):

```bash
npm run dev:turbo
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Corporate landing page with rate calculator |
| `/login` | Client portal login placeholder |
| `/dashboard/client` | Mock operations dashboard |

## Expansion

- Add API routes under `src/app/api/` (requires removing `output: "export"` or using edge functions)
- Connect Supabase auth/data in `src/lib/` when backend is ready
- Client interactions use React `useState` — no heavy server dependencies
