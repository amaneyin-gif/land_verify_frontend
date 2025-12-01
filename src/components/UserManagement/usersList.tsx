// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Edit, Trash2 } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { showToast } from "../ui/show-toast";
// import { Loader } from '@/components/ui/loader';

// type User = {
//   id: string;
//   name: string;
//   userid: string;
//   email: string;
//   mobile: string;
//   role: string;
//   status: "Active" | "Inactive";
//   created_at: string;
// };
// let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'
// type UsersListProps = {
//   searchQuery: string;
// };
// const UsersList = ({ searchQuery }: { searchQuery: string }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   // const [users, setUsers] = useState<User[]>([
//   //   {
//   //     id: "1",
//   //     name: "John Doe",
//   //     email: "john@example.com",
//   //     role: "Admin",
//   //     status: "active",
//   //     createdAt: "2024-01-15",
//   //   },
//   //   {
//   //     id: "2",
//   //     name: "Jane Smith",
//   //     email: "jane@example.com",
//   //     role: "Manager",
//   //     status: "active",
//   //     createdAt: "2024-01-20",
//   //   },
//   //   {
//   //     id: "3",
//   //     name: "Bob Johnson",
//   //     email: "bob@example.com",
//   //     role: "User",
//   //     status: "inactive",
//   //     createdAt: "2024-02-01",
//   //   },
//   // ]);
//   const [loading, setLoading] = useState(false)

//   const token = JSON.parse(localStorage.getItem('user'))?.token || ''
//   const filteredUsers = users.filter((user) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       user.name.toLowerCase().includes(query) ||
//       user.email.toLowerCase().includes(query) ||
//       user.userid.toLowerCase().includes(query) ||
//       (user.mobile || "").includes(query)
//     );
//   });

//   const fetchUserList = async () => {
//     setLoading(true)
//     try {
//       let res = await fetch(`${REACT_APP_BACKEND1}/userlist`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         }
//       })
//       if (res.status === 401 || res.status === 403) {
//         // Backend says: token invalid / expired
//         localStorage.removeItem("user");
//         showToast(401, "Session expired. Please login again.");
//         window.location.href = "/login";  // redirect
//         return;
//       }
//       if (!res.ok) throw new Error("Failed to fetch dashboard data");

//       const data = await res.json();
//       const userList = data.data || [];
//       setUsers(userList)
//       showToast(200, data.message || "User data loaded successfully");
//     } catch (error) {
//       console.error(error);
//       showToast(500, "Failed to load user data");
//     } finally {
//       setLoading(false)
//     }

//   }
//   useEffect(() => {
//     fetchUserList();
//   }, [])


//   const toggleUserStatus = (id: string) => {
//     setUsers(users.map(user =>
//       user.id === id
//         ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
//         : user
//     ));
//   };
//   // return (
//   //   <Card className="overflow-hidden">
//   //     <Table>
//   //       <TableHeader>
//   //         <TableRow>
//   //           <TableHead>Name</TableHead>
//   //           <TableHead>Userid</TableHead>
//   //           <TableHead>Email</TableHead>
//   //           <TableHead>Mobile</TableHead>
//   //           <TableHead>Role</TableHead>
//   //           <TableHead>Status</TableHead>
//   //           <TableHead>Created</TableHead>
//   //           <TableHead className="text-right">Actions</TableHead>
//   //         </TableRow>
//   //       </TableHeader>

//   //       <TableBody>
//   //         {loading ? (
//   //           <TableRow>
//   //             <TableCell colSpan={6}>
//   //               <div className="flex justify-center items-center py-10">
//   //                 <Loader />
//   //               </div>
//   //             </TableCell>
//   //           </TableRow>
//   //         ) : users.length === 0 ? (
//   //           <TableRow>
//   //             <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
//   //               No users found
//   //             </TableCell>
//   //           </TableRow>
//   //         ) : (
//   //           users.map((user) => (
//   //             <TableRow key={user.id}>
//   //               <TableCell className="font-medium">{user?.name}</TableCell>
//   //               <TableCell className="font-medium">{user?.userid}</TableCell>
//   //               <TableCell>{user.email}</TableCell>
//   //               <TableCell>{user.mobile || '—'}</TableCell>
//   //               <TableCell>
//   //                 <Badge variant="secondary">{user.role}</Badge>
//   //               </TableCell>
//   //               <TableCell>
//   //                 <div className="flex items-center space-x-2">
//   //                   <Switch
//   //                     checked={user.status === "Active"}
//   //                     onCheckedChange={() => toggleUserStatus(user.id)}
//   //                   />
//   //                   <Badge variant={user.status === "Active" ? "default" : "secondary"}>
//   //                     {user.status}
//   //                   </Badge>
//   //                 </div>
//   //               </TableCell>
//   //               {/* <TableCell>{user.created_at}</TableCell> */}
//   //               <TableCell className="text-muted-foreground">
//   //               {new Date(user.created_at).toLocaleString("en-IN", {
//   //                 dateStyle: "medium",
//   //                 timeStyle: "short",
//   //               })}
//   //               </TableCell>
//   //               <TableCell className="text-right">
//   //                 <div className="flex justify-end space-x-2">
//   //                   <Button variant="ghost" size="icon">
//   //                     <Edit className="w-4 h-4" />
//   //                   </Button>
//   //                   <Button variant="ghost" size="icon">
//   //                     <Trash2 className="w-4 h-4 text-destructive" />
//   //                   </Button>
//   //                 </div>
//   //               </TableCell>
//   //             </TableRow>
//   //           ))
//   //         )}
//   //       </TableBody>
//   //     </Table>
//   //   </Card>
//   // );

//   return (
//     <Card className="overflow-hidden">
//       <div
//         className="overflow-y-auto"
//         style={{ maxHeight: users.length > 5 ? "450px" : "auto" }}
//       >
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Userid</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Mobile</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Created</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={6}>
//                   <div className="flex justify-center items-center py-10">
//                     <Loader />
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : users.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell className="font-medium">{user?.name}</TableCell>
//                   <TableCell className="font-medium">{user?.userid}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.mobile || "—"}</TableCell>
//                   <TableCell>
//                     <Badge variant="secondary">{user.role}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Switch
//                         checked={user.status === "Active"}
//                         onCheckedChange={() => toggleUserStatus(user.id)}
//                       />
//                       <Badge variant={user.status === "Active" ? "default" : "secondary"}>
//                         {user.status}
//                       </Badge>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-muted-foreground">
//                     {new Date(user.created_at).toLocaleString("en-IN", {
//                       dateStyle: "medium",
//                       timeStyle: "short",
//                     })}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <Button variant="ghost" size="icon">
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button variant="ghost" size="icon">
//                         <Trash2 className="w-4 h-4 text-destructive" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </Card>
//   );


// };

// export default UsersList;


import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showToast } from "../ui/show-toast";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input"; // make sure Input is imported
import CreateUserDialog from "./CreateUserDailog";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import ConfirmDialog from "../ui/confirmDialog";

type User = {
  id: string;
  name: string;
  userid: string;
  email: string;
  mobile: string;
  role: string;
  status: "Active" | "Inactive";
  created_at: string;
};

let REACT_APP_BACKEND1 = "https://x9k84zq3-3002.inc1.devtunnels.ms/api";

type UsersListProps = {
  searchQuery: string;
};

const UsersList = ({ users, setUsers, searchQuery }) => {
  // const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token || "";
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${REACT_APP_BACKEND1}/userlist`, {
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

      if (!res.ok) throw new Error("Failed to fetch user list");

      const data = await res.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error(error);
      showToast(500, "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const toggleUserStatus = async (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, statusLoading: true } : u
      )
    );
    try {
      console.log(id, "__id to toggle status")
      // find the user
      const selectedUser = users.find(u => u.id === id);
      if (!selectedUser) return;

      const newStatus = selectedUser.status === "Active" ? "Inactive" : "Active";
      console.log(selectedUser, newStatus, "__selectedUser")

      // API call
      const response = await fetch(
        `${REACT_APP_BACKEND1}/update-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      console.log(users, "__users before update")
      // UI update only if backend success
      // setUsers((prevUsers) =>
      //   prevUsers.map((user) =>
      //     user.userid === userid ? { ...user, status: newStatus } : user
      //   )
      // );

      // 🔹 Step 2: update status & remove loading state
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: newStatus, statusLoading: false }
            : u
        )
      );
      console.log(users, "__users after update")
      showToast(200, "User status updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, statusLoading: false } : u
        )
      );
    }
  };
  const deleteUser = async (id: string) => {
    // Show loading spinner on delete button for that user
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, deleteLoading: true } : u
      )
    );

    try {
      const response = await fetch(
        `${REACT_APP_BACKEND1}/delete-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // 🔥 Remove deleted user from list
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast(200, "User deleted successfully");
    } catch (error) {
      console.error(error);

      // ❗ If delete fails, remove loading so UI returns to normal
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, deleteLoading: false } : u
        )
      );
    }
  };



  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const q = searchQuery?.toLowerCase() || "";

    return (
      (user?.name ?? "").toLowerCase().includes(q) ||
      (user?.email ?? "").toLowerCase().includes(q) ||
      (user?.userid ?? "").toLowerCase().includes(q) ||
      (user?.mobile ?? "").toString().toLowerCase().includes(q)
    );
  });


  return (
    <Card className="overflow-hidden">
      <div
        className="overflow-y-auto"
        style={{ maxHeight: filteredUsers.length > 10 ? "450px" : "auto" }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Userid</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex justify-center items-center py-10">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.userid}</TableCell>
                  <TableCell>{user.email || "—"}</TableCell>
                  <TableCell>{user.mobile || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {/* <Switch
                        checked={user.status === "Active"}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      /> */}
                      <Switch
                        checked={user.status === "Active"}
                        disabled={user.statusLoading}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      />

                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {/* <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button> */}
                      {/* <Button variant="ghost" size="icon" disabled={user.deleteLoading} onClick={() => deleteUser(user.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                        
                      </Button>  */}
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={user.deleteLoading}
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        {user.deleteLoading ? <Loader /> : <Trash2 className="w-4 h-4 text-destructive" />}
                      </Button>
                      <ConfirmDialog
                        open={deleteDialogOpen}
                        setOpen={setDeleteDialogOpen}
                        title="Confirm Delete"
                        description={`Are you sure you want to delete user "${selectedUser?.name}"? This action cannot be undone.`}
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => selectedUser && deleteUser(selectedUser.id)}
                      />


                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>

  );
};

export default UsersList;
