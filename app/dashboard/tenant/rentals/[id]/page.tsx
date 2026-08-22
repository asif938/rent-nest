import { getSingleRentals } from "../_actions/getSingleRentals";
import LandlordCard from "../_components/LandlordCard";
import PaymentCard from "../_components/PaymentCard";
import PropertyCard from "../_components/PropertyCard";
import RentalInfoCard from "../_components/RentalInfoCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RentalDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const rental = await getSingleRentals(id);

  return (
    <div className="space-y-8">

      <div>

        <h1 className="font-display text-3xl font-medium tracking-tight">
          Rental Details
        </h1>

        <p className="mt-2 text-muted-foreground">
          View information about your rental request.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <PropertyCard
          property={rental.property}
        />

        <RentalInfoCard
          rental={rental}
        />

        {rental.property.landlord && (
          <LandlordCard
            landlord={rental.property.landlord}
          />
        )}

        <PaymentCard
          payment={rental.payment}
          rentalRequestId={rental.id}
          rentalStatus={rental.status}
        />

      </div>

    </div>
  );
}
