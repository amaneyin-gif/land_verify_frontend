import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PageAssignment = {
  id: string;
  userName: string;
  phaseName: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed" | "pending" | "Expired";
};

const PageAssignmentList = () => {
  const [assignments, setAssignments] = useState<PageAssignment[]>([
    {
      id: "1",
      userName: "John Doe",
      phaseName: "Verify",
      startDate: "2024-01-15",
      endDate: "2025-12-15",
      status: "ongoing",
    },
    {
      id: "2",
      userName: "Jane Smith",
      phaseName: "User-Management",
      startDate: "2024-02-01",
      endDate: "2026-02-01",
      status: "ongoing",
    },
    {
      id: "3",
      userName: "Bob Johnson",
      phaseName: "Verify",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "Expired",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "default";
      case "completed":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Phase</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell className="font-medium">{assignment.userName}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{assignment.phaseName}</span>
                </div>
              </TableCell>
              <TableCell>{assignment.startDate}</TableCell>
              <TableCell>{assignment.endDate}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(assignment.status) as any}>
                  {assignment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default PageAssignmentList;
