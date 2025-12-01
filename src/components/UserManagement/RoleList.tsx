import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: number;
  status: "active" | "inactive";
  createdAt: string;
};

const RolesList = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access",
      permissions: 25,
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Manager",
      description: "Manage users and projects",
      permissions: 15,
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      name: "User",
      description: "Basic access",
      permissions: 5,
      status: "active",
      createdAt: "2024-01-10",
    },
  ]);

  const toggleRoleStatus = (id: string) => {
    setRoles(roles.map(role => 
      role.id === id 
        ? { ...role, status: role.status === "active" ? "inactive" : "active" }
        : role
    ));
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>{role.name}</span>
                </div>
              </TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <Badge variant="secondary">{role.permissions} permissions</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={role.status === "active"}
                    onCheckedChange={() => toggleRoleStatus(role.id)}
                  />
                  <Badge variant={role.status === "active" ? "default" : "secondary"}>
                    {role.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{role.createdAt}</TableCell>
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

export default RolesList;
