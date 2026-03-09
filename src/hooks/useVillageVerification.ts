// import { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';
// import type {
//   District,
//   SubDistrict,
//   Village,
//   VillageData,
//   VerificationStatus,
//   PlotCount,
//   FeedbackType
// } from '../components/Verify/village';
// import { showToast } from '@/components/ui/show-toast';


// // API endpoints - replace with your actual endpoints
// // const REACT_APP_BACKEND1 = 'https://api.example.com/v1';
// // const REACT_APP_BACKEND2 = 'https://api.example.com/v2';
// let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api'
// let REACT_APP_BACKEND2 = 'https://79dkd582-3002.inc1.devtunnels.ms/api'

// export const useVillageVerification = () => {
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
//   const [selectedVillage, setSelectedVillage] = useState('');
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
//   const [villages, setVillages] = useState<Village[]>([]);
//   const [villageData, setVillageData] = useState<VillageData | null>(null);
//   const [isVerified, setIsVerified] = useState(false);
//   const [showReasonSelect, setShowReasonSelect] = useState(false);
//   const [selectedReason, setSelectedReason] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
//   const [villagePlotCount, setVillagePlotCount] = useState<PlotCount | null>(null);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [timer, setTimer] = useState(30);
//   const [timerActive, setTimerActive] = useState(false);
//   const [feedback, setFeedback] = useState<FeedbackType>(null);
//   const [verifiedPlots, setVerifiedPlots] = useState(0);
//   const [mapLoading, setMapLoading] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const token = JSON.parse(localStorage.getItem('user') || '{}')?.token || '';
//   const initialVillageCode = (location.state as any)?.villageLgdCode;

//   useEffect(() => {
//     if (!initialVillageCode) return;
//     let isMounted = true;
//     const fetchVillageFromDashboard = async () => {
//       setLoading(true);
//       try {
//         const checkRes = await fetch(`${REACT_APP_BACKEND1}/check-verification/${initialVillageCode}`, {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,   // <-- Send token
//           }
//         });
//         const checkData = await checkRes.json();
//         if (checkData?.data?.verified) setIsVerified(true);

//         // ✅ Fetch actual village data for plotting
//         const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${initialVillageCode}`, {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,   // <-- Send token
//           }
//         });
//         if (!res.ok) throw new Error("Failed to fetch village data");
//         const data = await res.json();

//         const mappedData = {
//           id: initialVillageCode,
//           name: `Village ${initialVillageCode}`,
//           lgdCode: initialVillageCode,
//           plots: data.data.plots,
//         };
//         setVillageData(mappedData);
//         setVerificationStatus(
//           checkData?.data
//             ? {
//               name: `${checkData.data.village_name || "Unknown Village"}, ${data?.data?.lgdCode || ""}`,
//               status: checkData.data.verified || "Not Verified",
//             }
//             : null
//         );
//         setCurrentStep(0)
//         requestAnimationFrame(() => {
//           if (isMounted) {
//             setLoading(false); // PHASE 1 LOADER OFF
//           }
//         });
//       } catch (err) {
//         console.error('Failed to load village data:', err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchVillageFromDashboard();

//     return () => {
//       isMounted = false;
//     };
//   }, [initialVillageCode]);
//   console.log(villageData, "__villageData from here ")

//   useEffect(() => {
//     if (location.state) {
//       // Replace same route but without state
//       navigate(location.pathname, { replace: true, state: null });
//     }
//   }, [location, navigate]);

//   // Fetch districts on mount
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${REACT_APP_BACKEND2}/districts`);
//         if (!res.ok) {
//           showToast(500, "Failed to fetch district data.");
//           return;
//         }
//         const data = await res.json();
//         setDistricts(data.data.map((d: any) => ({
//           id: d.district_lgd_code,
//           name: d.district_name,
//           lgdCode: d.district_lgd_code
//         })));
//         setVillageData(null);
//       } catch (error) {
//         console.error('Error loading districts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDistricts();
//   }, [showToast]);

//   // Fetch sub-districts when district changes
//   useEffect(() => {
//     if (!selectedDistrict) return;
//     setLoading(true);

//     const fetchSubDistricts = async () => {
//       try {
//         const res = await fetch(`${REACT_APP_BACKEND2}/subdistricts/${selectedDistrict}`);
//         if (!res.ok) throw new Error("Failed to fetch sub-districts.");
//         const data = await res.json();
//         setSubDistricts(data.data.map((s: any) => ({
//           id: s.sub_district_lgd_code,
//           name: s.sub_district_name,
//           lgdCode: s.sub_district_lgd_code
//         })));
//         setSelectedSubDistrict('');
//         setSelectedVillage('');
//         setVillageData(null);
//         setVerificationStatus(null);
//         setVillages([]);
//         setCurrentStep(1);
//         setTimer(30);
//       } catch (error) {
//         console.error(error);
//         showToast(500, "Failed to load sub-districts.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubDistricts();
//   }, [selectedDistrict, showToast]);

//   // Fetch villages when sub-district changes
//   useEffect(() => {
//     if (!selectedSubDistrict) return;
//     setLoading(true);

//     const fetchVillages = async () => {
//       try {
//         const res = await fetch(`${REACT_APP_BACKEND2}/villages/${selectedSubDistrict}`);
//         if (!res.ok) throw new Error("Failed to fetch villages.");
//         const data = await res.json();
//         setVillages(data.data.map((v: any) => ({
//           id: v.village_lgd_code,
//           name: `${v.village_name} (${v.village_lgd_code})`,
//           lgdCode: v.village_lgd_code
//         })));
//         setSelectedVillage('');
//         setCurrentStep(1);
//         resetVillage();
//       } catch (error) {
//         console.error(error);
//         showToast(500, "Failed to load villages.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVillages();
//   }, [selectedSubDistrict, showToast]);

//   const resetVillage = useCallback(() => {
//     setSelectedVillage('');
//     setVillageData(null);
//     setIsVerified(false);
//     setShowReasonSelect(false);
//     setSelectedReason('');
//     setTimer(30);
//   }, []);

//   const checkIfVerified = useCallback(async () => {
//     if (!selectedVillage) return;
//     setLoading(true);
//     try {
//       const response = await fetch(`${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();

//       if (!data.data) {
//         setVerificationStatus({ status: "Not Verified" });
//         setIsVerified(false);
//         return;
//       }

//       if (data?.data?.verified) setIsVerified(true);

//       setVerificationStatus({
//         name: `${data.data.village_name || "Unknown Village"}, ${data.data.village_lgd_code || ""}`,
//         status: data.data.verified || "Not Verified",
//       });
//       // showToast(200, data.message);
//       if (isVerified) setCurrentStep(0);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [selectedVillage, token, isVerified, showToast]);

//   const fetchVillageData = useCallback(async () => {
//     if (!selectedVillage) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${selectedVillage}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       if (!res.ok) throw new Error("Failed to fetch village data");
//       const data = await res.json();

//       const mappedData: VillageData = {
//         id: selectedVillage,
//         name: villages.find(v => v.id === selectedVillage)?.name || '',
//         lgdCode: villages.find(v => v.id === selectedVillage)?.lgdCode || '',
//         plots: data.data.plots,
//         villageBoundary: data.data.villageBoundary,
//         villageBoundary2: data.data.villageBoundary2,
//         AiPLots: data.data.villagePlots
//       };
//       // console.log(mappedData,"__mapped data")

//       setVillageData(mappedData);
//       fetchPlotCount();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedVillage, token, villages]);

//   const fetchPlotCount = useCallback(async () => {
//     if (!selectedVillage) return;
//     try {
//       const res = await fetch(`${REACT_APP_BACKEND1}/check-plot-count/${selectedVillage}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       if (!res.ok) throw new Error("Failed to fetch plot count");
//       const data = await res.json();

//       setVillagePlotCount({
//         totalPlots: data.data.total_plots,
//         verifiedPlots: data.data.verified_plots,
//         mandatoryPlots: data.data.mandatory_plots,
//       });
//       setVerifiedPlots(data.data.verifiedPlotCount || 0);

//       if (data.data.verifiedPlotCount >= 5 && verificationStatus?.status === 'Not Verified') {
//         setCurrentStep(4);
//         setTimer(30);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, [selectedVillage, token, verificationStatus]);

//   // When village changes
//   useEffect(() => {
//     if (!selectedVillage) return;
//     setShowReasonSelect(false);
//     setSelectedReason('');
//     setIsVerified(false);
//     setVillageData(null);
//     checkIfVerified();
//     fetchVillageData();
//     setVerificationStatus(null);
//     setCurrentStep(1);
//     setTimer(30);
//   }, [selectedVillage]);

//   // Timer countdown
//   useEffect(() => {
//     if (!timerActive || timer <= 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timerActive, timer]);

//   useEffect(() => {
//     if (isVerified) {
//       setCurrentStep(0);
//     }
//   }, [isVerified]);

//   const handlePlotVerification = useCallback(async (plotId: { surveyNumber: string }) => {
//     try {
//       const res = await fetch(`${REACT_APP_BACKEND1}/verify-plots`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           surveyNumber: plotId.surveyNumber,
//           villageLgdCode: villageData?.lgdCode,
//           // villageName: villageData?.name,
//           villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
//           subDistrictName: subDistricts.find(sub => sub.lgdCode === selectedSubDistrict)?.name || "",
//           districtName: districts.find(dist => dist.lgdCode === selectedDistrict)?.name || "",
//           districtLgdCode: selectedDistrict,
//           subDistrictLgdCode: selectedSubDistrict,
//           status: feedback
//         }),
//       });
//       await res.json();
//       showToast(200, `Plot ${plotId.surveyNumber} verified`);
//       fetchPlotCount();
//     } catch (err) {
//       console.error(err);
//     }
//   }, [token, villageData, subDistricts, districts, selectedDistrict, selectedSubDistrict, feedback, showToast, fetchPlotCount]);

//   const handleCorrect = useCallback(async () => {
//     setIsSubmitting(true);
//     try {
//       const districtObj = districts.find(d => d.id === selectedDistrict);
//       const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
//       const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           village_lgd_code: villageData?.lgdCode,
//           // village_name: villageData?.name,
//           villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
//           district_lgd_code: districtObj?.lgdCode || "",
//           district_name: districtObj?.name || "",
//           sub_district_lgd_code: subDistrictObj?.lgdCode || "",
//           sub_district_name: subDistrictObj?.name || "",
//           status: 'correct',
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to submit verification');
//       const data = await response.json();
//       showToast(response.status, data.message || "Operation completed");
//       resetVillage();
//     } catch (error) {
//       showToast(500, "Failed to submit verification.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [districts, subDistricts, selectedDistrict, selectedSubDistrict, villageData, token, showToast, resetVillage]);

//   const handleSubmitIncorrect = useCallback(async () => {
//     if (!selectedReason) {
//       showToast(400, "Please select a reason.");
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const districtObj = districts.find(d => d.id === selectedDistrict);
//       const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
//       const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           village_lgd_code: villageData?.lgdCode,
//           // village_name: villageData?.name,
//           villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
//           district_lgd_code: districtObj?.lgdCode || "",
//           district_name: districtObj?.name || "",
//           sub_district_lgd_code: subDistrictObj?.lgdCode || "",
//           sub_district_name: subDistrictObj?.name || "",
//           status: 'incorrect',
//           remarks: selectedReason,
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to submit verification');
//       const data = await response.json();
//       showToast(200, data.message);
//       resetVillage();
//     } catch (error) {
//       console.error(error);
//       showToast(500, "Failed to submit verification.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [selectedReason, districts, subDistricts, selectedDistrict, selectedSubDistrict, villageData, token, showToast, resetVillage]);
//   const handleFinalSubmit = useCallback(async () => {
//     if (verifiedPlots < (villagePlotCount?.mandatoryPlots || 5)) {
//       toast({ variant: "destructive", description: "Verify all required plots first." });
//       return;
//     }
//     console.log(selectedReason, "__resonse seleted000000&&&")
//     try {

//       const districtObj = districts.find(d => d.id === selectedDistrict);
//       const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
//       const res = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           village_lgd_code: villageData?.lgdCode,
//           // village_name: villageData?.name,
//           villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
//           district_lgd_code: districtObj?.lgdCode || "",
//           district_name: districtObj?.name || "",
//           sub_district_lgd_code: subDistrictObj?.lgdCode || "",
//           sub_district_name: subDistrictObj?.name || "",
//           status: feedback,
//           remarks: selectedReason ? selectedReason : "",

//         }),
//       });
//       const data = await res.json();
//       showToast(200, data.message);
//       setCurrentStep(1);
//       resetVillage();
//     } catch (err) {
//       console.error(err);
//     }
//   }, [selectedReason, verifiedPlots, villagePlotCount, districts, subDistricts, selectedDistrict, selectedSubDistrict, villageData, token, feedback, showToast, resetVillage]);

//   return {
//     // State
//     selectedDistrict,
//     selectedSubDistrict,
//     selectedVillage,
//     districts,
//     subDistricts,
//     villages,
//     villageData,
//     isVerified,
//     showReasonSelect,
//     selectedReason,
//     isSubmitting,
//     loading,
//     verificationStatus,
//     villagePlotCount,
//     currentStep,
//     timer,
//     timerActive,
//     feedback,
//     verifiedPlots,
//     mapLoading,
//     // Setters
//     setMapLoading,
//     setSelectedDistrict,
//     setSelectedSubDistrict,
//     setSelectedVillage,
//     setShowReasonSelect,
//     setSelectedReason,
//     setCurrentStep,
//     setTimer,
//     setTimerActive,
//     setFeedback,

//     // Actions
//     resetVillage,
//     handleCorrect,
//     handleSubmitIncorrect,
//     handlePlotVerification,
//     handleFinalSubmit,
//   };
// };


import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import type {
  District,
  SubDistrict,
  Village,
  VillageData,
  VerificationStatus,
  PlotCount,
  FeedbackType
} from '../components/Verify/village';
import { showToast } from '@/components/ui/show-toast';

let REACT_APP_BACKEND1 = 'https://x9k84zq3-3002.inc1.devtunnels.ms/api';
let REACT_APP_BACKEND2 = 'https://79dkd582-3002.inc1.devtunnels.ms/api';

export const useVillageVerification = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [villageData, setVillageData] = useState<VillageData | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showReasonSelect, setShowReasonSelect] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const [villagePlotCount, setVillagePlotCount] = useState<PlotCount | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [verifiedPlots, setVerifiedPlots] = useState(0);
  const [mapLoading, setMapLoading] = useState(false);
  const [verifiedPlotMap, setVerifiedPlotMap] = useState<
    Record<string, { status: "correct" | "incorrect"; remarks?: string }>
  >({});
  const [isVerifyingPlot, setIsVerifyingPlot] = useState(false);
  const [verifyingPlotNumber, setVerifyingPlotNumber] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = JSON.parse(localStorage.getItem('user') || '{}')?.token || '';
  const initialVillageCode = (location.state as any)?.villageLgdCode;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user?.role;

  console.log(user, "__user from useVillageVerification");
  useEffect(() => {
    if (!role) return;

    if (role === "Admin" || role === "Super Admin") {
      fetchDistricts();
    }

    if (role === "District") {
      fetchSubDistricts();
    }

    if (role === "Sub District" || role === "Verifier") {
      fetchVillages();
    }

  }, [role]);

  useEffect(() => {
    if (!initialVillageCode) return;
    let isMounted = true;
    const fetchVillageFromDashboard = async () => {
      setLoading(true);
      setMapLoading(true);
      try {
        const checkRes = await fetch(`${REACT_APP_BACKEND1}/check-verification/${initialVillageCode}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        const checkData = await checkRes.json();
        if (checkData?.data?.verified) setIsVerified(true);

        const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${initialVillageCode}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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

        const verified =
          checkData?.data?.verified === "correct" ||
          checkData?.data?.verified === "incorrect";

        setIsVerified(verified);

        setVillageData(mappedData);
        console.log(villageData, "__villageData after setting from dashboard")
        setVerificationStatus(
          checkData?.data
            ? {
              name: `${checkData.data.village_name || "Unknown Village"}, ${data?.data?.lgdCode || ""}`,
              status: checkData.data.verified || "Not Verified",
            }
            : null
        );
        setSelectedVillage(initialVillageCode)
        setCurrentStep(verified ? 0 : 1);
        // setTimeout(() => {
        //   if (isMounted) {
        //     // setLoading(false); // PHASE 1 LOADER OFF
        //     setMapLoading(false);
        //   }
        // }, 1500);
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
  }, [initialVillageCode, token]);

  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  // Fetch districts on mount
  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(`${REACT_APP_BACKEND1}/districts`,{
  //         headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       }
  //       });
  //       if (!res.ok) {
  //         showToast(500, "Failed to fetch district data.");
  //         return;
  //       }
  //       const data = await res.json();
  //       let mapped = data.data.map((d: any) => ({
  //         id: d.district_lgd_code,
  //         name: d.district_name,
  //         lgdCode: d.district_lgd_code
  //       }));
  //       setDistricts(mapped);
  //       if (mapped.length === 1) {
  //       setSelectedDistrict(mapped[0].id);
  //     }
  //       setVillageData(null);
  //     } catch (error) {
  //       console.error('Error loading districts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDistricts();
  // }, []);
  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${REACT_APP_BACKEND1}/districts`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!res.ok) {
        showToast(500, "Failed to fetch district data.");
        return;
      }
      const data = await res.json();
      let mapped = data.data.map((d: any) => ({
        id: d.district_lgd_code,
        name: d.district_name,
        lgdCode: d.district_lgd_code
      }));
      setDistricts(mapped);
      if (mapped.length === 1) {
        setSelectedDistrict(mapped[0].id);
      }
      setVillageData(null);
      
    } catch (error) {
      console.error('Error loading districts:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!selectedDistrict) return;
    if (role !== "Admin" && role !== "Super Admin") return;

    console.log("DISTRICT SELECTED:", selectedDistrict);
    fetchSubDistricts();
  }, [selectedDistrict, role]);


  // Fetch sub-districts when district changes
  // useEffect(() => {
  //   if (!selectedDistrict) return;
  //   setLoading(true);

  //   const fetchSubDistricts = async () => {
  //     try {
  //       const res = await fetch(`${REACT_APP_BACKEND2}/subdistricts/${selectedDistrict}`);
  //       if (!res.ok) throw new Error("Failed to fetch sub-districts.");
  //       const data = await res.json();
  //       setSubDistricts(data.data.map((s: any) => ({
  //         id: s.sub_district_lgd_code,
  //         name: s.sub_district_name,
  //         lgdCode: s.sub_district_lgd_code
  //       })));
  //       setSelectedSubDistrict('');
  //       setSelectedVillage('');
  //       setVillageData(null);
  //       setVerificationStatus(null);
  //       setVillages([]);
  //       setCurrentStep(1);
  //       setTimer(30);
  //     } catch (error) {
  //       console.error(error);
  //       showToast(500, "Failed to load sub-districts.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSubDistricts();
  // }, [selectedDistrict]);
  const fetchSubDistricts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${REACT_APP_BACKEND1}/subdistricts/${selectedDistrict}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!res.ok) throw new Error("Failed to fetch sub-districts.");
      const data = await res.json();
      setSubDistricts(data.data.map((s: any) => ({
        id: s.sub_district_lgd_code,
        name: s.sub_district_name,
        lgdCode: s.sub_district_lgd_code
      })));
      setSelectedSubDistrict('');
      setSelectedVillage('');
      setVillageData(null);
      setVerificationStatus(null);
      setVillages([]);
      setVerifiedPlots(0);
      setVillagePlotCount(null);
      setFeedback(null);
      setSelectedReason('');
      setVerifiedPlotMap({});
      setCurrentStep(1);
      setTimer(30);
      setTimerActive(false)
    } catch (error) {
      console.error(error);
      showToast(500, "Failed to load sub-districts.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!selectedSubDistrict) return;
    if (role === "Verifier") return;

    console.log("SUBDISTRICT SELECTED:", selectedSubDistrict);
    fetchVillages();
  }, [selectedSubDistrict, role]);


  // Fetch villages when sub-district changes
  // useEffect(() => {
  //   if (!selectedSubDistrict) return;
  //   setLoading(true);

  //   const fetchVillages = async () => {
  //     try {
  //       const res = await fetch(`${REACT_APP_BACKEND2}/villages/${selectedSubDistrict}`);
  //       if (!res.ok) throw new Error("Failed to fetch villages.");
  //       const data = await res.json();
  //       setVillages(data.data.map((v: any) => ({
  //         id: v.village_lgd_code,
  //         name: `${v.village_name} (${v.village_lgd_code})`,
  //         lgdCode: v.village_lgd_code
  //       })));
  //       setSelectedVillage('');
  //       setCurrentStep(1);
  //       resetVillage();
  //     } catch (error) {
  //       console.error(error);
  //       showToast(500, "Failed to load villages.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVillages();
  // }, [selectedSubDistrict]);
  console.log("i m hitted")
  const fetchVillages = async () => {
    console.log("fetchVillages called___", selectedSubDistrict);
    setLoading(true);
    try {
      const url =
        role === "Admin" || role === "Super Admin" || role === "District"
          ? `${REACT_APP_BACKEND1}/villages?sub_district_lgd_code=${selectedSubDistrict}`
          : `${REACT_APP_BACKEND1}/villages`;
      // SubDistrict / Verifier → backend uses token to return assigned villages

      console.log("fetchVillages called →", url);
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!res.ok) throw new Error("Failed to fetch villages.");
      const data = await res.json();
      setVillages(data.data.map((v: any) => ({
        id: v.village_lgd_code,
        name: `${v.village_name} (${v.village_lgd_code})`,
        lgdCode: v.village_lgd_code
      })));
      // setSelectedVillage('');
      // setCurrentStep(1);
      resetVillage();
    } catch (error) {
      console.error(error);
      showToast(500, "Failed to load villages.");
    } finally {
      setLoading(false);
    }
  };


  const resetVillage = useCallback(() => {
    setSelectedVillage('');
    setVillageData(null);
    setVerifiedPlots(0);
    setVillagePlotCount(null);
    setFeedback(null);
    setSelectedReason('');
    setVerifiedPlotMap({});
    setIsVerified(false);
    setShowReasonSelect(false);
    setTimer(30);
    setTimerActive(false);
  }, []);

  // const checkIfVerified = useCallback(async () => {
  //   if (!selectedVillage) return;
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       }
  //     });
  //     const data = await response.json();

  //     if (!data.data) {
  //       setVerificationStatus({ status: "Not Verified" });
  //       setIsVerified(false);
  //       return;
  //     }

  //     if (data?.data?.verified) setIsVerified(true);

  //     setVerificationStatus({
  //       name: `${data.data.village_name || "Unknown Village"}, ${data.data.village_lgd_code || ""}`,
  //       status: data.data.verified || "Not Verified",
  //     });
  //     if (isVerified) setCurrentStep(0);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedVillage, token, isVerified]);

  // const checkIfVerified = useCallback(async () => {
  //   if (!selectedVillage) return;

  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         }
  //       }
  //     );

  //     const json = await response.json();
  //     const data = json?.data;

  //     const villageVerified =
  //       data?.verified === "correct" ||
  //       data?.verified === "incorrect";
  //     console.log(villageVerified, "__villageVerified from checkIfVerified0000");
  //     setIsVerified(villageVerified);
  //     console.log(data, "__data from checkIfVerified0000")
  //     setVerificationStatus({
  //       name: `${data?.village_name || villages.find(v => v.id === selectedVillage)?.name}, ${data?.village_lgd_code || ""}`,
  //       status: data?.verified || "Not Verified",
  //     });

  //     // Step 0 must be decided from API, NOT state
  //     // if (villageVerified) {
  //     //   setCurrentStep(0);
  //     // }
  //     if (villageVerified) {
  //       console.log(verifiedPlots, "__i m here inside verified plot")
  //       setCurrentStep(0);
  //     }


  //   } catch (error) {
  //     console.error("Verification check failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [selectedVillage, token]);

  const checkIfVerified = useCallback(async () => {
    if (!selectedVillage) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${REACT_APP_BACKEND1}/check-verification/${selectedVillage}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      const json = await res.json();
      const data = json?.data;

      const villageVerified =
        data?.verified === "correct" ||
        data?.verified === "incorrect";

      setIsVerified(villageVerified);

      setVerificationStatus({
        name: `${data?.village_name || villages.find(v => v.id === selectedVillage)?.name}, ${data?.village_lgd_code || ""}`,
        status: data?.verified || "Not Verified",
      });

      // 🔒 SINGLE SOURCE OF STEP CONTROL
      if (villageVerified) {
        setCurrentStep(0);
        return;
      }

      // If NOT verified, user starts flow
      setCurrentStep(1);

    } catch (err) {
      console.error("Verification check failed:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedVillage, token, villages]);


  const fetchVillageData = useCallback(async () => {
    if (!selectedVillage) return;
    setLoading(true);
    setMapLoading(true);
    try {
      const res = await fetch(`${REACT_APP_BACKEND2}/village-data/${selectedVillage}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!res.ok) throw new Error("Failed to fetch village data");
      const data = await res.json();

      const mappedData: VillageData = {
        id: selectedVillage,
        name: villages.find(v => v.id === selectedVillage)?.name || '',
        lgdCode: villages.find(v => v.id === selectedVillage)?.lgdCode || '',
        plots: data.data.plots,
        villageBoundary: data.data.villageBoundary,
        villageBoundary2: data.data.villageBoundary2,
        AiPLots: data.data.villagePlots
      };
      setVillageData(mappedData);
      fetchPlotCount();
      // setTimeout(() => setMapLoading(false), 1500);
    } catch (error) {
      console.error(error);
      setMapLoading(false);
    } finally {
      setLoading(false);
    }
  }, [selectedVillage, token, villages]);

  // const fetchPlotCount = useCallback(async () => {
  //   if (!selectedVillage) return;
  //   try {
  //     const res = await fetch(`${REACT_APP_BACKEND1}/check-plot-count/${selectedVillage}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       }
  //     });
  //     if (!res.ok) throw new Error("Failed to fetch plot count");
  //     const data = await res.json();
  //     console.log(data, "__data from fetchPlotCount00");

  //     setVillagePlotCount({
  //       totalPlots: data.data.total_plots,
  //       verifiedPlots: data.data.verified_plots,
  //       mandatoryPlots: data.data.mandatory_plots,
  //     });
  //     setVerifiedPlots(data.data.verifiedPlotCount || 0);
  //     console.log(verificationStatus, "__verificationStatus from fetchPlotCount")
  //     if (data.data.verifiedPlotCount >= 5) {
  //       console.log("Setting step to 4 from fetchPlotCount");
  //       setCurrentStep(4);
  //       setTimer(30);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedVillage, token, verificationStatus]);
  // const fetchPlotCount = useCallback(async () => {
  //   if (!selectedVillage) return;

  //   try {
  //     const res = await fetch(
  //       `${REACT_APP_BACKEND1}/check-plot-count/${selectedVillage}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         }
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to fetch plot count");

  //     const json = await res.json();
  //     const data = json?.data;

  //     if (!data) return;

  //     console.log(data, "__data from fetchPlotCount");

  //     // -----------------------------
  //     // KEEP YOUR WORKING PART
  //     // -----------------------------
  //     setVillagePlotCount({
  //       totalPlots: data.totalPlots || data.total_plots || 0,
  //       verifiedPlots: data.verifiedPlotCount || 0,
  //       // mandatoryPlots: data.mandatory_plots || "5/5",
  //       mandatoryPlots: Number(
  //         String(data.mandatory_plots || "5/5").split("/")[1] || 5
  //       ),

  //     });

  //     const verified = Number(data.verifiedPlotCount || 0);
  //     setVerifiedPlots(verified);

  //     // -----------------------------
  //     // 🔒 RESUME + LOCK LOGIC
  //     // -----------------------------
  //     if (
  //       verified > 0 &&
  //       Array.isArray(data.verifiedPlotDetails) &&
  //       data.verifiedPlotDetails.length > 0
  //     ) {
  //       const first = data.verifiedPlotDetails[0];

  //       // Restore status
  //       if (first.status) {
  //         setFeedback(first.status); // "correct" | "incorrect"
  //       }

  //       // Restore reason
  //       if (first.remarks) {
  //         setSelectedReason(first.remarks);
  //       }

  //       // Force user into plot verification flow
  //       setCurrentStep(3);
  //     }

  //     // -----------------------------
  //     // ✅ FINAL SUBMIT STEP
  //     // -----------------------------
  //     const mandatory = Number(
  //       String(data.mandatory_plots || "5/5").split("/")[1] || 5
  //     );

  //     // if (verified >= mandatory) {
  //     //   console.log("Setting step to 4 from fetchPlotCount");
  //     //   setCurrentStep(4);
  //     // }
  //     if (verified >= mandatory && !isVerified) {
  //       console.log(" i m inside this 000",verified,mandatory,isVerified)
  //       setCurrentStep(4);
  //         setTimer(30);
  //     }

  //     if (verified === 0) {
  //       setCurrentStep(1);
  //     }


  //   } catch (error) {
  //     console.error("Plot count fetch failed:", error);
  //   }
  // }, [
  //   selectedVillage,
  //   token,
  //   setFeedback,
  //   setSelectedReason
  // ]);
  const fetchPlotCount = useCallback(async () => {
    if (!selectedVillage) return;

    try {
      const res = await fetch(
        `${REACT_APP_BACKEND1}/check-plot-count/${selectedVillage}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      if (!res.ok) throw new Error("Failed to fetch plot count");

      const json = await res.json();
      const data = json?.data;
      if (!data) return;

      const verified = Number(data.verifiedPlotCount || 0);
      const mandatory = Number(
        String(data.mandatory_plots || "5/5").split("/")[1] || 5
      );

      setVillagePlotCount({
        totalPlots: data.totalPlots || data.total_plots || 0,
        verifiedPlots: verified,
        mandatoryPlots: mandatory
      });

      setVerifiedPlots(verified);

      // Restore locked feedback/reason if already started
      if (
        verified > 0 &&
        Array.isArray(data.verifiedPlotDetails) &&
        data.verifiedPlotDetails.length > 0
      ) {
        const first = data.verifiedPlotDetails[0];
        if (first.status) setFeedback(first.status);
        if (first.remarks) setSelectedReason(first.remarks);
      }
      if (Array.isArray(data.verifiedPlotDetails)) {
        const map: Record<string, { status: "correct" | "incorrect"; remarks?: string }> = {};

        data.verifiedPlotDetails.forEach((p: any) => {
          map[String(p.survey_number || p.surveyNumber)] = {
            status: p.status,
            remarks: p.remarks
          };
        });

        setVerifiedPlotMap(map);
      } else {
        setVerifiedPlotMap({});
      }
    } catch (err) {
      console.error("Plot count fetch failed:", err);
    }
  }, [selectedVillage, token]);

  // When village changes
  // useEffect(() => {
  //   console.log("selectedVillage changed1223:", selectedVillage);

  //   if (!selectedVillage) return;
  //   setShowReasonSelect(false);
  //   setSelectedReason('');
  //   setIsVerified(false);
  //   setVillageData(null);
  //   checkIfVerified();
  //   fetchVillageData();
  //   setVerificationStatus(null);
  //   setCurrentStep(1);
  //   setTimer(30);
  //   setTimerActive(false);
  // }, [selectedVillage]);
  // useEffect(() => {
  //   if (!selectedVillage) return;

  //   // ------------------------
  //   // RESET PREVIOUS VILLAGE STATE
  //   // ------------------------
  //   setVerifiedPlots(0);
  //   setVillagePlotCount(null);
  //   setFeedback(null);
  //   setSelectedReason('');
  //   setShowReasonSelect(false);
  //   setVerifiedPlotMap({});
  //   // setVillageData(null);
  //   setTimer(30);
  //   setTimerActive(false);

  //   // ------------------------
  //   // LOAD NEW VILLAGE STATE
  //   // ------------------------
  //   checkIfVerified();
  //   fetchVillageData();
  // }, [selectedVillage, checkIfVerified, fetchVillageData]);
  useEffect(() => {
    if (!selectedVillage) return;

    // ------------------------
    // RESET PREVIOUS VILLAGE STATE
    // ------------------------
    setVerifiedPlots(0);
    setVillagePlotCount(null);
    setFeedback(null);
    setSelectedReason('');
    setShowReasonSelect(false);
    setVerifiedPlotMap({}); // This is correct
    setVillageData(null);   // 🔧 FIX: Reset village data FIRST
    setTimer(30);
    setTimerActive(false);

    // ------------------------
    // LOAD NEW VILLAGE STATE
    // ------------------------
    checkIfVerified();
    fetchVillageData();
  }, [selectedVillage, checkIfVerified, fetchVillageData]);

  // // Timer countdown
  // useEffect(() => {
  //   if (!timerActive || timer <= 0) return;
  //   const interval = setInterval(() => setTimer((t) => t - 1), 1000);
  //   return () => clearInterval(interval);
  // }, [timerActive, timer]);
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);
  console.log("Timer active:", timerActive, "Timer:", timer);


  useEffect(() => {
    if (isVerified) {
      setCurrentStep(0);
    }
  }, [isVerified]);

  // const handlePlotVerification = useCallback(async (plotId: { surveyNumber: string }) => {
  //   try {
  //     console.log(selectedDistrict, "__districtLgdCode in verfiy PLots")
  //     console.log(selectedReason, "___selectedReason in verify plots")
  //     const res = await fetch(`${REACT_APP_BACKEND1}/verify-plots`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         surveyNumber: plotId.surveyNumber,
  //         villageLgdCode: villageData?.lgdCode,
  //         villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
  //         subDistrictName: subDistricts.find(sub => sub.lgdCode === selectedSubDistrict)?.name || "",
  //         districtName: districts.find(dist => dist.lgdCode === selectedDistrict)?.name || "",
  //         districtLgdCode: selectedDistrict,
  //         subDistrictLgdCode: selectedSubDistrict,
  //         status: feedback,
  //         remarks: selectedReason ? selectedReason : "",
  //       }),
  //     });

  //     if (!res.ok) throw new Error('Failed to verify plots');
  //     await res.json();
  //     showToast(200, `Plot ${plotId.surveyNumber} verified`);
  //     fetchPlotCount();
  //   } catch (err) {
  //     showToast(500, "Failed to verify plots.");
  //     console.error(err);
  //   }
  // }, [token, villageData, subDistricts, districts, selectedDistrict, selectedSubDistrict, feedback, selectedReason, fetchPlotCount]);


const handlePlotVerification = useCallback(async (plotId: { surveyNumber: string }) => {
  // 🔧 Prevent double-click
  if (isVerifyingPlot) {
    return;
  }

  // 🔧 FIX #2: Prevent re-verification
  const surveyNo = String(plotId.surveyNumber);
  if (verifiedPlotMap[surveyNo]) {
    showToast(400, `Plot ${surveyNo} is already verified`);
    return;
  }

  setIsVerifyingPlot(true);
  setVerifyingPlotNumber(surveyNo);

  try {
    const res = await fetch(`${REACT_APP_BACKEND1}/verify-plots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        surveyNumber: plotId.surveyNumber,
        villageLgdCode: villageData?.lgdCode,
        villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
        subDistrictName: subDistricts.find(sub => sub.lgdCode === selectedSubDistrict)?.name || "",
        districtName: districts.find(dist => dist.lgdCode === selectedDistrict)?.name || "",
        districtLgdCode: selectedDistrict,
        subDistrictLgdCode: selectedSubDistrict,
        status: feedback,
        remarks: selectedReason ? selectedReason : "",
      }),
    });

    if (!res.ok) throw new Error('Failed to verify plots');
    await res.json();
    showToast(200, `Plot ${plotId.surveyNumber} verified`);
    await fetchPlotCount();
  } catch (err) {
    // 🔧 FIX #13: Better error handling
    if (err instanceof TypeError) {
      showToast(500, "Network error - please check your connection");
    } else {
      showToast(500, "Failed to verify plots.");
    }
    console.error(err);
  } finally {
    setIsVerifyingPlot(false);
    setVerifyingPlotNumber(null);
  }
}, [
  token,
  villageData,
  subDistricts,
  districts,
  selectedDistrict,
  selectedSubDistrict,
  feedback,
  selectedReason,
  fetchPlotCount,
  verifiedPlotMap,
  isVerifyingPlot // ✅ Add to deps
]);
  const handleCorrect = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const districtObj = districts.find(d => d.id === selectedDistrict);
      const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
      const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          village_lgd_code: villageData?.lgdCode,
          villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
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
  }, [districts, subDistricts, selectedDistrict, selectedSubDistrict, villageData, token, resetVillage]);

  const handleSubmitIncorrect = useCallback(async () => {
    if (!selectedReason) {
      showToast(400, "Please select a reason.");
      return;
    }
    setIsSubmitting(true);
    try {
      const districtObj = districts.find(d => d.id === selectedDistrict);
      const subDistrictObj = subDistricts.find(s => s.id === selectedSubDistrict);
      const response = await fetch(`${REACT_APP_BACKEND1}/verify-village`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          village_lgd_code: villageData?.lgdCode,
          villageName: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
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
  }, [selectedReason, districts, subDistricts, selectedDistrict, selectedSubDistrict, villageData, token, resetVillage]);

  const handleFinalSubmit = useCallback(async () => {
    // if (verifiedPlots < (villagePlotCount?.mandatoryPlots || 5)) {
    const mandatory = villagePlotCount?.mandatoryPlots || 5;
    if (verifiedPlots < mandatory) {

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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          village_lgd_code: villageData?.lgdCode,
          village_name: villageData?.name?.replace(/\s*\(.*?\)\s*$/, ""),
          district_lgd_code: districtObj?.lgdCode || "",
          district_name: districtObj?.name || "",
          sub_district_lgd_code: subDistrictObj?.lgdCode || "",
          sub_district_name: subDistrictObj?.name || "",
          status: feedback,
          remarks: selectedReason ? selectedReason : "",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400) {
          showToast(400, data.message || "Unable to verify village.");
          // ❗ If delete fails, remove loading so UI returns to normal
          return;
        }
        throw new Error(data.message || "Failed to verify village");
      }

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        showToast(401, "Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      showToast(res.status, data.message);
      const currentVillageIndex = villages.findIndex(v => v.id === selectedVillage);
      const nextVillage = villages[currentVillageIndex + 1];
      if (nextVillage) {
        setVillageData(null);
        setVerifiedPlots(0);
        setVillagePlotCount(null);
        setFeedback(null);
        setSelectedReason('');
        setVerifiedPlotMap({});
        setCurrentStep(1);
        setTimer(30);
        setTimerActive(false);
        setSelectedVillage(nextVillage.id);
      } else {
        showToast(200, "All villages in this sub-district have been verified.");
        resetVillage();
      }
      setCurrentStep(1);
      // resetVillage();
    } catch (err) {
      console.error(err);
    }
  }, [selectedReason, verifiedPlots, villagePlotCount, districts, subDistricts, selectedDistrict, selectedSubDistrict, villageData, token, feedback, resetVillage, toast]);


  return {
    // State
    selectedDistrict,
    selectedSubDistrict,
    selectedVillage,
    districts,
    subDistricts,
    villages,
    villageData,
    isVerified,
    showReasonSelect,
    selectedReason,
    isSubmitting,
    loading,
    verificationStatus,
    villagePlotCount,
    currentStep,
    timer,
    timerActive,
    feedback,
    verifiedPlots,
    mapLoading,
    user,
    verifiedPlotMap,
    isVerifyingPlot,
    verifyingPlotNumber,
    // Setters
    setMapLoading,
    setSelectedDistrict,
    setSelectedSubDistrict,
    setSelectedVillage,
    setShowReasonSelect,
    setSelectedReason,
    setCurrentStep,
    setTimer,
    setTimerActive,
    setFeedback,
    // Actions
    resetVillage,
    handleCorrect,
    handleSubmitIncorrect,
    handlePlotVerification,
    handleFinalSubmit,
  };
};
