import { ReactNode } from "react";

import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardHeader from "./_components/DashboardHeader";

type Props = {
    children: ReactNode;
};

export default function DashboardLayout({
    children,
}: Props) {
    return (
        <div className="min-h-screen bg-muted/30">

            <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">

                <DashboardSidebar />

                <div className="flex flex-col">

                    <DashboardHeader />

                    <main className="flex-1 p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}