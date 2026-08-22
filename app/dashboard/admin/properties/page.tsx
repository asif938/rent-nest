import type { Metadata } from "next";

import { getProperties } from "./_actions/getProperties";
import PropertiesTable from "./_components/PropertiesTable";

export const metadata: Metadata = {
  title: "Properties",
};

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Properties
        </h1>

        <p className="mt-2 text-muted-foreground">
          Inspect all listings across the platform.
        </p>
      </div>

      <PropertiesTable properties={properties} />
    </div>
  );
}
