import { Check, ShieldCheck, Sparkles } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  panelHeading: string;
  panelBody: string;
  panelPoints: string[];
  children: React.ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  panelHeading,
  panelBody,
  panelPoints,
  children,
}: Props) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">

      <div className="relative hidden flex-col justify-center overflow-hidden bg-foreground p-12 text-background lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-forest/25 blur-3xl" />
          <div className="bg-noise absolute inset-0 opacity-60" />
        </div>

        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={13} />
            Modern rental marketplace
          </span>

          <h2 className="mt-6 font-display text-4xl leading-tight font-medium text-balance">
            {panelHeading}
          </h2>

          <p className="mt-4 text-background/70">
            {panelBody}
          </p>

          <ul className="mt-8 space-y-3">
            {panelPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-sm text-background/85"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-primary-foreground">
                  <Check size={12} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-2 text-sm text-background/60">
            <ShieldCheck size={16} />
            Secured with Stripe · Verified landlords
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center lg:text-left">
            <h1 className="font-display text-3xl font-medium tracking-tight">
              {title}
            </h1>

            <p className="mt-2 text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}

        </div>
      </div>

    </div>
  );
}
