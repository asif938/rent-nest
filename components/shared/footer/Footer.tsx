import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  House,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-primary">
              RentNest
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Find verified rental properties, connect with trusted
              landlords, and enjoy secure online payments through
              RentNest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="hover:text-primary"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-primary"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-primary"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-muted-foreground">

              <li className="flex items-center gap-3">
                <MapPin size={18} />
                Dhaka, Bangladesh
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} />
                +880 1700-000000
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} />
                support@rentnest.com
              </li>

            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <Link
                href="#"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <Globe size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <House size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <ExternalLink size={18} />
              </Link>

              {/* <Link
                href="#"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <Github size={18} />
              </Link> */}

            </div>
          </div>

        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </div>

      </div>
    </footer>
  );
}