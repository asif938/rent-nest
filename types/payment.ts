// export interface Payment {
//   id: string;
//   amount: number;
//   status: "PENDING" | "COMPLETED" | "FAILED";

//   transactionId: string | null;

//   createdAt: string;
//   updatedAt: string;
// }

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED";

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;

  rentalRequest: {
    id: string;
    startDate: string;
    endDate: string;

    property: {
      id: string;
      title: string;
      location: string;
      price: number;
    };
  };
}