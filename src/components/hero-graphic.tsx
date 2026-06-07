import React from "react";

const LEFT_NODES = [
  { id: "l0", cx: 65, cy: 80, label: "Chandigarh", sub: "Origin" },
  { id: "l1", cx: 65, cy: 160, label: "Mohali", sub: "Origin" },
  { id: "l2", cx: 65, cy: 240, label: "Panchkula", sub: "Origin" },
] as const;

const RIGHT_NODES = [
  { id: "r0", cx: 415, cy: 80, label: "Delhi NCR", sub: "Delivery" },
  { id: "r1", cx: 415, cy: 160, label: "Mumbai", sub: "Delivery" },
  { id: "r2", cx: 415, cy: 240, label: "Bengaluru", sub: "Delivery" },
] as const;

const HUB = { cx: 240, cy: 160 } as const;

const LEFT_PATHS = LEFT_NODES.map(
  (n) => `M ${n.cx},${n.cy} L ${HUB.cx},${HUB.cy}`
);
const RIGHT_PATHS = RIGHT_NODES.map(
  (n) => `M ${HUB.cx},${HUB.cy} L ${n.cx},${n.cy}`
);

const DOT_ANIMS = [
  { path: LEFT_PATHS[0], dur: "3.5s", delay: "-0.5s", amber: true },
  { path: LEFT_PATHS[1], dur: "3.0s", delay: "-1.9s", amber: true },
  { path: LEFT_PATHS[2], dur: "3.8s", delay: "-2.8s", amber: true },
  { path: RIGHT_PATHS[0], dur: "3.2s", delay: "-1.2s", amber: false },
  { path: RIGHT_PATHS[1], dur: "3.6s", delay: "-0.4s", amber: false },
  { path: RIGHT_PATHS[2], dur: "3.1s", delay: "-2.2s", amber: false },
];

export function HeroGraphic() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900 shadow-2xl ring-1 ring-black/10">
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Live Network
          </span>
        </div>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-white/30">
          Tricity → PAN India
        </span>
      </div>

      {/* ── SVG Network ── */}
      <div className="px-4 pt-5 pb-3">
        <svg
          viewBox="0 0 480 280"
          className="w-full"
          role="img"
          aria-label="FLM Hub logistics network: Chandigarh Tricity origins routing to PAN India destinations"
        >
          <defs>
            {/* Subtle dot grid */}
            <pattern
              id="hero-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0.5" cy="0.5" r="0.75" fill="rgba(255,255,255,0.04)" />
            </pattern>

            {/* Hub amber glow */}
            <filter id="hub-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Amber dot glow */}
            <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid */}
          <rect width="480" height="280" fill="url(#hero-grid)" />

          {/* ── Section headings ── */}
          <text
            x="65"
            y="22"
            textAnchor="middle"
            fill="rgba(245,158,11,0.55)"
            fontSize="7"
            fontWeight="700"
            letterSpacing="2.5"
            fontFamily="system-ui,sans-serif"
          >
            FIRST MILE
          </text>
          <text
            x="240"
            y="22"
            textAnchor="middle"
            fill="rgba(245,158,11,0.55)"
            fontSize="7"
            fontWeight="700"
            letterSpacing="2.5"
            fontFamily="system-ui,sans-serif"
          >
            FLM HUB
          </text>
          <text
            x="415"
            y="22"
            textAnchor="middle"
            fill="rgba(148,163,184,0.35)"
            fontSize="7"
            fontWeight="700"
            letterSpacing="2.5"
            fontFamily="system-ui,sans-serif"
          >
            LAST MILE
          </text>

          {/* Column separator lines */}
          <line
            x1="155" y1="34" x2="155" y2="262"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <line
            x1="325" y1="34" x2="325" y2="262"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />

          {/* ── Connection lines — left to hub ── */}
          {LEFT_PATHS.map((d, i) => (
            <path
              key={`vis-l${i}`}
              d={d}
              stroke="rgba(245,158,11,0.2)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
            />
          ))}

          {/* ── Connection lines — hub to right ── */}
          {RIGHT_PATHS.map((d, i) => (
            <path
              key={`vis-r${i}`}
              d={d}
              stroke="rgba(148,163,184,0.14)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
            />
          ))}

          {/* ── Animated dots ── */}
          {DOT_ANIMS.map((anim, i) => (
            <circle
              key={`dot-${i}`}
              r="3"
              fill={anim.amber ? "#F59E0B" : "#94A3B8"}
              filter={anim.amber ? "url(#dot-glow)" : undefined}
              style={{
                offsetPath: `path("${anim.path}")`,
                animation: `dot-travel ${anim.dur} linear ${anim.delay} infinite`,
              } as React.CSSProperties}
            />
          ))}

          {/* ── Hub pulse ring ── */}
          <circle
            cx={HUB.cx}
            cy={HUB.cy}
            r="34"
            fill="none"
            stroke="rgba(245,158,11,0.18)"
            strokeWidth="1.5"
          >
            <animate attributeName="r" values="34;50;34" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Hub secondary ring */}
          <circle
            cx={HUB.cx}
            cy={HUB.cy}
            r="34"
            fill="rgba(245,158,11,0.06)"
            stroke="rgba(245,158,11,0.25)"
            strokeWidth="1"
          />

          {/* Hub main circle */}
          <circle
            cx={HUB.cx}
            cy={HUB.cy}
            r="24"
            fill="#F59E0B"
            filter="url(#hub-glow)"
          />

          {/* Hub text */}
          <text
            x={HUB.cx}
            y={HUB.cy - 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10.5"
            fontWeight="800"
            fontFamily="system-ui,sans-serif"
          >
            FLM
          </text>
          <text
            x={HUB.cx}
            y={HUB.cy + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.65)"
            fontSize="6.5"
            fontWeight="600"
            letterSpacing="2.5"
            fontFamily="system-ui,sans-serif"
          >
            HUB
          </text>

          {/* ── Left origin nodes ── */}
          {LEFT_NODES.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r="11"
                fill="rgb(15,23,42)"
                stroke="rgba(245,158,11,0.5)"
                strokeWidth="1.5"
              />
              <circle cx={node.cx} cy={node.cy} r="4" fill="#F59E0B" />
              <text
                x={node.cx + 18}
                y={node.cy - 3}
                fill="rgb(148,163,184)"
                fontSize="9"
                fontWeight="600"
                fontFamily="system-ui,sans-serif"
              >
                {node.label}
              </text>
              <text
                x={node.cx + 18}
                y={node.cy + 8}
                fill="rgb(71,85,105)"
                fontSize="7.5"
                fontFamily="system-ui,sans-serif"
              >
                {node.sub}
              </text>
            </g>
          ))}

          {/* ── Right destination nodes ── */}
          {RIGHT_NODES.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r="11"
                fill="rgb(15,23,42)"
                stroke="rgba(148,163,184,0.35)"
                strokeWidth="1.5"
              />
              <circle cx={node.cx} cy={node.cy} r="4" fill="rgb(100,116,139)" />
              <text
                x={node.cx - 18}
                y={node.cy - 3}
                fill="rgb(148,163,184)"
                fontSize="9"
                fontWeight="600"
                textAnchor="end"
                fontFamily="system-ui,sans-serif"
              >
                {node.label}
              </text>
              <text
                x={node.cx - 18}
                y={node.cy + 8}
                fill="rgb(71,85,105)"
                fontSize="7.5"
                textAnchor="end"
                fontFamily="system-ui,sans-serif"
              >
                {node.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
        {(
          [
            { value: "40+", label: "Carrier Partners" },
            { value: "28K+", label: "Pin Codes" },
            { value: "97.2%", label: "On-Time Delivery" },
          ] as const
        ).map((stat) => (
          <div key={stat.label} className="py-4 text-center">
            <p className="text-lg font-bold text-amber-400">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-white/30">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
