import { Badge } from "@/components/ui/badge";
import { DetailCard, DetailRow } from "@/app/dashboard/_components/DetailCard";

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
    <DetailCard title="Payment Information">

      <DetailRow label="Payment ID">
        <p className="break-all font-medium">
          {payment.id}
        </p>
      </DetailRow>

      <DetailRow label="Amount">
        <p className="font-display text-2xl font-medium text-primary">
          ৳{payment.amount.toLocaleString()}
        </p>
      </DetailRow>

      <DetailRow label="Status">
        <Badge
          variant={statusVariant}
          className="rounded-full"
        >
          {payment.status}
        </Badge>
      </DetailRow>

      <DetailRow label="Payment Date">
        <p>
          {new Date(payment.createdAt).toLocaleDateString()}
        </p>
      </DetailRow>

    </DetailCard>
  );
}
