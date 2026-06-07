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
 * Static export is build-time only (gated behind NEXT_STATIC_EXPORT env var).
 * Running `next dev` without that var gives a normal dev server with no
 * output:export conflict and no manifest write races.
 */

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
  // Defensive: disable any dev indicators/overlay even if future patch re-enables them
  devIndicators: false,
};

export default nextConfig;
