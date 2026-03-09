// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Edit, Trash2, Shield } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { showToast } from "../ui/show-toast";

// type Role = {
//   id: string;
//   role_name: string;
//   description: string;
//   // permissions: number;
//   active: "active" | "inactive";
//   created_at: string;
// };
// let VITE_BACKEND_URL1 = import.meta.env.VITE_BACKEND_URL1;

// const RolesList = () => {
//   const [roles, setRoles] = useState<Role[]>(
// );
//   const [loading, setLoading] = useState(false);
//   const token = JSON.parse(localStorage.getItem("user"))?.token || "";


//   let fetchRoles = async () => {
//     setLoading(true);
//     try {
//       let res = await fetch(`${VITE_BACKEND_URL1}/api/getRole`,{
//             headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }); // Replace with your API endpoint
//             if (res.status === 401 || res.status === 403) {
//               localStorage.removeItem("user");
//               showToast(401, "Session expired. Please login again.");
//               window.location.href = "/login";
//               return;
//             }

//             if (!res.ok) throw new Error("Failed to fetch user list");

//       let data = await res.json();
//       console.log(data, "___roles data");
//       setRoles(data.roles);
//     }
//     catch (error) {
//       console.error("Error fetching roles:", error);
//       showToast(500, "Failed to load user data");
//     } finally{
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);


//   const toggleRoleStatus = (id: string) => {
//     setRoles(roles.map(role => 
//       role.id === id 
//         ? { ...role, status: role.active == "true" ? "inactive" : "active" }
//         : role
//     ));
//   };

//   return (
//     <Card className="overflow-hidden">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Role</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Permissions</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Created</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {roles.map((role) => (
//             <TableRow key={role.id}>
//               <TableCell className="font-medium">
//                 <div className="flex items-center space-x-2">
//                   <Shield className="w-4 h-4 text-primary" />
//                   <span>{role.role_name}</span>
//                 </div>
//               </TableCell>
//               <TableCell>{role.description}</TableCell>
//               <TableCell>
//                 {/* <Badge variant="secondary">{role.permissions} permissions</Badge> */}
//               </TableCell>
//               <TableCell>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     checked={role.active == "true"}
//                     onCheckedChange={() => toggleRoleStatus(role.id)}
//                   />
//                   <Badge variant={role.active == "true" ? "default" : "secondary"}>
//                     {role.acitve == true ? "Active" : "Inactive"}
//                   </Badge>
//                 </div>
//               </TableCell>
//               <TableCell>{role.created_at}</TableCell>
//               <TableCell className="text-right">
//                 <div className="flex justify-end space-x-2">
//                   <Button variant="ghost" size="icon">
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <Trash2 className="w-4 h-4 text-destructive" />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Card>
//   );
// };

// export default RolesList;



import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Shield } from "lucide-react";
import { Loader } from "@/components/ui/loader";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showToast } from "../ui/show-toast";
import ConfirmDialog from "../ui/confirmDialog";
import { ScrollableTable } from "../ui/scrollable";

// type Role = {
//   role_id: number;
//   role_name: string;
//   description: string;
//   pages: string[];
//   statusLoading?: boolean; // For individual role status update loading
//   active: boolean;
//   created_at: string;
// };

let VITE_BACKEND_URL1 = import.meta.env.VITE_BACKEND_URL1;

const RolesList = ({ roles, setRoles }) => {
  // const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token || "";
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const fetchRoles = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${VITE_BACKEND_URL1}/getRole`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        showToast(401, "Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch role list");

      let data = await res.json();
      setRoles(data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      showToast(500, "Failed to load role data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);


  const toggleRoleStatus = async (id: number) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.role_id === id
          ? { ...role, statusLoading: true }
          : role
      )
    );
    try {

      // Find role
      const selectedRole = roles.find(r => r.role_id === id);
      if (!selectedRole) return;

      const newStatus = !selectedRole.active; // true/false
      console.log(selectedRole, newStatus, "__selectedRole");

      // API CALL
      const response = await fetch(
        `${VITE_BACKEND_URL1}/updateRoleState/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            active: newStatus, // BOOLEAN
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Update UI after success
      setRoles((prev) =>
        prev.map((role) =>
          role.role_id === id
            ? { ...role, active: newStatus, statusLoading: false }
            : role
        )
      );

      showToast(200, "Role status updated successfully");

    } catch (error) {
      console.error("Error updating role:", error);
      showToast(500, "Failed to update role");
    }
  };

  const deleteRole = async (roleId: string) => {
    // Show loading spinner on delete button for that role
    setRoles((prev) =>
      prev.map((r) =>
        r.role_id == roleId ? { ...r, deleteLoading: true } : r
      )
    );

    try {
      const response = await fetch(
        `${VITE_BACKEND_URL1}/deleteRole/${roleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("user");
        showToast(401, "Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      if (response.status === 400) {
        showToast(400, "Cannot delete role assigned to users");
        // ❗ If delete fails, remove loading so UI returns to normal
        setRoles((prev) =>
          prev.map((u) =>
            u.role_id === roleId ? { ...u, deleteLoading: false } : u
          )
        );
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete role");
      }

      // 🔥 Remove deleted role from list
      setRoles((prev) => prev.filter((u) => u.role_id !== roleId));
      showToast(200, "Role deleted successfully");
    } catch (error) {
      console.error(error);

      // ❗ If delete fails, remove loading so UI returns to normal
      setRoles((prev) =>
        prev.map((u) =>
          u.id === roleId ? { ...u, deleteLoading: false } : u
        )
      );
    }
  };
  return (
    <>
      <ScrollableTable >

        {/* <Card className="overflow-hidden"> */}
        <Table className="w-full table-fixed border-collapse" >

          <TableHeader className="sticky top-0 z-20 shadow-sm">
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Assign Sections</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-[420px] overflow-y-auto">
          {/* <Table className="min-w-[900px] w-full table-fixed border-separate border-spacing-0"> */}
          <Table className="min-w-[900px] w-full table-fixed border-collapse">

            <TableBody>
              {loading ? (
                [...Array(7)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-24 bg-green-200 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-green-200 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-green-200 animate-pulse rounded" />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="h-5 w-10 bg-green-200 animate-pulse rounded" />
                        <div className="h-4 w-16 bg-green-200 animate-pulse rounded" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="h-4 w-28 bg-green-200 animate-pulse rounded" />
                    </TableCell>

                    <TableCell>
                      <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                roles.map((role) => (
                  <TableRow key={role.role_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>{role.role_name}</span>
                      </div>
                    </TableCell>

                    <TableCell>{role.description}</TableCell>
                    {/* <TableCell> {role.pages}</TableCell> */}
                    <TableCell>
                      <div className="space-y-1">
                        {role.pages.map((p: string) => (
                          <div key={p} className="flex items-center gap-2">
                            <Shield className="w-3 h-3 text-primary" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={role.active}
                          disabled={role.statusLoading}
                          onCheckedChange={() => toggleRoleStatus(role.role_id)}
                        />
                        <Badge variant={role.active ? "default" : "secondary"}>
                          {role.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* <TableCell>{role.created_at}</TableCell> */}
                    <TableCell>{new Date(role.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {/* <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button> */}

                        {/* <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button> */}
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={role.deleteLoading}
                          onClick={() => {
                            setSelectedRole(role);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          {role.deleteLoading ? <Loader /> : <Trash2 className="w-2 h-2 text-destructive" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* </Card> */}
      </ScrollableTable>
      <ConfirmDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Confirm Delete"
        description={
          <>
          Are you sure you want to delete Role {" "}
            <span className="font-semibold">
              {selectedRole?.role_name}</span> {" "}
            ? <br /> This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => selectedRole && deleteRole(selectedRole?.role_id)}
      />
    </>


  );

};

export default RolesList;