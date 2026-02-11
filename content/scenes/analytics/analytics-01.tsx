"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

type DateRange = "7d" | "30d" | "90d";

const trafficData: Record<DateRange, { day: string; views: number }[]> = {
  "7d": [
    { day: "Mon", views: 2840 },
    { day: "Tue", views: 3120 },
    { day: "Wed", views: 2960 },
    { day: "Thu", views: 3540 },
    { day: "Fri", views: 3280 },
    { day: "Sat", views: 1940 },
    { day: "Sun", views: 1720 },
  ],
  "30d": [
    { day: "Week 1", views: 18200 },
    { day: "Week 2", views: 21400 },
    { day: "Week 3", views: 19800 },
    { day: "Week 4", views: 24500 },
  ],
  "90d": [
    { day: "Jan", views: 62400 },
    { day: "Feb", views: 71200 },
    { day: "Mar", views: 84600 },
  ],
};

const channelData = [
  { channel: "Organic", visitors: 12420 },
  { channel: "Direct", visitors: 8340 },
  { channel: "Social", visitors: 5280 },
  { channel: "Referral", visitors: 3640 },
  { channel: "Email", visitors: 2180 },
];

const trafficConfig = {
  views: {
    label: "Page Views",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const channelConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const topPages = [
  { page: "/dashboard", views: 4820, bounce: "32.1%", time: "4m 12s" },
  { page: "/pricing", views: 3240, bounce: "45.3%", time: "2m 38s" },
  { page: "/docs/getting-started", views: 2890, bounce: "28.7%", time: "5m 04s" },
  { page: "/blog/launch-week", views: 2140, bounce: "51.2%", time: "1m 56s" },
  { page: "/changelog", views: 1680, bounce: "38.9%", time: "3m 22s" },
];

const stats: Record<
  DateRange,
  { label: string; value: string; change: number; icon: typeof Eye }[]
> = {
  "7d": [
    { label: "Page Views", value: "24,521", change: 12.3, icon: Eye },
    { label: "Bounce Rate", value: "42.1%", change: -2.4, icon: MousePointerClick },
    { label: "Avg. Session", value: "3m 24s", change: 8.1, icon: Timer },
    { label: "Conversions", value: "1,248", change: 15.7, icon: BarChart3 },
  ],
  "30d": [
    { label: "Page Views", value: "98,420", change: 8.7, icon: Eye },
    { label: "Bounce Rate", value: "39.8%", change: -4.1, icon: MousePointerClick },
    { label: "Avg. Session", value: "3m 48s", change: 5.2, icon: Timer },
    { label: "Conversions", value: "4,920", change: 11.3, icon: BarChart3 },
  ],
  "90d": [
    { label: "Page Views", value: "312,600", change: 14.2, icon: Eye },
    { label: "Bounce Rate", value: "41.3%", change: -1.8, icon: MousePointerClick },
    { label: "Avg. Session", value: "3m 36s", change: 6.4, icon: Timer },
    { label: "Conversions", value: "14,850", change: 18.9, icon: BarChart3 },
  ],
};

export default function Analytics01() {
  const [range, setRange] = useState<DateRange>("7d");

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <h1 className="text-lg font-semibold tracking-tight text-balance">
            Analytics
          </h1>
          <Tabs
            value={range}
            onValueChange={(v) => setRange(v as DateRange)}
          >
            <TabsList>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats[range].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">
                  {stat.label}
                </CardDescription>
                <stat.icon
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {stat.change >= 0 ? (
                    <>
                      <TrendingUp
                        className="h-3 w-3 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        +{stat.change}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown
                        className="h-3 w-3 text-destructive"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-destructive">
                        {stat.change}%
                      </span>
                    </>
                  )}
                  <span className="text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Traffic chart */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Page views over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={trafficConfig}
                className="h-[250px] w-full"
              >
                <AreaChart data={trafficData[range]} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) =>
                          Number(value).toLocaleString()
                        }
                      />
                    }
                  />
                  <defs>
                    <linearGradient
                      id="fill-traffic"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-views)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-views)"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="views"
                    type="monotone"
                    fill="url(#fill-traffic)"
                    stroke="var(--color-views)"
                    strokeWidth={2}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Channels chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Channels</CardTitle>
              <CardDescription>Visitors by acquisition channel</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={channelConfig}
                className="h-[250px] w-full"
              >
                <BarChart data={channelData} accessibilityLayer layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="channel"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={70}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) =>
                          Number(value).toLocaleString()
                        }
                      />
                    }
                  />
                  <Bar
                    dataKey="visitors"
                    fill="var(--color-visitors)"
                    radius={[0, 4, 4, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top pages table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Most visited pages in the selected period
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="hidden text-right sm:table-cell">
                    Bounce Rate
                  </TableHead>
                  <TableHead className="hidden text-right sm:table-cell">
                    Avg. Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((page) => (
                  <TableRow key={page.page}>
                    <TableCell className="font-medium">{page.page}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {page.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums sm:table-cell">
                      {page.bounce}
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums sm:table-cell">
                      {page.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
