import Link from "next/link";
import { ArrowRight, House } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Category } from "@/types/category";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/properties?category=${category.id}`}
      className="group"
    >
      <Card className="flex h-40 flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
        <div className="rounded-full bg-primary/10 p-4">
          <House></House>
        </div>

        <h3 className="text-lg font-semibold">
          {category.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-primary opacity-0 transition group-hover:opacity-100">
          Browse
          <ArrowRight size={16} />
        </div>
      </Card>
    </Link>
  );
}