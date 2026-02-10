import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const employees = [
  {
    name: "Olivia Martin",
    department: "Engineering",
    role: "Senior Developer",
    salary: 142000,
    startDate: "Jan 15, 2020",
  },
  {
    name: "Jackson Lee",
    department: "Design",
    role: "Lead Designer",
    salary: 128000,
    startDate: "Mar 22, 2021",
  },
  {
    name: "Isabella Nguyen",
    department: "Marketing",
    role: "Marketing Manager",
    salary: 115000,
    startDate: "Jun 10, 2019",
  },
  {
    name: "William Kim",
    department: "Engineering",
    role: "Backend Developer",
    salary: 130000,
    startDate: "Sep 5, 2022",
  },
  {
    name: "Sofia Davis",
    department: "Sales",
    role: "Account Executive",
    salary: 105000,
    startDate: "Nov 18, 2021",
  },
  {
    name: "Lucas Johnson",
    department: "Engineering",
    role: "Frontend Developer",
    salary: 125000,
    startDate: "Feb 28, 2023",
  },
  {
    name: "Mia Thompson",
    department: "Operations",
    role: "Project Manager",
    salary: 118000,
    startDate: "Aug 12, 2020",
  },
  {
    name: "Ethan Garcia",
    department: "Design",
    role: "UX Researcher",
    salary: 112000,
    startDate: "Apr 3, 2022",
  },
];

function formatSalary(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export default function Table01() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="tracking-tight">Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Salary</TableHead>
              <TableHead>Start Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.name} className="transition-colors hover:bg-muted/50">
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.department}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.role}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatSalary(employee.salary)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.startDate}
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
