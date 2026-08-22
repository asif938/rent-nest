import {
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MessageSquare,
  Wallet,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import { DashboardStats as DashboardData } from "@/types/tenantDashboard";

type Props = {
  dashboard: DashboardData;
};

export default function DashboardStats({
  dashboard,
}: Props) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      <DashboardCard
        title="Total Requests"
        value={dashboard.rentalRequests.total}
        tint="primary"
        icon={<FileText size={20} />}
      />

      <DashboardCard
        title="Pending Requests"
        value={dashboard.rentalRequests.pending}
        tint="accent"
        icon={<Clock size={20} />}
      />

      <DashboardCard
        title="Approved Requests"
        value={dashboard.rentalRequests.approved}
        tint="forest"
        icon={<CheckCircle2 size={20} />}
      />

      <DashboardCard
        title="Completed Rentals"
        value={dashboard.rentalRequests.completed}
        tint="muted"
        icon={<Wallet size={20} />}
      />

      <DashboardCard
        title="Completed Payments"
        value={dashboard.payments.completedPayments}
        tint="primary"
        icon={<CreditCard size={20} />}
      />

      <DashboardCard
        title="Total Reviews"
        value={dashboard.reviews.total}
        tint="accent"
        icon={<MessageSquare size={20} />}
      />

    </section>
  );
}
