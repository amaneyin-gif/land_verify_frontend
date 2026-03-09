import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
// import { ChevronDown, Shield, X } from "lucide-react";
import { Shield, X, ChevronDown, Lock } from "lucide-react";
import { showToast } from "../ui/show-toast";
import { useToast } from "@/hooks/use-toast";



type Page = {
  page_id: number;
  page_name: string;
  parent_page_id: number | null;
};

type CreateRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// const CreateRoleDialog = ({ open, onOpenChange, onRoleCreated }) => {
//   const { toast } = useToast();
//   const token = JSON.parse(localStorage.getItem("user"))?.token || "";

//   const [pages, setPages] = useState<Page[]>([]);
//   const [selectedPages, setSelectedPages] = useState<Page[]>([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     pages: [],
//   });
//   const [loading, setLoading] = useState(false);

//   // -------- Fetch Page Master List ----------
//   const fetchPages = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL1}/getPagesMaster`
//       );
//       const data = await res.json();
//       setPages(data.data || []);
//     } catch (err) {
//       console.error("Error fetching pages master:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   // Select page
//   const handleSelectPage = (page: Page) => {
//     if (!selectedPages.some((p) => p.page_id === page.page_id)) {
//       setSelectedPages([...selectedPages, page]);
//     }
//   };

//   // Remove page
//   const removePage = (page_id: number) => {
//     setSelectedPages(selectedPages.filter((p) => p.page_id !== page_id));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true); // Start loader

//     const payload = {
//       role_name: formData.name,
//       description: formData.description,
//       pages: selectedPages.map((p) => p.page_id),
//     };

//     console.log("Final Payload:", payload);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL1}/createRole`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to create role");
//       }

//       // ✔ Success Toast
//       // toast({
//       //   title: "Role Created Successfully",
//       //   description: `${formData.name} has been added.`,
//       // });
//       // setPages()
//       onRoleCreated(data.data); // Notify parent about new role
//       showToast(res.status, data.message || "Role created successfully.")

//       // Clear form ONLY ON SUCCESS
//       setFormData({ name: "", description: "", pages: [] });
//       setSelectedPages([]);

//       // Close modal on success
//       onOpenChange(false);

//     } catch (err: any) {
//       // ❌ Error toast
//       // showToast(res.status, data.message || "Failed to create user.")

//       // showToast({
//       //   variant: "destructive",
//       //   title: "Error",
//       //   description: err?.message || "Something went wrong",
//       // });
//       // showToast(res.status,data.message || "Failed to create role." )
//       toast({
//         title: "Network Error",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };
//   // ----- Separate parent & child pages ----
//   const parents = pages.filter((p) => p.parent_page_id === null);
//   const children = pages.filter((p) => p.parent_page_id !== null);

//   const getSubPages = (parent_id: number) =>
//     children.filter((c) => c.parent_page_id === parent_id);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[520px]">
//         <DialogHeader>
//           <DialogTitle>Create New Role</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit}>
//           <fieldset disabled={loading} className={loading ? "opacity-50" : ""}>
//             <div className="space-y-4 py-4">

//               {/* Role Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="role-name">Role Name</Label>
//                 <Input
//                   id="role-name"
//                   placeholder="Enter role name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <Label>Description</Label>
//                 <Textarea
//                   placeholder="Describe the role"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* Dropdown Page Selector */}
//               <div className="space-y-2">
//                 <Label>Assign Sections</Label>

//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" className="w-full justify-between">
//                       {selectedPages.length > 0
//                         ? `${selectedPages.length} section(s) selected`
//                         : "Assign Sections"}
//                       <ChevronDown className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent className="w-56">
//                     {parents.map((parent) => {
//                       const subs = getSubPages(parent.page_id);

//                       // Parent without children
//                       if (subs.length === 0) {
//                         return (
//                           <DropdownMenuItem
//                             key={parent.page_id}
//                             onClick={() => handleSelectPage(parent)}
//                           >
//                             {parent.page_name}
//                           </DropdownMenuItem>
//                         );
//                       }

//                       // Parent with sub-pages
//                       return (
//                         <DropdownMenuSub key={parent.page_id}>
//                           <DropdownMenuSubTrigger>
//                             {parent.page_name}
//                           </DropdownMenuSubTrigger>

//                           <DropdownMenuPortal>
//                             <DropdownMenuSubContent>
//                               {subs.map((child) => (
//                                 <DropdownMenuItem
//                                   key={child.page_id}
//                                   onClick={() => handleSelectPage(child)}
//                                 >
//                                   {child.page_name}
//                                 </DropdownMenuItem>
//                               ))}
//                             </DropdownMenuSubContent>
//                           </DropdownMenuPortal>
//                         </DropdownMenuSub>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {selectedPages.map((p) => (
//                     <div
//                       key={p.page_id}
//                       // className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full border"
//                       className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
//                     >
//                       <Shield className="w-3 h-3 text-primary" />
//                       <span className="text-sm">{p.page_name}</span>

//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
//                         onClick={() => removePage(p.page_id)}
//                       >
//                         <X className="w-3 h-3" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </fieldset>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => !loading && onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Role"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// added default  home ====
// const CreateRoleDialog = ({ open, onOpenChange, onRoleCreated }) => {
//   const { toast } = useToast();
//   const token = JSON.parse(localStorage.getItem("user"))?.token || "";

//   const [pages, setPages] = useState<Page[]>([]);
//   const [selectedPages, setSelectedPages] = useState<Page[]>([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     pages: [],
//   });
//   const [loading, setLoading] = useState(false);

//   // -------- Fetch Page Master List ----------
//   const fetchPages = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL1}/getPagesMaster`
//       );
//       const data = await res.json();
//       const fetchedPages = data.data || [];
//       setPages(fetchedPages);

//       // 🏠 Auto-select "Home" page as default (case-insensitive)
//       const homePage = fetchedPages.find(
//         (p) => p.page_name.toLowerCase() === "home"
//       );
//       if (homePage && selectedPages.length === 0) {
//         setSelectedPages([homePage]);
//       }
//     } catch (err) {
//       console.error("Error fetching pages master:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   // Select page
//   const handleSelectPage = (page: Page) => {
//     if (!selectedPages.some((p) => p.page_id === page.page_id)) {
//       setSelectedPages([...selectedPages, page]);
//     }
//   };

//   // Remove page (prevent removing "Home")
//   const removePage = (page_id: number) => {
//     const pageToRemove = selectedPages.find((p) => p.page_id === page_id);

//     // 🚫 Prevent removing "Home" page
//     if (pageToRemove && pageToRemove.page_name.toLowerCase() === "home") {
//       toast({
//         title: "Cannot Remove Home",
//         description: "Home page is required and cannot be removed.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setSelectedPages(selectedPages.filter((p) => p.page_id !== page_id));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true);

//     const payload = {
//       role_name: formData.name,
//       description: formData.description,
//       pages: selectedPages.map((p) => p.page_id),
//     };

//     console.log("Final Payload:", payload);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL1}/createRole`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to create role");
//       }

//       onRoleCreated(data.data);
//       showToast(res.status, data.message || "Role created successfully.");

//       // Clear form and reset to Home page only
//       setFormData({ name: "", description: "", pages: [] });
//       const homePage = pages.find((p) => p.page_name.toLowerCase() === "home");
//       setSelectedPages(homePage ? [homePage] : []);

//       onOpenChange(false);

//     } catch (err: any) {
//       toast({
//         title: "Network Error",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----- Separate parent & child pages ----
//   const parents = pages.filter((p) => p.parent_page_id === null);
//   const children = pages.filter((p) => p.parent_page_id !== null);

//   const getSubPages = (parent_id: number) =>
//     children.filter((c) => c.parent_page_id === parent_id);

//   // Check if a page is "Home"
//   const isHomePage = (page: Page) => page.page_name.toLowerCase() === "home";

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[520px]">
//         <DialogHeader>
//           <DialogTitle>Create New Role</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit}>
//           <fieldset disabled={loading} className={loading ? "opacity-50" : ""}>
//             <div className="space-y-4 py-4">

//               {/* Role Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="role-name">Role Name</Label>
//                 <Input
//                   id="role-name"
//                   placeholder="Enter role name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <Label>Description</Label>
//                 <Textarea
//                   placeholder="Describe the role"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* Dropdown Page Selector */}
//               <div className="space-y-2">
//                 <Label>Assign Sections</Label>

//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" className="w-full justify-between">
//                       {selectedPages.length > 0
//                         ? `${selectedPages.length} section(s) selected`
//                         : "Assign Sections"}
//                       <ChevronDown className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent className="w-56">
//                     {parents.map((parent) => {
//                       const subs = getSubPages(parent.page_id);

//                       // Parent without children
//                       if (subs.length === 0) {
//                         return (
//                           <DropdownMenuItem
//                             key={parent.page_id}
//                             onClick={() => handleSelectPage(parent)}
//                           >
//                             {parent.page_name}
//                           </DropdownMenuItem>
//                         );
//                       }

//                       // Parent with sub-pages
//                       return (
//                         <DropdownMenuSub key={parent.page_id}>
//                           <DropdownMenuSubTrigger>
//                             {parent.page_name}
//                           </DropdownMenuSubTrigger>

//                           <DropdownMenuPortal>
//                             <DropdownMenuSubContent>
//                               {subs.map((child) => (
//                                 <DropdownMenuItem
//                                   key={child.page_id}
//                                   onClick={() => handleSelectPage(child)}
//                                 >
//                                   {child.page_name}
//                                 </DropdownMenuItem>
//                               ))}
//                             </DropdownMenuSubContent>
//                           </DropdownMenuPortal>
//                         </DropdownMenuSub>
//                       );
//                     })}
//                   </DropdownMenuContent>
//                 </DropdownMenu>

//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {selectedPages.map((p) => (
//                     <div
//                       key={p.page_id}
//                       className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
//                     >
//                       <Shield className="w-3 h-3 text-primary" />
//                       <span className="text-sm">{p.page_name}</span>

//                       {/* Show remove button only for non-Home pages */}
//                       {!isHomePage(p) && (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
//                           onClick={() => removePage(p.page_id)}
//                         >
//                           <X className="w-3 h-3" />
//                         </Button>
//                       )}

//                       {/* Show lock icon for Home page */}
//                       {isHomePage(p) && (
//                         <Lock className="w-3 h-3 text-gray-500" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </fieldset>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => !loading && onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Role"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

const CreateRoleDialog = ({ open, onOpenChange, onRoleCreated }) => {
  const { toast } = useToast();
  const token = JSON.parse(localStorage.getItem("user"))?.token || "";

  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPages, setSelectedPages] = useState<Page[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pages: [],
  });
  const [loading, setLoading] = useState(false);

  // -------- Fetch Page Master List ----------
  const fetchPages = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL1}/getPagesMaster`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if token required

        }
      });
      const data = await res.json();
      const fetchedPages = data.data || [];
      setPages(fetchedPages);

      // 🏠 Auto-select "Home" page as default (case-insensitive)
      const homePage = fetchedPages.find(
        (p) => p.page_name.toLowerCase() === "home"
      );
      if (homePage && selectedPages.length === 0) {
        setSelectedPages([homePage]);
      }
    } catch (err) {
      console.error("Error fetching pages master:", err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Select page
  const handleSelectPage = (page: Page) => {
    if (!selectedPages.some((p) => p.page_id === page.page_id)) {
      setSelectedPages([...selectedPages, page]);
    }
  };

  // Remove page (prevent removing "Home")
  const removePage = (page_id: number) => {
    const pageToRemove = selectedPages.find((p) => p.page_id === page_id);

    // 🚫 Prevent removing "Home" page
    if (pageToRemove && pageToRemove.page_name.toLowerCase() === "home") {
      toast({
        title: "Cannot Remove Home",
        description: "Home page is required and cannot be removed.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPages(selectedPages.filter((p) => p.page_id !== page_id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      role_name: formData.name,
      description: formData.description,
      pages: selectedPages.map((p) => p.page_id),
    };

    console.log("Final Payload:", payload);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL1}/createRole`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();


      if (!res.ok) {
        if (res.status === 400) {
          showToast(400, data.message || "Role already exist.");
          // ❗ If delete fails, remove loading so UI returns to normal
          return;
        }
        throw new Error(data.message || "Failed to create role");
      }

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        showToast(401, "Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      onRoleCreated(data.data);
      showToast(res.status, data.message || "Role created successfully.");

      // Clear form and reset to Home page only
      setFormData({ name: "", description: "", pages: [] });
      const homePage = pages.find((p) => p.page_name.toLowerCase() === "home");
      setSelectedPages(homePage ? [homePage] : []);

      onOpenChange(false);

    } catch (err: any) {
      toast({
        title: "Network Error",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ----- Separate parent & child pages ----
  const parents = pages.filter((p) => p.parent_page_id === null);
  const children = pages.filter((p) => p.parent_page_id !== null);

  const getSubPages = (parent_id: number) =>
    children.filter((c) => c.parent_page_id === parent_id);

  // Check if a page is "Home"
  const isHomePage = (page: Page) => page.page_name.toLowerCase() === "home";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className="sm:max-w-[520px]"> */}
      <DialogContent className="sm:max-w-[600px] !rounded-xl mx-0 w-[calc(100%_-_1.0rem)]">

        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className={loading ? "opacity-50" : ""}>
            <div className="space-y-4 py-4">

              {/* Role Name */}
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="Enter role name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the role"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* Dropdown Page Selector */}
              <div className="space-y-2">
                <Label>Assign Sections</Label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedPages.length > 0
                        ? `${selectedPages.length} section(s) selected`
                        : "Assign Sections"}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56">
                    {parents.map((parent) => {
                      const subs = getSubPages(parent.page_id);

                      // Parent without children
                      if (subs.length === 0) {
                        return (
                          <DropdownMenuItem
                            key={parent.page_id}
                            onClick={() => handleSelectPage(parent)}
                          >
                            {parent.page_name}
                          </DropdownMenuItem>
                        );
                      }

                      // Parent with sub-pages
                      return (
                        <DropdownMenuSub key={parent.page_id}>
                          <DropdownMenuSubTrigger>
                            {parent.page_name}
                          </DropdownMenuSubTrigger>

                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {subs.map((child) => (
                                <DropdownMenuItem
                                  key={child.page_id}
                                  onClick={() => handleSelectPage(child)}
                                >
                                  {child.page_name}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedPages.map((p) => (
                    <div
                      key={p.page_id}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isHomePage(p)
                        ? "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        : "bg-primary/10 border border-primary/20 text-primary"
                        }`}
                    >
                      <Shield className={`w-3 h-3 ${isHomePage(p) ? "text-gray-500" : "text-primary"}`} />
                      <span className="text-sm font-medium">{p.page_name}</span>

                      {/* Show remove button only for non-Home pages */}
                      {!isHomePage(p) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => removePage(p.page_id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}

                      {/* Show lock icon for Home page */}
                      {isHomePage(p) && (
                        <Lock className="w-3 h-3 text-gray-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => !loading && onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateRoleDialog;
