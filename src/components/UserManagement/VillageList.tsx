// import { showToast } from '@/components/ui/show-toast';

// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card } from '@/components/ui/card';

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { Calendar, Trash2 } from "lucide-react";

// let VITE_BACKEND_URL1 = import.meta.env.VITE_BACKEND_URL1;


// const VillageAssignmentList = ({  searchQuery }) => {
//   const [assignments, setAssignments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   const getStatusColor = (active: boolean) =>
//     active ? "default" : "secondary";

//   const fetchAssignments = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${VITE_BACKEND_URL1}/villageAssignedList`);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setAssignments(data.data || []);
//     } catch {
//       showToast(500, "Failed to fetch assignment list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   const toggleStatus = async (id: string, current: boolean) => {
//     if (actionLoading) return;
//     setActionLoading(id);

//     try {
//       const res = await fetch(
//         `${VITE_BACKEND_URL1}/village-assign/${id}/status`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ is_active: !current }),
//         }
//       );

//       if (!res.ok) throw new Error();

//       setAssignments(prev =>
//         prev.map(a =>
//           a.id === id ? { ...a, is_active: !current } : a
//         )
//       );
//     } catch {
//       showToast(500, "Failed to update status");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteAssignment = async (id: string) => {
//     if (!confirm("Delete this assignment?")) return;

//     setActionLoading(id);
//     try {
//       const res = await fetch(
//         `${VITE_BACKEND_URL1}/village-assign/${id}`,
//         { method: "DELETE" }
//       );

//       if (!res.ok) throw new Error();

//       setAssignments(prev => prev.filter(a => a.id !== id));
//       showToast(200, "Assignment deleted");
//     } catch {
//       showToast(500, "Failed to delete assignment");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   /* ---------------- SEARCH (USER ONLY) ---------------- */
//   // const filteredAssignments = useMemo(() => {
//   //   const q = searchQuery.toLowerCase();

//   //   if (!q) return assignments;

//   //   return assignments.filter(a =>
//   //     `${a.name ?? ""} ${a.mobile ?? ""} ${a.user_id ?? ""}`
//   //       .toLowerCase()
//   //       .includes(q)
//   //   );
//   // }, [assignments, searchQuery]);

//   return (
//     <>
//       <Card className="overflow-hidden">
//         <Table className="w-full table-fixed">
//           <TableHeader>
//             <TableRow>
//               <TableHead>User</TableHead>
//               <TableHead>District</TableHead>
//               <TableHead>Sub‑District</TableHead>
//               <TableHead>Village</TableHead>
//               <TableHead>Assigned On</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//         </Table>

//         <div className="max-h-[420px] overflow-y-auto"
//           // style={{ maxHeight: filteredVillages.length > 10 ? "450px" : "auto" }}
//         >

//           <Table className="w-full table-fixed">
//             <TableBody>
//               {loading &&
//                 [...Array(6)].map((_, i) => (
//                   <TableRow key={i}>
//                     {/* {[...Array(7)].map((_, j) => (
//                       <TableCell key={j}>
//                         <div className="h-4 bg-green-200 animate-pulse rounded" />
//                       </TableCell>
//                     ))} */}
//                     <TableCell>
//                       <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
//                     </TableCell>
//                     <TableCell>
//                       <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
//                     </TableCell>
//                     <TableCell>
//                       <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
//                     </TableCell>

//                     <TableCell>
//                       <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
//                     </TableCell>
//                     <TableCell>
//                       <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-2">
//                         <div className="h-5 w-10 bg-green-200 animate-pulse rounded" />
//                         <div className="h-4 w-14 bg-green-200 animate-pulse rounded" />
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="h-4 w-20 bg-green-200 animate-pulse rounded" />
//                     </TableCell>
//                   </TableRow>
//                 ))}

//               {!loading && assignments.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-6">
//                     No village assignments found
//                   </TableCell>
//                 </TableRow>
//               )}

//               {!loading &&
//                 assignments.map(a => (
//                   <TableRow key={a.id}>
//                     <TableCell>{`${a.name} | ${a.mobile} | ${a.user_id}`}</TableCell>
//                     <TableCell>{a.district_name}</TableCell>
//                     <TableCell>{a.sub_district_name}</TableCell>
//                     <TableCell>{a.village_name}</TableCell>
//                     <TableCell>{formatDate(a.assigned_at)}</TableCell>

//                     <TableCell>
//                       <div className="flex items-center space-x-2">

//                         <Switch
//                           checked={a.is_active}
//                           disabled={actionLoading === a.id}
//                           onCheckedChange={() =>
//                             toggleStatus(a.id, a.is_active)
//                           }
//                         />
//                         <Badge variant={getStatusColor(a.is_active)}>
//                           {a.is_active ? "Active" : "Inactive"}
//                         </Badge>
//                       </div>
//                     </TableCell>

//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-3">
//                         <Button
//                           size="icon"
//                           variant="ghost"
//                           disabled={actionLoading === a.id}
//                           onClick={() => deleteAssignment(a.id)}
//                         >
//                           <Trash2 className="w-4 h-4 text-destructive" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
//     </>
//   );
// };



// export default VillageAssignmentList;



import { showToast } from "@/components/ui/show-toast";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { ScrollableTable } from "../ui/scrollable";
import ConfirmDialog from "../ui/confirmDialog";

const VITE_BACKEND_URL1 = import.meta.env.VITE_BACKEND_URL1;

// export const fetchAssignments = async (
//   setAssignments: (data: any[]) => void,
//   setLoading?: (v: boolean) => void
// ) => {
//   try {
//     setLoading?.(true);
//     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL1}/villageAssignedList`);
//     if (!res.ok) throw new Error();
//     const data = await res.json();
//     setAssignments(data.data || []);
//   } finally {
//     setLoading?.(false);
//   }
// };

export const fetchAssignments = async (
  setAssignments: (data: any[]) => void,
  setLoading?: (v: boolean) => void
) => {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '').token : '';
  try {
    setLoading?.(true);

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL1}/villageAssignedList`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // if token required

      }
    }
  );
  
  if (!res.ok) throw new Error("Failed to fetch");
  
  const data = await res.json();
  console.log(data, "__res in fetchAssignments")
    setAssignments(data.data || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading?.(false);
  }
};



const VillageAssignmentList = ({ assignments,
  loading,
  setAssignments,
  searchQuery }) => {
  // const [assignments, setAssignments] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '').token : '';
  console.log(selectedAssignment, "__assignments");
  const requestDelete = (assignment: any) => {
    console.log(assignment, "___assignment");
    setSelectedAssignment(assignment);
    setDeleteDialogOpen(true);
  };

  /* ---------------- SEARCH (USER ONLY) ---------------- */
  const filteredAssignments = useMemo(() => {
    const q = searchQuery.toLowerCase();

    if (!q) return assignments;

    return assignments.filter(a =>
      `${a.name ?? ""} ${a.mobile ?? ""} ${a.userid ?? ""} ${a.village_lgd_code ?? ""}${a.village_name ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [assignments, searchQuery]);

  /* ---------------- STATUS TOGGLE ---------------- */
  const toggleStatus = async (id: string, current: boolean) => {
    if (actionLoading) return;
    setActionLoading(id);

    try {
      const res = await fetch(
        `${VITE_BACKEND_URL1}/village-assign/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // if token required
           },
          body: JSON.stringify({ is_active: !current }),
        }
      );

      if (!res.ok) throw new Error();

      // refresh list
      await fetchAssignments(setAssignments);
    } catch {
      showToast(500, "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteAssignment = async (id: string) => {
    // if (!confirm("Delete this assignment?")) return;
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '').token : '';
    if (!selectedAssignment) return;
    setActionLoading(id);
    try {
      const res = await fetch(
        `${VITE_BACKEND_URL1}/village-assign/${id}`,
        { method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // if token required
          }
         }
      );

      if (!res.ok) throw new Error();

      showToast(200, "Assignment deleted");
      // fetchAssignments(); // ✅ refresh
      await fetchAssignments(setAssignments);
    } catch {
      showToast(500, "Failed to delete assignment");
    } finally {
      setActionLoading(null);
      setDeleteDialogOpen(false);
      setSelectedAssignment(null);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <>
      <ScrollableTable>

        <Table className="w-full table-fixed border-collapse">
          <TableHeader className="sticky top-0 z-20 shadow-sm">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Sub‑District</TableHead>
              <TableHead>Village (LGD Code)</TableHead>
              <TableHead>Assigned On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: filteredAssignments.length > 10 ? "450px" : "auto" }}
        >

          <Table className="w-full table-fixed">
            <TableBody>
              {/* -------- LOADER -------- */}
              {loading &&
                [...Array(9)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(7)].map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-4 bg-green-200 animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {/* -------- EMPTY -------- */}
              {!loading && filteredAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No village assignments found
                  </TableCell>
                </TableRow>
              )}

              {/* -------- DATA -------- */}
              {!loading &&
                filteredAssignments.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>
                      {a.name} | {a.mobile} | {a.userid.toUpperCase()}
                    </TableCell>
                    <TableCell>{a.district_name}</TableCell>
                    <TableCell>{a.sub_district_name}</TableCell>
                    <TableCell>{a.village_name} ({a.village_lgd_code})</TableCell>
                    <TableCell>{formatDate(a.assigned_at)}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={a.is_active}
                          disabled={actionLoading === a.id}
                          onCheckedChange={() =>
                            toggleStatus(a.id, a.is_active)
                          }
                        />
                        <Badge variant={a.is_active ? "default" : "secondary"}>
                          {a.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={actionLoading === a.id || deleteDialogOpen}
                        onClick={() => requestDelete({ id: a.id, village_name: a.village_name, village_lgd_code: a.village_lgd_code })}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </ScrollableTable>





      {/* <ConfirmDialog
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          title="Confirm Delete"
          description={`Are you sure you want to delete Role "${selectedRole?.role_name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => selectedRole && deleteRole(selectedRole?.role_id)}
        />  */}
      <ConfirmDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Confirm Delete"
        // description={`Are you sure you want to delete assignment for "${selectedAssignment?.village_name}(${selectedAssignment?.village_lgd_code})"? This action cannot be undone.`}
        description={
          <>
            Are you sure you want to delete assignment for{" "}
            <span className="font-semibold">
              {selectedAssignment?.village_name}
              ({selectedAssignment?.village_lgd_code})
            </span> {" "}
            ? <br />This action cannot be undone.
          </>
        }

        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={deleteAssignment}
      />

    </>

  );

};

export default VillageAssignmentList;
