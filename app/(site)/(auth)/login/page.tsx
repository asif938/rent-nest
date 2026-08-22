import { Suspense } from "react";

import AuthShell from "../_components/AuthShell";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Login to continue to RentNest."
      panelHeading="Pick up right where you left off."
      panelBody="Track rental requests, manage listings, and handle payments — all from one dashboard."
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
