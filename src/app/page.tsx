import Link from "next/link";
import {
  Building2,
  Calculator,
  Check,
  Factory,
  FileText,
  Globe,
  GraduationCap,
  HeartPulse,
  Home,
  MapPin,
  Package,
  Phone,
  Plane,
  Scale,
  Shuffle,
  Truck,
  Users,
  X,
} from "lucide-react";

import { FlmShippingProcess } from "@/components/flm-shipping-process";
import { OperationsFlow } from "@/components/operations-flow";
import { SchedulePickupButton } from "@/components/schedule-pickup/schedule-pickup-button";
import { SchedulePickupProvider } from "@/components/schedule-pickup/schedule-pickup-provider";
import { ShipmentJourneyTimeline } from "@/components/shipment-journey-timeline";
import { SimplePortalPreview } from "@/components/simple-portal-preview";
import { SiteHeader } from "@/components/site-header";
import { TricityServiceMap } from "@/components/tricity-service-map";
import { Button } from "@/components/ui/button";
/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const industries = [
  { label: "Builders", icon: Building2 },
  { label: "Law Firms", icon: Scale },
  { label: "Hospitals", icon: HeartPulse },
  { label: "Schools", icon: GraduationCap },
  { label: "Manufacturers", icon: Factory },
  { label: "CA Firms", icon: Calculator },
];
const marqueeItems = [...industries, ...industries];

const heroBenefits = [
  {
    icon: Building2,
    title: "Office Pickup",
    description: "Pickup at your workplace.",
  },
  {
    icon: Home,
    title: "Home Pickup",
    description: "No courier office visits.",
  },
  {
    icon: Package,
    title: "Packaging Support",
    description: "Prepared for shipment.",
  },
  {
    icon: Globe,
    title: "Domestic & International",
    description: "Multiple delivery options.",
  },
  {
    icon: Phone,
    title: "Single Point Of Contact",
    description: "FLM manages everything.",
  },
];

const howItWorks = [
  {
    title: "Pickup",
    description: "We collect from your office, site, or home.",
    icon: MapPin,
  },
  {
    title: "Packaging",
    description: "Your shipment is prepared and secured for transit.",
    icon: Package,
  },
  {
    title: "Carrier Coordination",
    description: "FLM selects the right carrier and manages handover.",
    icon: Shuffle,
  },
  {
    title: "Delivery",
    description: "Tracked through to destination and proof of delivery.",
    icon: Check,
  },
];

const painPoints = [
  "Driving to courier offices",
  "Coordinating multiple courier providers",
  "Tracking shipments manually",
  "Chasing delayed deliveries",
  "Managing packaging and dispatch",
];

const flmHandles = [
  "Pickup",
  "Packaging",
  "Carrier Coordination",
  "Shipment Tracking",
  "Delivery Support",
];

const businessServices = [
  {
    icon: Truck,
    title: "Domestic Shipping",
    description: "Documents and parcels across India.",
  },
  {
    icon: Plane,
    title: "International Shipping",
    description: "Cross-border shipments and samples.",
  },
  {
    icon: FileText,
    title: "Document Logistics",
    description: "Legal, healthcare and business records.",
  },
  {
    icon: Building2,
    title: "Business Shipping",
    description: "Recurring business logistics support.",
  },
];

const individualServices = [
  {
    icon: Home,
    title: "Home Pickup",
    description: "Personal shipments without visiting courier offices.",
  },
  {
    icon: Package,
    title: "Personal Shipments",
    description: "Documents, gifts and returns picked up from your door.",
  },
];

const businessWhoWeServe = [
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Property agreements, site correspondence and legal paperwork shipped from your office.",
  },
  {
    icon: Scale,
    title: "Law Firms",
    description:
      "Court filings, contracts and legal documentation delivered with confidence.",
  },
  {
    icon: HeartPulse,
    title: "Hospitals",
    description:
      "Medical records, lab reports and vendor documents handled with care.",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    description:
      "Certificates, admissions materials and administrative correspondence delivered on time.",
  },
  {
    icon: Factory,
    title: "Manufacturers",
    description:
      "Product samples, spare parts and export shipments coordinated end to end.",
  },
  {
    icon: Calculator,
    title: "CA Firms",
    description:
      "Tax records, compliance files and client correspondence managed reliably.",
  },
];

const individualWhoWeServe = [
  {
    icon: Users,
    title: "Individuals",
    description:
      "Personal parcels, documents and gifts picked up from your door.",
  },
  {
    icon: Home,
    title: "Families",
    description:
      "Home pickups for personal deliveries, gifts and international family shipments.",
  },
];

const serviceAreas = [
  "Chandigarh",
  "Mohali",
  "Panchkula",
  "Zirakpur",
  "Kharar",
  "Landran",
];

const footerIndustries = [
  "Builders",
  "Law Firms",
  "Hospitals",
  "Schools",
  "Manufacturers",
  "CA Firms",
  "Individuals",
];

const portalFeatures = [
  "Live shipment tracking",
  "Delivery history",
  "Invoice access",
];

/* ─────────────────────────────────────────────────────────────
   SHARED TILE
───────────────────────────────────────────────────────────── */

type TileItem = {
  icon: typeof Truck;
  title: string;
  description: string;
};

function SegmentTile({
  item,
  variant = "dark",
}: {
  item: TileItem;
  variant?: "dark" | "muted";
}) {
  const Icon = item.icon;
  const cardClass =
    variant === "muted"
      ? "border-white/10 bg-slate-900/60 hover:border-amber-500/25 hover:bg-slate-900/80"
      : "border-white/10 bg-slate-950/70 hover:border-amber-500/30 hover:bg-slate-950";

  return (
    <div
      className={`group rounded-xl border p-5 transition-all duration-200 ${cardClass}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-colors group-hover:border-amber-500/30 group-hover:bg-amber-500/15">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-snug text-white">
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SegmentHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Users;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04]">
        <Icon className="h-4 w-4 text-amber-500" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <SchedulePickupProvider>
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
          {/* Premium grid + gradient background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px), radial-gradient(120% 120% at 20% 0%, rgba(245,158,11,0.14) 0%, rgba(2,6,23,0) 50%), radial-gradient(100% 100% at 85% 20%, rgba(30,41,59,0.55) 0%, rgba(2,6,23,0) 45%)",
              backgroundSize: "52px 52px, 52px 52px, auto, auto",
            }}
          />

          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              {/* Left copy */}
              <div className="max-w-xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-amber-400/60" />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-300">
                    First to Last Mile Logistics
                  </span>
                </div>

                <h1 className="text-[2.65rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.15rem]">
                  Your Logistics Team,
                  <br />
                  <span className="text-amber-400">Without The Overhead</span>
                </h1>

                <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-slate-300">
                  First Mile Efficiency. Last Mile Certainty.
                </p>

                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  FLM handles pickup, packaging, carrier coordination, shipment
                  tracking, and support — so your team never has to deal with
                  multiple courier companies.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-400">
                  Whether you&apos;re sending legal documents, customer agreements,
                  medical records, business parcels, or product samples, FLM
                  manages the entire shipping process from pickup to delivery.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <SchedulePickupButton
                    size="lg"
                    className="border-0 bg-amber-500 font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600"
                  />
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/25 bg-white/[0.04] font-semibold text-white shadow-none hover:bg-white/10 hover:text-white"
                  >
                    <a
                      href="https://wa.me/918558887123"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="h-4 w-4" />
                      Talk To FLM
                    </a>
                  </Button>
                </div>

                <p className="mt-4 text-[11px] font-medium tracking-wide text-slate-500">
                  Serving Chandigarh • Mohali • Panchkula • Zirakpur • Kharar • Landran
                </p>
              </div>

              {/* Right: operational route timeline */}
              <div className="relative lg:pl-4">
                <ShipmentJourneyTimeline />
              </div>
            </div>

            {/* Benefits strip — compact operational cards */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {heroBenefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <item.icon
                    className="mb-3 h-4 w-4 text-amber-500/90"
                    strokeWidth={1.75}
                  />
                  <p className="text-xs font-bold leading-snug text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Trust strip marquee ── */}
          <div className="border-t border-white/10 bg-slate-900/70">
            <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
              <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Serving
              </p>
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex animate-marquee items-center">
                  {marqueeItems.map((industry, i) => (
                    <div
                      key={i}
                      className="flex min-w-max items-center gap-2.5 px-8 py-1"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] shadow-sm">
                        <industry.icon className="h-4 w-4 text-amber-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-300">
                        {industry.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PROBLEM SECTION
        ═══════════════════════════════════════════ */}
        <section id="why-flm" className="scroll-mt-20 bg-slate-950 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Heading — full width, no artificial max-w cap */}
            <div className="text-center">
              <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                The Challenge
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your Team Shouldn&apos;t Be Running Logistics
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-400">
                Every hour spent coordinating pickups, comparing courier rates, chasing delayed shipments,
                and managing dispatch is an hour not spent on your actual business.
                FLM takes the entire shipping operation off your plate — from pickup to proof of delivery.
              </p>
            </div>

            {/* Comparison */}
            <div className="mt-14 grid gap-4 sm:grid-cols-2">

              {/* Without FLM */}
              <div className="rounded-2xl border border-white/[0.06] bg-slate-900/60 p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
                    <X className="h-3.5 w-3.5 text-rose-400" strokeWidth={2.5} />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-400/80">
                    Without FLM
                  </p>
                </div>
                <ul className="space-y-3">
                  {painPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-500/10">
                        <X className="h-2.5 w-2.5 text-rose-500" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-400">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FLM Handles It */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-slate-900/60 p-7">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/[0.08] blur-3xl" />
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
                    <Check className="h-3.5 w-3.5 text-amber-400" strokeWidth={2.5} />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/80">
                    FLM Handles It
                  </p>
                </div>
                <ul className="space-y-3">
                  {flmHandles.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/15">
                        <Check className="h-2.5 w-2.5 text-amber-400" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            HOW IT WORKS
        ═══════════════════════════════════════════ */}
        <section id="how-it-works" className="scroll-mt-20 bg-slate-950 py-20">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
                backgroundSize: "52px 52px, 52px 52px",
              }}
            />
            <div className="relative mx-auto max-w-xl text-center">
              <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                How It Works
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                From Pickup To Delivery
              </h2>
              <p className="mt-4 text-base font-medium text-slate-400">
                One Pickup Request. FLM Handles The Rest.
              </p>
            </div>

            <OperationsFlow steps={howItWorks} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SERVICES
        ═══════════════════════════════════════════ */}
        <section id="services" className="scroll-mt-20 bg-slate-900 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="text-center">
              <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                What We Ship
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Logistics Solutions For Businesses &amp; Individuals
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                Whether you run a business or just need something picked up from
                home — FLM handles it. We work with companies of all sizes and
                individuals across Chandigarh Tricity.
              </p>
            </div>

            {/* For Businesses */}
            <div className="mt-14">
              <SegmentHeading
                icon={Building2}
                title="For Businesses"
                subtitle="Office pickups · Regular volumes · Corporate accounts"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {businessServices.map((service) => (
                  <SegmentTile key={service.title} item={service} />
                ))}
              </div>
            </div>

            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Also open to
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* For Individuals */}
            <div>
              <SegmentHeading
                icon={Home}
                title="For Individuals"
                subtitle="Home pickups · Personal shipments · Low volume"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {individualServices.map((service) => (
                  <SegmentTile key={service.title} item={service} />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHO WE SERVE
        ═══════════════════════════════════════════ */}
        <section id="who-we-serve" className="scroll-mt-20 bg-slate-950 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-12 text-center">
              <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                Who We Serve
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                If you ship documents or parcels,{" "}
                <span className="text-amber-500">FLM is for you.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
                From solo professionals to large operations — we serve every business that needs reliable pickup and delivery.
              </p>
            </div>

            {/* For Businesses */}
            <SegmentHeading
              icon={Building2}
              title="For Businesses"
              subtitle="Industries we work with across Chandigarh Tricity"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {businessWhoWeServe.map((industry) => (
                <SegmentTile
                  key={industry.title}
                  item={industry}
                  variant="muted"
                />
              ))}
            </div>

            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Also open to
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* For Individuals */}
            <SegmentHeading
              icon={Home}
              title="For Individuals"
              subtitle="Personal and family shipments from your door"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {individualWhoWeServe.map((industry) => (
                <SegmentTile
                  key={industry.title}
                  item={industry}
                  variant="muted"
                />
              ))}
            </div>

            {/* Catch-all note */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Don&apos;t see your industry?{" "}
              <span className="font-semibold text-white/80">
                We work with all types of businesses and individuals — if you need a pickup, reach out.
              </span>
            </p>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY FLM — SHIPPING PROCESS
        ═══════════════════════════════════════════ */}
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                Why FLM
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What Happens When You Ship Through FLM
              </h2>
              <p className="mt-4 text-base text-slate-400">
                One pickup request. FLM manages every step until delivery is confirmed.
              </p>
            </div>

            <FlmShippingProcess />
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SERVICE AREA
        ═══════════════════════════════════════════ */}
        <section id="service-area" className="scroll-mt-20 bg-slate-950 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                Coverage
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Serving Chandigarh Tricity
              </h2>
            </div>

            {/* Same-day callout */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] px-6 py-5 text-center">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                  </span>
                  <p className="text-base font-bold text-white">
                    Same-Day Pickup Available
                  </p>
                </div>
                <p className="text-sm text-slate-400">
                  Across most service areas. Book before noon for same-day collection.
                </p>
              </div>
            </div>

            {/* Tricity map + city list */}
            <div className="mx-auto mt-8 grid max-w-4xl gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <TricityServiceMap />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {serviceAreas.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2.5"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                    <span className="text-sm font-medium text-slate-200">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              We also welcome{" "}
              <span className="font-semibold text-slate-300">home pickups</span>{" "}
              for non-commercial, low-volume personal shipments.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FLM HUB — COMPACT
        ═══════════════════════════════════════════ */}
        <section id="portal" className="scroll-mt-20 border-y border-white/[0.06] bg-slate-900 py-10 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Track Every Shipment In One Place
                </h2>
                <ul className="mt-4 space-y-2">
                  {portalFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-400"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="mt-5 inline-block text-sm font-semibold text-amber-400 hover:text-amber-300"
                >
                  Client login →
                </Link>
              </div>
              <SimplePortalPreview />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CONVERSION BRIDGE
        ═══════════════════════════════════════════ */}
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">

              {/* Left: copy */}
              <div>
                <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
                  Getting Started
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready To Stop Managing Couriers?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-400">
                  Whether you&apos;re shipping a single document or managing daily business dispatches,
                  FLM handles pickup, carrier coordination and shipment tracking from start to finish.
                </p>
              </div>

              {/* Right: what's included */}
              <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-950/60">
                <div className="border-b border-white/[0.07] px-5 py-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Included With Every Pickup
                  </p>
                </div>
                <ul className="divide-y divide-white/[0.05]">
                  {[
                    { label: "Home Pickup" },
                    { label: "Office Pickup" },
                    { label: "Packaging Assistance" },
                    { label: "Domestic Shipping" },
                    { label: "International Shipping" },
                    { label: "Dedicated Support" },
                  ].map(({ label }) => (
                    <li key={label} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                        <Check className="h-3 w-3 text-amber-400" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ACCOUNTABILITY
        ═══════════════════════════════════════════ */}
        <section className="border-y border-white/[0.06] bg-slate-950 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-500">
              Why We&apos;re Different
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built Around Accountability
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-400">
              <p>
                Most courier companies only handle transportation.
              </p>
              <p>
                FLM takes ownership of the entire shipping process — from pickup
                to delivery.
              </p>
              <p>
                If there&apos;s a problem, you don&apos;t chase multiple providers.
              </p>
              <p className="text-xl font-bold text-amber-400 sm:text-2xl">
                You call FLM.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════ */}
        <section className="bg-slate-950 py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready To Hand Off Logistics?
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-400">
              Let FLM manage pickup, carrier coordination and shipment tracking
              while your team focuses on business.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <SchedulePickupButton
                size="lg"
                className="border-0 bg-amber-500 font-semibold text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 active:bg-amber-700"
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/25 bg-transparent font-semibold text-white shadow-none hover:bg-white/10 hover:text-white active:bg-white/15"
              >
                <a
                  href="https://wa.me/918558887123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="h-4 w-4" />
                  Talk To FLM
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-slate-950 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="text-base font-bold tracking-tight text-white/80">
                FLM Hub
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                First Mile Efficiency. Last Mile Certainty.
              </p>
            </div>

            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Industries We Serve
              </p>
              <ul className="space-y-1.5">
                {footerIndustries.map((industry) => (
                  <li key={industry} className="text-sm text-slate-400">
                    {industry}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Service Areas
              </p>
              <ul className="space-y-1.5">
                {serviceAreas.map((area) => (
                  <li key={area} className="text-sm text-slate-400">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 border-t border-white/[0.06] pt-6 text-center text-xs text-white/20">
            &copy; {new Date().getFullYear()} FLM Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </SchedulePickupProvider>
  );
}
