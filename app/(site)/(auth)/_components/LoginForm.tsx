"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState = null;

export default function LoginForm() {
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, formAction, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    initialState
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message);

      state.errorDetails?.forEach((detail) => {
        if (detail.field in loginSchema.shape) {
          setError(detail.field as keyof LoginInput, {
            message: detail.message,
          });
        }
      });
    }
  }, [state, setError]);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    formAction(formData);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card className="border-0 shadow-none space-y-5">

        <div className="space-y-1.5">
          <Input
            type="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          className="w-full"
          disabled={pending}
          type="submit"
        >
          {pending ? "Logging in..." : "Login"}
        </Button>

      </Card>
    </form>
  );
}
