import { getCategories } from "../_actions/getCategories";
import PropertyFilters from "../_components/PropertyFilters";
import PropertyGrid from "../_components/PropertyGrid";

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    available?: string;
    page?: string;
  }>;
};

export default async function PropertiesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const categories = await getCategories();

  return (
    <main className="container py-10">

      <div className="mb-10">
        <h1 className="font-display text-4xl font-medium tracking-tight">
          Browse Properties
        </h1>

        <p className="mt-2 text-muted-foreground">
          Find your next home.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

        <PropertyFilters categories={categories} />

        <PropertyGrid
          searchParams={params}
        />

      </div>

    </main>
  );
}