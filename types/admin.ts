export interface AdminDashboard {
  users: {
    total: number;
    tenants: number;
    landlords: number;
  };

  properties: {
    total: number;
    available: number;
    rented: number;
  };

  rentals: {
    total: number;
    pending: number;
    approved: number;
    completed: number;
  };

  payments: {
    completedPayments: number;
    totalRevenue: number;
  };
}

export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  profilePhoto: string | null;
  isBanned?: boolean;
  createdAt: string;
}

export interface AdminProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;

  landlord: {
    id: string;
    name: string;
    email: string;
  };

  category: {
    id: string;
    name: string;
  };

  averageRating: number;
  totalReviews: number;
}

export interface AdminRental {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  startDate: string;
  endDate: string;
  createdAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
  };

  property: {
    id: string;
    title: string;
    location: string;

    landlord: {
      id: string;
      name: string;
      email: string;
    };

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
