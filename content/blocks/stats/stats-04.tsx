import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const comparisons = [
  {
    title: "Revenue",
    current: "$45,231",
    previous: "$38,120",
    change: +18.6,
  },
  {
    title: "Orders",
    current: "3,456",
    previous: "3,102",
    change: +11.4,
  },
  {
    title: "Customers",
    current: "1,205",
    previous: "1,340",
    change: -10.1,
  },
  {
    title: "Avg. Order Value",
    current: "$132.50",
    previous: "$125.80",
    change: +5.3,
  },
];

export default function Stats04() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {comparisons.map((stat) => (
        <Card key={stat.title} className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">This period</p>
                <p className="text-2xl font-bold tracking-tight tabular-nums">{stat.current}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last period</p>
                <p className="text-lg tabular-nums text-muted-foreground">{stat.previous}</p>
              </div>
            </div>
            <Badge
              variant={stat.change > 0 ? "secondary" : "destructive"}
              className="mt-3 gap-1 font-normal"
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
