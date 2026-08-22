import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getMe } from "@/lib/getMe";
import { getSingleProperty } from "@/app/(site)/(public)/_actions/getSingleProperty";
import { getCategories } from "@/app/(site)/(public)/_actions/getCategories";
import PropertyForm from "../../_components/PropertyForm";

export const metadata: Metadata = {
  title: "Edit Property",
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({
  params,
}: Props) {
  const { id } = await params;

  const [user, property, categories] = await Promise.all([
    getMe(),
    getSingleProperty(id).catch(() => null),
    getCategories(),
  ]);

  if (!property) {
    notFound();
  }

  if (!user || property.landlordId !== user.id) {
    redirect("/dashboard/landlord/properties");
  }

  return (
    <div className="max-w-3xl space-y-8">

      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Edit Property
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update the details of your listing.
        </p>
      </div>

      <PropertyForm
        categories={categories}
        property={property}
      />

    </div>
  );
}
