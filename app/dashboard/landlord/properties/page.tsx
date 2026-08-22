import Link from "next/link";
import type { Metadata } from "next";
import { Plus, PackageOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProperties } from "./_actions/getProperties";
import PropertyManagementCard from "./_components/PropertyManagementCard";

export const metadata: Metadata = {
  title: "My Properties",
};

export default async function LandlordPropertiesPage() {
  const { data: properties } = await getProperties();

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            My Properties
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your property listings.
          </p>
        </div>

        <Link href="/dashboard/landlord/properties/new">
          <Button className="rounded-full">
            <Plus size={16} />
            Add Property
          </Button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
          <PackageOpen
            size={32}
            className="mb-3 text-muted-foreground/50"
          />

          <h3 className="text-lg font-semibold">
            No properties yet
          </h3>

          <p className="mt-2 text-muted-foreground">
            Create your first listing to start receiving rental requests.
          </p>

          <Link href="/dashboard/landlord/properties/new">
            <Button className="mt-6 rounded-full">
              <Plus size={16} />
              Add Property
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyManagementCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}

    </div>
  );
}
