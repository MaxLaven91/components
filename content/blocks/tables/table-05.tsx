"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Status = "Paid" | "Pending" | "Overdue";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: Status;
  dueDate: string;
}

const invoices: Invoice[] = [
  { id: "INV-001", client: "Acme Corp", amount: 4250.0, status: "Paid", dueDate: "Jan 15, 2025" },
  { id: "INV-002", client: "Globex Inc", amount: 1890.0, status: "Pending", dueDate: "Feb 01, 2025" },
  { id: "INV-003", client: "Wayne Enterprises", amount: 12750.0, status: "Overdue", dueDate: "Dec 20, 2024" },
  { id: "INV-004", client: "Stark Industries", amount: 3400.0, status: "Paid", dueDate: "Jan 28, 2025" },
  { id: "INV-005", client: "Umbrella Corp", amount: 7600.0, status: "Pending", dueDate: "Feb 10, 2025" },
  { id: "INV-006", client: "Cyberdyne Systems", amount: 2150.0, status: "Paid", dueDate: "Jan 05, 2025" },
  { id: "INV-007", client: "Wonka Industries", amount: 5320.0, status: "Overdue", dueDate: "Dec 12, 2024" },
  { id: "INV-008", client: "Soylent Corp", amount: 980.0, status: "Paid", dueDate: "Jan 22, 2025" },
  { id: "INV-009", client: "Initech", amount: 6475.0, status: "Pending", dueDate: "Feb 15, 2025" },
  { id: "INV-010", client: "Hooli", amount: 11200.0, status: "Paid", dueDate: "Jan 30, 2025" },
  { id: "INV-011", client: "Pied Piper", amount: 3850.0, status: "Overdue", dueDate: "Dec 28, 2024" },
  { id: "INV-012", client: "Massive Dynamic", amount: 9100.0, status: "Pending", dueDate: "Feb 20, 2025" },
];

const PAGE_SIZE = 5;

const statusConfig: Record<Status, { variant: "secondary" | "outline" | "destructive"; className?: string }> = {
  Paid: { variant: "secondary", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  Pending: { variant: "outline" },
  Overdue: { variant: "destructive" },
};

function formatAmount(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Table05() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return invoices;
    return invoices.filter(
      (inv) =>
        inv.id.toLowerCase().includes(query) ||
        inv.client.toLowerCase().includes(query) ||
        inv.status.toLowerCase().includes(query),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const visibleIds = pageRows.map((row) => row.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someVisibleSelected = visibleIds.some((id) => selectedIds.has(id));
  const indeterminate = someVisibleSelected && !allVisibleSelected;

  function handleSelectAll(checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        for (const id of visibleIds) {
          next.add(id);
        }
      } else {
        for (const id of visibleIds) {
          next.delete(id);
        }
      }
      return next;
    });
  }

  function handleSelectRow(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="tracking-tight">Invoices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Search invoices..."
            aria-label="Search invoices"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
          {selectedIds.size > 0 && (
            <span className="text-muted-foreground text-sm tabular-nums">
              {selectedIds.size} selected
            </span>
          )}
        </div>

        <div className="overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={allVisibleSelected ? true : indeterminate ? "indeterminate" : false}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    aria-label="Select all invoices on this page"
                  />
                </TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length > 0 ? (
                pageRows.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="transition-colors hover:bg-muted/50"
                    data-state={selectedIds.has(invoice.id) ? "selected" : undefined}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(invoice.id)}
                        onCheckedChange={(checked) => handleSelectRow(invoice.id, checked === true)}
                        aria-label={`Select invoice ${invoice.id}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.client}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatAmount(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusConfig[invoice.status].variant}
                        className={statusConfig[invoice.status].className}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.dueDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No invoices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm tabular-nums">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={safePage <= 1}
              aria-label="Go to previous page"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={safePage >= totalPages}
              aria-label="Go to next page"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
