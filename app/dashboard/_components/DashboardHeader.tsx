"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">

      <div>
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Mobile sidebar button */}

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

      </div>

    </header>
  );
}