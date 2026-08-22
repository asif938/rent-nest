import { ReactNode } from "react";

import { getMe } from "@/lib/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardHeader from "./_components/DashboardHeader";

type Props = {
    children: ReactNode;
};

export default async function DashboardLayout({
    children,
}: Props) {
    const user = await getMe();

    const role = (user?.role ?? "TENANT") as "TENANT" | "LANDLORD" | "ADMIN";

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">

            <DashboardHeader
                role={role}
                user={{
                    name: user?.name ?? "there",
                    email: user?.email ?? "",
                    role,
                }}
            />

            <div className="flex flex-1">

                <DashboardSidebar role={role} />

                <main className="min-w-0 flex-1 p-6 lg:p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}
