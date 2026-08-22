import Link from "next/link";
import { House } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <House
          size={18}
          strokeWidth={2.25}
        />
      </span>

      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        RentNest
      </span>
    </Link>
  );
}
