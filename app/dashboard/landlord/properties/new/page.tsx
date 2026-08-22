import { getCategories } from "@/app/(site)/(public)/_actions/getCategories";
import PropertyForm from "../_components/PropertyForm";

export default async function NewPropertyPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-3xl space-y-8">

      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Add Property
        </h1>

        <p className="mt-2 text-muted-foreground">
          Create a new listing for tenants to discover.
        </p>
      </div>

      <PropertyForm categories={categories} />

    </div>
  );
}
