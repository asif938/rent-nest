"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState = null;

export default function LoginForm() {
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <Card className="border-0 shadow-none space-y-5">

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

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