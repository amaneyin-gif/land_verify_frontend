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
import { CheckCircle, XCircle } from 'lucide-react';

const incorrectReasons = [
  'Boundary mismatch',
  'Incorrect coordinates',
  'Missing plot data',
  'Overlapping areas',
  'Other discrepancy',
];

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
  const { toast } = useToast();

  // Mock data - Replace with actual API calls
  useEffect(() => {
    setDistricts([
      { id: '1', name: 'Agra', lgdCode: 'DIS001' },
      { id: '2', name: 'Lucknow', lgdCode: 'DIS002' },
      { id: '3', name: 'Kanpur', lgdCode: 'DIS003' },
    ]);
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      // Mock API call
      setSubDistricts([
        { id: '1', name: 'Agra Tehsil', lgdCode: 'SUB001' },
        { id: '2', name: 'Fatehabad', lgdCode: 'SUB002' },
      ]);
      setSelectedSubDistrict('');
      setSelectedVillage('');
      setVillageData(null);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedSubDistrict) {
      // Mock API call
      setVillages([
        { id: '1', name: 'Rampur', lgdCode: 'VIL001', coordinates: [], plotNumbers: [] },
        { id: '2', name: 'Sultanpur', lgdCode: 'VIL002', coordinates: [], plotNumbers: [] },
      ]);
      setSelectedVillage('');
      setVillageData(null);
    }
  }, [selectedSubDistrict]);

  useEffect(() => {
    if (selectedVillage) {
      checkIfVerified();
      fetchVillageData();
    }
  }, [selectedVillage]);

  const checkIfVerified = async () => {
    // TODO: Replace with actual API call
    try {
      const response = await fetch(`/api/check-verification/${selectedVillage}`).catch(
        () => ({
          ok: true,
          json: async () => ({ verified: false }),
        })
      );
      const data = await response.json();
      setIsVerified(data.verified);
      if (data.verified) {
        toast({
          title: 'Already Verified',
          description: 'This village has already been verified.',
        });
      }
    } catch (error) {
      console.error('Error checking verification:', error);
    }
  };

  const fetchVillageData = async () => {
    // TODO: Replace with actual API call
    // Mock data for demonstration
    const mockData = {
      id: selectedVillage,
      name: villages.find((v) => v.id === selectedVillage)?.name || '',
      lgdCode: villages.find((v) => v.id === selectedVillage)?.lgdCode || '',
      coordinates: [
        [
          [78.0081, 27.1767],
          [78.0181, 27.1767],
          [78.0181, 27.1867],
          [78.0081, 27.1867],
          [78.0081, 27.1767],
        ],
      ],
      plotNumbers: ['101', '102', '103', '104'],
    };
    setVillageData(mockData);
  };

  const handleCorrect = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      await fetch('/api/verify-village', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lgdCode: villageData?.lgdCode,
          status: 'correct',
        }),
      }).catch(() => ({ ok: true }));

      toast({
        title: 'Success',
        description: 'Village marked as correct',
      });
      
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit verification',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIncorrect = () => {
    setShowReasonSelect(true);
  };

  const handleSubmitIncorrect = async () => {
    if (!selectedReason) {
      toast({
        title: 'Error',
        description: 'Please select a reason',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      await fetch('/api/verify-village', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lgdCode: villageData?.lgdCode,
          status: 'incorrect',
          reason: selectedReason,
        }),
      }).catch(() => ({ ok: true }));

      toast({
        title: 'Success',
        description: 'Village marked as incorrect with reason',
      });
      
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit verification',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedDistrict('');
    setSelectedSubDistrict('');
    setSelectedVillage('');
    setVillageData(null);
    setShowReasonSelect(false);
    setSelectedReason('');
    setIsVerified(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
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
              <CardTitle>Village Map</CardTitle>
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



//===== above is old ==== /
// import { useState, useEffect } from 'react';
// import Navbar from '@/components/Navbar';
// import VillageMap from '@/components/VillageMap';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { useToast } from '@/hooks/use-toast';
// import { CheckCircle, XCircle } from 'lucide-react';

// const incorrectReasons = [
//   'Boundary mismatch',
//   'Incorrect coordinates',
//   'Missing plot data',
//   'Overlapping areas',
//   'Other discrepancy',
// ];

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
//   const [fullscreen, setFullscreen] = useState(false);
//   const { toast } = useToast();

//   // Mock districts
//   useEffect(() => {
//     setDistricts([
//       { id: '1', name: 'Agra', lgdCode: 'DIS001' },
//       { id: '2', name: 'Lucknow', lgdCode: 'DIS002' },
//       { id: '3', name: 'Kanpur', lgdCode: 'DIS003' },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (selectedDistrict) {
//       setSubDistricts([
//         { id: '1', name: 'Agra Tehsil', lgdCode: 'SUB001' },
//         { id: '2', name: 'Fatehabad', lgdCode: 'SUB002' },
//       ]);
//       setSelectedSubDistrict('');
//       setSelectedVillage('');
//       setVillageData(null);
//     }
//   }, [selectedDistrict]);

//   useEffect(() => {
//     if (selectedSubDistrict) {
//       setVillages([
//         { id: '1', name: 'Rampur', lgdCode: 'VIL001', coordinates: [], plotNumbers: [] },
//         { id: '2', name: 'Sultanpur', lgdCode: 'VIL002', coordinates: [], plotNumbers: [] },
//       ]);
//       setSelectedVillage('');
//       setVillageData(null);
//     }
//   }, [selectedSubDistrict]);

//   const fetchVillageData = () => {
//     if (!selectedVillage) {
//       toast({ title: 'Error', description: 'Select a village', variant: 'destructive' });
//       return;
//     }
//     // Mock data
//     const mockData = {
//       id: selectedVillage,
//       name: villages.find((v) => v.id === selectedVillage)?.name || '',
//       lgdCode: villages.find((v) => v.id === selectedVillage)?.lgdCode || '',
//       coordinates: [
//         [
//           [78.0081, 27.1767],
//           [78.0181, 27.1767],
//           [78.0181, 27.1867],
//           [78.0081, 27.1867],
//           [78.0081, 27.1767],
//         ],
//       ],
//       plotNumbers: ['101', '102', '103', '104'],
//     };
//     setVillageData(mockData);
//   };

//   const handleCorrect = async () => {
//     if (!villageData) return;
//     setIsSubmitting(true);
//     try {
//       await fetch('/api/verify-village', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ lgdCode: villageData.lgdCode, status: 'correct' }),
//       }).catch(() => ({ ok: true }));

//       toast({ title: 'Success', description: 'Village marked as correct' });
//       resetForm();
//     } catch {
//       toast({ title: 'Error', description: 'Failed to submit verification', variant: 'destructive' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleIncorrect = () => setShowReasonSelect(true);

//   const handleSubmitIncorrect = async () => {
//     if (!selectedReason) {
//       toast({ title: 'Error', description: 'Please select a reason', variant: 'destructive' });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       await fetch('/api/verify-village', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ lgdCode: villageData.lgdCode, status: 'incorrect', reason: selectedReason }),
//       }).catch(() => ({ ok: true }));
//       toast({ title: 'Success', description: 'Village marked as incorrect with reason' });
//       resetForm();
//     } catch {
//       toast({ title: 'Error', description: 'Failed to submit verification', variant: 'destructive' });
//     } finally {
//       setIsSubmitting(false);
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
//         <h1 className="text-3xl font-bold text-foreground mb-4">Verify Village Land</h1>

//         {/* Top Selection Row */}
//         <div className="flex flex-wrap gap-4 items-end mb-6">
//           <div className="flex-1">
//             <Label>District</Label>
//             <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select district" />
//               </SelectTrigger>
//               <SelectContent>
//                 {districts.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex-1">
//             <Label>Sub-District</Label>
//             <Select value={selectedSubDistrict} onValueChange={setSelectedSubDistrict} disabled={!selectedDistrict}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select sub-district" />
//               </SelectTrigger>
//               <SelectContent>
//                 {subDistricts.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex-1">
//             <Label>Village</Label>
//             <Select value={selectedVillage} onValueChange={setSelectedVillage} disabled={!selectedSubDistrict}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select village" />
//               </SelectTrigger>
//               <SelectContent>
//                 {villages.map((v) => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>

//           <Button className="h-[38px]" onClick={fetchVillageData}>Fetch Data</Button>
//         </div>

//         {/* Bottom Section: Map + Verification */}
//         <div className="flex gap-6 h-[600px] relative">
//           {/* Map 75% */}
//           <div className={`flex-3 relative ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
//             <VillageMap villageData={villageData} defaultView="UP" />
//             {fullscreen && (
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="absolute top-4 right-4 z-60"
//                 onClick={() => setFullscreen(false)}
//               >
//                 Close Fullscreen
//               </Button>
//             )}
//           </div>

//           {/* Verification 25% */}
//           <div className="flex-1 flex flex-col gap-4">
//             {!villageData && (
//               <Card className="flex-1 flex items-center justify-center">
//                 <p className="text-muted-foreground">Select a village to enable verification</p>
//               </Card>
//             )}

//             {villageData && (
//               <Card className="flex-1 shadow-soft p-4">
//                 {!showReasonSelect ? (
//                   <div className="flex flex-col gap-2">
//                     <Button onClick={handleCorrect} disabled={isSubmitting} className="bg-success hover:bg-success/90">
//                       <CheckCircle className="h-4 w-4 mr-2 inline" /> Correct
//                     </Button>
//                     <Button onClick={handleIncorrect} disabled={isSubmitting} variant="destructive">
//                       <XCircle className="h-4 w-4 mr-2 inline" /> Incorrect
//                     </Button>
//                     <Button onClick={() => setFullscreen(true)} variant="outline">Fullscreen Map</Button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col gap-2">
//                     <Label>Reason for Incorrect</Label>
//                     <Select value={selectedReason} onValueChange={setSelectedReason}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select reason" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {incorrectReasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={handleSubmitIncorrect} disabled={isSubmitting || !selectedReason}>Submit</Button>
//                     <Button onClick={() => setShowReasonSelect(false)} variant="outline">Cancel</Button>
//                   </div>
//                 )}
//               </Card>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default VerifyVillage;



