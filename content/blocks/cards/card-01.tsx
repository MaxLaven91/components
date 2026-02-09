import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Card01() {
  return (
    <Card className="w-full max-w-xs overflow-hidden">
      <div className="aspect-video bg-muted" />
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight tracking-tight">Wireless Headphones</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              Premium noise-cancelling over-ear headphones with 30-hour battery life.
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            New
          </Badge>
        </div>
        <p className="mt-3 text-lg font-semibold tabular-nums">$249.99</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ShoppingCart className="size-4" aria-hidden="true" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
