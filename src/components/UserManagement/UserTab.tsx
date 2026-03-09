import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersList from "./usersList";
import CreateUserDialog from "./CreateUserDailog";
import { Input } from "../ui/input";

// const UsersTab = () => {
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-semibold text-foreground">Users</h2>
//           <p className="text-sm text-muted-foreground">Manage user accounts and their status</p>
//         </div>
//         <Button onClick={() => setIsCreateDialogOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           Create User
//         </Button>
//       </div>

//       <UsersList />
//       <CreateUserDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
//     </div>
//   );
// };
const UsersTab = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  // 🔥 used by CreateUserDialog after success
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Users</h2>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and their status
          </p>
        </div>

        {/* Search + Create button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by Name, Email, UserID, Mobile"
            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-72"
          />
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* Pass searchQuery to UsersList */}
      <UsersList users={users} setUsers={setUsers} searchQuery={searchQuery} />
      <CreateUserDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onUserCreated={(newUser) => setUsers(prev => [newUser, ...prev])} />
    </div>
  );
};

export default UsersTab;
