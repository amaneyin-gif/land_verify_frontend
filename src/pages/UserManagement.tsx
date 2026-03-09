// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import Navigation from "@/components/Navigation";
// import Navbar from '@/components/Navbar';
// import UsersTab from "@/components/UserManagement/UserTab";
// import RolesTab from "@/components/UserManagement/RoleTab";
// import VillageAssignmentTab from "@/components/UserManagement/VillageAssignmnetTab";
// import { useAuth } from "@/contexts/AuthContext";

// const USER_MANAGEMENT_TABS = {
//   "User Creation": {
//     value: "users",
//     label: "Users",
//     component: UsersTab,
//   },
//   "Role Creation": {
//     value: "roles",
//     label: "Roles",
//     component: RolesTab,
//   },
//   "Village Assignment": {
//     value: "phases",
//     label: "Village Assignment",
//     component: VillageAssignmentTab,
//   },
// };


// const UserManagement = () => {
//  const { accessibleRoutes } = useAuth();
//     { console.log("UserManagement component rendered") }
//       const userMgmtPermission = accessibleRoutes.find(
//     (r) => r.name === "User Management"
//   );

//   // Allowed child pages (array of strings)
//   const allowedChildren = userMgmtPermission?.children || [];

//   // Build tabs dynamically
//   const enabledTabs = allowedChildren
//     .map((child) => USER_MANAGEMENT_TABS[child])
//     .filter(Boolean);    
//     return (
//         <div className="min-h-screen bg-background">
//             <Navbar />

//             {/* <main className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-8"> */}
//             {/* <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 overflow-x-hidden"> */}
//             {/* <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 overflow-x-hidden"> */}
//             <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">


//                 {/* ---------- PAGE HEADER ---------- */}
//                 <div className="mb-4 sm:mb-8">
//                     <h1 className="text-xl sm:text-3xl font-semibold text-foreground">
//                         User Management
//                     </h1>
//                     <p className="text-sm sm:text-base text-muted-foreground">
//                         Manage users, roles, and village assignments
//                     </p>
//                 </div>

//                 {/* ---------- TABS ---------- */}
//                 <Tabs defaultValue="users" className="w-full">
//                     {/* Tabs container */}
//                     <div className="sticky top-[64px] z-30 bg-background pb-2">


//                         <TabsList
//                             className="
//                                 flex w-full gap-2 mb-6
//                                 overflow-x-auto no-scrollbar
//                                 sm:grid sm:grid-cols-3
//                                 sm:w-fit
//                                 sm:justify-start
//                             "
//                         >


//                             <TabsTrigger
//                                 value="users"
//                                 className="whitespace-nowrap px-4"
//                             >
//                                 Users
//                             </TabsTrigger>

//                             <TabsTrigger
//                                 value="roles"
//                                 className="whitespace-nowrap px-4"
//                             >
//                                 Roles
//                             </TabsTrigger>

//                             <TabsTrigger
//                                 value="phases"
//                                 className="whitespace-nowrap px-4"
//                             >
//                                 Village Assignment
//                             </TabsTrigger>
//                         </TabsList>
//                     </div>

//                     {/* ---------- TAB CONTENT ---------- */}
//                     <div className="mt-4 sm:mt-6">
//                         <TabsContent value="users" className="space-y-4">
//                             <UsersTab />
//                         </TabsContent>

//                         <TabsContent value="roles" className="space-y-4">
//                             <RolesTab />
//                         </TabsContent>

//                         <TabsContent value="phases" className="space-y-4">
//                             <VillageAssignmentTab />
//                         </TabsContent>
//                     </div>
//                 </Tabs>
//             </main>
//         </div>
//     );

// };

// export default UserManagement;


import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";


import UsersTab from "@/components/UserManagement/UserTab";
import RolesTab from "@/components/UserManagement/RoleTab";
import VillageAssignmentTab from "@/components/UserManagement/VillageAssignmnetTab";

/** 🔁 Child name → tab config */
const TAB_CONFIG = {
  "User Creation": {
    value: "users",
    label: "Users",
    component: <UsersTab />,
  },
  "Role Creation": {
    value: "roles",
    label: "Roles",
    component: <RolesTab />,
  },
  "Village Assignment": {
    value: "village",
    label: "Village Assignment",
    component: <VillageAssignmentTab />,
  },
};

const UserManagement = () => {
  const { accessibleRoutes } = useAuth();

  /** 🔍 Get User Management permissions */
  const userMgmt = accessibleRoutes.find(
    (r) => r.name === "User Management"
  );

  /** 🧠 Build allowed tabs dynamically */
  const allowedTabs = useMemo(() => {
    if (!userMgmt || !Array.isArray(userMgmt.children)) return [];

    return userMgmt.children
      .map((child) => TAB_CONFIG[child])
      .filter(Boolean);
  }, [userMgmt]);

  /** 🟢 Default tab = first allowed */
  const defaultTab = allowedTabs[0]?.value;

  return (
    // <div className="min-h-screen bg-background">
    <div className="flex h-screen bg-muted/30 overflow-hidden">

      <Navbar />
      <div className="flex-1 overflow-auto transition-all duration-300">

        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          {/* ---------- PAGE HEADER ---------- */}
          <div className="mb-4 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-semibold text-foreground">
              User Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage users, roles, and village assignments
            </p>
          </div>

          {/* ❌ No permission fallback */}
          {allowedTabs.length === 0 ? (
            <div className="text-center text-muted-foreground mt-20">
              You do not have access to any User Management features.
            </div>
          ) : (
            <Tabs defaultValue={defaultTab} className="w-full">
              {/* ---------- TAB HEADERS ---------- */}
              <div className="sticky top-[64px] z-30 bg-background pb-2">
                <TabsList
                  className="
                  flex w-full gap-2 mb-6
                  overflow-x-auto no-scrollbar
                   sm:grid sm:grid-cols-3
                    sm:flex sm:w-fit
                "
                >
                  {allowedTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="whitespace-nowrap px-4"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* ---------- TAB CONTENT ---------- */}
              <div className="mt-4 sm:mt-6">
                {allowedTabs.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="space-y-4"
                  >
                    {tab.component}
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserManagement;


  //  <div className="absolute top-4 left-4 z-[1000]">

  //                       {/* FILTER ICON BUTTON */}
  //                       <button
  //                           onClick={() => setIsFilterOpen(!isFilterOpen)}
  //                           className="bg-white shadow-md rounded-lg p-2 hover:bg-gray-100 transition"
  //                       >
  //                           <Filter className="h-5 w-5 text-gray-700" />
  //                       </button>

  //                       {/* FILTER PANEL */}
  //                       {isFilterOpen && (
  //                           <div className="mt-2 bg-white shadow-xl rounded-xl p-4 w-[320px] relative">

  //                               {/* CLOSE BUTTON */}
  //                               <button
  //                                   onClick={() => setIsFilterOpen(false)}
  //                                   className="absolute top-2 right-2 text-gray-500 hover:text-black"
  //                               >
  //                                   ✕
  //                               </button>

  //                               <div className="flex flex-col gap-4">

  //                                   {canSeeDistrict && (
  //                                       <div className="flex flex-col">
  //                                           <span className="text-xs mb-1">District</span>
  //                                           <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
  //                                               <SelectTrigger className="h-9">
  //                                                   <SelectValue placeholder="Select district" />
  //                                               </SelectTrigger>
  //                                               <SelectContent>
  //                                                   {districts.map((district) => (
  //                                                       <SelectItem key={district.id} value={district.id}>
  //                                                           {district.name}
  //                                                       </SelectItem>
  //                                                   ))}
  //                                               </SelectContent>
  //                                           </Select>
  //                                       </div>
  //                                   )}

  //                                   {canSeeSubDistrict && (
  //                                       <div className="flex flex-col">
  //                                           <span className="text-xs mb-1">Sub-District</span>
  //                                           <Select
  //                                               value={selectedSubDistrict}
  //                                               onValueChange={setSelectedSubDistrict}
  //                                               disabled={!selectedDistrict && canSeeDistrict}
  //                                           >
  //                                               <SelectTrigger className="h-9">
  //                                                   <SelectValue placeholder="Select sub-district" />
  //                                               </SelectTrigger>
  //                                               <SelectContent>
  //                                                   {subDistricts.map((sub) => (
  //                                                       <SelectItem key={sub.id} value={sub.id}>
  //                                                           {sub.name}
  //                                                       </SelectItem>
  //                                                   ))}
  //                                               </SelectContent>
  //                                           </Select>
  //                                       </div>
  //                                   )}

  //                                   {canSeeVillage && (
  //                                       <div className="flex flex-col">
  //                                           <span className="text-xs mb-1">Village</span>
  //                                           <SearchableDropdown
  //                                               id="village-header"
  //                                               options={villages}
  //                                               label="name"
  //                                               selectedVal={
  //                                                   villages.find((v) => v.id === selectedVillage)?.name || ""
  //                                               }
  //                                               handleChange={(val) => {
  //                                                   const selected = villages.find((v) => v.name === val);
  //                                                   setSelectedVillage(selected ? selected.id : "");
  //                                               }}
  //                                               disabled={canSeeSubDistrict && !selectedSubDistrict}
  //                                           />
  //                                       </div>
  //                                   )}

  //                               </div>
  //                           </div>
  //                       )}
  //                   </div>