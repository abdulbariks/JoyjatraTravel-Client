import StatsCard from "@/components/admin/dashboard/StatsCard";
import { DashboardBarChart } from "@/components/shared/charts/BarChart";
import { DashboardLineChart } from "@/components/shared/charts/LineChart";
import { DashboardPieChart } from "@/components/shared/charts/PieChart";
import { ChartConfig } from "@/components/ui/chart";
import React from "react";

export default function AdminDashboardPage() {
  const userData = [
    { name: "User", value: 450 },
    { name: "Moderator", value: 50 },
  ];

  const userConfig = {
    User: { label: "Standard Users", color: "hsl(var(--chart-1))" },
    Moderator: { label: "Moderators", color: "hsl(var(--chart-2))" },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <StatsCard />
      <div className="">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Bar Chart for Blogs */}
          <DashboardBarChart
            data={[
              { title: "Tour Guide", views: 40 },
              { title: "Top Places", views: 80 },
            ]}
            xKey="title"
            yKey="views"
            label="Blog Views"
          />

          {/* 2. Line Chart for Bookings */}
          <DashboardLineChart
            data={[
              { date: "Mon", bookings: 10 },
              { date: "Tue", bookings: 25 },
            ]}
            dateKey="date"
            valueKey="bookings"
            label="Booking Events"
          />

          {/* 3. Pie Chart for Users */}
          <DashboardPieChart data={userData} config={userConfig} />
        </div>
      </div>
    </div>
  );
}
