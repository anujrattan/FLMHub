import {
  Activity,
  Calendar,
  Check,
  ChevronRight,
  Phone,
  Shuffle,
  type LucideIcon,
} from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: ProcessStep[] = [
  {
    title: "Pickup Scheduled",
    description: "We collect from your location.",
    icon: Calendar,
  },
  {
    title: "Carrier Assigned",
    description: "Most suitable partner selected.",
    icon: Shuffle,
  },
  {
    title: "Shipment Monitored",
    description: "Tracking managed by FLM.",
    icon: Activity,
  },
  {
    title: "Issue Resolution",
    description: "One team handles support.",
    icon: Phone,
  },
  {
    title: "Proof Of Delivery",
    description: "Confirmation shared.",
    icon: Check,
  },
];

function StepNode({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-[11px] font-bold text-amber-400">
        {index + 1}
      </div>
      <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-950 text-amber-400">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <h3 className="mt-3 text-sm font-bold text-white">{step.title}</h3>
      <p className="mt-1 max-w-[140px] text-xs leading-relaxed text-slate-400">
        {step.description}
      </p>
    </div>
  );
}

export function FlmShippingProcess() {
  return (
    <>
      <div className="relative mt-12 hidden lg:block">
        <div className="pointer-events-none absolute left-[6%] right-[6%] top-[52px] h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />
        <div className="flex items-start justify-between gap-2">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-1 items-start">
              <StepNode step={step} index={i} />
              {i < STEPS.length - 1 && (
                <div className="flex shrink-0 items-center self-start pt-12 px-1">
                  <ChevronRight className="h-4 w-4 text-amber-500/45" strokeWidth={2} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-0 lg:hidden">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-[11px] font-bold text-amber-400">
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className="my-1 h-10 w-px bg-amber-500/30" />
              )}
            </div>
            <div className={`pb-6 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
