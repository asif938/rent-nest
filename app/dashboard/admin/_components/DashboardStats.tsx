import {
  Clock,
  DollarSign,
  Home,
  KeyRound,
  UserCog,
  Users,
} from "lucide-react";

import DashboardCard from "@/app/dashboard/_components/DashboardCard";
import type { AdminDashboard } from "@/types/admin";

type Props = {
  dashboard: AdminDashboard;
};

export default function DashboardStats({
  dashboard,
}: Props) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      <DashboardCard
        title="Total Users"
        value={dashboard.users.total}
        tint="primary"
        icon={<Users size={20} />}
      />

      <DashboardCard
        title="Tenants"
        value={dashboard.users.tenants}
        tint="accent"
        icon={<UserCog size={20} />}
      />

      <DashboardCard
        title="Landlords"
        value={dashboard.users.landlords}
        tint="forest"
        icon={<UserCog size={20} />}
      />

      <DashboardCard
        title="Total Properties"
        value={dashboard.properties.total}
        tint="primary"
        icon={<Home size={20} />}
      />

      <DashboardCard
        title="Rented"
        value={dashboard.properties.rented}
        tint="muted"
        icon={<KeyRound size={20} />}
      />

      <DashboardCard
        title="Pending Rentals"
        value={dashboard.rentals.pending}
        tint="accent"
        icon={<Clock size={20} />}
      />

      <DashboardCard
        title="Completed Rentals"
        value={dashboard.rentals.completed}
        tint="forest"
        icon={<KeyRound size={20} />}
      />

      <DashboardCard
        title="Completed Payments"
        value={dashboard.payments.completedPayments}
        tint="primary"
        icon={<DollarSign size={20} />}
      />

      <DashboardCard
        title="Total Revenue"
        value={`$${dashboard.payments.totalRevenue.toLocaleString()}`}
        tint="forest"
        icon={<DollarSign size={20} />}
      />

    </section>
  );
}
