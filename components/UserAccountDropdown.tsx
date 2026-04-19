"use client";

import {
  User,
  ShoppingBag,
  ShieldCheck,
  LogOut,
  Mail,
  Phone,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { logoutAction } from "@/services/auth.services";

interface UserInfo {
  name: string;
  email: string;
  role: "TOURIST" | "ADMIN" | "SUPER_ADMIN" | "MODERATOR";
  admin?: {
    contactNumber: string | null;
  } | null;
}

export function UserAccountDropdown({ userInfo }: { userInfo: UserInfo }) {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-slate-900">
        {userInfo?.name || "User"}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 p-2" align="end" sideOffset={8}>
        {/* FIX: Wrap the Label inside a Group to satisfy the context requirement */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3 p-2">
              <p className="text-lg font-bold leading-none text-slate-900">
                {userInfo?.name}
              </p>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 mt-1" />
                <span className="text-sm break-all font-medium">
                  {userInfo?.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {userInfo?.admin?.contactNumber || "No phone added"}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem className="py-3 cursor-pointer focus:bg-slate-100">
            <User className="mr-3 h-5 w-5 text-slate-400" />
            {userInfo?.role === "TOURIST" ? (
              <Link
                href="/profile"
                className="text-base text-slate-600 font-medium"
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/admin-dashboard"
                className="text-base text-slate-600 font-medium"
              >
                Profile
              </Link>
            )}
          </DropdownMenuItem>

          {userInfo?.role === "TOURIST" && (
            <DropdownMenuItem className="py-3 cursor-pointer focus:bg-slate-100">
              <ShoppingBag className="mr-3 h-5 w-5 text-slate-400" />
              <span className="text-base text-slate-600 font-medium">
                Events Booking History
              </span>
            </DropdownMenuItem>
          )}

          {/* <DropdownMenuItem className="py-3 cursor-pointer focus:bg-slate-100">
            <ShieldCheck className="mr-3 h-5 w-5 text-slate-400" />
            <span className="text-base text-slate-600 font-medium">
              Update Password
            </span>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="py-3 cursor-pointer focus:bg-red-50 focus:text-red-600 text-slate-600 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-slate-400" />
          <span className="text-base font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
