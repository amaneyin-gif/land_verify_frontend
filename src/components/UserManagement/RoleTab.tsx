import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RolesList from "./RoleList";
import CreateRoleDialog from "./CreateRoleDailog";

const RolesTab = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Roles</h2>
          <p className="text-sm text-muted-foreground">Manage roles and permissions</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <RolesList />
      <CreateRoleDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  );
};

export default RolesTab;
