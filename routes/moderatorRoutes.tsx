import { SidebarRoutes } from "@/types/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  // FrameIcon,
  // PieChartIcon,
  // MapIcon,
} from "lucide-react";

export const moderatorRoutes: SidebarRoutes = {
  user: {
    name: "Abdul Barik",
    email: "abdulbarik.com",
    avatar: "/images/saint.jpg",
  },
  teams: [
    {
      name: "Joyjatra Travel",
      logo: <GalleryVerticalEndIcon />,
      plan: "Moderator",
      url: "/",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/moderator-dashboard",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/moderator-dashboard",
        },
        {
          title: "Starred",
          url: "/moderator-dashboard/starred",
        },
        {
          title: "Settings",
          url: "/moderator-dashboard/settings",
        },
      ],
    },
    {
      title: "Events",
      url: "/moderator-dashboard/events",
      icon: <BotIcon />,
      items: [
        {
          title: "Upcoming",
          url: "/moderator-dashboard/events/upcoming",
        },
        {
          title: "Create Event",
          url: "/moderator-dashboard/events/create",
        },
        {
          title: "Update Event",
          url: "/moderator-dashboard/events/update",
        },
      ],
    },
    {
      title: "Blogs",
      url: "/moderator-dashboard/blog",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "All Blogs",
          url: "/moderator-dashboard/blog",
        },
        {
          title: "Create Blog",
          url: "/moderator-dashboard/blog/create",
        },
        {
          title: "Update Blog",
          url: "/moderator-dashboard/blog/update",
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
  // projects: [
  //   {
  //     name: "Events",
  //     url: "/moderator-dashboard/event",
  //     icon: <FrameIcon />,
  //   },
  //   {
  //     name: "Blogs",
  //     url: "/moderator-dashboard/blog",
  //     icon: <PieChartIcon />,
  //   },
  //   {
  //     name: "Travel",
  //     url: "/moderator-dashboard",
  //     icon: <MapIcon />,
  //   },
  // ],
};
