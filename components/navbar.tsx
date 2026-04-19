import { SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.services";
import { UserAccountDropdown } from "./UserAccountDropdown";
import { Suspense } from "react";

// Create a small component for the Auth section
const AuthSection = async () => {
  const userInfo = await getUserInfo().catch(() => null);
  // console.log("user=========", userInfo);
  if (!userInfo) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link href="/register">
          <Button>Sign Up</Button>
        </Link>
      </div>
    );
  }

  return <UserAccountDropdown userInfo={userInfo} />;
};

const Navbar = () => {
  // const userInfo = await getUserInfo();
  // const userInfo = await getUserInfo().catch(() => null);
  // console.log("user=========", userInfo);
  return (
    <nav className="fixed top-0 left-0 z-50 h-16 w-full border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {/* Use Suspense to handle the server-side async data */}
          <Suspense
            fallback={
              <div className="w-20 h-9 animate-pulse bg-slate-200 rounded-md" />
            }
          >
            <AuthSection />
          </Suspense>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
