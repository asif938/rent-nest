export interface Payment {
  id: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";

  transactionId: string | null;

  createdAt: string;
  updatedAt: string;
}