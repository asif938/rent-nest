// import RentalStatusBadge from "../../_components/RentalStatusBadge";

import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import { Rental } from "@/types/rental";

type Props = {
  rental: Rental;
};

export default function RentalInfoCard({
  rental,
}: Props) {
  return (
    <div className="rounded-xl border p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Rental Information
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <RentalStatusBadge
            status={rental.status}
          />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Start Date
          </p>

          <p>
            {new Date(
              rental.startDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            End Date
          </p>

          <p>
            {new Date(
              rental.endDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Requested On
          </p>

          <p>
            {new Date(
              rental.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

      </div>

    </div>
  );
}