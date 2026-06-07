import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Package,
  Truck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/utils";

const metrics = [
  {
    label: "Active Orders",
    value: formatNumber(46),
    icon: Package,
    trend: "+3 today",
  },
  {
    label: "In-Transit",
    value: formatNumber(1200),
    icon: Truck,
    trend: "Across 18 lanes",
  },
  {
    label: "NDR Action Needed",
    value: formatNumber(7),
    icon: AlertTriangle,
    trend: "Requires triage",
    accent: true,
  },
  {
    label: "Available Wallet Balance",
    value: formatCurrency(14250),
    icon: Wallet,
    trend: "Prepaid account",
  },
];

const shipments = [
  {
    tracking: "FLM882910034",
    destination: "Mumbai",
    carrier: "Blue Dart",
    status: "In Transit",
    statusColor: "text-blue-700 bg-blue-50",
  },
  {
    tracking: "FLM882910035",
    destination: "Bengaluru",
    carrier: "Delhivery",
    status: "Out for Delivery",
    statusColor: "text-emerald-700 bg-emerald-50",
  },
  {
    tracking: "FLM882910036",
    destination: "Pune",
    carrier: "DTDC",
    status: "NDR Pending",
    statusColor: "text-amber-700 bg-amber-50",
  },
  {
    tracking: "FLM882910037",
    destination: "Hyderabad",
    carrier: "Ecom Express",
    status: "In Transit",
    statusColor: "text-blue-700 bg-blue-50",
  },
  {
    tracking: "FLM882910038",
    destination: "Chennai",
    carrier: "Delhivery",
    status: "Delivered",
    statusColor: "text-slate-700 bg-slate-100",
  },
];

export default function ClientDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Dashboard shell header */}
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">FLM Hub</p>
              <p className="text-xs text-muted-foreground">Client Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Acme Corp · Enterprise
            </span>
            <Button asChild variant="outline" size="sm">
              <Link href="/">Exit Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Operations Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Static mock dashboard — wire to API or Supabase when ready.
          </p>
        </div>

        {/* Telemetry row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              className={
                metric.accent
                  ? "border-amber-200/80 bg-amber-50/30"
                  : "border-border/80"
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <metric.icon
                  className={`h-4 w-4 ${metric.accent ? "text-amber-600" : "text-muted-foreground"}`}
                />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipments table */}
        <Card className="mt-8 border-border/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Active Shipments</CardTitle>
            <Button variant="outline" size="sm" disabled>
              Export CSV
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Destination City</TableHead>
                  <TableHead>Carrier Partner</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.tracking}>
                    <TableCell className="font-mono text-sm font-medium">
                      {shipment.tracking}
                    </TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${shipment.statusColor}`}
                      >
                        {shipment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
