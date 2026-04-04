import StatsCard from "@/components/admin/dashboard/StatsCard";
import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <StatsCard />
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
        AdminDashboardPage
      </div>
    </div>
  );
}
