import React from "react";

import bgImg from "@/public/admin-dashboard/stats-bg.png";
import Image from "next/image";
import RedGradHat from "@/components/icons/RedGradHat";
import RedUsers from "@/components/icons/RedUsers";
import TotalRevenueIcon from "@/components/icons/TotalRevenueIcon";
import TotalEventsIcon from "@/components/icons/TotalEventsIcon";
import TotalBlogsIcon from "@/components/icons/TotalBlogsIcon";

type StatItem = {
  title: string;
  value: number | string;
  percentage?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const statsData: StatItem[] = [
  {
    title: "Total Users",
    value: 127,
    icon: RedUsers,
    percentage: "+12.5%",
  },
  {
    title: "Total Revenue",
    value: 42,
    icon: TotalRevenueIcon,
    percentage: "+12.5%",
  },
  {
    title: "Total Events",
    value: "12",
    icon: TotalEventsIcon,
    percentage: "+12.5%",
  },
  {
    title: "Total Blogs",
    value: "127",
    icon: TotalBlogsIcon,
    percentage: "+12.5%",
  },
];

export default function StatsCard() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {statsData.map((item, index) => (
        <div
          key={index}
          className=" bg-gray-50 p-6 rounded-2xl relative  overflow-hidden"
        >
          {/* <Image src={bgImg} alt="bg img" className=" absolute top-0 right-0" /> */}
          <div className=" flex items-center justify-between">
            <h3 className=" text-black text-base ">{item.title}</h3>
            <item.icon />
          </div>
          <h2 className=" text-black text-[32px] font-semibold mt-6">
            {item.value}
          </h2>
          <div>
            <p className=" mt-1.5 flex items-center gap-2">
              {" "}
              <span className=" text-sm text-[#E9201D] font-semibold py-1 px-2.5 bg-gray-100 rounded-full">
                {item.percentage}
              </span>{" "}
              <span className=" text-base text-[#8D9CDC]"> vs last month</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
