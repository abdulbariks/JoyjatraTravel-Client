export const dynamic = "force-dynamic";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { getUserInfo } from "@/services/auth.services";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  // children,
  admin,
  moderator,
  // tourist,
}: {
  // children: ReactNode;
  admin: ReactNode;
  moderator: ReactNode;
  // tourist: ReactNode;
}) {
  const userInfo = await getUserInfo();
  // const role: UserRole | undefined = user?.role;

  //   // normalize SUPER_ADMIN → ADMIN
  //   const normalizedRole = role === Roles.super_admin ? Roles.admin : role;

  // const userInfo = {
  //   role: "ADMIN",
  //   name: "abdul barik",
  //   email: "abdulbarik@gmail.com",
  //   avatar: "/images/saint.jpg",
  // };

  console.log("user=========", userInfo);

  if (!userInfo) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div>
          {userInfo.role === Roles.admin
            ? admin
            : userInfo.role === Roles.moderator && moderator}
        </div>

        {/* optional fallback */}
        {/* {children} */}
      </SidebarInset>
    </SidebarProvider>
  );
}
