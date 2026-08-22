import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function DetailCard({
  title,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-6 shadow-sm",
        className
      )}
    >
      <h2 className="mb-5 text-lg font-semibold">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

type RowProps = {
  label: string;
  children: ReactNode;
};

export function DetailRow({
  label,
  children,
}: RowProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <div className="mt-1">
        {children}
      </div>
    </div>
  );
}
