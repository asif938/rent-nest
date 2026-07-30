import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>

          <p className="mt-2 text-muted-foreground">
            Login to continue to RentNest
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}