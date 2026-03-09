import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RolesList from "./RoleList";
import CreateRoleDialog from "./CreateRoleDailog";
import { Input } from "../ui/input";

const RolesTab = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Roles</h2>
          <p className="text-sm text-muted-foreground">Manage roles and permissions</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            // placeholder="Search by Role"
            // // value={searchQuery}

            // // onChange={(e) => setSearchQuery(e.target.value)}
            // className="sm:w-72"
            aria-hidden
            tabIndex={-1}
            className="sm:w-72 invisible pointer-events-none"
          />
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      <RolesList roles={roles} setRoles={setRoles} />
      <CreateRoleDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onRoleCreated={(newRole) => setRoles(prev => [newRole, ...prev])} />
    </div>
  );
};

export default RolesTab;
