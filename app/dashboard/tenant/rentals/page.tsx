import { getMyRentals } from "./_actions/getMyRentals";
import RentalsTable from "./_components/RentalsTable";

export default async function MyRentalsPage() {
  const rentals = await getMyRentals();

  return (
    <div className="space-y-8">

      <div>

        <h1 className="font-display text-3xl font-medium tracking-tight">
          My Rentals
        </h1>

        <p className="mt-2 text-muted-foreground">
          View and manage your rental requests.
        </p>

      </div>

      <RentalsTable
        rentals={rentals}
      />

    </div>
  );
}