import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getSinglePayment } from "../_actions/getSinglePayment";
import PaymentInfoCard from "../_components/PaymentInfoCard";
import PaymentPropertyCard from "../_components/PaymentPropertyCard";
import PaymentRentalCard from "../_components/PaymentRentalCard";

export const metadata: Metadata = {
  title: "Payment Details",
};



type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PaymentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const payment = await getSinglePayment(id);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Payment Details
        </h1>

        <p className="mt-2 text-muted-foreground">
          View information about your payment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <PaymentInfoCard
          payment={payment}
        />

        <PaymentPropertyCard
          property={
            payment.rentalRequest.property
          }
        />

        <PaymentRentalCard
          rentalRequest={
            payment.rentalRequest
          }
        />

      </div>

      <div>
        <Link href="/dashboard/tenant/payments">
          <Button
            variant="outline"
            className="rounded-full"
          >
            Back to Payments
          </Button>
        </Link>
      </div>

    </div>
  );
}