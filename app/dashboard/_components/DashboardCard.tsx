import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
    title: string;
    value: string | number;
    icon?: ReactNode;
    tint?: "primary" | "forest" | "accent" | "muted";
};

const TINTS: Record<NonNullable<Props["tint"]>, string> = {
    primary: "bg-primary/10 text-primary",
    forest: "bg-forest/10 text-forest",
    accent: "bg-accent text-accent-foreground",
    muted: "bg-muted text-muted-foreground",
};

export default function DashboardCard({
    title,
    value,
    icon,
    tint = "primary",
}: Props) {
    return (
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-2 font-display text-3xl font-medium">
                        {value}
                    </h2>
                </div>

                {icon && (
                    <div
                        className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                            TINTS[tint]
                        )}
                    >
                        {icon}
                    </div>
                )}

            </div>

        </div>
    );
}
