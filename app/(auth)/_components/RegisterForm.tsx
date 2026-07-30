"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const initialState = null;

export default function RegisterForm() {
    const [role, setRole] = useState("");

    const [state, action, pending] = useActionState(
        registerAction,
        initialState
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={action}>
            <Card className="space-y-5 border-0 shadow-none">

                <Input
                    name="name"
                    placeholder="Full Name"
                    required
                />

                <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />

                {/* Hidden input for server action */}
                <input
                    type="hidden"
                    name="role"
                    value={role}
                />

                <Select
                    value={role}
                    onValueChange={(value) => {
                        setRole(value ?? "");
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="TENANT">
                            Tenant
                        </SelectItem>

                        <SelectItem value="LANDLORD">
                            Landlord
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={pending}
                >
                    {pending ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-primary hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </Card>
        </form>
    );
}