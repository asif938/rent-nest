import AuthShell from "../_components/AuthShell";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create Your Account"
      subtitle="Join RentNest as a tenant or landlord in seconds."
      panelHeading="Find your next home, or list your next tenant."
      panelBody="Verified listings, secure Stripe payments, and a dashboard built for both sides of the rental."
    >
      <RegisterForm />
    </AuthShell>
  );
}
