const ZONES = [
  { name: "Chandigarh", x: 200, y: 72 },
  { name: "Panchkula", x: 268, y: 58 },
  { name: "Mohali", x: 148, y: 118 },
  { name: "Zirakpur", x: 218, y: 148 },
  { name: "Kharar", x: 118, y: 168 },
  { name: "Landran", x: 168, y: 198 },
] as const;

export function TricityServiceMap() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-4 sm:p-6">
      <svg
        viewBox="0 0 400 240"
        className="mx-auto h-auto w-full max-w-md"
        aria-label="Chandigarh Tricity service area map"
        role="img"
      >
        {/* Region outline — simple tricity blob */}
        <path
          d="M 80 100 Q 60 60 120 40 Q 180 20 260 35 Q 320 45 340 90 Q 355 130 320 170 Q 280 210 200 215 Q 100 220 70 170 Q 50 130 80 100 Z"
          fill="rgba(245,158,11,0.08)"
          stroke="rgba(245,158,11,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Route hint — local connectivity */}
        <path
          d="M 148 118 L 200 72 L 268 58 M 200 72 L 218 148 L 168 198 L 118 168 L 148 118"
          fill="none"
          stroke="rgba(245,158,11,0.15)"
          strokeWidth="1"
        />

        {ZONES.map((zone) => (
          <g key={zone.name}>
            <circle
              cx={zone.x}
              cy={zone.y}
              r="18"
              fill="rgba(245,158,11,0.12)"
            />
            <circle
              cx={zone.x}
              cy={zone.y}
              r="5"
              fill="#f59e0b"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <text
              x={zone.x}
              y={zone.y + 28}
              textAnchor="middle"
              className="fill-slate-300 text-[11px] font-semibold"
              style={{ fontSize: "11px" }}
            >
              {zone.name}
            </text>
          </g>
        ))}

        <text
          x="200"
          y="228"
          textAnchor="middle"
          fill="rgba(148,163,184,0.6)"
          style={{ fontSize: "10px", letterSpacing: "0.12em" }}
        >
          CHANDIGARH TRICITY · PICKUP COVERAGE
        </text>
      </svg>
    </div>
  );
}
