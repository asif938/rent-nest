"use client";

import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

// import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/_actions/logoutAction";

type Props = {
    user: {
        name: string;
        email: string;
        role: string;
    };
};

export default function ProfileDropdown({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-accent">
                <Avatar>
                    <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-60"
            >
                <div className="px-3 py-2">
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </div>

                <DropdownMenuSeparator />

                <Link href="/profile">
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </Link>

                <Link href="/change-password">
                    <DropdownMenuItem>
                        Change Password
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="w-full"
                    >
                        <DropdownMenuItem>
                            Logout
                        </DropdownMenuItem>
                    </button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}