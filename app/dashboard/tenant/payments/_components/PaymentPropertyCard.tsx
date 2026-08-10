import { Payment } from "@/types/payment";

type Props = {
  property: Payment["rentalRequest"]["property"];
};

export default function PaymentPropertyCard({
  property,
}: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Property
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Property
          </p>

          <p className="mt-1 font-medium">
            {property.title}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Location
          </p>

          <p className="mt-1">
            {property.location}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Monthly Rent
          </p>

          <p className="mt-1 font-semibold">
            ৳{property.price.toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}