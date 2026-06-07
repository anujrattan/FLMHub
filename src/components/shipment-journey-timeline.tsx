import { Check, MapPin } from "lucide-react";

type StepState = "done" | "active" | "pending";

interface Step {
  label: string;
  state: StepState;
}

const STEPS: Step[] = [
  { label: "Pickup Request", state: "done" },
  { label: "Collected By FLM", state: "done" },
  { label: "Carrier Coordinated", state: "done" },
  { label: "In Transit", state: "active" },
  { label: "Delivered", state: "pending" },
];

function RouteMarker({ state }: { state: StepState }) {
  if (state === "done") {
    return (
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-amber-500/40 bg-amber-500 shadow-sm shadow-amber-500/25">
        <Check className="h-3.5 w-3.5 text-slate-950" strokeWidth={3} />
      </div>
    );
  }

  if (state === "active") {
    return (
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-amber-400/25" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-amber-400 bg-slate-950">
          <MapPin className="h-3.5 w-3.5 text-amber-400" strokeWidth={2.25} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white/15 bg-slate-950">
      <span className="h-2 w-2 rounded-full bg-white/20" />
    </div>
  );
}

function segmentClass(state: StepState): string {
  if (state === "done") return "bg-amber-500/70";
  if (state === "active") return "bg-gradient-to-b from-amber-500/70 to-white/10";
  return "bg-white/10";
}

export function ShipmentJourneyTimeline() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8">
      {/* Subtle map grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-500/90">
          Shipment Journey
        </p>
        <p className="mb-8 text-sm text-slate-400">
          From your door to delivery — one coordinated route.
        </p>

        <div className="relative pl-1">
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.label} className="relative flex gap-4">
                {/* Route column: marker + segment */}
                <div className="flex w-8 flex-col items-center">
                  <RouteMarker state={step.state} />
                  {!isLast && (
                    <div
                      className={`my-1 w-0.5 flex-1 min-h-[28px] ${segmentClass(step.state)}`}
                    />
                  )}
                </div>

                {/* Label */}
                <div className={`pt-1.5 ${isLast ? "pb-0" : "pb-6"}`}>
                  <p
                    className={`text-sm font-semibold leading-tight ${
                      step.state === "done"
                        ? "text-white/80"
                        : step.state === "active"
                          ? "text-white"
                          : "text-white/30"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.state === "active" && (
                    <p className="mt-1 text-xs text-amber-400/80">
                      Currently in progress
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <p className="text-center text-[11px] font-medium tracking-wide text-slate-500">
            One Pickup. Every Courier Network.
          </p>
        </div>
      </div>
    </div>
  );
}
