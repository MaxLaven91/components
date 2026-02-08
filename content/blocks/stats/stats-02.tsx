"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: +20.1,
    data: [
      { value: 186 },
      { value: 305 },
      { value: 237 },
      { value: 273 },
      { value: 209 },
      { value: 314 },
      { value: 452 },
    ],
  },
  {
    title: "Subscriptions",
    value: "2,350",
    change: +12.5,
    data: [
      { value: 165 },
      { value: 190 },
      { value: 210 },
      { value: 195 },
      { value: 230 },
      { value: 220 },
      { value: 235 },
    ],
  },
  {
    title: "Active Users",
    value: "18,429",
    change: -3.2,
    data: [
      { value: 320 },
      { value: 302 },
      { value: 290 },
      { value: 278 },
      { value: 295 },
      { value: 260 },
      { value: 184 },
    ],
  },
  {
    title: "Bounce Rate",
    value: "24.5%",
    change: -8.1,
    data: [
      { value: 35 },
      { value: 32 },
      { value: 30 },
      { value: 28 },
      { value: 27 },
      { value: 26 },
      { value: 24 },
    ],
  },
];

const chartConfig = {
  value: { label: "Value", color: "var(--chart-1)" },
} satisfies ChartConfig;

const chartConfigNegative = {
  value: { label: "Value", color: "hsl(0 72% 51%)" },
} satisfies ChartConfig;

export default function Stats02() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold tracking-tight tabular-nums">{stat.value}</div>
            <Badge
              variant={stat.change > 0 ? "secondary" : "destructive"}
              className="mt-1 gap-1 font-normal"
            >
              {stat.change > 0 ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {stat.change > 0 ? "+" : ""}
              {stat.change}%
            </Badge>
            <ChartContainer
              config={stat.change > 0 ? chartConfig : chartConfigNegative}
              className="mt-3 h-16 w-full"
            >
              <AreaChart data={stat.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={`fill-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  fill={`url(#fill-${index})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
