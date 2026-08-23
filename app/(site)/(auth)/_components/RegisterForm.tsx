"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Home, Lock, Mail, User, UserRound } from "lucide-react";
import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";
import {
    registerSchema,
    type RegisterInput,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initialState = null;

const ROLES = [
    {
        value: "TENANT" as const,
        label: "Tenant",
        description: "I'm looking for a place to rent",
        icon: UserRound,
    },
    {
        value: "LANDLORD" as const,
        label: "Landlord",
        description: "I want to list my properties",
        icon: Home,
    },
];

export default function RegisterForm() {
    const router = useRouter();

    const [state, formAction, pending] = useActionState(
        registerAction,
        initialState
    );

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);

            if (state.redirectTo) {
                router.push(state.redirectTo);
            }
        } else {
            toast.error(state.message);

            state.errorDetails?.forEach(
                (detail: { field: string; message: string }) => {
                    if (detail.field in registerSchema.shape) {
                        setError(detail.field as keyof RegisterInput, {
                            message: detail.message,
                        });
                    }
                }
            );
        }
    }, [state, setError, router]);

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);

        formAction(formData);
    });

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8"
        >
            <div className="space-y-2">
                <Label>I am a...</Label>

                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <div className="grid grid-cols-2 gap-3">
                            {ROLES.map((role) => {
                                const Icon = role.icon;
                                const selected = field.value === role.value;

                                return (
                                    <button
                                        key={role.value}
                                        type="button"
                                        onClick={() => field.onChange(role.value)}
                                        aria-pressed={selected}
                                        className={cn(
                                            "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                                            selected
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-border hover:border-primary/40 hover:bg-muted/50"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-full",
                                                selected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            <Icon size={18} />
                                        </span>

                                        <span className="text-sm font-semibold">
                                            {role.label}
                                        </span>

                                        <span className="text-xs text-muted-foreground">
                                            {role.description}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                />

                {errors.role && (
                    <p className="text-sm text-destructive">
                        {errors.role.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <div className="relative">
                    <User
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="name"
                        placeholder="Jane Doe"
                        aria-invalid={!!errors.name}
                        className="pl-9"
                        {...register("name")}
                    />
                </div>

                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>

                <div className="relative">
                    <Mail
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        className="pl-9"
                        {...register("email")}
                    />
                </div>

                {errors.email && (
                    <p className="text-sm text-destructive">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                    <Lock
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 6 characters"
                        aria-invalid={!!errors.password}
                        className="px-9"
                        {...register("password")}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full rounded-full"
                size="lg"
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
        </form>
    );
}
