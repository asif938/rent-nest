import Link from "next/link";
import {
  ArrowRight,
  Building2,
  DoorOpen,
  Home,
  Layers,
  Trees,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Category } from "@/types/category";

type Props = {
  category: Category;
};

const ICONS: Record<string, typeof Home> = {
  apartment: Building2,
  house: Home,
  studio: DoorOpen,
  villa: Trees,
  duplex: Layers,
};

export default function CategoryCard({ category }: Props) {
  const Icon = ICONS[category.name.toLowerCase()] ?? Home;

  return (
    <Link
      href={`/properties?category=${encodeURIComponent(category.name)}`}
      className="group"
    >
      <Card className="relative h-44 flex-col items-center justify-center gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30">
        <div
          aria-hidden
          className="absolute inset-x-6 -top-10 h-24 rounded-full bg-primary/10 blur-2xl transition-colors group-hover:bg-primary/20"
        />

        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon size={24} />
        </div>

        <h3 className="relative text-lg font-semibold">
          {category.name}
        </h3>

        <div className="relative flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
          Browse
          <ArrowRight size={15} />
        </div>
      </Card>
    </Link>
  );
}
