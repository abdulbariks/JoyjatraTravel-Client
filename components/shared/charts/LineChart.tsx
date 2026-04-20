"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dateKey: string; // e.g., "date" or "month"
  valueKey: string; // e.g., "bookings"
  label: string;
}

export function DashboardLineChart({
  data,
  dateKey,
  valueKey,
  label,
}: LineChartProps) {
  const config = {
    [valueKey]: { label, color: "hsl(var(--chart-1))" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} stroke="hsl(var(--muted))" />
          <XAxis
            dataKey={dateKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey={valueKey}
            type="natural"
            stroke={`var(--color-${valueKey})`}
            strokeWidth={2}
            dot={{ fill: `var(--color-${valueKey})` }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
