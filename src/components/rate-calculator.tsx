"use client";

import { useState } from "react";
import { Calculator, Clock, Leaf, Plane, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

interface RateQuote {
  name: string;
  mode: string;
  eta: string;
  price: number;
  icon: React.ReactNode;
  highlight?: boolean;
}

function calculateQuotes(
  originPin: string,
  destinationPin: string,
  weightKg: number
): RateQuote[] {
  const origin = parseInt(originPin.slice(0, 3) || "110", 10);
  const destination = parseInt(destinationPin.slice(0, 3) || "400", 10);
  const distanceFactor = Math.abs(destination - origin) / 100 + 1;
  const weightFactor = Math.max(weightKg, 0.5);

  const base = 89 * distanceFactor * Math.sqrt(weightFactor);

  return [
    {
      name: "FLM Express (Air)",
      mode: "Priority air routing",
      eta: "1–2 business days",
      price: Math.round(base * 2.4),
      icon: <Plane className="h-4 w-4" />,
      highlight: true,
    },
    {
      name: "FLM Standard (Surface)",
      mode: "Optimized surface network",
      eta: "3–5 business days",
      price: Math.round(base * 1.35),
      icon: <Truck className="h-4 w-4" />,
    },
    {
      name: "FLM Eco",
      mode: "Consolidated green lanes",
      eta: "5–7 business days",
      price: Math.round(base * 0.95),
      icon: <Leaf className="h-4 w-4" />,
    },
  ];
}

export function RateCalculator() {
  const [originPin, setOriginPin] = useState("");
  const [destinationPin, setDestinationPin] = useState("");
  const [weight, setWeight] = useState("");
  const [quotes, setQuotes] = useState<RateQuote[] | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const weightNum = parseFloat(weight);

    if (!/^\d{6}$/.test(originPin)) {
      setError("Enter a valid 6-digit origin PIN.");
      setQuotes(null);
      return;
    }
    if (!/^\d{6}$/.test(destinationPin)) {
      setError("Enter a valid 6-digit destination PIN.");
      setQuotes(null);
      return;
    }
    if (!weightNum || weightNum <= 0 || weightNum > 500) {
      setError("Weight must be between 0.1 and 500 kg.");
      setQuotes(null);
      return;
    }

    setError("");
    setQuotes(calculateQuotes(originPin, destinationPin, weightNum));
  }

  return (
    <section id="calculator" className="scroll-mt-20 border-t border-border/60 bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Calculator className="h-3.5 w-3.5" />
            Instant Rate Estimator
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Compare service levels in seconds
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Enter lane details to preview indicative corporate rates across Express,
            Standard, and Eco tiers.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Card className="border-border/80 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Lane &amp; weight details</CardTitle>
              <CardDescription>
                Mock calculator — rates are illustrative for procurement evaluation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="origin-pin">Origin PIN</Label>
                  <Input
                    id="origin-pin"
                    placeholder="110001"
                    maxLength={6}
                    inputMode="numeric"
                    value={originPin}
                    onChange={(e) => setOriginPin(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination-pin">Destination PIN</Label>
                  <Input
                    id="destination-pin"
                    placeholder="400001"
                    maxLength={6}
                    inputMode="numeric"
                    value={destinationPin}
                    onChange={(e) =>
                      setDestinationPin(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    placeholder="2.5"
                    inputMode="decimal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}

              <Button onClick={handleCalculate} className="w-full sm:w-auto">
                <Calculator className="h-4 w-4" />
                Calculate Rates
              </Button>

              {quotes && (
                <div className="grid gap-4 pt-2 sm:grid-cols-3">
                  {quotes.map((quote) => (
                    <Card
                      key={quote.name}
                      className={
                        quote.highlight
                          ? "border-primary/40 bg-primary/[0.03] ring-1 ring-primary/20"
                          : "border-border/70"
                      }
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 text-primary">
                          {quote.icon}
                          <CardTitle className="text-sm font-semibold">
                            {quote.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          {quote.mode}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-2xl font-bold tracking-tight">
                          {formatCurrency(quote.price)}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {quote.eta}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
