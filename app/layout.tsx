import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import QueryProvider from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: {
    default: "RentNest | Find & List Rental Properties with Ease",
    template: "%s | RentNest",
  },
  description:
    "Browse verified rental properties, submit rental requests, and pay securely online. RentNest connects tenants and landlords with a modern, trusted rental marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <QueryProvider>
          {children}

          <Toaster
            position="top-right"
            richColors
          />
        </QueryProvider>

      </body>
    </html>
  );
}
