// import { useEffect, useState } from "react";
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";
// import { showToast } from "../ui/show-toast";
// import { Loader } from "lucide-react";
// let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'


// const CreateUserDialog = ({ open, onOpenChange, onUserCreated }) => {
//   const { toast } = useToast();
//   const [roles, setRoles] = useState([]);


//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     role_id: "",
//     userid: "",
//     mobile: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     role: "",
//     userid: "",
//     mobile: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // -------------------------
//   // VALIDATION FUNCTION
//   // -------------------------
//   const validateForm = () => {
//     const newErrors: any = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required.";

//     if (formData.email.trim() !== "") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         newErrors.email = "Please enter a valid email address";
//       }
//     }

//     if (!formData.userid.trim()) newErrors.userid = "User ID is required.";

//     if (!formData.mobile.trim()) {
//       newErrors.mobile = "Mobile number is required.";
//     } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
//       newErrors.mobile = "Enter a valid mobile number.";
//     }

//     if (!formData.role) newErrors.role = "Role is required.";

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // -------- Fetch Page Master List ----------
//   const fetchRoles = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL1}/getRoleMaster`
//       );
//       const data = await res.json();
//       const fetchedPages = data.data || [];
//       setRoles(fetchedPages);

//       // 🏠 Auto-select "Home" page as default (case-insensitive)
//       // const homePage = fetchedPages.find(
//       //   (p) => p.page_name.toLowerCase() === "home"
//       // );
//       // if (homePage && selectedPages.length === 0) {
//       //   setSelectedPages([homePage]);
//       // }
//     } catch (err) {
//       console.error("Error fetching pages master:", err);
//     }
//   };
//   console.log("Roles fetched:", roles);
//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   // -------------------------
//   // SUBMIT HANDLER
//   // -------------------------
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;
//     // creaUser();
//     setIsLoading(true);
//     const success = await creaUser();
//     setIsLoading(false);
//     if (success.success) {
//       console.log("User created successfully:", success);
//       onUserCreated(success.data);
//       onOpenChange(false);  // ✅ close only on success
//       // userlistrefetch(); // ✅ refetch only on success
//     }

//     // toast({
//     //   title: "User Created Successfully",
//     //   description: `${formData.name} has been created.`,
//     // });

//     // onOpenChange(false);

//     setFormData({
//       name: "",
//       email: "",
//       role: "",
//       role_id: "",
//       userid: "",
//       mobile: "",
//       password: ""
//     });
//     setErrors({
//       name: "",
//       email: "",
//       role: "",
//       userid: "",
//       mobile: "",
//       password: ""
//     });
//   };

//   const creaUser = async () => {
//     console.log(formData, "__formData")
//     const payload = {
//       name: formData.name.trim(),
//       email: formData.email.trim() || null, // optional
//       userid: formData.userid.trim(),
//       password: formData.password.trim(),
//       role: formData.role,
//       role_id: parseInt(formData.role_id),
//       mobile: formData.mobile.trim(),
//     };

//     try {
//       // console.log("Sending payload to /register:", payload);

//       const res = await fetch(`${REACT_APP_BACKEND1}/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${user?.token}`, // if token required
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast({
//           title: "Error",
//           description: data.message || "Failed to create user.",
//           variant: "destructive",
//         });
//         showToast(res.status, data.message || "Failed to create user.")
//         return { success: false };
//       }
//       // toast({
//       //   title: "User Created",
//       //   description: `${payload.name} has been successfully registered.`,
//       // });
//       showToast(res.status, data.message || "User created successfully.")
//       // return true;
//       return {
//         success: true,
//         data: data.data
//       }
//     } catch (err) {
//       console.error("Register Error:", err);
//       toast({
//         title: "Network Error",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//       return { success: false };
//     }
//   };
//   console.log("Selected Role ID:", roles);


//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px] !rounded-xl mx-0 w-[calc(100%_-_1.0rem)]">

//         <DialogHeader >
//           <DialogTitle>Create New User</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Landscape Grid Layout */}
//           <div className="grid grid-cols-2 gap-6">

//             {/* Full Name */}
//             <div className="space-y-1">
//               <Label htmlFor="name" className="required">
//                 Full Name <span className="text-red-600 font-bold">*</span></Label>

//               <Input
//                 id="name"
//                 placeholder="Enter full name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>

//             {/* User ID */}
//             <div className="space-y-1">
//               <Label htmlFor="userid">User ID<span className="text-red-600 font-bold">*</span></Label>
//               <Input
//                 id="userid"
//                 placeholder="Unique user ID"
//                 value={formData.userid}
//                 onChange={(e) =>
//                   setFormData({ ...formData, userid: e.target.value })
//                 }
//               />
//               {errors.userid && <p className="text-red-500 text-sm">{errors.userid}</p>}
//             </div>

//             {/* Email */}
//             <div className="space-y-1">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="user@example.com"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </div>

//             {/* password */}
//             <div className="space-y-1">
//               <Label htmlFor="password">Password<span className="text-red-600 font-bold">*</span></Label>
//               <Input
//                 id="password"
//                 placeholder="Enter a secure password"
//                 // maxLength=
//                 value={formData.password}
//                 onChange={(e) => {
//                   // const value = e.target.value.replace(/\D/g, "");
//                   setFormData({ ...formData, password: e.target.value });
//                 }}
//               />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>
//             {/* Mobile Number */}
//             <div className="space-y-1">
//               <Label htmlFor="mobile">Mobile<span className="text-red-600 font-bold">*</span></Label>
//               <Input
//                 id="mobile"
//                 placeholder="10-digit mobile number"
//                 maxLength={10}
//                 value={formData.mobile}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, "");
//                   setFormData({ ...formData, mobile: value });
//                 }}
//               />
//               {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
//             </div>
//             {/* Role */}
//             <div className="space-y-1">
//               <Label>
//                 Role <span className="text-red-600 font-bold">*</span>
//               </Label>

//               <Select
//                 value={formData.role_id ? formData.role_id.toString() : undefined}
//                 onValueChange={(value) => {
//                   const selectedRole = roles.find(
//                     (r) => r.role_id.toString() === value
//                   );

//                   setFormData({
//                     ...formData,
//                     role_id: value,
//                     role: selectedRole?.role_name || "",
//                   });
//                 }}
//                 disabled={roles.length === 0}
//               >
//                 <SelectTrigger>
//                   <SelectValue
//                     placeholder={roles.length === 0 ? "Loading roles..." : "Select role"}
//                   />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {roles.map((role) => (
//                     <SelectItem
//                       key={role.role_id}
//                       value={role.role_id.toString()}
//                     >
//                       {role.role_name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>


//           </div>

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             {/* <Button type="submit" >Create User</Button> */}
//             {/* <Button type="submit" disabled={isLoading}>
//                 {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
//                 {isLoading ? "Creating..." : "Create User"}
//               </Button> */}
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Creating..." : "Create User"}
//             </Button>


//           </DialogFooter>

//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateUserDialog;


import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Info } from "lucide-react";
import SearchableDropdown from "../SearchableDropdown";
import { set } from "date-fns";
import { showToast } from "../ui/show-toast";

const STATE_NAME = "Uttar Pradesh";
let VITE_BACKEND_URL1 = import.meta.env.VITE_BACKEND_URL1
let VITE_BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL2
type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onUserCreated: (u: any) => void;
};

export default function CreateUserDialog({
  open,
  onOpenChange,
  onUserCreated,
}: Props) {
  /* ---------------- STATE ---------------- */
  const [roles, setRoles] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [subDistricts, setSubDistricts] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [subDistrictLoading, setSubDistrictLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '').token : '';
  const [formData, setFormData] = useState({
    role_id: "",
    role: "",
    district_lgd_code: null,
    sub_district_lgd_code: null,
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  /* ---------------- ROLE TYPE ---------------- */
  const roleType = useMemo(() => {
    const r = roles.find(
      (x) => x.role_id?.toString() === formData.role_id
    );
    return r?.role_name?.toUpperCase() || "";
  }, [formData.role_id, roles]);

  /* ---------------- FETCH ROLES ---------------- */
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL1}/getRoleMaster`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // if token required

      }
    })
      .then((r) => r.json())
      .then((d) => setRoles(d.data || []))
      .catch(() => setRoles([]));
  }, []);

  /* ---------------- FETCH DISTRICTS ---------------- */
  // useEffect(() => {
  //   console.log(roleType, "___roleType from here ")
  //   setDistrictLoading(true);
  //   if (["DISTRICT", "SUB DISTRICT", "VERIFIER"].includes(roleType)) {
  //     fetch(`${VITE_BACKEND_URL2}/districts`)
  //       .then((r) => r.json())
  //       .then((d) => setDistricts(d.data || []))
  //       .catch(() => setDistricts([]))
  //       .finally(() => setDistrictLoading(false));
  //   }
  // }, [roleType]);

  useEffect(() => {
    if (!["DISTRICT", "SUB DISTRICT", "VERIFIER"].includes(roleType)) {
      setDistricts([]);
      setDistrictLoading(false);
      return;
    }

    setDistrictLoading(true);

    fetch(`${VITE_BACKEND_URL2}/districts`)
      .then((r) => r.json())
      .then((d) => setDistricts(d.data || []))
      .catch(() => setDistricts([]))
      .finally(() => setDistrictLoading(false));
  }, [roleType]);


  console.log(districts, "___district from here ")
  /* ---------------- FETCH SUB DISTRICTS ---------------- */
  // useEffect(() => {

  //   setSubDistrictLoading(true);
  //   console.log(formData.district_lgd_code, "___district_lgd_code from here inside useEffect SubDistrict ")
  //   if (
  //     ["SUB DISTRICT", "VERIFIER"].includes(roleType) &&
  //     formData.district_lgd_code
  //   ) {
  //     fetch(
  //       `${VITE_BACKEND_URL2}/subdistricts/${formData.district_lgd_code}`
  //     )
  //       .then((r) => r.json())
  //       .then((d) => setSubDistricts(d.data || []))
  //       .catch(() => setSubDistricts([]))
  //       .finally(() => setSubDistrictLoading(false));
  //   }
  // }, [formData.district_lgd_code, roleType]);

  useEffect(() => {
    if (
      !["SUB DISTRICT", "VERIFIER"].includes(roleType) ||
      !formData.district_lgd_code
    ) {
      setSubDistricts([]);
      setSubDistrictLoading(false);
      return;
    }

    setSubDistrictLoading(true);

    fetch(`${VITE_BACKEND_URL2}/subdistricts/${formData.district_lgd_code}`)
      .then((r) => r.json())
      .then((d) => setSubDistricts(d.data || []))
      .catch(() => setSubDistricts([]))
      .finally(() => setSubDistrictLoading(false));
  }, [formData.district_lgd_code, roleType]);


  console.log(subDistrictLoading, "___sudistrictLoading from here ")
  /* ---------------- RESET ON ROLE CHANGE ---------------- */
  useEffect(() => {
    setFormData((p) => ({
      ...p,
      district_lgd_code: null,
      sub_district_lgd_code: null,
    }));
    setDistricts([]);
    setSubDistricts([]);
    setErrors({});
  }, [roleType]);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e: any = {};

    if (!formData.role_id) e.role = "Role is required";
    if (!formData.name.trim()) e.name = "Name is required";

    if (!/^[6-9]\d{9}$/.test(formData.mobile))
      e.mobile = "Enter a valid 10‑digit mobile number";

    if (!formData.password) e.password = "Password is required";

    if (roleType === "DISTRICT" && !formData.district_lgd_code)
      e.district = "District is required";

    if (
      ["SUB DISTRICT", "VERIFIER"].includes(roleType) &&
      (!formData.district_lgd_code || !formData.sub_district_lgd_code)
    ) {
      e.subDistrict = "District & Sub‑District are required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  // const submit = async (e: any) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   const payload = {
  //     ...formData,
  //     role_id: Number(formData.role_id),
  //     state: STATE_NAME,
  //   };
  //   console.log("Payload:", payload);
  //   const res = await fetch(
  //     `${VITE_BACKEND_URL1}/register`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     }
  //   );

  //   const data = await res.json();
  //   if (res.ok) {
  //     onUserCreated(data.data);
  //     onOpenChange(false);
  //   }
  // };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitLoading(true);

    try {
      const payload = {
        ...formData,
        role_id: Number(formData.role_id),
        state: STATE_NAME,
      };

      const res = await fetch(`${VITE_BACKEND_URL1}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // if token required
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(200, data.message || "User created successfully");
        resetForm(); 
        onUserCreated(data.data);
        onOpenChange(false);
      } else {
        showToast(
          res.status,
          data.message || "Failed to create user"
        );
      }
    } finally {
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    if (formData.mobile.length === 10) {
      const lastFive = formData.mobile.slice(-5);
      setFormData((p) => ({
        ...p,
        password: `${lastFive}@123`,
      }));
    } else {
      setFormData((p) => ({
        ...p,
        password: "",
      }));
    }
  }, [formData.mobile]);
  const INITIAL_FORM_STATE = {
    role_id: "",
    role: "",
    district_lgd_code: null,
    sub_district_lgd_code: null,
    name: "",
    email: "",
    mobile: "",
    password: "",
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setShowPassword(false);

    setDistricts([]);
    setSubDistricts([]);

    setDistrictLoading(false);
    setSubDistrictLoading(false);
    setSubmitLoading(false);
  };
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);


  /* ---------------- UI ---------------- */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] !rounded-xl mx-0 w-[calc(100%_-_1.0rem)]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-5">
          {/* STATE */}
          <div>
            <Label>State</Label>
            <Input value={STATE_NAME} disabled />
          </div>

          {/* ROLE */}
          <div>
            <Label>
              Role <span className="text-red-600">*</span>
            </Label>
            <Select
              value={formData.role_id}
              onValueChange={(v) => {
                const r = roles.find(
                  (x) => x.role_id.toString() === v
                );
                setFormData((p) => ({
                  ...p,
                  role_id: v,
                  role: r?.role_name || "",
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem
                    key={r.role_id}
                    value={r.role_id.toString()}
                  >
                    {r.role_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          {/* DISTRICT */}
          {/* {["DISTRICT", "SUB DISTRICT", "VERIFIER"].includes(roleType) && (
            <div>
              <Label>
                District <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.district_lgd_code}
                onValueChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    district_lgd_code: v,
                    sub_district_lgd_code: "",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem
                      key={d.district_lgd_code}
                      value={d.district_lgd_code.toString()}
                    >
                      {d.district_name}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
              {errors.district && (
                <p className="text-sm text-red-500">{errors.district}</p>
              )}
            </div>
          )} */}
          {["DISTRICT", "SUB DISTRICT", "VERIFIER"].includes(roleType) && (
            <div>
              <Label>
                District <span className="text-red-600">*</span>
              </Label>

              {/* <SearchableDropdown
                id="district"
                options={districts}
                label="district_name"
                placeholder="Search district"
                selectedVal={
                  districts.find(
                    d => d.district_lgd_code === formData.district_lgd_code
                  )?.district_name || ""
                }
                handleChange={(val) => {
                  const selected = districts.find(
                    d => d.district_name === val
                  );

                  setFormData(p => ({
                    ...p,
                    district_lgd_code: selected?.district_lgd_code || "",
                    sub_district_lgd_code: "",
                  }));
                }}
              /> */}
              <SearchableDropdown
                id="district"
                options={districts}
                label="district_name"
                placeholder={
                  districtLoading ? "Loading districts..." : "Search district"
                }
                disabled={districtLoading}
                selectedVal={
                  districts.find(
                    d => d.district_lgd_code === formData.district_lgd_code
                  )?.district_name || ""
                }
                handleChange={(val) => {
                  const selected = districts.find(
                    d => d.district_name === val
                  );
                  setFormData(p => ({
                    ...p,
                    district_lgd_code: selected?.district_lgd_code || null,
                    sub_district_lgd_code: null,
                  }));
                }}
              />

              {/* {districtLoading && (
                <p className="text-xs text-muted-foreground mt-1">
                  Fetching districts…
                </p>
              )} */}


              {errors.district && (
                <p className="text-sm text-red-500">{errors.district}</p>
              )}
            </div>
          )}


          {/* SUB DISTRICT */}
          {/* {["SUB DISTRICT", "VERIFIER"].includes(roleType) && (
            <div>
              <Label>
                Sub‑District <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.sub_district_lgd_code}
                onValueChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    sub_district_lgd_code: v,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub‑district" />
                </SelectTrigger>
                <SelectContent>
                  {subDistricts.map((d) => (
                    <SelectItem
                      key={d.sub_district_lgd_code}
                      value={d.sub_district_lgd_code.toString()}
                    >
                      {d.sub_district_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subDistrict && (
                <p className="text-sm text-red-500">{errors.subDistrict}</p>
              )}
            </div>
          )} */}
          {["SUB DISTRICT", "VERIFIER"].includes(roleType) && (
            <div>
              <Label>
                Sub‑District <span className="text-red-600">*</span>
              </Label>

              {/* <SearchableDropdown
                id="subDistrict"
                options={subDistricts}
                label="sub_district_name"
                placeholder="Search sub‑district"
                selectedVal={
                  subDistricts.find(
                    s => s.sub_district_lgd_code === formData.sub_district_lgd_code
                  )?.sub_district_name || ""
                }
                handleChange={(val) => {
                  const selected = subDistricts.find(
                    s => s.sub_district_name === val
                  );

                  setFormData(p => ({
                    ...p,
                    sub_district_lgd_code: selected?.sub_district_lgd_code || "",
                  }));
                }}
              /> */}
              <SearchableDropdown
                id="subDistrict"
                options={subDistricts}
                label="sub_district_name"
                placeholder={
                  subDistrictLoading
                    ? "Loading sub‑districts..."
                    : "Search sub‑district"
                }
                disabled={subDistrictLoading || !formData.district_lgd_code}
                selectedVal={
                  subDistricts.find(
                    s => s.sub_district_lgd_code === formData.sub_district_lgd_code
                  )?.sub_district_name || ""
                }
                handleChange={(val) => {
                  const selected = subDistricts.find(
                    s => s.sub_district_name === val
                  );
                  setFormData(p => ({
                    ...p,
                    sub_district_lgd_code: selected?.sub_district_lgd_code || null,
                  }));
                }}
              />

              {/* {subDistrictLoading && (
                <p className="text-xs text-muted-foreground mt-1">
                  Fetching sub‑districts…
                </p>
              )} */}


              {errors.subDistrict && (
                <p className="text-sm text-red-500">{errors.subDistrict}</p>
              )}
            </div>
          )}

          {/* USER DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>
                Name <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="Full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* <div>
              <Label>Email</Label>
              <Input
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div> */}
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

            <div>
              <Label>
                Mobile <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="10‑digit mobile number"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile: e.target.value.replace(/\D/g, ""),
                  })
                }
              />
              {errors.mobile && (
                <p className="text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>

            {/* <div>
              <Label>
                Password <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  className="pr-10"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>  */}
            <div className="space-y-1">
              <Label>
                Password <span className="text-red-600">*</span>
              </Label>

              <div className="relative">
                <Input
                  type=""
                  value={formData.password}
                  disabled
                  className="pr-10 bg-muted cursor-not-allowed"
                />

                {/* INFO ICON – SAME STYLE AS EYE */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                  <Info
                    size={18}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  />

                  {/* TOOLTIP */}
                  <div
                    className="
          absolute right-0 top-7 z-50
          hidden group-hover:block
          w-64 rounded-md border bg-popover px-3 py-2
          text-xs text-muted-foreground shadow-md
        "
                  >
                    Default password for login is your
                    <br />
                    <span className="font-semibold text-foreground">
                      {" "}
                      last 5 digits of mobile number + @123
                    </span>
                    <br />
                    Example: if your mobile no is 6542356789 then your default password for login is <span className="font-mono">56789@123</span>
                  </div>
                </div>
              </div>
            </div>



          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {/* <Button type="submit">Create User</Button> */}
            <Button type="submit" disabled={submitLoading}>
              {submitLoading ? "Creating user..." : "Create User"}
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}



