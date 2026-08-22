import { dashboardMenus } from "@/config/dashboardMenus";
import DashboardNavLinks from "./DashboardNavLinks";

type Props = {
  role: keyof typeof dashboardMenus;
};

export default function DashboardSidebar({
  role,
}: Props) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border/70 bg-background p-4 pt-6 lg:block">
      <DashboardNavLinks role={role} />
    </aside>
  );
}
