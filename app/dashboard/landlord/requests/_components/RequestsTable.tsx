"use client";

import { useOptimistic, useState, useTransition } from "react";
import { Check, ClipboardList, Star, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import { updateRequestStatus } from "../_actions/updateRequestStatus";
import type { LandlordRentalRequest } from "@/types/landlord";

type Props = {
  requests: LandlordRentalRequest[];
};

export default function RequestsTable({
  requests,
}: Props) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isTransitioning, startTransition] = useTransition();

  const [optimisticRequests, setOptimisticStatus] = useOptimistic(
    requests,
    (state, payload: { id: string; status: "APPROVED" | "REJECTED" }) =>
      state.map((request) =>
        request.id === payload.id
          ? { ...request, status: payload.status }
          : request
      )
  );

  function handleDecision(
    id: string,
    status: "APPROVED" | "REJECTED"
  ) {
    setPendingId(id);

    startTransition(async () => {
      setOptimisticStatus({ id, status });

      const result = await updateRequestStatus(id, status);

      setPendingId(null);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
        <ClipboardList
          size={32}
          className="mb-3 text-muted-foreground/50"
        />

        <h3 className="text-lg font-semibold">
          No rental requests
        </h3>

        <p className="mt-2 text-muted-foreground">
          Requests from tenants will show up here.
        </p>
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
                Tenant
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Property
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Dates
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {optimisticRequests.map((request) => {
              const avgRating =
                request.tenant.reviews && request.tenant.reviews.length > 0
                  ? (
                      request.tenant.reviews.reduce(
                        (sum, r) => sum + r.rating,
                        0
                      ) / request.tenant.reviews.length
                    ).toFixed(1)
                  : null;

              return (
                <tr
                  key={request.id}
                  className="border-b border-border/70 last:border-none hover:bg-muted/30"
                >
                  <td className="px-6 py-5">
                    <div className="font-medium">
                      {request.tenant.name}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {request.tenant.email}
                    </p>

                    {avgRating && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Star
                          size={12}
                          className="fill-primary text-primary"
                        />
                        {avgRating} tenant rating
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <div className="font-medium">
                      {request.property.title}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {request.property.location}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {new Date(request.startDate).toLocaleDateString()}
                    {" – "}
                    {new Date(request.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <RentalStatusBadge status={request.status} />
                  </td>

                  <td className="px-6 py-5">
                    {request.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="rounded-full"
                          disabled={isTransitioning && pendingId === request.id}
                          onClick={() =>
                            handleDecision(request.id, "APPROVED")
                          }
                        >
                          <Check size={14} />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                          disabled={isTransitioning && pendingId === request.id}
                          onClick={() =>
                            handleDecision(request.id, "REJECTED")
                          }
                        >
                          <X size={14} />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <p className="text-right text-sm text-muted-foreground">
                        —
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
