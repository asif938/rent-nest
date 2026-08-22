import Link from "next/link";

import { Button } from "@/components/ui/button";
import RentalStatusBadge from "@/components/shared/rentalStatusBadge";

import { DashboardStats } from "@/types/tenantDashboard";

type Props = {
    rentals: DashboardStats["recentRentals"];
};

export default function RecentRentals({
    rentals,
}: Props) {
    return (
        <section className="rounded-2xl border border-border/70 bg-card shadow-sm">

            <div className="flex items-center justify-between border-b border-border/70 p-6">

                <div>
                    <h2 className="text-lg font-semibold">
                        Recent Rental Requests
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your latest rental requests.
                    </p>
                </div>

                <Link href="/dashboard/tenant/rentals">
                    <Button
                        variant="outline"
                        className="rounded-full"
                    >
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

                        <thead className="border-b border-border/70 bg-muted/40">

                            <tr>

                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Property
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Location
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Price
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Requested
                                </th>

                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {rentals.map((rental) => (
                                <tr
                                    key={rental.id}
                                    className="border-b border-border/70 last:border-none hover:bg-muted/30"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {rental.property.title}
                                    </td>

                                    <td className="px-6 py-4 text-muted-foreground">
                                        {rental.property.location}
                                    </td>

                                    <td className="px-6 py-4">
                                        ৳{rental.property.price.toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <RentalStatusBadge
                                            status={
                                                rental.status as
                                                    | "PENDING"
                                                    | "APPROVED"
                                                    | "REJECTED"
                                                    | "COMPLETED"
                                            }
                                        />
                                    </td>

                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(
                                            rental.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/dashboard/tenant/rentals/${rental.id}`}
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
