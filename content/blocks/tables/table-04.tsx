"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Priority = "High" | "Medium" | "Low";
type Status = "Done" | "In Progress" | "Todo";
type Category = "Design" | "Engineering" | "Marketing" | "Sales";

interface Task {
  id: string;
  task: string;
  assignee: string;
  category: Category;
  priority: Priority;
  status: Status;
}

const tasks: Task[] = [
  {
    id: "TASK-001",
    task: "Redesign landing page hero section",
    assignee: "Olivia Martin",
    category: "Design",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "TASK-002",
    task: "Implement authentication flow",
    assignee: "Jackson Lee",
    category: "Engineering",
    priority: "High",
    status: "Done",
  },
  {
    id: "TASK-003",
    task: "Write Q4 campaign brief",
    assignee: "Isabella Nguyen",
    category: "Marketing",
    priority: "Medium",
    status: "Todo",
  },
  {
    id: "TASK-004",
    task: "Build API rate limiting middleware",
    assignee: "William Kim",
    category: "Engineering",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "TASK-005",
    task: "Prepare enterprise demo deck",
    assignee: "Sofia Davis",
    category: "Sales",
    priority: "Medium",
    status: "Done",
  },
  {
    id: "TASK-006",
    task: "Create component design tokens",
    assignee: "Mia Thompson",
    category: "Design",
    priority: "Low",
    status: "Todo",
  },
  {
    id: "TASK-007",
    task: "Optimize database query performance",
    assignee: "Ethan Garcia",
    category: "Engineering",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "TASK-008",
    task: "Launch social media ad campaign",
    assignee: "Lucas Johnson",
    category: "Marketing",
    priority: "High",
    status: "Done",
  },
  {
    id: "TASK-009",
    task: "Negotiate annual contract renewals",
    assignee: "Ava Wilson",
    category: "Sales",
    priority: "Low",
    status: "In Progress",
  },
  {
    id: "TASK-010",
    task: "Set up CI/CD pipeline for staging",
    assignee: "Noah Brown",
    category: "Engineering",
    priority: "Medium",
    status: "Todo",
  },
];

const priorityVariant: Record<Priority, "destructive" | "secondary" | "outline"> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

export default function Table04() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.task.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || task.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="tracking-tight">Tasks</CardTitle>
        <CardDescription>Track and manage your team's tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
          <Input
            placeholder="Search tasks..."
            aria-label="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-[180px]" aria-label="Filter by category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <span className="font-medium">{task.task}</span>
                        <span className="ml-2 text-muted-foreground tabular-nums text-xs">
                          {task.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {task.assignee}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {task.category}
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityVariant[task.priority]}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {task.status}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
