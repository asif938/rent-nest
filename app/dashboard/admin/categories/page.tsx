import type { Metadata } from "next";

import { getCategories } from "@/app/(site)/(public)/_actions/getCategories";
import CategoriesTable from "./_components/CategoriesTable";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Categories
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage the property categories landlords can choose from.
        </p>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
