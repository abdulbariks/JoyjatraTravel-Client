import { ReactNode } from "react";

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarTeam {
  name: string;
  logo: ReactNode;
  plan: string;
}

export interface SidebarSubItem {
  title: string;
  url: string;
}

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
  items?: SidebarSubItem[];
}

export interface SidebarProject {
  name: string;
  url: string;
  icon: ReactNode;
}

export interface SidebarRoutes {
  user: SidebarUser;
  teams: SidebarTeam[];
  navMain: SidebarNavItem[];
  projects: SidebarProject[];
}