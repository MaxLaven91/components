import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231",
    progress: 72,
    icon: DollarSign,
  },
  {
    title: "New Customers",
    value: "1,205",
    progress: 58,
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "3,456",
    progress: 85,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "12.5%",
    progress: 45,
    icon: TrendingUp,
  },
];

export default function Stats03() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold tracking-tight tabular-nums">{metric.value}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="tabular-nums">{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-1.5" aria-label={metric.title} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
