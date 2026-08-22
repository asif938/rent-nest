import Link from "next/link";

import { cn } from "@/lib/utils";
import { getRequests } from "./_actions/getRequests";
import RequestsTable from "./_components/RequestsTable";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

const FILTERS = [
  { label: "All", value: undefined },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Completed", value: "COMPLETED" },
];

export default async function LandlordRequestsPage({
  searchParams,
}: Props) {
  const { status } = await searchParams;

  const { data: requests } = await getRequests({ status });

  return (
    <div className="space-y-8">

      <div>
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Rental Requests
        </h1>

        <p className="mt-2 text-muted-foreground">
          Review and respond to incoming rental requests.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = (status ?? undefined) === filter.value;

          return (
            <Link
              key={filter.label}
              href={
                filter.value
                  ? `/dashboard/landlord/requests?status=${filter.value}`
                  : "/dashboard/landlord/requests"
              }
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <RequestsTable requests={requests} />

    </div>
  );
}
