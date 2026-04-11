import { Logo } from "@/components/logo";
import { SidebarRoutes } from "@/types/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  MessageCircle,
} from "lucide-react";

export const adminRoutes: SidebarRoutes = {
  user: {
    name: "admin",
    email: "admin@example.com",
    avatar: "/images/saint.jpg",
  },
  teams: [
    {
      name: "Joyjatra Travel",
      logo: <Logo />,
      plan: "Admin",
      url: "/",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: <AudioLinesIcon />,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: <TerminalIcon />,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin-dashboard",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/admin-dashboard",
        },
        {
          title: "Starred",
          url: "/admin-dashboard/starred",
        },
        {
          title: "Settings",
          url: "/admin-dashboard/settings",
        },
      ],
    },
    {
      title: "Events",
      url: "/admin-dashboard/events",
      icon: <BotIcon />,
      items: [
        {
          title: "Upcoming",
          url: "/admin-dashboard/events/upcoming",
        },
        {
          title: "All Events",
          url: "/admin-dashboard/events/all",
        },
      ],
    },
    {
      title: "Blogs",
      url: "/admin-dashboard/blogs",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "All Blogs",
          url: "/admin-dashboard/blogs",
        },
        {
          title: "Upcoming Blogs",
          url: "/admin-dashboard/blogs/upcoming",
        },
      ],
    },
    {
      title: "Moderators",
      url: "/admin-dashboard/moderators",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "All Moderators",
          url: "/admin-dashboard/moderators",
        },
        {
          title: "Upcoming Moderators",
          url: "/admin-dashboard/moderators/upcoming",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Chats",
      url: "/admin-dashboard/chats",
      icon: <MessageCircle />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};
