// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";

// // type CreateUserDialogProps = {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// // };

// // const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
// //   const { toast } = useToast();
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     role: "",
// //   });

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     toast({
// //       title: "User created",
// //       description: `${formData.name} has been created successfully.`,
// //     });
// //     onOpenChange(false);
// //     setFormData({ name: "", email: "", role: "" });
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="sm:max-w-[500px]">
// //         <DialogHeader>
// //           <DialogTitle>Create New User</DialogTitle>
// //         </DialogHeader>
// //         <form onSubmit={handleSubmit}>
// //           <div className="space-y-4 py-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="name">Full Name</Label>
// //               <Input
// //                 id="name"
// //                 placeholder="Enter full name"
// //                 value={formData.name}
// //                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                 required
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <Label htmlFor="email">Email</Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="user@example.com"
// //                 value={formData.email}
// //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                 required
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <Label htmlFor="role">Role</Label>
// //               <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select a role" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="admin">Admin</SelectItem>
// //                   <SelectItem value="manager">Manager</SelectItem>
// //                   <SelectItem value="user">User</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>
// //           <DialogFooter>
// //             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
// //               Cancel
// //             </Button>
// //             <Button type="submit">Create User</Button>
// //           </DialogFooter>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// //export default CreateUserDialog;


// type CreateUserDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     userid: "",
//     mobile: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Here you can call your backend API
//     // await fetch("/create-user", { method: "POST", body: JSON.stringify(formData) })

//     toast({
//       title: "User created",
//       description: `${formData.name} has been created successfully.`,
//     });

//     onOpenChange(false);
//     setFormData({
//       name: "",
//       email: "",
//       role: "",
//       userid: "",
//       mobile: "",
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Create New User</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4 py-4">

//             {/* Full Name */}
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Enter full name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="user@example.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </div>

//             {/* User ID */}
//             <div className="space-y-2">
//               <Label htmlFor="userid">User ID</Label>
//               <Input
//                 id="userid"
//                 placeholder="Enter unique user ID"
//                 value={formData.userid}
//                 onChange={(e) => setFormData({ ...formData, userid: e.target.value })}
//                 required
//               />
//             </div>

//             {/* Mobile */}
//             <div className="space-y-2">
//               <Label htmlFor="mobile">Mobile Number</Label>
//               <Input
//                 id="mobile"
//                 type="tel"
//                 placeholder="9876543210"
//                 value={formData.mobile}
//                 onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
//                 required
//               />
//             </div>

//             {/* Role */}
//             <div className="space-y-2">
//               <Label htmlFor="role">Role</Label>
//               <Select
//                 value={formData.role}
//                 onValueChange={(value) => setFormData({ ...formData, role: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="admin">Admin</SelectItem>
//                   <SelectItem value="manager">Manager</SelectItem>
//                   <SelectItem value="user">User</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//             >
//               Cancel
//             </Button>
//             <Button type="submit">Create User</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default CreateUserDialog;
let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'


import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { showToast } from "../ui/show-toast";
import { Loader } from "lucide-react";

type CreateUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateUserDialog = ({ open, onOpenChange,onUserCreated  }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    userid: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
    userid: "",
    mobile: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------
  // VALIDATION FUNCTION
  // -------------------------
  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.userid.trim()) newErrors.userid = "User ID is required.";

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid mobile number.";
    }

    if (!formData.role) newErrors.role = "Role is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    // creaUser();
    setIsLoading(true);
    const success = await creaUser();
    setIsLoading(false);
    if (success.success) {
      console.log("User created successfully:", success);
       onUserCreated(success.data);
      onOpenChange(false);  // ✅ close only on success
      // userlistrefetch(); // ✅ refetch only on success
    }

    // toast({
    //   title: "User Created Successfully",
    //   description: `${formData.name} has been created.`,
    // });

    // onOpenChange(false);

    setFormData({
      name: "",
      email: "",
      role: "",
      userid: "",
      mobile: "",
      password: ""
    });
    setErrors({
      name: "",
      email: "",
      role: "",
      userid: "",
      mobile: "",
      password: ""
    });
  };

  const creaUser = async () => {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim() || null, // optional
      userid: formData.userid.trim(),
      password: formData.password.trim(),
      role: formData.role,
      mobile: formData.mobile.trim(),
    };

    try {
      // console.log("Sending payload to /register:", payload);

      const res = await fetch(`${REACT_APP_BACKEND1}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user?.token}`, // if token required
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Failed to create user.",
          variant: "destructive",
        });
        showToast(res.status, data.message || "Failed to create user.")
        return {success:false};
      }
      // toast({
      //   title: "User Created",
      //   description: `${payload.name} has been successfully registered.`,
      // });
      showToast(res.status, data.message || "User created successfully.")
      // return true;
      return{
        success: true,
        data:data.data
      }
    } catch (err) {
      console.error("Register Error:", err);
      toast({
        title: "Network Error",
        description: "Please try again later.",
        variant: "destructive",
      });
      return {success: false};
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] !rounded-xl mx-0 w-[calc(100%_-_1.0rem)]">

        <DialogHeader >
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Landscape Grid Layout */}
          <div className="grid grid-cols-2 gap-6">

            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="name" className="required">
                Full Name <span className="text-red-600 font-bold">*</span></Label>

              <Input
                id="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* User ID */}
            <div className="space-y-1">
              <Label htmlFor="userid">User ID<span className="text-red-600 font-bold">*</span></Label>
              <Input
                id="userid"
                placeholder="Unique user ID"
                value={formData.userid}
                onChange={(e) =>
                  setFormData({ ...formData, userid: e.target.value })
                }
              />
              {errors.userid && <p className="text-red-500 text-sm">{errors.userid}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password<span className="text-red-600 font-bold">*</span></Label>
              <Input
                id="password"
                placeholder="Enter a secure password"
                // maxLength=
                value={formData.password}
                onChange={(e) => {
                  // const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            {/* Mobile Number */}
            <div className="space-y-1">
              <Label htmlFor="mobile">Mobile<span className="text-red-600 font-bold">*</span></Label>
              <Input
                id="mobile"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, mobile: value });
                }}
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>

            {/* Role */}
            <div className="space-y-1">
              <Label>Role<span className="text-red-600 font-bold">*</span></Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {/* <Button type="submit" >Create User</Button> */}
            {/* <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? "Creating..." : "Create User"}
              </Button> */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>


          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
