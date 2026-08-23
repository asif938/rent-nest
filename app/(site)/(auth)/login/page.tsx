import { Suspense } from "react";
import type { Metadata } from "next";

import AuthShell from "../_components/AuthShell";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Login to continue to RentNest."
      panelHeading="Pick up right where you left off."
      panelBody="Track rental requests, manage listings, and handle payments — all from one dashboard."
      panelPoints={[
        "Real-time rental request tracking",
        "Secure Stripe-powered payments",
        "One dashboard for every role",
      ]}
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
