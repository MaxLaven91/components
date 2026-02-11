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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  DollarSign,
  Layers,
  LogOut,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 18600 },
  { month: "Feb", revenue: 22400 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 27300 },
  { month: "May", revenue: 31200 },
  { month: "Jun", revenue: 28900 },
  { month: "Jul", revenue: 34100 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const orders = [
  {
    id: "ORD-7291",
    customer: "Sarah Chen",
    email: "sarah@acme.co",
    status: "completed",
    amount: 1249.0,
    date: "Jan 15, 2025",
  },
  {
    id: "ORD-7290",
    customer: "Marcus Johnson",
    email: "marcus@globex.com",
    status: "processing",
    amount: 849.5,
    date: "Jan 15, 2025",
  },
  {
    id: "ORD-7289",
    customer: "Emily Parker",
    email: "emily@initech.io",
    status: "completed",
    amount: 2340.0,
    date: "Jan 14, 2025",
  },
  {
    id: "ORD-7288",
    customer: "James Wilson",
    email: "james@umbrella.co",
    status: "pending",
    amount: 459.99,
    date: "Jan 14, 2025",
  },
  {
    id: "ORD-7287",
    customer: "Aisha Patel",
    email: "aisha@stark.dev",
    status: "completed",
    amount: 1875.0,
    date: "Jan 13, 2025",
  },
];

const statusStyles: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
};

const navItems = [
  { icon: BarChart3, label: "Overview", active: true },
  { icon: ShoppingCart, label: "Orders", active: false },
  { icon: Users, label: "Customers", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const stats = [
  { label: "Revenue", value: "$34,100", change: 12.5, icon: DollarSign },
  { label: "Orders", value: "1,248", change: 8.2, icon: ShoppingCart },
  { label: "Customers", value: "3,427", change: 5.1, icon: Users },
  { label: "Conversion", value: "3.24%", change: -0.4, icon: BarChart3 },
];

export default function Dashboard01() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full bg-background">
        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close sidebar"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-[width,transform] duration-150 ease-out motion-reduce:transition-none lg:static lg:translate-x-0 ${
            collapsed ? "w-16" : "w-56"
          } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" aria-hidden="true" />
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold tracking-tight">
                Acme Inc
              </span>
            )}
          </div>

          <nav className="flex-1 space-y-1 p-2">
            {navItems.map((item) => {
              const btn = (
                <Button
                  key={item.label}
                  variant={item.active ? "secondary" : "ghost"}
                  className={`w-full ${collapsed ? "justify-center px-0" : "justify-start gap-3"}`}
                  aria-label={collapsed ? item.label : undefined}
                >
                  <item.icon
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>{btn}</TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              }
              return btn;
            })}
          </nav>

          <Separator />

          <div className="space-y-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full ${collapsed ? "justify-center px-0" : "justify-start gap-3"}`}
                  onClick={() => setCollapsed(!collapsed)}
                  aria-label={
                    collapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  {collapsed ? (
                    <PanelLeftOpen
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <PanelLeftClose
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Collapse</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Expand</TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full text-muted-foreground ${collapsed ? "justify-center px-0" : "justify-start gap-3"}`}
                  aria-label="Log out"
                >
                  <LogOut
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {!collapsed && <span>Log out</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Log out</TooltipContent>
              )}
            </Tooltip>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex h-14 items-center justify-between gap-4 border-b px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
              <h1 className="text-lg font-semibold tracking-tight text-balance">
                Dashboard
              </h1>
            </div>
            <Tabs defaultValue="7d">
              <TabsList>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
                <TabsTrigger value="90d">90d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
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
                      <span className="text-muted-foreground">
                        vs last period
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[250px] w-full"
                >
                  <AreaChart data={revenueData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) =>
                            `$${Number(value).toLocaleString()}`
                          }
                        />
                      }
                    />
                    <defs>
                      <linearGradient
                        id="fill-revenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--color-revenue)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-revenue)"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="revenue"
                      type="monotone"
                      fill="url(#fill-revenue)"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest transactions from your store
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="hidden text-right sm:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const status = statusStyles[order.status];
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium tabular-nums">
                            {order.id}
                          </TableCell>
                          <TableCell>
                            <div>{order.customer}</div>
                            <div className="hidden text-xs text-muted-foreground sm:block">
                              {order.email}
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge variant={status.variant}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            $
                            {order.amount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                          <TableCell className="hidden text-right text-muted-foreground sm:table-cell">
                            {order.date}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  aria-label={`Actions for ${order.id}`}
                                >
                                  <MoreHorizontal
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Download invoice
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Refund order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
