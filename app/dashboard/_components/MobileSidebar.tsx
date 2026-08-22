"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dashboardMenus } from "@/config/dashboardMenus";
import DashboardNavLinks from "./DashboardNavLinks";

type Props = {
  role: keyof typeof dashboardMenus;
};

export default function MobileSidebar({
  role,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetContent side="left">
        <SheetHeader className="sr-only">
          <SheetTitle>
            Navigation Menu
          </SheetTitle>
        </SheetHeader>

        <div className="px-4 pt-6">
          <DashboardNavLinks
            role={role}
            onNavigate={() => setOpen(false)}
          />
        </div>
      </SheetContent>

      <SheetTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "lg:hidden",
        })}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
    </Sheet>
  );
}
