import { Payment } from "./payment";

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

export interface Rental {
  id: string;

  status: RentalStatus;

  startDate: string;
  endDate: string;

  createdAt: string;

  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    amenities: string[];

    category: {
      id: string;
      name: string;
    };

    landlord?: {
      id: string;
      name: string;
      email: string;
    };
  };

  payment: Payment | null;
}

export interface RentalResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };

  data: Rental[];
}
