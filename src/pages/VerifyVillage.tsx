import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VillageMap from '@/components/VillageMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Loader } from '../components/ui/loader'
import { showToast } from '@/components/ui/show-toast';
import { useLocation, useNavigate } from "react-router-dom";

const incorrectReasons = [
  'Boundary mismatch',
  'Incorrect coordinates',
  'Missing plot data',
  'Overlapping areas',
  'Other discrepancy',
];
let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'
let REACT_APP_BACKEND2 = 'https://79dkd582-3002.inc1.devtunnels.ms/api'

// const VerifyVillage = () => {
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
//   const [selectedVillage, setSelectedVillage] = useState('');
//   const [districts, setDistricts] = useState([]);
//   const [subDistricts, setSubDistricts] = useState([]);
//   const [villages, setVillages] = useState([]);
//   const [villageData, setVillageData] = useState(null);
//   const [isVerified, setIsVerified] = useState(false);
//   const [showReasonSelect, setShowReasonSelect] = useState(false);
//   const [selectedReason, setSelectedReason] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(false);
//   //   const [isVerified, setIsVerified] = useState<boolean | null>(null);
//   // const [verifiedAt, setVerifiedAt] = useState<string | null>(null);

//   const { toast } = useToast();

//   // useEffect(() => {
//   //   fetchDistricts();

//   // }, [toast]);

//   // const fetchDistricts = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const res = await fetch(`${REACT_APP_BACKEND2}/districts`);
//   //     if (!res.ok) throw new Error('Failed to fetch districts');
//   //     const data = await res.json();

//   //     // Assuming backend response is: { districts: [ { district_lgd_code, district_name } ] }
//   //     setDistricts(
//   //       data.districts.map((d) => ({
//   //         id: d.district_lgd_code,
//   //         name: d.district_name,
//   //         lgdCode: d.district_lgd_code,
//   //       }))
//   //     );
//   //   } catch (error) {
//   //     console.error('Error loading districts:', error);
//   //   } finally {
//   //     setLoading(false); // hide loader
//   //   }
//   // };

//   const fetchDistricts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${REACT_APP_BACKEND2}/districts`);
//       // console.log(,"__response from here ")
//       // if (!res.ok) throw new Error('Failed to fetch districts');
//       if (!res.ok) showToast(500, "Failed to fetch district data.");
//       const data = await res.json();
//       // console.log(data.data.message,"__Data")

//       setDistricts(
//         data.data.map((d) => ({
//           id: d.district_lgd_code,
//           name: d.district_name,
//           lgdCode: d.district_lgd_code,
//         }))
//       );
//     } catch (error) {
//       console.error('Error loading districts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDistricts();
//   }, []);

//   useEffect(() => {
//     if (!selectedDistrict) return;
//     setLoading(true);

//     const fetchSubDistricts = async () => {
//       try {
//         const res = await fetch(`${REACT_APP_BACKEND2}/subdistricts/${selectedDistrict}`);
//         // if (!res.ok) throw new Error('Failed to fetch sub-districts');
//         if (!res.ok) throw showToast(500, "Failed to fetch sub-districts.");
//         const data = await res.json();

//         setSubDistricts(
//           data.data.map((s) => ({
//             id: s.sub_district_lgd_code,
//             name: s.sub_district_name,
//             lgdCode: s.sub_district_lgd_code,
//           }))
//         );

//         setSelectedSubDistrict('');
//         setSelectedVillage('');
//         setVillages([]);
//       } catch (error) {
//         console.error('Error loading sub-districts:', error);
//         showToast(500, "Failed to load sub-districts.");

//       } finally {
//         setLoading(false); // hide loader
//       }
//     };

//     fetchSubDistricts();
//   }, [selectedDistrict]);

//   // 🏘 Fetch Villages when a Sub-District is selected
//   useEffect(() => {
//     if (!selectedSubDistrict) return;
//     setLoading(true);

//     const fetchVillages = async () => {
//       try {
//         const res = await fetch(`${REACT_APP_BACKEND2}/villages/${selectedSubDistrict}`);
//         // if (!res.ok) throw new Error('Failed to fetch villages');
//         if (!res.ok) throw showToast(500, "Failed to fetch villages.");

//         const data = await res.json();

//         setVillages(
//           data.data.map((v) => ({
//             id: v.village_lgd_code,
//             name: v.village_name,
//             lgdCode: v.village_lgd_code,
//           }))
//         );

//         setSelectedVillage('');
//       } catch (error) {
//         console.error('Error loading villages:', error);
//        showToast(500, "Failed to load villages.");

//       } finally {
//         setLoading(false); // hide loader
//       }
//     };

//     fetchVillages();
//   }, [selectedSubDistrict]);

//   useEffect(() => {
//     if (selectedVillage) {
//       // setIsVerified(false);   // reset verification for new village
//       // setVillageData(null);
//       checkIfVerified();
//       fetchVillageData();
//     }
//   }, [selectedVillage]);

//   const checkIfVerified = async () => {
//     // TODO: Replace with actual API call
//     setLoading(true);
//     let data;
//     try {
//       const response = await fetch(`${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`).catch(
//         () => ({
//           ok: true,
//           json: async () => ({ verified: false }),
//         })
//       );
//       data = await response.json();
//       console.log(data, "__data from verified")
//       if (!data?.data) {
//         console.warn("No verification data found, keeping loader active...");
//         return; // ❌ exit before finally → loader remains active
//       }
//       setIsVerified(data.data.verified);
//       if (data.data.verified == true) {
//          showToast(200, data.message);
//       } else if (data?.data?.verified === false) {
//         showToast(200, data.message);
//       }
//     } catch (error) {
//       console.error('Error checking verification:', error);
//     } finally {
//       if (data?.data) {
//         setLoading(false);
//       }
//     }
//   };

//   const fetchVillageData = async () => {
//     if (!selectedVillage) return;
//     setLoading(true);

//     try {
//       const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${selectedVillage}`);
//       if (!res.ok) throw new Error("Failed to fetch village data");
//       const data = await res.json();

//       const mappedData = {
//         id: selectedVillage,
//         name: villages.find((v) => v.id === selectedVillage)?.name || '',
//         lgdCode: villages.find((v) => v.id === selectedVillage)?.lgdCode || '',
//         plots: data.data.plots, // pass directly, VillageMap can use surveyNumber & geometry
//       };
//       console.log(mappedData, "__mappde234")
//       setVillageData(mappedData);
//     } catch (error) {
//       console.error("Error fetching village data:", error);
//     } finally {
//       setLoading(false); // hide loader
//     }
//   };


//   const handleCorrect = async () => {
//     setIsSubmitting(true);
//     try {
//       console.log(villageData, "__villageData")
//       // TODO: Replace with actual API call
//       let response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           village_lgd_code: villageData?.lgdCode,
//           village_name: villageData.name,
//           status: 'correct',
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to submit verification');

//       const data = await response.json(); // ✅ parse JSON
//      showToast(response.status, data.message || "Operation completed");
//       resetForm();
//     } catch (error) {
//       showToast(500, "Failed to submit verification.");

//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleIncorrect = () => {
//     setShowReasonSelect(true);
//   };

//   const handleSubmitIncorrect = async () => {
//     if (!selectedReason) {
//       showToast(400, "Please select a reason.");

//       return;
//     }

//     setIsSubmitting(true);
//     // try {
//     //   // TODO: Replace with actual API call
//     //   await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({
//     //       village_lgd_code: villageData?.lgdCode,
//     //       village_name: villageData.name,
//     //       status: 'incorrect',
//     //       remarks: selectedReason,
//     //     }),
//     //   }).catch(() => ({ ok: true }));

//     //   toast({
//     //     title: 'Success',
//     //     description: 'Village marked as incorrect with reason',
//     //   });

//     //   resetForm();
//     // } catch (error) {
//     //   toast({
//     //     title: 'Error',
//     //     description: 'Failed to submit verification',
//     //     variant: 'destructive',
//     //   });
//     // } finally {
//     //   setIsSubmitting(false);
//     // }

//     try {
//       // POST request to mark village as incorrect
//       const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           village_lgd_code: villageData?.lgdCode,
//           village_name: villageData?.name,
//           status: 'incorrect',
//           remarks: selectedReason,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to submit verification');

//       const data = await response.json(); // ✅ parse JSON
//       showToast(200, data.message);
//       resetForm();
//     } catch (error) {
//       console.error('Error verifying village:', error);
//       showToast(500, "Failed to submit verification.");

//     }

//   };

//   const resetForm = () => {
//     setSelectedDistrict('');
//     setSelectedSubDistrict('');
//     setSelectedVillage('');
//     setVillageData(null);
//     setShowReasonSelect(false);
//     setSelectedReason('');
//     setIsVerified(false);
//   };

//   return (
//     <div className="min-h-screen bg-muted/30">
//       <Navbar />

//       <main className="container mx-auto px-4 py-8">
//         {loading && <Loader />}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">Verify Village Land</h1>
//           <p className="text-muted-foreground">
//             Select location and verify village land boundaries
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Selection Panel */}
//           <Card className="lg:col-span-1 shadow-soft h-fit">
//             <CardHeader>
//               <CardTitle>Select Location</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="district">District</Label>
//                 <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
//                   <SelectTrigger id="district">
//                     <SelectValue placeholder="Select district" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-popover">
//                     {districts.map((district) => (
//                       <SelectItem key={district.id} value={district.id}>
//                         {district.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="subdistrict">Sub-District</Label>
//                 <Select
//                   value={selectedSubDistrict}
//                   onValueChange={setSelectedSubDistrict}
//                   disabled={!selectedDistrict}
//                 >
//                   <SelectTrigger id="subdistrict">
//                     <SelectValue placeholder="Select sub-district" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-popover">
//                     {subDistricts.map((subDistrict) => (
//                       <SelectItem key={subDistrict.id} value={subDistrict.id}>
//                         {subDistrict.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="village">Village</Label>
//                 <Select
//                   value={selectedVillage}
//                   onValueChange={setSelectedVillage}
//                   disabled={!selectedSubDistrict}
//                 >
//                   <SelectTrigger id="village">
//                     <SelectValue placeholder="Select village" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-popover">
//                     {villages.map((village) => (
//                       <SelectItem key={village.id} value={village.id}>
//                         {village.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {villageData && !isVerified && (
//                 <div className="pt-4 space-y-3">
//                   {!showReasonSelect ? (
//                     <div className="flex gap-2">
//                       <Button
//                         onClick={handleCorrect}
//                         disabled={isSubmitting}
//                         className="flex-1 bg-success hover:bg-success/90"
//                       >
//                         <CheckCircle className="h-4 w-4 mr-2" />
//                         Correct
//                       </Button>
//                       <Button
//                         onClick={handleIncorrect}
//                         disabled={isSubmitting}
//                         variant="destructive"
//                         className="flex-1"
//                       >
//                         <XCircle className="h-4 w-4 mr-2" />
//                         Incorrect
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <div className="space-y-2">
//                         <Label htmlFor="reason">Reason for Incorrect</Label>
//                         <Select value={selectedReason} onValueChange={setSelectedReason}>
//                           <SelectTrigger id="reason">
//                             <SelectValue placeholder="Select reason" />
//                           </SelectTrigger>
//                           <SelectContent className="bg-popover">
//                             {incorrectReasons.map((reason) => (
//                               <SelectItem key={reason} value={reason}>
//                                 {reason}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button
//                           onClick={handleSubmitIncorrect}
//                           disabled={isSubmitting || !selectedReason}
//                           className="flex-1"
//                         >
//                           Submit
//                         </Button>
//                         <Button
//                           onClick={() => {
//                             setShowReasonSelect(false);
//                             setSelectedReason('');
//                           }}
//                           variant="outline"
//                           disabled={isSubmitting}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Map Panel */}
//           <Card className="lg:col-span-2 shadow-soft">
//             <CardHeader>
//               <CardTitle>Village Map</CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <VillageMap villageData={villageData} />
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

const VerifyVillage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [villageData, setVillageData] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showReasonSelect, setShowReasonSelect] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const initialVillageCode = location.state?.villageLgdCode;
  const village_name = location.state?.village_name;
  const { toast } = useToast();


  // only if redirected from dashboard
  useEffect(() => {
    if (!initialVillageCode) return;
    let isMounted = true;
    const fetchVillageFromDashboard = async () => {
      setLoading(true);
      try {
        const checkRes = await fetch(`${REACT_APP_BACKEND1}/check-verification/${initialVillageCode}`);
        const checkData = await checkRes.json();
        if (checkData?.data?.verified) setIsVerified(true);

        // ✅ Fetch actual village data for plotting
        const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${initialVillageCode}`);
        if (!res.ok) throw new Error("Failed to fetch village data");
        const data = await res.json();

        const mappedData = {
          id: initialVillageCode,
          name: `Village ${initialVillageCode}`,
          lgdCode: initialVillageCode,
          plots: data.data.plots,
        };
        setVillageData(mappedData);

        setVerificationStatus(
          checkData?.data
            ? {
              name: `${checkData.data.village_name || "Unknown Village"}, ${data?.data?.lgdCode || ""}`,
              status: checkData.data.verified || "Not Verified",
            }
            : null
        );

      } catch (err) {
        console.error('Failed to load village data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVillageFromDashboard();

    return () => {
      isMounted = false;
    };
  }, [initialVillageCode]);

  useEffect(() => {
    if (location.state) {
      // Replace same route but without state
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${REACT_APP_BACKEND2}/districts`);
      if (!res.ok) showToast(500, "Failed to fetch district data.");
      const data = await res.json();

      setDistricts(data.data.map(d => ({
        id: d.district_lgd_code,
        name: d.district_name,
        lgdCode: d.district_lgd_code
      })));

    } catch (error) {
      console.error('Error loading districts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  // -------------------- Fetch Sub-Districts --------------------
  useEffect(() => {
    if (!selectedDistrict) return;
    setLoading(true);

    const fetchSubDistricts = async () => {
      try {
        const res = await fetch(`${REACT_APP_BACKEND2}/subdistricts/${selectedDistrict}`);
        if (!res.ok) throw showToast(500, "Failed to fetch sub-districts.");
        const data = await res.json();
        setSubDistricts(data.data.map(s => ({
          id: s.sub_district_lgd_code,
          name: s.sub_district_name,
          lgdCode: s.sub_district_lgd_code
        })));
        // Reset villages only
        setSelectedSubDistrict('');
        setSelectedVillage('');
        setVillageData(null);
        setVerificationStatus(null);
        setVillages([]);
      } catch (error) {
        console.error(error);
        showToast(500, "Failed to load sub-districts.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubDistricts();
  }, [selectedDistrict]);

  // -------------------- Fetch Villages --------------------
  useEffect(() => {
    if (!selectedSubDistrict) return;
    setLoading(true);

    const fetchVillages = async () => {
      try {
        const res = await fetch(`${REACT_APP_BACKEND2}/villages/${selectedSubDistrict}`);
        if (!res.ok) throw showToast(500, "Failed to fetch villages.");
        const data = await res.json();
        setVillages(data.data.map(v => ({
          id: v.village_lgd_code,
          name: v.village_name,
          lgdCode: v.village_lgd_code
        })));
        setSelectedVillage('');
      } catch (error) {
        console.error(error);
        showToast(500, "Failed to load villages.");
      } finally {
        setLoading(false);
      }
    };

    fetchVillages();
  }, [selectedSubDistrict]);

  // -------------------- When Village Changes --------------------
  useEffect(() => {
    if (!selectedVillage) return;

    // Reset village-related states
    setShowReasonSelect(false);
    setSelectedReason('');
    setIsVerified(false);
    setVillageData(null);

    checkIfVerified();
    fetchVillageData();
    setVerificationStatus(null);
  }, [selectedVillage]);

  // -------------------- Check Verification --------------------
  const checkIfVerified = async () => {
    setLoading(true);
    let data;
    try {
      const response = await fetch(`${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`).catch(
        () => ({ ok: true, json: async () => ({ verified: false }) })
      );
      data = await response.json();
      console.log(data.data, "__data from response ")
      if (!data?.data) {
        setVerificationStatus({
          // name: "Unknown Village",
          status: "Not Verified",
        });
        setIsVerified(false);
        return;
      };
      if (data?.data?.verified) setIsVerified(true);
      console.log(verificationStatus, "__123verificationStatus")
      setVerificationStatus(
        data?.data
          ? {
            name: `${data.data.village_name || "Unknown Village"}, ${data?.data?.village_lgd_code || ""}`,
            status: data.data.verified || "Not Verified",
          }
          : {
            status: "Not Verified"
          }
      );
      showToast(200, data.message);
    } catch (error) {
      console.error(error);
    }
    // finally {
    //   if (data?.data) setLoading(false);
    // }
  };

  // -------------------- Fetch Village Data --------------------
  const fetchVillageData = async () => {
    if (!selectedVillage) return;
    setLoading(true);
    try {
      const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${selectedVillage}`);
      if (!res.ok) throw new Error("Failed to fetch village data");
      const data = await res.json();
      const mappedData = {
        id: selectedVillage,
        name: villages.find(v => v.id === selectedVillage)?.name || '',
        lgdCode: villages.find(v => v.id === selectedVillage)?.lgdCode || '',
        plots: data.data.plots,
      };
      setVillageData(mappedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Reset Village Only --------------------
  const resetVillage = () => {
    setSelectedVillage('');
    setVillageData(null);
    setIsVerified(false);
    setShowReasonSelect(false);
    setSelectedReason('');
  };

  // -------------------- Handle Correct --------------------
  const handleCorrect = async () => {
    setIsSubmitting(true);
    try {
      const districtObj = districts.find(d => d.id === selectedDistrict);
      const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
      const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // village_lgd_code: villageData?.lgdCode,
          // district_lgd_code: " ",
          // district_name: "",
          // village_name: villageData.name,
          // status: 'correct',
          village_lgd_code: villageData?.lgdCode,
          village_name: villageData?.name,
          district_lgd_code: districtObj?.lgdCode || "",
          district_name: districtObj?.name || "",
          sub_district_lgd_code: subDistrictObj?.lgdCode || "",
          sub_district_name: subDistrictObj?.name || "",
          status: 'correct',
        }),
      });
      if (!response.ok) throw new Error('Failed to submit verification');
      const data = await response.json();
      showToast(response.status, data.message || "Operation completed");
      resetVillage();
    } catch (error) {
      showToast(500, "Failed to submit verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------- Handle Incorrect --------------------
  const handleIncorrect = () => setShowReasonSelect(true);

  const handleSubmitIncorrect = async () => {
    if (!selectedReason) return showToast(400, "Please select a reason.");
    setIsSubmitting(true);
    try {
      const districtObj = districts.find(d => d.id === selectedDistrict);
      const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
      const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // village_lgd_code: villageData?.lgdCode,
          // village_name: villageData?.name,
          // status: 'incorrect',
          // remarks: selectedReason,
          village_lgd_code: villageData?.lgdCode,
          village_name: villageData?.name,
          district_lgd_code: districtObj?.lgdCode || "",
          district_name: districtObj?.name || "",
          sub_district_lgd_code: subDistrictObj?.lgdCode || "",
          sub_district_name: subDistrictObj?.name || "",
          status: 'incorrect',
          remarks: selectedReason,
        }),
      });
      if (!response.ok) throw new Error('Failed to submit verification');
      const data = await response.json();
      showToast(200, data.message);
      resetVillage();
    } catch (error) {
      console.error(error);
      showToast(500, "Failed to submit verification.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {loading && <Loader />}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Village Land</h1>
          <p className="text-muted-foreground">
            Select location and verify village land boundaries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selection Panel */}
          <Card className="lg:col-span-1 shadow-soft h-fit">
            <CardHeader>
              <CardTitle>Select Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdistrict">Sub-District</Label>
                <Select
                  value={selectedSubDistrict}
                  onValueChange={setSelectedSubDistrict}
                  disabled={!selectedDistrict}
                >
                  <SelectTrigger id="subdistrict">
                    <SelectValue placeholder="Select sub-district" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {subDistricts.map((subDistrict) => (
                      <SelectItem key={subDistrict.id} value={subDistrict.id}>
                        {subDistrict.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="village">Village</Label>
                <Select
                  value={selectedVillage}
                  onValueChange={setSelectedVillage}
                  disabled={!selectedSubDistrict}
                >
                  <SelectTrigger id="village">
                    <SelectValue placeholder="Select village" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {villages.map((village) => (
                      <SelectItem key={village.id} value={village.id}>
                        {village.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {villageData && !isVerified && (
                <div className="pt-4 space-y-3">
                  {!showReasonSelect ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCorrect}
                        disabled={isSubmitting}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Correct
                      </Button>
                      <Button
                        onClick={handleIncorrect}
                        disabled={isSubmitting}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Incorrect
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Incorrect</Label>
                        <Select value={selectedReason} onValueChange={setSelectedReason}>
                          <SelectTrigger id="reason">
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {incorrectReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSubmitIncorrect}
                          disabled={isSubmitting || !selectedReason}
                          className="flex-1"
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={() => {
                            setShowReasonSelect(false);
                            setSelectedReason('');
                          }}
                          variant="outline"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Panel */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>

              <CardTitle className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span>Village Map</span>
                  {verificationStatus?.name && (
                    <span className="text-sm text-muted-foreground font-normal">
                      – {verificationStatus.name.trim() || "Unknown Village"}
                    </span>
                  )}
                </div>

                {verificationStatus?.status === "correct" ? (
                  // <span className="text-green-600 font-bold text-lg">✔ Correct</span>
                  <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Correct</span>
                  </div>
                ) : verificationStatus?.status === "incorrect" ? (
                  // <span className="text-red-600 font-bold text-lg">✖ Incorrect</span>
                  <div className="flex items-center gap-1 text-red-600 font-bold text-lg">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>Incorrect</span>
                  </div>
                ) : verificationStatus?.status === "Not Verified" ? (
                  // <span className="text-gray-500 italic text-lg">Not Verified</span>
                  <div className="flex items-center gap-1 text-gray-600 font-bold text-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span>Not Verified</span>
                  </div>
                ) : <div className="flex items-center gap-1 text-gray-600 font-bold text-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span>Select Village</span>
                </div>
                }
              </CardTitle>

            </CardHeader>
            <CardContent className="p-0">
              <VillageMap villageData={villageData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VerifyVillage;