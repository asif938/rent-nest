import { getPayments } from "./_actions/getPayments";
import PaymentsTable from "./_components/PaymentsTable";

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
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