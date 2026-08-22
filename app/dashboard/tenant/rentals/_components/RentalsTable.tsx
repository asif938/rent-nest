import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import { Rental } from "@/types/rental";

type Props = {
  rentals: Rental[];
};

export default function RentalsTable({
  rentals,
}: Props) {
  if (rentals.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
        <FileQuestion
          size={32}
          className="mb-3 text-muted-foreground/50"
        />

        <h3 className="text-lg font-semibold">
          No rentals found
        </h3>

        <p className="mt-2 text-muted-foreground">
          You have not submitted any rental requests yet.
        </p>

        <Link href="/properties">
          <Button className="mt-6 rounded-full">
            Browse Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b border-border/70 bg-muted/40">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Property
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Rent
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Start Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                End Date
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {rentals.map((rental) => (
              <tr
                key={rental.id}
                className="border-b border-border/70 last:border-none hover:bg-muted/30"
              >
                <td className="px-6 py-5">

                  <div className="font-medium">
                    {rental.property.title}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {rental.property.location}
                  </p>

                </td>

                <td className="px-6 py-5">
                  ৳
                  {rental.property.price.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <RentalStatusBadge
                    status={rental.status}
                  />
                </td>

                <td className="px-6 py-5">
                  {new Date(
                    rental.startDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  {new Date(
                    rental.endDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 text-right">

                  <Link
                    href={`/dashboard/tenant/rentals/${rental.id}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
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

    </div>
  );
}