import type { Metadata } from "next";

import { getRentals } from "./_actions/getRentals";
import RentalsTable from "./_components/RentalsTable";

export const metadata: Metadata = {
  title: "Rental Requests",
};

export default async function AdminRentalsPage() {
  const rentals = await getRentals();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Rental Requests
        </h1>

        <p className="mt-2 text-muted-foreground">
          Inspect all rental requests across the platform.
        </p>
      </div>

      <RentalsTable rentals={rentals} />
    </div>
  );
}
