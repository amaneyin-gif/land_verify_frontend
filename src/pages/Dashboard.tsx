import { useState, useEffect, useRef, useMemo } from 'react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import StateMap from '@/assets/upMap.png';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { showToast } from '@/components/ui/show-toast';
import { Loader } from '../components/ui/loader';
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import { Input } from '@/components/ui/input';
import { ScrollableTable } from '@/components/ui/scrollable';
let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'
let REACT_APP_BACKEND2 = 'https://79dkd582-3002.inc1.devtunnels.ms/api'

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalVerified: 0,
//     correctMaps: 0,
//     incorrect: 0,
//     geomap: 0
//   });
//   const [recentVillages, setRecentVillages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   // TODO: Fetch actual data from API
//   //   // Mock data for now
//   //   setStats({
//   //     totalVerified: 245,
//   //     correctMaps: 189,
//   //     pending: 56,
//   //   });

//   //   setRecentVillages(
//   //     [
//   //     {
//   //       id: '1',
//   //       villageName: 'Rampur',
//   //       district: 'Agra',
//   //       status: 'correct',
//   //       verifiedAt: '2025-10-10 14:30',
//   //     },
//   //     {
//   //       id: '2',
//   //       villageName: 'Sultanpur',
//   //       district: 'Lucknow',
//   //       status: 'incorrect',
//   //       verifiedAt: '2025-10-10 13:15',
//   //     },
//   //     {
//   //       id: '3',
//   //       villageName: 'Bhimpur',
//   //       district: 'Kanpur',
//   //       status: 'correct',
//   //       verifiedAt: '2025-10-10 12:00',
//   //     },
//   //     {
//   //       id: '4',
//   //       villageName: 'Kishanganj',
//   //       district: 'Meerut',
//   //       status: 'correct',
//   //       verifiedAt: '2025-10-10 11:45',
//   //     },
//   //     {
//   //       id: '5',
//   //       villageName: 'Nandgaon',
//   //       district: 'Mathura',
//   //       status: 'incorrect',
//   //       verifiedAt: '2025-10-10 10:30',
//   //     },
//   //   ]
//   // );
//   // }, []);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${REACT_APP_BACKEND1}/dashboard`);
//         if (!res.ok) throw new Error("Failed to fetch dashboard data");
//         const data = await res.json();

//         // ✅ Populate data from response
//         const dashboard = data.data || {};
//         console.log(dashboard, "__Dashboard")
//         setStats({
//           totalVerified: dashboard.totalVerified || 0,
//           correctMaps: dashboard.correctedMapVillage || 0,
//           incorrect: dashboard.incorrectVerification || 0,
//           geomap: dashboard.geoMappedVillage || 92236
//         });

//         // ✅ Sort by date descending
//         // const recent = (dashboard.recentVerifiedVillages || []).sort(
//         //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         // );
//         setRecentVillages(data.data.recentVerifiedVillages || []);
//         console.log(recentVillages, "__test0")
//         // toast({
//         //   description: "Dashboard data loaded successfully",
//         // });
//         showToast(200, data.message);

//       } catch (error) {
//         console.error(error);
//         // toast({
//         //   variant: "destructive",
//         //   description: "Failed to load dashboard data",
//         // });
//         showToast(500, "Failed to load dashboard data");

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);
//   return (
//     <div className="min-h-screen bg-muted/30">
//       <Navbar />

//       <main className="container mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex items-center justify-center h-[70vh]">
//             <Loader /> {/* 👈 your custom loader component */}
//           </div>
//         ) : (

//           <>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
//               <p className="text-muted-foreground">Overview of village land verification</p>
//             </div>

//             {/* Top Section: Map + KPIs */}
//             <div className="flex flex-col lg:flex-row gap-6 mb-8">
//               {/* Map - Left Side */}
//               <Card className="shadow-soft lg:w-2/3">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Uttar Pradesh Map</CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-0">
//                   <div className="w-full h-[400px] flex items-center justify-center bg-muted/30 rounded-b-lg overflow-hidden">
//                     <img
//                       src={StateMap}
//                       alt="State Map"
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* KPIs - Right Side */}
//               <div className="flex flex-col gap-6 lg:w-1/3">
//                 <StatCard
//                   title="Total Geo Maps Village"
//                   value={stats.geomap}
//                   icon={MapPin}
//                   variant="warning"
//                 />
//                 <StatCard
//                   title="Total Verified Villages"
//                   value={stats.totalVerified}
//                   icon={MapPin}
//                   variant="default"
//                 />
//                 <StatCard
//                   title="Correct Village Maps"
//                   value={stats.correctMaps}
//                   icon={CheckCircle}
//                   variant="success"
//                 />
//                 <StatCard
//                   title="Incorrect Village Maps"
//                   value={stats.incorrect}
//                   icon={Clock}
//                   variant="warning"
//                 />


//               </div>
//             </div>

//             <Card className="shadow-soft">
//               <CardHeader>
//                 <CardTitle className="text-xl">Recent Verifications</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   {/* 🔹 Scrollable container for table rows */}
//                   <div className="max-h-[400px] overflow-y-auto rounded-md">
//                     <Table>
//                       <TableHeader className="sticky top-0 bg-background z-10">
//                         <TableRow>
//                           <TableHead>District</TableHead>
//                           <TableHead>Sub District</TableHead>
//                           <TableHead>Village LGD Code</TableHead>
//                           <TableHead>Village Name</TableHead>
//                           <TableHead>Status</TableHead>
//                           <TableHead>Verified By</TableHead>
//                           <TableHead>Verified At</TableHead>
//                         </TableRow>
//                       </TableHeader>

//                       <TableBody>
//                         {recentVillages.length === 0 ? (
//                           <TableRow>
//                             <TableCell colSpan={5} className="text-center text-muted-foreground">
//                               No recent verifications found
//                             </TableCell>
//                           </TableRow>
//                         ) : (
//                           recentVillages.map((village) => (
//                             <TableRow key={village.village_lgd_code}>
//                               {/* ✅ District Name */}
//                               <TableCell>{village.district_name || "—"}</TableCell>

//                               {/* ✅ Sub District Name */}
//                               <TableCell>{village.sub_district_name || "—"}</TableCell>

//                               {/* ✅ Village LGD Code */}
//                               <TableCell>{village.village_lgd_code}</TableCell>

//                               {/* <TableCell className="font-medium">{village.village_name}</TableCell> */}
//                               <TableCell className="font-medium">
//                                 <Link
//                                   to={`/verify`}
//                                    state={{ villageLgdCode: village.village_lgd_code , villageName:village.village_name}}
//                                   className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
//                                 >
//                                   {village.village_name}
//                                 </Link>
//                               </TableCell>


//                               <TableCell>
//                                 <Badge
//                                   variant={village.status === "correct" ? "default" : "destructive"}
//                                   className={
//                                     village.status === "correct"
//                                       ? "bg-green-100 text-green-700"
//                                       : "bg-red-100 text-red-700"
//                                   }
//                                 >
//                                   {village.status === "correct" ? "Correct" : "Incorrect"}
//                                 </Badge>
//                               </TableCell>
//                               <TableCell>
//                                 {village.verified_by}
//                               </TableCell>
//                               <TableCell className="text-muted-foreground">
//                                 {new Date(village.created_at).toLocaleString("en-IN", {
//                                   dateStyle: "medium",
//                                   timeStyle: "short",
//                                 })}
//                               </TableCell>
//                             </TableRow>
//                           ))
//                         )}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//           </>

//         )}
//       </main>

//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useRef, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, CheckCircle, Clock, ArrowUpDown } from "lucide-react";
// import Navbar from "@/components/Navbar";
// // import Loader from "@/components/Loader";
// import StatCard from "@/components/StatCard";
// import { showToast } from '@/components/ui/show-toast';
// import StateMap from "@/assets/up-map.png";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVerified: 0,
    correctMaps: 0,
    incorrect: 0,
    geomap: 0,
  });
  const [recentVillages, setRecentVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessibleRoutes, setAccessibleRoutes] = useState([]);
  // Search + Sort states
  const searchRef = useRef(null);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('user'))?.token || '';
      try {
        const res = await fetch(`${REACT_APP_BACKEND1}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,   // <-- Send token
          }
        });
        // 👉 HANDLE TOKEN ERRORS (redirect to login)
        if (res.status === 401 || res.status === 403) {
          // Backend says: token invalid / expired
          localStorage.removeItem("user");
          showToast(401, "Session expired. Please login again.");
          window.location.href = "/login";  // redirect
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch dashboard data");

        const data = await res.json();
        const dashboard = data.data || {};

        setStats({
          totalVerified: dashboard.totalVerified || 0,
          correctMaps: dashboard.correctedMapVillage || 0,
          incorrect: dashboard.incorrectVerification || 0,
          geomap: dashboard.geoMappedVillage || 92236,
        });

        const villages = dashboard.recentVerifiedVillages || [];
        setRecentVillages(villages);
        setFilteredVillages(villages);
        showToast(200, data.message);
      } catch (error) {
        console.error(error);
        showToast(500, "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     setLoading(true);

  //     const token = JSON.parse(localStorage.getItem("user"))?.token || "";

  //     try {
  //       // ---------- FETCH DASHBOARD ----------
  //       const res = await fetch(`${REACT_APP_BACKEND1}/dashboard`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         }
  //       });

  //       // Handle expired token
  //       if (res.status === 401 || res.status === 403) {
  //         localStorage.removeItem("user");
  //         showToast(401, "Session expired. Please login again.");
  //         window.location.href = "/login";
  //         return;
  //       }

  //       if (!res.ok) throw new Error("Failed to fetch dashboard data");

  //       const dashboardResponse = await res.json();
  //       const dashboard = dashboardResponse.data || {};

  //       // ---------- FETCH ROUTES ----------
  //       const routesRes = await fetch(`${REACT_APP_BACKEND1}/user/accessible-routes`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         }
  //       });

  //       let routes = [];
  //       if (routesRes.ok) {
  //         const routesData = await routesRes.json();
  //         routes = Array.isArray(routesData.data) ? routesData.data : [];
  //         setAccessibleRoutes(routes);
  //       } else {
  //         console.error("Failed to fetch routes");
  //         setAccessibleRoutes([]);
  //       }

  //       // ---------- SET STATS ----------
  //       setStats({
  //         totalVerified: dashboard.totalVerified || 0,
  //         correctMaps: dashboard.correctedMapVillage || 0,
  //         incorrect: dashboard.incorrectVerification || 0,
  //         geomap: dashboard.geoMappedVillage || 0,
  //       });

  //       const villages = dashboard.recentVerifiedVillages || [];
  //       setRecentVillages(villages);
  //       setFilteredVillages(villages);

  //       showToast(200, dashboardResponse.message);

  //     } catch (error) {
  //       console.error(error);
  //       showToast(500, "Failed to load dashboard data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);


  // 🔹 Search handler (no value/onChange)
  const handleSearch = () => {
    const query = searchRef.current?.value.toLowerCase() || "";
    const filtered = recentVillages.filter((v) =>
      v.village_lgd_code?.toString().toLowerCase().includes(query)
    );
    setFilteredVillages(filtered);
  };

  // 🔹 Sort handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  // 🔹 Apply sorting
  const sortedVillages = useMemo(() => {
    if (!sortConfig.key) return filteredVillages;

    return [...filteredVillages].sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
    });
  }, [filteredVillages, sortConfig]);

  return (

    // <div className="min-h-screen bg-muted/30">
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      <Navbar />
      {/* <div style={{ border: "1px solid red" }}> */}
      <div className="flex-1 overflow-auto transition-all duration-300">

        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-[70vh]">
              <Loader />
            </div>
          ) : (
            <>
              {/* Top Heading */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Overview of village land verification</p>
              </div>

              {/* Map + Stats */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                {/* Map */}
                <Card className="shadow-soft lg:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-xl">Uttar Pradesh Map</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="w-full h-[400px] flex items-center justify-center bg-muted/30 rounded-b-lg overflow-hidden">
                      <img
                        src={StateMap}
                        alt="State Map"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="flex flex-col gap-6 lg:w-1/3">
                  <StatCard
                    title="Total Geo Maps Village"
                    value={stats.geomap}
                    icon={MapPin}
                    variant="warning"
                  />
                  <StatCard
                    title="Total Verified Villages"
                    value={stats.totalVerified}
                    icon={MapPin}
                    variant="default"
                  />
                  <StatCard
                    title="Correct Village Maps"
                    value={stats.correctMaps}
                    icon={CheckCircle}
                    variant="success"
                  />
                  <StatCard
                    title="Incorrect Village Maps"
                    value={stats.incorrect}
                    icon={Clock}
                    variant="warning"
                  />
                </div>
              </div>

              {/* Recent Verifications */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-xl">Recent Verifications</CardTitle>
                  <div className="flex items-center gap-2">
                    {/* <input
                    type="text"
                    ref={searchRef}
                    onInput={handleSearch}
                    placeholder="Search by Village LGD Code..."
                    className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-hsl(142 76% 28%) -500"
                  /> */}
                    {/* <input
                    type="text"
                    ref={searchRef}
                    onInput={handleSearch}
                    placeholder="Search by Village LGD Code..."
                    className="w-72 border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,28%)]"
                  /> */}
                    {/* <input
                    type="text"
                    ref={searchRef}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6); // allow only digits, max length 6
                      handleSearch(e);
                    }}
                    placeholder="Search by LGD Code..."
                    className="w-72 border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,28%)]"
                  /> */}
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      ref={searchRef}
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        // keep only digits, max 6
                        const sanitized = input.value.replace(/\D/g, "").slice(0, 6);
                        // update actual input shown to user
                        input.value = sanitized;
                        // call your existing handler which reads from searchRef.current
                        handleSearch();
                      }}
                      placeholder="Search by Village LGD Code..."
                      maxLength={6}
                      className="w-60 border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,36%)]"
                    />
                  </div>
                </CardHeader>

                {/* <CardContent> */}
                <ScrollableTable >

                  <div className="overflow-x-auto">
                    <Table className="table-fixed w-full">
                      <TableHeader className="bg-background sticky top-0 z-20">
                        <TableRow>
                          {[
                            { label: "District", key: "district_name" },
                            { label: "Sub District", key: "sub_district_name" },
                            { label: "Village LGD Code", key: "village_lgd_code" },
                            { label: "Village Name", key: "village_name" },
                            { label: "Status", key: "status" },
                            { label: "Verified By", key: "verified_by" },
                            { label: "Verified At", key: "created_at" },
                          ].map((col) => (
                            <TableHead
                              key={col.key}
                              onClick={() => handleSort(col.key)}
                              className="cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-1">
                                {col.label}
                                <ArrowUpDown className="h-4 w-4 opacity-50" />
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                    </Table>
                    <div className="max-h-[400px] overflow-y-auto rounded-md">
                      <Table className="table-fixed w-full">

                        <TableBody>
                          {sortedVillages.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={7}
                                className="text-center text-muted-foreground"
                              >
                                No recent verifications found
                              </TableCell>
                            </TableRow>
                          ) : (
                            sortedVillages.map((village) => (
                              <TableRow key={village.village_lgd_code}>
                                <TableCell>{village.district_name || "—"}</TableCell>
                                <TableCell>{village.sub_district_name || "—"}</TableCell>
                                <TableCell>{village.village_lgd_code}</TableCell>
                                <TableCell className="font-medium">
                                  <Link
                                    to={`/verify`}
                                    state={{
                                      villageLgdCode: village.village_lgd_code,
                                      villageName: village.village_name,
                                    }}
                                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                                  >
                                    {village.village_name}
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      village.status === "correct"
                                        ? "default"
                                        : "destructive"
                                    }
                                    className={
                                      village.status === "correct"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }
                                  >
                                    {village.status === "correct"
                                      ? "Correct"
                                      : "Incorrect"}
                                  </Badge>
                                </TableCell>
                                <TableCell>{village.verified_by || "—"}</TableCell>
                                <TableCell className="text-muted-foreground">
                                  {new Date(village.created_at).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </ScrollableTable>
                {/* </CardContent> */}
              </Card>
            </>
          )}
        </main>
      </div>

      {/* </div> */}
    </div>

  );
};

export default Dashboard;