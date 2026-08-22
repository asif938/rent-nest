import type { Metadata } from "next";

import { getDashboard } from "./_actions/getDashboard";
import DashboardStats from "./_components/DashboardStats";
import RecentRequests from "./_components/RecentRequests";

export const metadata: Metadata = {
  title: "Landlord Dashboard",
};

export default async function LandlordDashboardPage() {
  const dashboard = await getDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Landlord Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Overview of your properties, requests, and earnings.
        </p>
      </div>

      <DashboardStats dashboard={dashboard} />

      <RecentRequests requests={dashboard.recentRequests} />
    </div>
  );
}
