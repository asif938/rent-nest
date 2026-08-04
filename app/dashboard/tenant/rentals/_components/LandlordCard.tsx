import { Landlord } from "@/types/property";

type Props = {
  landlord: Landlord;
};

export default function LandlordCard({
  landlord,
}: Props) {
  return (
    <div className="rounded-xl border p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Landlord
      </h2>

      <div className="space-y-3">

        <div>
          <p className="text-sm text-muted-foreground">
            Name
          </p>

          <p>{landlord.id}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Email
          </p>

          <p>{landlord.email}</p>
        </div>

      </div>

    </div>
  );
}