const ROWS = [
  { ref: "FLM-CHD-0847", route: "Chandigarh → Delhi", status: "In Transit" },
  { ref: "FLM-MHL-0921", route: "Mohali → Mumbai", status: "Delivered" },
];

export function SimplePortalPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-md">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[10px] text-slate-500">flmhub.in</span>
      </div>
      <div className="divide-y divide-white/[0.05] p-3">
        {ROWS.map((row) => (
          <div key={row.ref} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
            <div>
              <p className="font-mono text-[11px] font-medium text-slate-300">
                {row.ref}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">{row.route}</p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                row.status === "In Transit"
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
