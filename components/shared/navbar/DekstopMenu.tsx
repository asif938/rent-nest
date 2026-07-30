"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href: string;
};

type Props = {
  items: MenuItem[];
};

export default function DesktopMenu({
  items,
}: Props) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}