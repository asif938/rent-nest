"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import RentalStatusBadge from "@/components/shared/rentalStatusBadge";
import type { AdminRental } from "@/types/admin";

type Props = {
  rentals: AdminRental[];
};

export default function RentalsTable({
  rentals,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return rentals;

    return rentals.filter(
      (rental) =>
        rental.tenant.name.toLowerCase().includes(term) ||
        rental.tenant.email.toLowerCase().includes(term) ||
        rental.property.title.toLowerCase().includes(term) ||
        rental.property.landlord.name.toLowerCase().includes(term)
    );
  }, [rentals, search]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by tenant, property, or landlord..."
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No rental requests match your search.
          </div>
        ) : (
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
                    Landlord
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Payment
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((rental) => (
                  <tr
                    key={rental.id}
                    className="border-b border-border/70 last:border-none hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium">{rental.tenant.name}</div>
                      <p className="text-sm text-muted-foreground">
                        {rental.tenant.email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {rental.property.title}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rental.property.location}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {rental.property.landlord.name}
                    </td>

                    <td className="px-6 py-4">
                      <RentalStatusBadge status={rental.status} />
                    </td>

                    <td className="px-6 py-4">
                      {rental.payment ? (
                        <Badge
                          variant={
                            rental.payment.status === "COMPLETED"
                              ? "default"
                              : rental.payment.status === "FAILED"
                                ? "destructive"
                                : "secondary"
                          }
                          className="rounded-full"
                        >
                          {rental.payment.status}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No payment
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
