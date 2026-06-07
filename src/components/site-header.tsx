import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#services", label: "Services" },
  { href: "#who-we-serve", label: "Who We Serve" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
            <Package className="h-4.5 w-4.5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-white">
              FLM Hub
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-slate-400">
              First to Last Mile
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          asChild
          size="sm"
          className="border-0 bg-amber-500 font-semibold text-white hover:bg-amber-600"
        >
          <Link href="/login">
            Client Portal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
