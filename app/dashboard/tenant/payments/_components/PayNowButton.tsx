"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPayment } from "../_actions/createPayment";

type Props = {
  rentalRequestId: string;
  size?: "default" | "sm";
  className?: string;
};

export default function PayNowButton({
  rentalRequestId,
  size = "default",
  className,
}: Props) {
  const [pending, setPending] = useState(false);

  async function handlePayment() {
    setPending(true);

    try {
      const result = await createPayment(rentalRequestId);

      window.location.href = result.checkoutUrl;
    } catch (error) {
      setPending(false);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again."
      );
    }
  }

  return (
    <Button
      size={size}
      className={cn("rounded-full", className)}
      onClick={handlePayment}
      disabled={pending}
    >
      {pending ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}
