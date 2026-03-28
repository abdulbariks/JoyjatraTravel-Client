"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarRoutes } from "@/types/sidebar";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { moderatorRoutes } from "@/routes/moderatorRoutes";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string; name: string; email: string; avatar: string };
} & React.ComponentProps<typeof Sidebar>) {
  const routesMap: Record<string, SidebarRoutes> = {
    [Roles.admin]: adminRoutes,
    [Roles.moderator]: moderatorRoutes,
  };
  const data = routesMap[user.role];
  if (!data) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data?.navMain} />
        <NavProjects projects={data?.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
