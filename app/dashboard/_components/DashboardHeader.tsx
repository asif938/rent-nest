import Link from "next/link";
import { House } from "lucide-react";

import ProfileDropdown from "@/components/shared/navbar/ProfileDropdown";
import MobileSidebar from "./MobileSidebar";
import { dashboardMenus } from "@/config/dashboardMenus";

type Props = {
  role: keyof typeof dashboardMenus;
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export default function DashboardHeader({
  role,
  user,
}: Props) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-lg lg:px-6">

      <Link
        href="/"
        className="flex items-center gap-2.5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <House size={16} />
        </span>

        <span className="font-display text-lg font-semibold">
          RentNest
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <MobileSidebar role={role} />
        <ProfileDropdown user={user} />
      </div>

    </header>
  );
}
