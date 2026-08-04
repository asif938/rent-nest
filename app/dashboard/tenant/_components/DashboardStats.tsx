import {
  CheckCircle,
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
        icon={
          <FileText className="h-8 w-8 text-primary" />
        }
      />

      <DashboardCard
        title="Pending Requests"
        value={dashboard.rentalRequests.pending}
        icon={
          <Clock className="h-8 w-8 text-yellow-500" />
        }
      />

      <DashboardCard
        title="Approved Requests"
        value={dashboard.rentalRequests.approved}
        icon={
          <CheckCircle className="h-8 w-8 text-green-500" />
        }
      />

      <DashboardCard
        title="Completed Rentals"
        value={dashboard.rentalRequests.completed}
        icon={
          <Wallet className="h-8 w-8 text-blue-500" />
        }
      />

      <DashboardCard
        title="Completed Payments"
        value={dashboard.payments.completedPayments}
        icon={
          <CreditCard className="h-8 w-8 text-purple-500" />
        }
      />

      <DashboardCard
        title="Total Reviews"
        value={dashboard.reviews.total}
        icon={
          <MessageSquare className="h-8 w-8 text-orange-500" />
        }
      />

    </section>
  );
}