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
    <nav className="hidden items-center gap-1 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}