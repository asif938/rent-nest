import { Badge } from "@/components/ui/badge";

type Props = {
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "COMPLETED";
};

export default function RentalStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "APPROVED":
      return (
        <Badge>
          Approved
        </Badge>
      );

    case "PENDING":
      return (
        <Badge variant="outline">
          Pending
        </Badge>
      );

    case "REJECTED":
      return (
        <Badge variant="destructive">
          Rejected
        </Badge>
      );

    case "COMPLETED":
      return (
        <Badge variant="secondary">
          Completed
        </Badge>
      );
  }
}