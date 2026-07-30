"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
};

export async function loginAction(
    redirectTo: string,
    prevState: LoginState | null,
    formData: FormData
) {
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

    cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    // const decoded = jwt.decode(
    //     result.data.accessToken
    // ) as JwtPayload & { role: string };

    if (
        redirectTo &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//")
    ) {
        redirect(redirectTo);
    }

    const role = result.data.user.role;

    switch (role) {
        case "TENANT":
            redirect("/dashboard/tenant");

        case "LANDLORD":
            redirect("/dashboard/landlord");

        case "ADMIN":
            redirect("/dashboard/admin");

        default:
            redirect("/");
    }
}

export async function registerAction(
  prevState: unknown,
  formData: FormData
) {
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
    redirect("/login");
  }

  return result;
}