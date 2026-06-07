import {
  ArrowDown,
  Building2,
  Check,
  Phone,
  Truck,
  User,
  type LucideIcon,
} from "lucide-react";

type FlowVariant = "traditional" | "flm";

interface FlowStep {
  label: string;
  icon?: LucideIcon;
  badge?: string;
}

function FlowConnector({ variant }: { variant: FlowVariant }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div
        className={`h-6 w-px ${
          variant === "traditional" ? "bg-rose-500/35" : "bg-amber-500/50"
        }`}
      />
      <ArrowDown
        className={`h-4 w-4 ${
          variant === "traditional" ? "text-rose-500/45" : "text-amber-500/70"
        }`}
        strokeWidth={2}
      />
    </div>
  );
}

function FlowNode({
  label,
  icon: Icon,
  badge,
  variant,
}: FlowStep & { variant: FlowVariant }) {
  const isFlm = variant === "flm";
  const isDelivered = label === "Delivered";

  return (
    <div
      className={`flex w-full max-w-[220px] flex-col items-center rounded-xl border px-4 py-4 text-center ${
        isFlm
          ? isDelivered
            ? "border-amber-500/35 bg-amber-500/10"
            : label === "FLM"
              ? "border-amber-500/40 bg-amber-500/15 shadow-sm shadow-amber-500/10"
              : "border-amber-500/25 bg-amber-500/[0.08]"
          : "border-rose-500/20 bg-rose-500/[0.06]"
      }`}
    >
      {badge ? (
        <span className="mb-2 text-lg font-extrabold tracking-tight text-amber-400">
          {badge}
        </span>
      ) : Icon ? (
        <div
          className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${
            isFlm ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/15 text-rose-400"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      ) : null}
      <p
        className={`text-sm font-semibold ${
          isFlm ? "text-white" : "text-slate-300"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function ProcessColumn({
  title,
  variant,
  steps,
}: {
  title: string;
  variant: FlowVariant;
  steps: FlowStep[];
}) {
  const isFlm = variant === "flm";

  return (
    <div
      className={`flex flex-col items-center rounded-2xl border p-8 sm:p-10 ${
        isFlm
          ? "border-amber-500/25 bg-slate-900/50"
          : "border-white/[0.06] bg-slate-900/30"
      }`}
    >
      <p
        className={`mb-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] ${
          isFlm ? "text-amber-400/90" : "text-rose-400/80"
        }`}
      >
        {title}
      </p>

      <div className="flex flex-col items-center">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <FlowNode {...step} variant={variant} />
            {i < steps.length - 1 && <FlowConnector variant={variant} />}
          </div>
        ))}
      </div>
    </div>
  );
}

const TRADITIONAL_STEPS: FlowStep[] = [
  { label: "You", icon: User },
  { label: "Courier Shop", icon: Building2 },
  { label: "Courier Company", icon: Truck },
  { label: "Support Calls", icon: Phone },
];

const FLM_STEPS: FlowStep[] = [
  { label: "You", icon: User },
  { label: "FLM", badge: "FLM" },
  { label: "Delivered", icon: Check },
];

export function ChallengeProcessComparison() {
  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
      <ProcessColumn
        title="Traditional Courier Process"
        variant="traditional"
        steps={TRADITIONAL_STEPS}
      />
      <ProcessColumn
        title="FLM Process"
        variant="flm"
        steps={FLM_STEPS}
      />
    </div>
  );
}
