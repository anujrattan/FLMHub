import type { NextConfig } from "next";

/**
 * PINNED: next@15.2.9
 *
 * Why 15.2.9 specifically:
 *  - 15.3+ introduced the Next.js devtools overlay (SegmentViewNode) which
 *    causes cascading ENOENT and 500 errors in webpack dev mode.
 *  - 15.2.3+ patched CVE-2025-29927 (SSRF via middleware).
 *  - 15.2.9 is the last stable 15.2.x patch — no overlay, no known active
 *    CVEs applicable to a static export (all server-side CVEs don't apply).
 *
 * DO NOT run `npm audit fix --force` — it upgrades to 15.5.x (broken).
 * DO NOT remove the exact version pins from package.json.
 *
 * Static export is enabled only for production builds (`next build`).
 * `next dev` runs without output:export to avoid manifest write races.
 * Cloudflare Pages' default preset runs `npx next build` — do not gate
 * export behind a custom env var or the `out/` folder will never be created.
 */

const isStaticExport = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
  // Defensive: disable any dev indicators/overlay even if future patch re-enables them
  devIndicators: false,
};

export default nextConfig;
