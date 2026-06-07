import Link from "next/link";
import { ArrowLeft, Lock, Package } from "lucide-react";

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

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <span className="text-sm font-semibold tracking-tight">FLM Hub</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border/80 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Client Portal
            </CardTitle>
            <CardDescription>
              Secure access for authorized enterprise accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="procurement@company.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <Button asChild className="w-full font-semibold">
                <Link href="/dashboard/client">Sign in</Link>
              </Button>
            </form>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Authentication placeholder — connect Supabase or your IdP when ready.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
