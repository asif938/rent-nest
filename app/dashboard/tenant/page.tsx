import DashboardStats from "./_components/DashboardStats";
import RecentRentals from "./_components/RecentRentals";

// import { getDashboard } from "./_actions/getDashboard";

export default async function TenantDashboardPage() {
  // const dashboard = await getDashboard();

  const dashboard = {
    rentalRequests: {
      total: 8,
      pending: 2,
      approved: 4,
      completed: 2,
    },

    payments: {
      completedPayments: 4,
      totalSpent: 52000,
    },

    reviews: {
      total: 3,
    },

    recentRentals: [
      {
        id: "1",
        tenantId: "tenant-1",
        propertyId: "property-1",
        status: "PENDING",
        startDate: "2026-08-05",
        endDate: "2027-08-05",
        approvedAt: null,
        rejectedAt: null,
        completedAt: null,
        createdAt: "2026-08-02T10:30:00.000Z",
        updatedAt: "2026-08-02T10:30:00.000Z",

        property: {
          id: "property-1",
          title: "Executive Apartment",
          location: "Banani, Dhaka",
          price: 13000,
          images: [],
        },
      },

      {
        id: "2",
        tenantId: "tenant-1",
        propertyId: "property-2",
        status: "APPROVED",
        startDate: "2026-07-01",
        endDate: "2027-07-01",
        approvedAt: "2026-06-28",
        rejectedAt: null,
        completedAt: null,
        createdAt: "2026-06-20T09:00:00.000Z",
        updatedAt: "2026-06-28T09:00:00.000Z",

        property: {
          id: "property-2",
          title: "Luxury Studio",
          location: "Dhanmondi, Dhaka",
          price: 18000,
          images: [],
        },
      },

      {
        id: "3",
        tenantId: "tenant-1",
        propertyId: "property-3",
        status: "COMPLETED",
        startDate: "2025-06-01",
        endDate: "2026-06-01",
        approvedAt: "2025-05-28",
        rejectedAt: null,
        completedAt: "2026-06-01",
        createdAt: "2025-05-20T10:00:00.000Z",
        updatedAt: "2026-06-01T10:00:00.000Z",

        property: {
          id: "property-3",
          title: "Family House",
          location: "Uttara, Dhaka",
          price: 25000,
          images: [],
        },
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
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