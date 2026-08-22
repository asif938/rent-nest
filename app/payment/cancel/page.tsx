import Link from "next/link";
import type { Metadata } from "next";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import PaymentResultShell from "../_components/PaymentResultShell";

export const metadata: Metadata = {
  title: "Payment Cancelled",
};

export default function PaymentCancelPage() {
  return (
    <PaymentResultShell
      icon={<XCircle size={28} />}
      iconTint="muted"
      title="Payment Cancelled"
      description="Your checkout was cancelled and you have not been charged. You can try again anytime from your rental requests."
      actions={
        <>
          <Link href="/properties">
            <Button
              variant="outline"
              className="w-full rounded-full sm:w-auto"
            >
              Browse Properties
            </Button>
          </Link>

          <Link href="/dashboard/tenant/rentals">
            <Button className="w-full rounded-full sm:w-auto">
              View My Rentals
            </Button>
          </Link>
        </>
      }
    />
  );
}
