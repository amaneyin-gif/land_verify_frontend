import { useState, useEffect, useRef } from 'react';
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
import { AlertCircle, Car, CheckCircle, XCircle } from 'lucide-react';
import { Loader } from '../components/ui/loader'
import { showToast } from '@/components/ui/show-toast';
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown } from 'lucide-react';
import SearchableDropdown from '@/components/SearchableDropdown';


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
  const [villagePlotCount, setVillagePlotCount] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(10); // 3 minutes = 180s
  const [timerActive, setTimerActive] = useState(false);
  const [feedback, setFeedback] = useState(null); // "correct" | "incorrect"
  const [verifiedPlots, setVerifiedPlots] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const initialVillageCode = location.state?.villageLgdCode;
  const village_name = location.state?.village_name;
  const { toast } = useToast();
  const token = JSON.parse(localStorage.getItem('user'))?.token || '';

  // only if redirected from dashboard
  useEffect(() => {
    if (!initialVillageCode) return;
    let isMounted = true;
    const fetchVillageFromDashboard = async () => {
      setLoading(true);
      try {
        const checkRes = await fetch(`${REACT_APP_BACKEND1}/check-verification/${initialVillageCode}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,   // <-- Send token
          }
        });
        const checkData = await checkRes.json();
        if (checkData?.data?.verified) setIsVerified(true);

        // ✅ Fetch actual village data for plotting
        const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${initialVillageCode}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,   // <-- Send token
          }
        });
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
        setCurrentStep(0)

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
  console.log(villageData, "__villageData from here ")

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
      setVillageData(null); // reset village data

    } catch (error) {
      console.error('Error loading districts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts();
    resetVillage();
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
        setCurrentStep(1);
        setTimer(30);
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
          name: `${v.village_name} (${v.village_lgd_code})`,
          lgdCode: v.village_lgd_code
        })));
        setSelectedVillage('');
        setCurrentStep(1);
        // setTimer(30);
        resetVillage();
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
    setCurrentStep(1);
    setTimer(30);

  }, [selectedVillage]);

  // -------------------- Check Verification --------------------
  const checkIfVerified = async () => {
    setLoading(true);
    let data;
    try {
      const response = await fetch(`${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   // <-- Send token
        }
      }).catch(
        () => ({ ok: true, json: async () => ({ verified: false }) })
      );
      data = await response.json();
      if (!data.data) {
        setVerificationStatus({
          // name: "Unknown Village",
          status: "Not Verified",
        });
        setIsVerified(false);

        return;
      };
      if (data?.data?.verified) setIsVerified(true);

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
      if (isVerified) setCurrentStep(0)

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
      const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${selectedVillage}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   // <-- Send token
        }
      });
      if (!res.ok) throw new Error("Failed to fetch village data");
      const data = await res.json();
      console.log(data, "__village data from here_1")
      const mappedData = {
        id: selectedVillage,
        name: villages.find(v => v.id === selectedVillage)?.name || '',
        lgdCode: villages.find(v => v.id === selectedVillage)?.lgdCode || '',
        plots: data.data.plots,
        villageBoundary: data.data.villageBoundary, // full geometry
        villageBoundary2: data.data.villageBoundary2, // full geometry source 2
        AiPLots: data.data.villagePlots
      };

      // const res2 = await fetch(`${REACT_APP_BACKEND1}/check-plot-count/${selectedVillage}`);
      // if (!res.ok) throw new Error("Failed to fetch plot count");
      // const data2 = await res2.json();
      // console.log(data2, "__data2 from plot count")
      // const plotCount = {
      //   totalPlots: data2.data.total_plots,
      //   verifiedPlots: data2.data.verified_plots,
      //   mandatoryPlots: data2.data.mandatory_plots,
      // }
      fetchPlotCount();
      setVillageData(mappedData);
      // setVillagePlotCount(plotCount)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // -------------------- Fetch Plot Count --------------------

  const fetchPlotCount = async () => {
    if (!selectedVillage) return;
    setLoading(true);
    try {
      const res2 = await fetch(`${REACT_APP_BACKEND1}/check-plot-count/${selectedVillage}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   // <-- Send token
        }
      });
      if (!res2.ok) throw new Error("Failed to fetch plot count");
      const data2 = await res2.json();
      const plotCount = {
        totalPlots: data2.data.total_plots,
        verifiedPlots: data2.data.verified_plots,
        mandatoryPlots: data2.data.mandatory_plots,
      }
      setVillagePlotCount(plotCount)
      setVerifiedPlots(data2.data.verifiedPlotCount || 0);
      if (data2.data.verifiedPlotCount >= 5 && verificationStatus.status == 'Not Verified') {
        setCurrentStep(4);
        setTimer(30);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  // -------------------- Reset Village Only --------------------
  const resetVillage = () => {
    setSelectedVillage('');
    setVillageData(null);
    setIsVerified(false);
    setShowReasonSelect(false);
    setSelectedReason('');
    setTimer(30);
  };

  // -------------------- Handle Correct --------------------
  const handleCorrect = async () => {
    setIsSubmitting(true);
    try {
      const districtObj = districts.find(d => d.id === selectedDistrict);
      const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
      const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,   // <-- Send token

        },
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
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`   // <-- Send token
        },
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
  useEffect(() => {
    if (isVerified) {
      setCurrentStep(0);
    }
  }, [isVerified]);


  // handle timer countdown
  useEffect(() => {
    if (!timerActive || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handlePlotVerification = async (plotId) => {
    try {
      const res = await fetch(`${REACT_APP_BACKEND1}/verify-plots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   // <-- Send token
        },
        body: JSON.stringify({
          surveyNumber: plotId.surveyNumber,
          villageLgdCode: villageData?.lgdCode,
          villageName: villageData?.name,
          // subDistrictName: subDistricts.includes(selectedSubDistrict),
          subDistrictName: subDistricts.find(sub => sub.lgdCode === selectedSubDistrict)?.name || "",
          districtName: districts.find(dist => dist.lgdCode === selectedDistrict)?.name || "",
          districtLgdCode: selectedDistrict,
          subDistrictLgdCode: selectedSubDistrict,
          status: feedback
        }),
      });
      const data = await res.json();
      // setVerifiedPlots((prev) => prev + 1);
      // toast({ description: `Plot ${plotId} verified` });
      showToast(200, `Plot ${plotId.surveyNumber} verified`);
      fetchPlotCount();

    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalSubmit = async () => {
    if (verifiedPlots < (villagePlotCount?.mandatoryPlots || 5)) {
      toast({ variant: "destructive", description: "Verify all required plots first." });
      return;
    }
    try {

      const districtObj = districts.find(d => d.id === selectedDistrict);
      const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
      const res = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   // <-- Send token
        },
        // body: JSON.stringify({
        //   village_lgd_code: villageData?.lgdCode,
        //   verified_plots: verifiedPlots,
        // }),
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
          status: feedback,
        }),
      });
      const data = await res.json();
      // toast({ description: data.data.message });
      showToast(200, data.message);
      setCurrentStep(1);
      resetVillage();

    } catch (err) {
      console.error(err);
    }
  };
  // step-based rendering
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            {/* <h2 className="text-lg font-semibold mb-2">Village Verification Status</h2> */}

            {/* {verificationStatus?.status === "correct" ? (
              <p className="text-green-600 font-medium">
                <CheckCircle className="mr-2" /> This village has already been verified as <strong>Correct</strong>.
              </p>
            ) : verificationStatus?.status === "incorrect" ? (
              <p className="text-red-600 font-medium">
                <XCircle className="mr-2" /> This village has already been verified as <strong>Incorrect</strong>.
              </p>
            ) : (
              <p className="text-gray-600">
                ℹ️ This village has not been verified yet. Please start the survey process.
              </p>
            )} */}
            {verificationStatus?.status === "correct" ? (
              <p className="flex items-center text-green-600 font-medium">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>
                  This village has already been verified as <strong>Correct</strong>.
                </span>
              </p>
            ) : verificationStatus?.status === "incorrect" ? (
              <p className="flex items-center text-red-600 font-medium">
                <XCircle className="mr-2 h-5 w-5" />
                <span>
                  This village has already been verified as <strong>Incorrect</strong>.
                </span>
              </p>
            ) : null}



            {/* <div className="mt-4">
            <Button
              onClick={() => setCurrentStep(1)}
              disabled={!selectedVillage}
              className={!selectedVillage ? "opacity-50 cursor-not-allowed" : ""}
            >
              {verificationStatus?.status ? "Recheck / View Survey" : "Start Survey"}
            </Button>
          </div> */}
          </>
        );

      case 1:
        return (
          <>
            <p>To verify the village map, click on the button below to begin.</p>
            {/* <Button onClick={() => { setCurrentStep(2); setTimerActive(true); }}>Next</Button> */}
            <Button
              onClick={() => { setCurrentStep(2); setTimerActive(true); }}
              // disabled={!selectedVillage || verificationStatus?.status === "correct" || verificationStatus?.status === "incorrect" } // 🔹 disable until a village is selected
              // className={!selectedVillage ? "opacity-50 cursor-not-allowed" : ""}
              disabled={
                !selectedVillage || (
                  verificationStatus?.status === "correct" ||
                  verificationStatus?.status === "incorrect"
                )
              }
              className={
                (!selectedVillage ||
                  verificationStatus?.status === "correct" ||
                  verificationStatus?.status === "incorrect")
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              Next
            </Button>
          </>
        );

      case 2:
        return (
          <>
            <p>Verify the village map. You have <strong>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</strong> minutes.</p>
            {timer > 0 ? (
              <p className="text-yellow-600">Please observe the map carefully...</p>
            ) : (
              <>
                <p>How was the village map according to you?</p>
                <div className="flex gap-3">
                  <Button variant={feedback === "correct" ? "default" : "outline"} onClick={() => setFeedback("correct")}>
                    <CheckCircle className="mr-2" /> Correct
                  </Button>
                  <Button variant={feedback === "incorrect" ? "destructive" : "outline"} onClick={() => setFeedback("incorrect")}>
                    <XCircle className="mr-2" /> Incorrect
                  </Button>
                </div>
                {/* <Button className="mt-4" onClick={handleSubmitFeedback}>Next</Button>
                <Button
                onClick={() => { setCurrentStep(3); handleCorrect;  }}
                disabled={!selectedVillage} // 🔹 disable until a village is selected
                className={!selectedVillage ? "opacity-50 cursor-not-allowed" : ""}
              >Next</Button> */}
                <Button
                  onClick={() => { setCurrentStep(3); }}
                >Next</Button>
              </>
            )}
          </>
        );

      case 3:
        return (
          <>
            {console.log(feedback, "___feedback 0000")}
            <p>Now Mark at least <strong>{villagePlotCount?.mandatoryPlots || 5}</strong> {feedback === "correct" ? "Correct" : "Incorrect"} Plots by clicking them on the plot using map.</p>
            <p className="text-sm text-gray-500">Verified: {verifiedPlots}</p>
            {verifiedPlots >= (villagePlotCount?.mandatoryPlots || 5) && (
              // <Button className="mt-4" onClick={() => setCurrentStep(4)}>Next</Button>
              <Button
                onClick={() => { setCurrentStep(4); setTimerActive(true); }}
                disabled={!selectedVillage} // 🔹 disable until a village is selected
                className={!selectedVillage ? "opacity-50 cursor-not-allowed" : ""}
              >Next</Button>
            )}
          </>
        );

      case 4:
        return (
          <>
            <p>Final step! Submit your village survey.</p>
            <Button onClick={handleFinalSubmit}
              disabled={
                !selectedVillage || (
                  verificationStatus?.status === "correct" ||
                  verificationStatus?.status === "incorrect"
                )
              }
              className={
                (!selectedVillage ||
                  verificationStatus?.status === "correct" ||
                  verificationStatus?.status === "incorrect")
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >Submit Survey</Button>
          </>
        );

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

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ border: "1px solid red" }}> */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-4"
          // style={{ border: "1px solid red" }}
        >


          {/* Selection Panel */}
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:col-span-1">

            {/* <Card className="lg:col-span-1 shadow-soft h-fit" style={{ border: "1px solid red" }}> */}
            <Card className="shadow-soft h-fit" 
            // style={{ border: "1px solid red" }}
            >

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
                {/* ----------------Sub District  */}
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
                {/*-----------------Village  */}
                {/* <div className="space-y-2">
                  <Label htmlFor="village">Village (Village LGD Code)</Label>
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
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="village">Village (Village LGD Code)</Label>
                  <SearchableDropdown
                    id="village"
                    options={villages}
                    label="name"
                    selectedVal={
                      villages.find((v) => v.id === selectedVillage)?.name || ""
                    }
                    handleChange={(val) => {
                      const selected = villages.find((v) => v.name === val);
                      setSelectedVillage(selected ? selected.id : "");
                    }}
                    disabled={!selectedSubDistrict}
                  />
                </div>

                {villageData && !isVerified && (
                  <div className="pt-4 space-y-3">
                    {!showReasonSelect ? (
                      <div className="flex gap-2">
                        {/* <Button
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
                        </Button> */}
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
            {/* <Card className="lg:col-span-1 shadow-soft h-fit">
              <CardHeader className='space-y-4'>
                <CardTitle>Submission Rules</CardTitle>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>
                    You have to verify minimum of{" "}
                    <strong className="text-red-600">{villagePlotCount?.mandatoryPlots}</strong>{" "}
                    plots for submission.
                  </li>

                  <li>You can only verify unverified villages.</li>
                  <li>Once marked correct, verification cannot be changed.</li>
                  <li>Provide valid reasons when marking as incorrect.</li>
                  <li>Ensure accuracy before submission.</li>
                </ul>
              </CardHeader>
            </Card> */}
            {/* <Card className="shadow-soft h-fit" style={{ border: "1px solid red" }}> */}
            <Card className="shadow-soft h-fit" 
            // style={{ border: "1px solid red" }}
            >

              {/* <CardHeader>
                <CardTitle>Start Verification</CardTitle>
              </CardHeader> */}
              <CardHeader>
                <CardTitle>
                  {isVerified
                    ? "Village Verification Status"
                    : "Start Verification"}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">{renderStepContent()}</CardContent>
            </Card>
          </div>
          {/* Map Panel */}
          {/* <Card className="lg:col-span-2 shadow-soft" style={{ border: "1px solid red" }}> */}
          <Card className="shadow-soft" 
          // style={{ border: "1px solid red" }}
          >

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
              {/* <VillageMap villageData={villageData} /> */}
              <VillageMap
                villageData={villageData}
                onPlotClick={currentStep === 3 ? handlePlotVerification : null}
                verificationStatus={feedback}

              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VerifyVillage;