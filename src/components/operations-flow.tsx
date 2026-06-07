import { ArrowDown, ChevronRight, type LucideIcon } from "lucide-react";

export interface OperationStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

function StepCard({ step }: { step: OperationStep }) {
  const Icon = step.icon;

  return (
    <div className="relative w-full min-w-0">
      <div className="relative flex gap-3.5 overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-sm sm:gap-4 sm:p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, transparent 55%)",
          }}
        />
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 text-amber-400 sm:h-6 sm:w-6" strokeWidth={1.75} />
        </div>
        <div className="relative min-w-0 flex-1 text-left">
          <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
            {step.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-[13px]">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function RouteConnector({ horizontal }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className="flex shrink-0 items-center px-1 sm:px-2">
        <div className="hidden h-px w-4 bg-amber-500/35 sm:block sm:w-6" />
        <ChevronRight className="h-4 w-4 text-amber-500/60 sm:h-5 sm:w-5" strokeWidth={2} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-2">
      <div className="h-4 w-px bg-amber-500/40" />
      <ArrowDown className="h-4 w-4 text-amber-500/60" strokeWidth={2} />
    </div>
  );
}

export function OperationsFlow({ steps }: { steps: OperationStep[] }) {
  return (
    <>
      {/* Desktop — horizontal movement */}
      <div className="relative mt-14 hidden lg:block">
        <div className="pointer-events-none absolute left-[6%] right-[6%] top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
        <div className="relative flex items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center">
              <div className="w-[220px] shrink-0 xl:w-[240px]">
                <StepCard step={step} />
              </div>
              {i < steps.length - 1 && <RouteConnector horizontal />}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical route */}
      <div className="mx-auto mt-14 flex w-full max-w-md flex-col lg:hidden">
        {steps.map((step, i) => (
          <div key={step.title} className="flex w-full flex-col items-stretch">
            <StepCard step={step} />
            {i < steps.length - 1 && <RouteConnector />}
          </div>
        ))}
      </div>
    </>
  );
}
