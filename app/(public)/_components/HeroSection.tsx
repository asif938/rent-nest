import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 text-center">

        <span className="mb-4 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Find Your Perfect Home
        </span>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
          Discover Comfortable Rental
          <span className="text-primary"> Properties</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Browse thousands of verified apartments, houses and family homes.
          Rent securely with Stripe payments and connect directly with trusted landlords.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/properties">
            <Button size="lg">
              Browse Properties
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
            >
              Become a Landlord
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}