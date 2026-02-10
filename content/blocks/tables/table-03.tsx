"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  product: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
};

type SortKey = keyof Product;
type SortDirection = "asc" | "desc";

const products: Product[] = [
  { product: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 124, rating: 4.5 },
  { product: "Ergonomic Keyboard", category: "Electronics", price: 129.99, stock: 58, rating: 4.7 },
  { product: "Running Shoes", category: "Footwear", price: 94.50, stock: 203, rating: 4.3 },
  { product: "Ceramic Mug Set", category: "Kitchen", price: 24.99, stock: 412, rating: 4.8 },
  { product: "Desk Lamp", category: "Furniture", price: 45.00, stock: 87, rating: 4.1 },
  { product: "Yoga Mat", category: "Fitness", price: 34.99, stock: 156, rating: 4.6 },
  { product: "Backpack", category: "Accessories", price: 64.99, stock: 91, rating: 4.4 },
  { product: "Water Bottle", category: "Kitchen", price: 19.99, stock: 338, rating: 4.2 },
];

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "product", label: "Product", align: "left" },
  { key: "category", label: "Category", align: "left" },
  { key: "price", label: "Price", align: "right" },
  { key: "stock", label: "Stock", align: "right" },
  { key: "rating", label: "Rating", align: "right" },
];

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function Table03() {
  const [sortKey, setSortKey] = useState<SortKey>("product");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  const sorted = [...products].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  function SortIcon({ columnKey }: { columnKey: SortKey }) {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className="size-3.5" aria-hidden="true" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="size-3.5" aria-hidden="true" />;
    }
    return <ArrowDown className="size-3.5" aria-hidden="true" />;
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="tracking-tight">Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={column.align === "right" ? "text-right" : undefined}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={
                        column.align === "right"
                          ? "-mr-2 ml-auto flex"
                          : "-ml-2"
                      }
                      onClick={() => handleSort(column.key)}
                      aria-label={`Sort by ${column.label}`}
                    >
                      {column.label}
                      <SortIcon columnKey={column.key} />
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row) => (
                <TableRow key={row.product} className="transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium">{row.product}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.category}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPrice(row.price)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.stock.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.rating.toFixed(1)}
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
