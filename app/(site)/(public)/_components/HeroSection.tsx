import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
  { value: "2,400+", label: "Verified listings" },
  { value: "1,100+", label: "Happy tenants" },
  { value: "98%", label: "On-time payouts" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background">

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-20 -right-24 h-96 w-96 rounded-full bg-forest/15 blur-3xl" />
        <div className="bg-noise absolute inset-0" />
      </div>

      <div className="container relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">

        <span className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles size={14} />
          Find Your Perfect Home
        </span>

        <h1 className="animate-fade-up max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground md:text-7xl [animation-delay:80ms]">
          Renting made
          <span className="relative mx-3 inline-block italic text-primary">
            simple
          </span>
          and secure
        </h1>

        <p className="animate-fade-up mt-7 max-w-2xl text-balance text-lg text-muted-foreground [animation-delay:160ms]">
          Browse thousands of verified apartments, houses and family homes.
          Rent securely with Stripe payments and connect directly with
          trusted landlords.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row [animation-delay:240ms]">
          <Link href="/properties">
            <Button
              size="lg"
              className="group h-12 rounded-full px-7 text-base"
            >
              Browse Properties
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 px-7 text-base"
            >
              Become a Landlord
            </Button>
          </Link>
        </div>

        <div className="animate-fade-up mt-16 flex items-center gap-2 text-sm text-muted-foreground [animation-delay:320ms]">
          <ShieldCheck
            size={16}
            className="text-forest"
          />
          Secured with Stripe · Verified landlords · No hidden fees
        </div>

        <div className="animate-fade-up mt-14 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-border/70 pt-10 [animation-delay:400ms]">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-semibold text-foreground">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
