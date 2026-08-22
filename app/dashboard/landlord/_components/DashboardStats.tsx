import {
  Clock,
  DollarSign,
  Home,
  House,
  KeyRound,
} from "lucide-react";

import DashboardCard from "@/app/dashboard/_components/DashboardCard";
import type { LandlordDashboard } from "@/types/landlord";

type Props = {
  dashboard: LandlordDashboard;
};

export default function DashboardStats({
  dashboard,
}: Props) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      <DashboardCard
        title="Total Properties"
        value={dashboard.properties.total}
        tint="primary"
        icon={<Home size={20} />}
      />

      <DashboardCard
        title="Available"
        value={dashboard.properties.available}
        tint="forest"
        icon={<House size={20} />}
      />

      <DashboardCard
        title="Rented"
        value={dashboard.properties.rented}
        tint="muted"
        icon={<KeyRound size={20} />}
      />

      <DashboardCard
        title="Pending Requests"
        value={dashboard.rentalRequests.pending}
        tint="accent"
        icon={<Clock size={20} />}
      />

      <DashboardCard
        title="Total Revenue"
        value={`$${dashboard.earnings.totalRevenue.toLocaleString()}`}
        tint="primary"
        icon={<DollarSign size={20} />}
      />

      <DashboardCard
        title="Completed Payments"
        value={dashboard.earnings.completedPayments}
        tint="forest"
        icon={<DollarSign size={20} />}
      />

    </section>
  );
}
