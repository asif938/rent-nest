"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminProperty } from "@/types/admin";

type Props = {
  properties: AdminProperty[];
};

export default function PropertiesTable({
  properties,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return properties;

    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(term) ||
        property.location.toLowerCase().includes(term) ||
        property.landlord.name.toLowerCase().includes(term) ||
        property.landlord.email.toLowerCase().includes(term)
    );
  }, [properties, search]);

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
          placeholder="Search by title, location, or landlord..."
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No properties match your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/70 bg-muted/40">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Property
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Landlord
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Rent
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Rating
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
                {filtered.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b border-border/70 last:border-none hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium">{property.title}</div>
                      <p className="text-sm text-muted-foreground">
                        {property.location}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {property.landlord.name}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {property.landlord.email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className="rounded-full"
                      >
                        {property.category.name}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      ${property.price}/mo
                    </td>

                    <td className="px-6 py-4">
                      {property.totalReviews > 0 ? (
                        <span className="flex items-center gap-1 text-sm">
                          <Star
                            size={13}
                            className="fill-primary text-primary"
                          />
                          {property.averageRating}
                          <span className="text-xs text-muted-foreground">
                            ({property.totalReviews})
                          </span>
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No reviews
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant={property.isAvailable ? "default" : "secondary"}
                        className="rounded-full"
                      >
                        {property.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/properties/${property.id}`}
                        target="_blank"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "rounded-full"
                        )}
                      >
                        <ExternalLink size={13} />
                        View
                      </Link>
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
