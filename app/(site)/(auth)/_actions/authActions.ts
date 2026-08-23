"use server";

import { cookies } from "next/headers";

type ErrorDetail = {
    field: string;
    message: string;
};

type LoginState = {
    success: boolean;
    statusCode?: number;
    message: string;
    errorDetails?: ErrorDetail[];
    redirectTo?: string;
};

export async function loginAction(
    redirectTo: string,
    prevState: LoginState | null,
    formData: FormData
): Promise<LoginState> {
    const payload = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        }
    );

    const result = await res.json();

    if (!result.success) {
        return result;
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    if (
        redirectTo &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//")
    ) {
        return {
            success: true,
            message: result.message,
            redirectTo,
        };
    }

    const role = result.data.user.role;

    const target =
        role === "TENANT"
            ? "/dashboard/tenant"
            : role === "LANDLORD"
                ? "/dashboard/landlord"
                : role === "ADMIN"
                    ? "/dashboard/admin"
                    : "/";

    return {
        success: true,
        message: result.message,
        redirectTo: target,
    };
}

type RegisterState = {
  success: boolean;
  statusCode?: number;
  message: string;
  errorDetails?: ErrorDetail[];
  redirectTo?: string;
};

export async function registerAction(
  prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (result.success) {
    return {
      success: true,
      message: result.message,
      redirectTo: "/login",
    };
  }

  return result;
}