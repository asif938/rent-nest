import type { Metadata } from "next";

import { getPayments } from "./_actions/getPayments";
import PaymentsTable from "./_components/PaymentsTable";

export const metadata: Metadata = {
  title: "Payments",
};

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Payments
        </h1>

        <p className="mt-2 text-muted-foreground">
          View your payment history.
        </p>
      </div>

      <PaymentsTable payments={payments} />
    </div>
  );
}