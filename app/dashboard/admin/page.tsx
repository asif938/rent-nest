import type { Metadata } from "next";

import { getDashboard } from "./_actions/getDashboard";
import DashboardStats from "./_components/DashboardStats";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const dashboard = await getDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Platform-wide overview of users, properties, and rentals.
        </p>
      </div>

      <DashboardStats dashboard={dashboard} />
    </div>
  );
}
