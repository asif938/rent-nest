"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = null;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, formAction, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    initialState
  );

  const [showPassword, setShowPassword] = useState(false);

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

    if (state.success) {
      if (state.redirectTo) {
        router.push(state.redirectTo);
        router.refresh();
      }
    } else {
      toast.error(state.message);

      state.errorDetails?.forEach((detail) => {
        if (detail.field in loginSchema.shape) {
          setError(detail.field as keyof LoginInput, {
            message: detail.message,
          });
        }
      });
    }
  }, [state, setError, router]);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    formAction(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8"
    >
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>

        <div className="relative">
          <Lock
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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
        className="w-full rounded-full"
        size="lg"
        disabled={pending}
        type="submit"
      >
        {pending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
