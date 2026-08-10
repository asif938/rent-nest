import Link from "next/link";

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
      <div className="rounded-xl border p-10 text-center">
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
    <div className="overflow-x-auto rounded-xl border">

      <table className="w-full">

        <thead className="bg-muted/50">

          <tr>

            <th className="px-5 py-3 text-left">
              Property
            </th>

            <th className="px-5 py-3 text-left">
              Amount
            </th>

            <th className="px-5 py-3 text-left">
              Status
            </th>

            <th className="px-5 py-3 text-left">
              Date
            </th>

            <th className="px-5 py-3 text-right">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-t"
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