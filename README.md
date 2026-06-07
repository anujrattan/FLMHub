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

Static export is enabled only at build time (`NEXT_STATIC_EXPORT=true`). Output is written to `out/`.

### Cloudflare Pages setup

1. **Connect repo** — build command: `npm run build`, output directory: `out`
2. **Functions** — `functions/api/leads.ts` is deployed automatically as `POST /api/leads`
3. **Environment variables** (Cloudflare dashboard → Settings → Environment variables):

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anon key |

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
