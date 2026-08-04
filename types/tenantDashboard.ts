export interface DashboardStats {
  rentalRequests: {
    total: number;
    pending: number;
    approved: number;
    completed: number;
  };

  payments: {
    completedPayments: number;
    totalSpent: number;
  };

  reviews: {
    total: number;
  };

  recentRentals: {
    id: string;
    status: string;

    property: {
      id: string;
      title: string;
      location: string;
      price: number;
      images: string[];
    };

    createdAt: string;
  }[];
}