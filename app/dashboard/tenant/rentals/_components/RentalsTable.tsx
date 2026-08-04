import Link from "next/link";

import { Button } from "@/components/ui/button";

// import { Rental } from "@/types/rental";
import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import { Rental } from "@/types/rental";

// import RentalStatusBadge from "./RentalStatusBadge";

type Props = {
  rentals: Rental[];
};

export default function RentalsTable({
  rentals,
}: Props) {
  if (rentals.length === 0) {
    return (
      <div className="rounded-xl border py-16 text-center">
        <h3 className="text-lg font-semibold">
          No rentals found
        </h3>

        <p className="mt-2 text-muted-foreground">
          You have not submitted any rental requests yet.
        </p>

        <Link href="/properties">
          <Button className="mt-6">
            Browse Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-muted/40">

            <tr>

              <th className="px-6 py-4 text-left">
                Property
              </th>

              <th className="px-6 py-4 text-left">
                Rent
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Start Date
              </th>

              <th className="px-6 py-4 text-left">
                End Date
              </th>

              <th className="px-6 py-4 text-right">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {rentals.map((rental) => (
              <tr
                key={rental.id}
                className="border-t"
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