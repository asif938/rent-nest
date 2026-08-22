import Link from "next/link";
import { Receipt } from "lucide-react";

import { Payment } from "@/types/payment";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  payments: Payment[];
};

export default function PaymentsTable({
  payments,
}: Props) {
  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
        <Receipt
          size={32}
          className="mb-3 text-muted-foreground/50"
        />

        <h2 className="text-lg font-semibold">
          No Payments Found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Your payment history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-sm">

      <table className="w-full">

        <thead className="border-b border-border/70 bg-muted/40">

          <tr>

            <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">
              Property
            </th>

            <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">
              Amount
            </th>

            <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">
              Status
            </th>

            <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">
              Date
            </th>

            <th className="px-5 py-3 text-right text-sm font-medium text-muted-foreground">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-border/70 last:border-none hover:bg-muted/30"
            >
              <td className="px-5 py-4">
                <div>
                  <p className="font-medium">
                    {payment.rentalRequest.property.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {payment.rentalRequest.property.location}
                  </p>
                </div>
              </td>

              <td className="px-5 py-4 font-medium">
                ৳{payment.amount.toLocaleString()}
              </td>

              <td className="px-5 py-4">
                <Badge
                  variant={
                    payment.status === "COMPLETED"
                      ? "default"
                      : payment.status === "PENDING"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {payment.status}
                </Badge>
              </td>

              <td className="px-5 py-4">
                {new Date(
                  payment.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="px-5 py-4 text-right">
                <Link
                  href={`/dashboard/tenant/payments/${payment.id}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    View
                  </Button>
                </Link>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}