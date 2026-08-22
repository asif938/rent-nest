import Link from "next/link";

import { Button } from "@/components/ui/button";
import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import type { LandlordDashboard } from "@/types/landlord";

type Props = {
  requests: LandlordDashboard["recentRequests"];
};

export default function RecentRequests({
  requests,
}: Props) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card shadow-sm">

      <div className="flex items-center justify-between border-b border-border/70 p-6">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Requests
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest rental requests on your properties.
          </p>
        </div>

        <Link href="/dashboard/landlord/requests">
          <Button
            variant="outline"
            className="rounded-full"
          >
            View All
          </Button>
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="p-10 text-center text-muted-foreground">
          No rental requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/70 bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Tenant
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Property
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-border/70 last:border-none hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">{request.tenant.name}</div>
                    <p className="text-sm text-muted-foreground">
                      {request.tenant.email}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {request.property.title}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.property.location}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <RentalStatusBadge
                      status={
                        request.status as
                          | "PENDING"
                          | "APPROVED"
                          | "REJECTED"
                          | "COMPLETED"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </section>
  );
}
