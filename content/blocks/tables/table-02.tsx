"use client";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: "ORD-7291",
    customer: "Olivia Martin",
    status: "Completed",
    amount: 1249.0,
    date: "Jan 15, 2025",
  },
  {
    id: "ORD-7292",
    customer: "Jackson Lee",
    status: "Processing",
    amount: 349.0,
    date: "Jan 16, 2025",
  },
  {
    id: "ORD-7293",
    customer: "Isabella Nguyen",
    status: "Completed",
    amount: 849.0,
    date: "Jan 16, 2025",
  },
  {
    id: "ORD-7294",
    customer: "William Kim",
    status: "Pending",
    amount: 2499.0,
    date: "Jan 17, 2025",
  },
  {
    id: "ORD-7295",
    customer: "Sofia Davis",
    status: "Cancelled",
    amount: 199.0,
    date: "Jan 17, 2025",
  },
  {
    id: "ORD-7296",
    customer: "Liam Johnson",
    status: "Completed",
    amount: 599.0,
    date: "Jan 18, 2025",
  },
  {
    id: "ORD-7297",
    customer: "Emma Wilson",
    status: "Processing",
    amount: 1749.0,
    date: "Jan 19, 2025",
  },
  {
    id: "ORD-7298",
    customer: "Noah Brown",
    status: "Pending",
    amount: 429.0,
    date: "Jan 20, 2025",
  },
] as const;

type Status = (typeof orders)[number]["status"];

const statusVariant: Record<Status, "secondary" | "outline" | "destructive" | "default"> = {
  Completed: "secondary",
  Pending: "outline",
  Cancelled: "destructive",
  Processing: "default",
};

export default function Table02() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="tracking-tight">Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  ${order.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={`Actions for order ${order.id}`}
                      >
                        <MoreHorizontal className="size-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
