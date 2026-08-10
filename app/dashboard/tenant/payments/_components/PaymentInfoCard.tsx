import { Badge } from "@/components/ui/badge";

import { Payment } from "@/types/payment";

type Props = {
  payment: Payment;
};

export default function PaymentInfoCard({
  payment,
}: Props) {
  const statusVariant =
    payment.status === "COMPLETED"
      ? "default"
      : payment.status === "FAILED"
        ? "destructive"
        : "secondary";

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Payment Information
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-muted-foreground">
            Payment ID
          </p>

          <p className="mt-1 break-all font-medium">
            {payment.id}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Amount
          </p>

          <p className="mt-1 text-2xl font-bold">
            ৳{payment.amount.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <div className="mt-1">
            <Badge variant={statusVariant}>
              {payment.status}
            </Badge>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Payment Date
          </p>

          <p className="mt-1">
            {new Date(
              payment.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}