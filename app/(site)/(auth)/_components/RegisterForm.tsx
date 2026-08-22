"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";
import {
    registerSchema,
    type RegisterInput,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const initialState = null;

export default function RegisterForm() {
    const [state, formAction, pending] = useActionState(
        registerAction,
        initialState
    );

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
    }, [state, setError]);

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);

        formAction(formData);
    });

    return (
        <form onSubmit={onSubmit} noValidate>
            <Card className="space-y-5 border-0 shadow-none">

                <div className="space-y-1.5">
                    <Input
                        placeholder="Full Name"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                    />

                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Input
                        type="email"
                        placeholder="Email Address"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />

                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Input
                        type="password"
                        placeholder="Password"
                        aria-invalid={!!errors.password}
                        {...register("password")}
                    />

                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label className="sr-only">Role</Label>

                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    className="w-full"
                                    aria-invalid={!!errors.role}
                                >
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
                        )}
                    />

                    {errors.role && (
                        <p className="text-sm text-destructive">
                            {errors.role.message}
                        </p>
                    )}
                </div>

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
