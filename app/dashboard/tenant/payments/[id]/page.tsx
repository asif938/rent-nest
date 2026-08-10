import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSinglePayment } from "../_actions/getSinglePayment";
import PaymentInfoCard from "../_components/PaymentInfoCard";
import PaymentPropertyCard from "../_components/PaymentPropertyCard";
import PaymentRentalCard from "../_components/PaymentRentalCard";



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
        <h1 className="text-3xl font-bold">
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
          <Button variant="outline">
            Back to Payments
          </Button>
        </Link>
      </div>

    </div>
  );
}