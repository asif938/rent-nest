"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { dashboardMenus } from "@/config/dashboardMenus";

type Props = {
  role: keyof typeof dashboardMenus;
  onNavigate?: () => void;
};

export default function DashboardNavLinks({
  role,
  onNavigate,
}: Props) {
  const pathname = usePathname();

  const items = dashboardMenus[role] ?? [];

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
