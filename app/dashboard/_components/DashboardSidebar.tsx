"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  House,
  FileText,
  CreditCard,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

const tenantMenus = [
  {
    label: "Dashboard",
    href: "/tenant",
    icon: LayoutDashboard,
  },
  {
    label: "My Requests",
    href: "/tenant/requests",
    icon: FileText,
  },
  {
    label: "Payments",
    href: "/tenant/payments",
    icon: CreditCard,
  },
  {
    label: "Profile",
    href: "/tenant/profile",
    icon: User,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-background lg:block">

      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <House className="h-6 w-6 text-primary" />

          <span className="text-xl font-bold">
            RentNest
          </span>
        </Link>
      </div>

      <nav className="space-y-2 p-4">

        {tenantMenus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",

                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}