import { getMyRentals } from "./_actions/getMyRentals";
import RentalsTable from "./_components/RentalsTable";

export default async function MyRentalsPage() {
  const rentals = await getMyRentals();

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
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