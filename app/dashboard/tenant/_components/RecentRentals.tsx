import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DashboardStats } from "@/types/tenantDashboard";

type Props = {
    rentals: DashboardStats["recentRentals"];
};

function getStatusVariant(status: string) {
    switch (status) {
        case "APPROVED":
            return "default";

        case "COMPLETED":
            return "secondary";

        case "PENDING":
            return "outline";

        case "REJECTED":
            return "destructive";

        default:
            return "outline";
    }
}

export default function RecentRentals({
    rentals,
}: Props) {
    return (
        <section className="mt-10 rounded-xl border bg-card shadow-sm">

            <div className="flex items-center justify-between border-b p-6">

                <div>
                    <h2 className="text-xl font-semibold">
                        Recent Rental Requests
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your latest rental requests.
                    </p>
                </div>

                <Link href="/tenant/rentals">
                    <Button variant="outline">
                        View All
                    </Button>
                </Link>

            </div>

            {rentals.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground">
                    No rental requests found.
                </div>
            ) : (
                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="border-b bg-muted/40">

                            <tr>

                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Property
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Location
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Price
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium">
                                    Requested
                                </th>

                                <th className="px-6 py-3 text-right text-sm font-medium">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {rentals.map((rental) => (
                                <tr
                                    key={rental.id}
                                    className="border-b last:border-none"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {rental.property.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        {rental.property.location}
                                    </td>

                                    <td className="px-6 py-4">
                                        Tk {rental.property.price.toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={getStatusVariant(
                                                rental.status
                                            )}
                                        >
                                            {rental.status}
                                        </Badge>
                                    </td>

                                    <td className="px-6 py-4">
                                        {new Date(
                                            rental.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/tenant/rentals/${rental.id}`}
                                        >
                                            <Button
                                                size="sm"
                                                variant="outline"
                                            >
                                                View
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </section>
    );
}