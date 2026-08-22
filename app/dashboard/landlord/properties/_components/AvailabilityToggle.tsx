"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { updateProperty } from "../_actions/propertyActions";

type Props = {
  propertyId: string;
  isAvailable: boolean;
};

export default function AvailabilityToggle({
  propertyId,
  isAvailable,
}: Props) {
  const [available, setAvailable] = useState(isAvailable);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const next = !available;
    setAvailable(next);

    startTransition(async () => {
      const result = await updateProperty(propertyId, {
        isAvailable: next,
      });

      if (!result.success) {
        setAvailable(!next);
        toast.error(result.message);
      } else {
        toast.success(
          next ? "Property is now available" : "Property marked unavailable"
        );
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50",
        available ? "bg-primary" : "bg-muted-foreground/30"
      )}
      aria-pressed={available}
      aria-label="Toggle availability"
    >
      <span
        className={cn(
          "inline-block h-4.5 w-4.5 transform rounded-full bg-background shadow-sm transition-transform",
          available ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}
