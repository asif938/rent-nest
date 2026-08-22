import Link from "next/link";
import { House } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  icon: React.ReactNode;
  iconTint: "forest" | "muted";
  title: string;
  description: string;
  children?: React.ReactNode;
  actions: React.ReactNode;
};

export default function PaymentResultShell({
  icon,
  iconTint,
  title,
  description,
  children,
  actions,
}: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-forest/10 blur-3xl" />
        <div className="bg-noise absolute inset-0" />
      </div>

      <div className="relative w-full max-w-md">

        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <House size={18} />
          </span>

          <span className="font-display text-xl font-semibold">
            RentNest
          </span>
        </Link>

        <div className="rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">

          <div
            className={cn(
              "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
              iconTint === "forest"
                ? "bg-forest/10 text-forest"
                : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>

          <h1 className="mt-6 font-display text-2xl font-medium tracking-tight">
            {title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {description}
          </p>

          {children && (
            <div className="mt-6 text-left">
              {children}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {actions}
          </div>

        </div>

      </div>

    </div>
  );
}
