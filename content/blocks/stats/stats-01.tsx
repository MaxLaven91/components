import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: +20.1,
  },
  {
    title: "Subscriptions",
    value: "2,350",
    change: +12.5,
  },
  {
    title: "Active Users",
    value: "18,429",
    change: -3.2,
  },
  {
    title: "Bounce Rate",
    value: "24.5%",
    change: -8.1,
  },
];

export default function Stats01() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
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
                <TrendingUp className="size-3" aria-hidden="true" />
              ) : (
                <TrendingDown className="size-3" aria-hidden="true" />
              )}
              {stat.change > 0 ? "+" : ""}
              {stat.change}%
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
