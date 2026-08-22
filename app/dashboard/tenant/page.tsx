import type { Metadata } from "next";

import { getDashboard } from "./_actions/getDashboard";
import DashboardStats from "./_components/DashboardStats";
import RecentRentals from "./_components/RecentRentals";

export const metadata: Metadata = {
  title: "Tenant Dashboard",
};

export default async function TenantDashboardPage() {
  const dashboard = await getDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Tenant Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here is an overview of your rental activity.
        </p>
      </div>

      <DashboardStats dashboard={dashboard} />

      <RecentRentals rentals={dashboard.recentRentals} />
    </div>
  );
}
