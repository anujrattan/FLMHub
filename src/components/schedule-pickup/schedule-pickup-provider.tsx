"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Calendar, Check, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead, type LeadFormData } from "@/lib/leads";
import { cn } from "@/lib/utils";

const PICKUP_AREAS = [
  "Chandigarh",
  "Mohali",
  "Panchkula",
  "Zirakpur",
  "Kharar",
  "Landran",
  "Other",
];

const INITIAL_FORM: LeadFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pickupArea: "",
  pickupFrom: "office",
  message: "",
};

interface SchedulePickupContextValue {
  openModal: () => void;
  closeModal: () => void;
}

const SchedulePickupContext = createContext<SchedulePickupContextValue | null>(
  null
);

export function useSchedulePickup() {
  const context = useContext(SchedulePickupContext);
  if (!context) {
    throw new Error("useSchedulePickup must be used within SchedulePickupProvider");
  }
  return context;
}

function SchedulePickupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const resetAndClose = useCallback(() => {
    setForm(INITIAL_FORM);
    setStatus("idle");
    setErrorMessage("");
    onClose();
  }, [onClose]);

  if (!open) return null;

  const updateField = <K extends keyof LeadFormData>(
    key: K,
    value: LeadFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitLead(form);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close schedule pickup form"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={resetAndClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-pickup-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
              Schedule Pickup
            </p>
            <h2
              id="schedule-pickup-title"
              className="mt-1 text-lg font-bold text-white"
            >
              Request A Pickup
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Share your details and FLM will confirm your pickup.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold text-white">Request Received</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
              Thanks — our team will contact you shortly to confirm pickup time
              and shipment details.
            </p>
            <Button
              type="button"
              onClick={resetAndClose}
              className="mt-6 border-0 bg-amber-500 font-semibold text-white hover:bg-amber-600"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lead-first-name" className="text-slate-300">
                  First Name *
                </Label>
                <Input
                  id="lead-first-name"
                  required
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="First name"
                  className="border-white/15 bg-slate-950 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-last-name" className="text-slate-300">
                  Last Name *
                </Label>
                <Input
                  id="lead-last-name"
                  required
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Last name"
                  className="border-white/15 bg-slate-950 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-phone" className="text-slate-300">
                  Phone *
                </Label>
                <Input
                  id="lead-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 ..."
                  className="border-white/15 bg-slate-950 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-email" className="text-slate-300">
                  Email *
                </Label>
                <Input
                  id="lead-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@company.com"
                  className="border-white/15 bg-slate-950 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-area" className="text-slate-300">
                  Pickup Area *
                </Label>
                <select
                  id="lead-area"
                  required
                  value={form.pickupArea}
                  onChange={(e) => updateField("pickupArea", e.target.value)}
                  className={cn(
                    "flex h-10 w-full rounded-md border border-white/15 bg-slate-950 px-3 py-2 text-sm text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  )}
                >
                  <option value="" disabled>
                    Select area
                  </option>
                  {PICKUP_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-from" className="text-slate-300">
                  Pickup From *
                </Label>
                <select
                  id="lead-from"
                  required
                  value={form.pickupFrom}
                  onChange={(e) =>
                    updateField(
                      "pickupFrom",
                      e.target.value as LeadFormData["pickupFrom"]
                    )
                  }
                  className={cn(
                    "flex h-10 w-full rounded-md border border-white/15 bg-slate-950 px-3 py-2 text-sm text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  )}
                >
                  <option value="office">Office</option>
                  <option value="home">Home</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="lead-message" className="text-slate-300">
                  Shipment Details
                </Label>
                <textarea
                  id="lead-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Documents, parcel type, destination, preferred pickup time..."
                  className={cn(
                    "flex w-full rounded-md border border-white/15 bg-slate-950 px-3 py-2 text-sm text-white",
                    "placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  )}
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-sm text-rose-400">{errorMessage}</p>
            )}

            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={resetAndClose}
                className="border-white/15 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="border-0 bg-amber-500 font-semibold text-white hover:bg-amber-600"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Submit Pickup Request
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function SchedulePickupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <SchedulePickupContext.Provider value={{ openModal, closeModal }}>
      {children}
      <SchedulePickupModal open={open} onClose={closeModal} />
    </SchedulePickupContext.Provider>
  );
}
