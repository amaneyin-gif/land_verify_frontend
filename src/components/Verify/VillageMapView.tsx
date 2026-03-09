// import { CheckCircle, XCircle, AlertCircle, Map } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import type { VillageData, VerificationStatus, FeedbackType } from './village';

// interface VillageMapViewProps {
//   villageData: VillageData | null;
//   verificationStatus: VerificationStatus | null;
//   currentStep: number;
//   feedback: FeedbackType;
//   onPlotClick?: ((plot: { surveyNumber: string }) => void) | null;
// }

// export const VillageMapView = ({
//   villageData,
//   verificationStatus,
//   currentStep,
//   feedback,
//   onPlotClick,
// }: VillageMapViewProps) => {
//   const getStatusBadge = () => {
//     if (verificationStatus?.status === 'correct') {
//       return (
//         <Badge className="bg-success/90 text-success-foreground gap-1.5">
//           <CheckCircle className="h-3.5 w-3.5" />
//           Verified Correct
//         </Badge>
//       );
//     }
//     if (verificationStatus?.status === 'incorrect') {
//       return (
//         <Badge variant="destructive" className="gap-1.5">
//           <XCircle className="h-3.5 w-3.5" />
//           Verified Incorrect
//         </Badge>
//       );
//     }
//     if (verificationStatus?.status === 'Not Verified') {
//       return (
//         <Badge variant="outline" className="gap-1.5 border-warning text-warning">
//           <AlertCircle className="h-3.5 w-3.5" />
//           Not Verified
//         </Badge>
//       );
//     }
//     return (
//       <Badge variant="outline" className="gap-1.5 text-muted-foreground">
//         <Map className="h-3.5 w-3.5" />
//         Select Village
//       </Badge>
//     );
//   };

//   return (
//     <div className="relative h-full w-full rounded-xl overflow-hidden bg-muted/50">
//       {/* Map Header Overlay */}
//       <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
//         <div className="glass-panel rounded-lg px-3 py-2">
//           <div className="flex items-center gap-3">
//             <Map className="h-4 w-4 text-primary" />
//             <div>
//               <p className="text-xs font-medium text-muted-foreground">Village Map</p>
//               <p className="text-sm font-semibold truncate max-w-[200px]">
//                 {verificationStatus?.name || villageData?.name || 'No village selected'}
//               </p>
//             </div>
//           </div>
//         </div>
//         {getStatusBadge()}
//       </div>

//       {/* Map Placeholder - Replace with actual map component */}
//       <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted">
//         {villageData ? (
//           <div className="text-center space-y-4 p-8">
//             {/* This is where your actual VillageMap component would go */}
//             <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
//               <div className="space-y-4 text-center">
//                 <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
//                   <Map className="h-10 w-10 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg">{villageData.name}</h3>
//                   <p className="text-sm text-muted-foreground">LGD Code: {villageData.lgdCode}</p>
//                   {villageData.plots && (
//                     <p className="text-xs text-muted-foreground mt-1">
//                       {villageData.plots.length} plots available
//                     </p>
//                   )}
//                 </div>
//                 {currentStep === 3 && (
//                   <p className="text-sm text-muted-foreground animate-pulse-subtle">
//                     Click on plots to verify them
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* Replace the above with your actual map implementation:
//             <VillageMap
//               villageData={villageData}
//               onPlotClick={currentStep === 3 ? onPlotClick : null}
//               verificationStatus={feedback}
//             />
//             */}
//           </div>
//         ) : (
//           <div className="text-center space-y-4 p-8">
//             <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
//               <Map className="h-10 w-10 text-muted-foreground" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg text-muted-foreground">No Village Selected</h3>
//               <p className="text-sm text-muted-foreground">
//                 Select a district, sub-district, and village to view the map
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Legend */}
//       {villageData && (
//         <div className="absolute bottom-4 left-4 glass-panel rounded-lg px-3 py-2">
//           <div className="flex items-center gap-4 text-xs">
//             <div className="flex items-center gap-1.5">
//               <div className="w-3 h-3 rounded-sm bg-primary/40 border border-primary" />
//               <span className="text-muted-foreground">Village Boundary</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <div className="w-3 h-3 rounded-sm bg-success/40 border border-success" />
//               <span className="text-muted-foreground">Verified Plots</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <div className="w-3 h-3 rounded-sm bg-muted border border-border" />
//               <span className="text-muted-foreground">Unverified</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import { CheckCircle, XCircle, AlertCircle, Map } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import VillageMap from './MapView';
import type { VillageData, VerificationStatus, FeedbackType } from './village';
import { MapLoader } from './MapLoader';

interface VillageMapViewProps {
    villageData: VillageData | null;
    verificationStatus: VerificationStatus | null;
    currentStep: number;
    feedback: FeedbackType;
    onPlotClick?: ((plot: { surveyNumber: string }) => void) | null;
    mapLoading: boolean;
    onMapLoaded?: () => void;
    verifiedPlotMap: Record<
        string,
        { status: "correct" | "incorrect"; remarks?: string }
    >;

}

export const VillageMapView = ({
    villageData,
    verificationStatus,
    currentStep,
    feedback,
    onPlotClick,
    mapLoading,
    onMapLoaded,
    verifiedPlotMap,
}: VillageMapViewProps) => {
    const getStatusBadge = () => {
        if (verificationStatus?.status === 'correct') {
            return (
                <Badge className="bg-success/90 text-success-foreground gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified Correct
                </Badge>
            );
        }
        if (verificationStatus?.status === 'incorrect') {
            return (
                <Badge variant="destructive" className="gap-1.5">
                    <XCircle className="h-3.5 w-3.5" />
                    Verified Incorrect
                </Badge>
            );
        }
        if (verificationStatus?.status === 'Not Verified') {
            return (
                <Badge variant="outline" className="gap-1.5 border-warning text-warning">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Not Verified
                </Badge>
            );
        }
        return (
            // <Badge variant="outline" className="gap-1.5 text-muted-foreground">
            <Badge variant="outline" className="
    gap-1.5
    bg-white
    text-gray-800
    border border-gray-300
    shadow-sm
  ">
                <Map className="h-3.5 w-3.5" />
                Select Village
            </Badge>
        );
    };

    console.log(verificationStatus, "verificationStatus in VillageMapView");
    console.log(villageData, "villageData in VillageMapView");
    return (
        // <div className="relative h-full w-full rounded-xl overflow-hidden bg-muted/50">
        <div className="relative h-full w-full rounded-xl bg-muted/50">

            {/* Map Header Overlay */}
            <MapLoader isVisible={mapLoading} />



            {/* Actual Map */}
            {/* <div className="h-full w-full"> */}
            <div className="h-full w-full relative z-10">

                <VillageMap
                    villageData={villageData}
                    onPlotClick={currentStep === 3 ? onPlotClick : null}
                    verificationStatus={feedback}
                    verifiedPlotMap={verifiedPlotMap}
                    onMapLoaded={onMapLoaded}
                />
                <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center justify-between pointer-events-none">

                    <div className="pointer-events-auto">

                        <div className="
                        rounded-xl
                        px-4 py-3
                        flex items-center gap-3
                        bg-white
                        border border-gray-200
                        shadow-lg
                        ">

                            <Map className="h-4 w-4 text-primary" />

                            <div className="leading-tight">
                                <p className="text-xs font-medium text-sm/70">
                                    Village Map
                                </p>
                                <p className="text-sm font-semibold text-sm truncate max-w-[240px]">
                                    {verificationStatus?.name || villageData?.name || "No village selected"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-auto">
                        {getStatusBadge()}
                    </div>
                </div>
            </div>

            {/* Legend */}
            {/* {villageData && (
                <div className="absolute bottom-4 left-4 z-[1000] glass-panel rounded-lg px-3 py-2">
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-primary/40 border border-primary" />
                            <span className="text-muted-foreground">Village Boundary</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-success/40 border border-success" />
                            <span className="text-muted-foreground">Verified Plots</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-muted border border-border" />
                            <span className="text-muted-foreground">Unverified</span>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};
