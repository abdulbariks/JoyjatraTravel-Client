import {
  // DribbbleIcon,
  GiftIcon,
  WatchIcon,
  TimerIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";
import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { InstagramIcon } from "./icons/InstagramIcon";

const footerSections = [
  {
    title: "Discover",
    links: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Team",
        href: "/team",
      },
      {
        title: "About Us",
        href: "/about",
      },
      {
        title: "Contact Us",
        href: "/contact-us",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Event",
        href: "/Event",
      },
      {
        title: "Blogs",
        href: "/blogs",
      },
      {
        title: "Gallery",
        href: "/gallery",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      <footer className="border-t">
        <div className="mx-auto max-w-(--breakpoint-xl)">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 xl:px-0">
            <div className="col-span-full xl:col-span-2">
              <Logo />
              <p className="mt-4 text-muted-foreground">
                Design amazing digital experiences that create more happy in the
                world.
              </p>
            </div>

            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-medium">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        className="text-muted-foreground hover:text-foreground"
                        href={href}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Subscribe Newsletter */}
            <div className="col-span-2">
              <h6 className="font-medium">Stay up to date</h6>
              <form className="mt-6 flex items-center gap-2">
                <Input
                  className="max-w-64 grow"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Joyjtra Travel
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link
                href="https:www.facebook.com/Abdul.Barik.1997"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/abdul.barik.1997/"
                target="_blank"
              >
                <InstagramIcon />
              </Link>
              <Link href="#" target="_blank">
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/abdul-barik1997"
                target="_blank"
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
