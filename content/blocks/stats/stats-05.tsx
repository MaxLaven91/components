"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data: Record<string, { label: string; revenue: number }[]> = {
  "7d": [
    { label: "Mon", revenue: 4200 },
    { label: "Tue", revenue: 3800 },
    { label: "Wed", revenue: 5100 },
    { label: "Thu", revenue: 4600 },
    { label: "Fri", revenue: 5800 },
    { label: "Sat", revenue: 3200 },
    { label: "Sun", revenue: 2900 },
  ],
  "30d": [
    { label: "Week 1", revenue: 28400 },
    { label: "Week 2", revenue: 31200 },
    { label: "Week 3", revenue: 29800 },
    { label: "Week 4", revenue: 34500 },
  ],
  "90d": [
    { label: "Jan", revenue: 85200 },
    { label: "Feb", revenue: 92400 },
    { label: "Mar", revenue: 98100 },
  ],
};

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

function formatRevenue(value: number) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Stats05() {
  const [period, setPeriod] = useState("7d");
  const total = data[period].reduce((sum, d) => sum + d.revenue, 0);

  return (
    <Card className="w-full max-w-xl shadow-sm">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">
            {formatRevenue(total)}
          </CardTitle>
        </div>
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList className="h-8" aria-label="Time period">
            <TabsTrigger value="7d" className="text-xs px-2.5" aria-label="Last 7 days">
              7d
            </TabsTrigger>
            <TabsTrigger value="30d" className="text-xs px-2.5" aria-label="Last 30 days">
              30d
            </TabsTrigger>
            <TabsTrigger value="90d" className="text-xs px-2.5" aria-label="Last 90 days">
              90d
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart data={data[period]} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "var(--muted)", opacity: 0.5 }}
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
