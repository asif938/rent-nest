import Link from "next/link";
import type { Metadata } from "next";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getLatestPayment } from "../_actions/getLatestPayment";
import PaymentResultShell from "../_components/PaymentResultShell";

export const metadata: Metadata = {
  title: "Payment Successful",
};

type Props = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: Props) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <PaymentResultShell
        icon={<Clock size={28} />}
        iconTint="muted"
        title="No Payment Session Found"
        description="We couldn't find a payment session for this page. If you just completed a checkout, check your payment history below."
        actions={
          <>
            <Link href="/dashboard/tenant/payments">
              <Button
                variant="outline"
                className="w-full rounded-full sm:w-auto"
              >
                Payment History
              </Button>
            </Link>

            <Link href="/dashboard/tenant">
              <Button className="w-full rounded-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
          </>
        }
      />
    );
  }

  const payment = await getLatestPayment();

  if (payment?.status === "FAILED") {
    return (
      <PaymentResultShell
        icon={<AlertCircle size={28} />}
        iconTint="muted"
        title="Payment Could Not Be Confirmed"
        description="Something went wrong confirming your payment. No worries — you haven't been charged twice. Please try again from your rental requests."
        actions={
          <>
            <Link href="/dashboard/tenant/payments">
              <Button
                variant="outline"
                className="w-full rounded-full sm:w-auto"
              >
                Payment History
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

  if (payment?.status === "COMPLETED") {
    return (
      <PaymentResultShell
        icon={<CheckCircle2 size={28} />}
        iconTint="forest"
        title="Payment Successful"
        description="Your payment has been confirmed and your rental is now active."
        actions={
          <>
            <Link href="/dashboard/tenant/payments">
              <Button
                variant="outline"
                className="w-full rounded-full sm:w-auto"
              >
                Payment History
              </Button>
            </Link>

            <Link href="/dashboard/tenant/rentals">
              <Button className="w-full rounded-full sm:w-auto">
                View My Rentals
              </Button>
            </Link>
          </>
        }
      >
        <div className="space-y-3 rounded-xl border border-border/70 bg-muted/30 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Property</span>
            <span className="font-medium">
              {payment.rentalRequest.property.title}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium">
              {payment.rentalRequest.property.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-display text-base font-medium text-primary">
              ৳{payment.amount.toLocaleString()}
            </span>
          </div>
        </div>
      </PaymentResultShell>
    );
  }

  return (
    <PaymentResultShell
      icon={<Clock size={28} />}
      iconTint="muted"
      title="Confirming Your Payment"
      description="Your checkout was completed and your payment is being confirmed. This usually takes just a few seconds — check your payment history shortly."
      actions={
        <>
          <Link href="/dashboard/tenant/payments">
            <Button
              variant="outline"
              className="w-full rounded-full sm:w-auto"
            >
              Payment History
            </Button>
          </Link>

          <Link href="/dashboard/tenant">
            <Button className="w-full rounded-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </>
      }
    />
  );
}
