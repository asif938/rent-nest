export interface LandlordProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };

  averageRating: number;
  totalReviews: number;
  totalRentalRequests: number;
}

export interface LandlordDashboard {
  properties: {
    total: number;
    available: number;
    rented: number;
  };

  rentalRequests: {
    total: number;
    pending: number;
    approved: number;
    completed: number;
  };

  earnings: {
    totalRevenue: number;
    completedPayments: number;
  };

  recentRequests: {
    id: string;
    status: string;

    tenant: {
      id: string;
      name: string;
      email: string;
    };

    property: {
      id: string;
      title: string;
      location: string;
    };
  }[];
}

export type LandlordRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

export interface LandlordRentalRequest {
  id: string;
  status: LandlordRequestStatus;
  startDate: string;
  endDate: string;
  createdAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
    reviews?: { rating: number }[];
  };

  property: {
    id: string;
    title: string;
    location: string;
    price: number;

    category: {
      id: string;
      name: string;
    };
  };

  payment: {
    id: string;
    amount: number;
    status: "PENDING" | "COMPLETED" | "FAILED";
  } | null;
}
