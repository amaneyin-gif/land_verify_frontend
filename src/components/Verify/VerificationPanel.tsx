// import { CheckCircle, XCircle, AlertCircle, Timer, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import type { VerificationStatus, PlotCount, FeedbackType } from './village';

// interface VerificationPanelProps {
//   currentStep: number;
//   timer: number;
//   verificationStatus: VerificationStatus | null;
//   villagePlotCount: PlotCount | null;
//   verifiedPlots: number;
//   feedback: FeedbackType;
//   selectedVillage: string;
//   isVerified: boolean;
//   onNextStep: () => void;
//   onSetFeedback: (feedback: FeedbackType) => void;
//   onFinalSubmit: () => void;
//   setTimerActive: (active: boolean) => void;
//   setCurrentStep: (step: number) => void;
// }

// export const VerificationPanel = ({
//   currentStep,
//   timer,
//   verificationStatus,
//   villagePlotCount,
//   verifiedPlots,
//   feedback,
//   selectedVillage,
//   isVerified,
//   onNextStep,
//   onSetFeedback,
//   onFinalSubmit,
//   setTimerActive,
//   setCurrentStep,
// }: VerificationPanelProps) => {
//   const isDisabled = !selectedVillage || 
//     verificationStatus?.status === 'correct' || 
//     verificationStatus?.status === 'incorrect';

//   const renderStepIndicator = () => {
//     if (currentStep === 0 || isVerified) return null;

//     return (
//       <div className="flex items-center gap-2 mb-4">
//         {[1, 2, 3, 4].map((step) => (
//           <div
//             key={step}
//             className={`h-1.5 flex-1 rounded-full transition-colors ${
//               step <= currentStep ? 'bg-primary' : 'bg-muted'
//             }`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const renderContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-3">
//             {verificationStatus?.status === 'correct' ? (
//               <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
//                 <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
//                 <p className="text-sm font-medium text-success">
//                   Village verified as <strong>Correct</strong>
//                 </p>
//               </div>
//             ) : verificationStatus?.status === 'incorrect' ? (
//               <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
//                 <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
//                 <p className="text-sm font-medium text-destructive">
//                   Village verified as <strong>Incorrect</strong>
//                 </p>
//               </div>
//             ) : null}
//           </div>
//         );

//       case 1:
//         return (
//           <div className="space-y-4">
//             <p className="text-sm text-muted-foreground text-white">
//               Ready to verify the village map? Click below to begin the process.
//             </p>
//             <Button 
//               onClick={() => { setCurrentStep(2); setTimerActive(true); }}
//               disabled={isDisabled}
//               className="w-full gap-2"
//             >
//               Start Verification
//               <ArrowRight className="h-4 w-4" />
//             </Button>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
//               <Timer className="h-5 w-5 text-warning flex-shrink-0 animate-pulse-subtle" />
//               <div>
//                 <p className="text-sm font-medium">
//                   Time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
//                 </p>
//                 <p className="text-xs text-muted-foreground">Observe the map carefully</p>
//               </div>
//             </div>

//             {timer <= 0 && (
//               <div className="space-y-4 animate-fade-in">
//                 <p className="text-sm font-medium">How was the village map?</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   <Button
//                     variant={feedback === 'correct' ? 'default' : 'outline'}
//                     onClick={() => onSetFeedback('correct')}
//                     className="gap-2"
//                   >
//                     <CheckCircle className="h-4 w-4" />
//                     Correct
//                   </Button>
//                   <Button
//                     variant={feedback === 'incorrect' ? 'destructive' : 'outline'}
//                     onClick={() => onSetFeedback('incorrect')}
//                     className="gap-2"
//                   >
//                     <XCircle className="h-4 w-4" />
//                     Incorrect
//                   </Button>
//                 </div>
//                 {feedback && (
//                   <Button onClick={onNextStep} className="w-full gap-2">
//                     Continue
//                     <ArrowRight className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>
//             )}
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <p className="text-sm font-medium">
//                 Mark at least <Badge variant="secondary">{villagePlotCount?.mandatoryPlots || 5}</Badge> plots as{' '}
//                 <span className={feedback === 'correct' ? 'text-success' : 'text-destructive'}>
//                   {feedback === 'correct' ? 'Correct' : 'Incorrect'}
//                 </span>
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 Click on plots in the map to verify them
//               </p>
//             </div>

//             <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
//               <span className="text-sm text-muted-foreground">Verified plots</span>
//               <Badge variant="outline" className="font-mono">
//                 {verifiedPlots} / {villagePlotCount?.mandatoryPlots || 5}
//               </Badge>
//             </div>

//             {verifiedPlots >= (villagePlotCount?.mandatoryPlots || 5) && (
//               <Button 
//                 onClick={() => { setCurrentStep(4); setTimerActive(true); }}
//                 disabled={!selectedVillage}
//                 className="w-full gap-2 animate-fade-in"
//               >
//                 Continue to Submit
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
//               <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
//               <div>
//                 <p className="text-sm font-medium text-success">Ready to submit</p>
//                 <p className="text-xs text-muted-foreground">All requirements met</p>
//               </div>
//             </div>
//             <Button 
//               onClick={onFinalSubmit}
//               disabled={isDisabled}
//               className="w-full"
//             >
//               Submit Village Survey
//             </Button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="glass-panel rounded-xl p-4 animate-slide-up">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-semibold text-sm text-white">
//           {isVerified ? 'Verification Status' : 'Village Verification'}
//         </h3>
//         {!isVerified && currentStep > 0 && currentStep <= 4 && (
//           <Badge variant="outline" className="text-xs text-white">
//             Step {currentStep} of 4
//           </Badge>
//         )}
//       </div>
//       {renderStepIndicator()}
//       {renderContent()}
//     </div>
//   );
// };


import { CheckCircle, XCircle, AlertCircle, Timer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { VerificationStatus, PlotCount, FeedbackType } from './village';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
const incorrectReasons = [
    "Distorted",
    "Shifted Left",
    "Shifted Right",
    "Shifted Upward",
    "Shifted Downward"
]


interface VerificationPanelProps {
    currentStep: number;
    timer: number;
    verificationStatus: VerificationStatus | null;
    villagePlotCount: PlotCount | null;
    verifiedPlots: number;
    feedback: FeedbackType;
    selectedVillage: string;
    isVerified: boolean;

    selectedReason: string                 // ✅ ADD
    setSelectedReason: (val: string) => void // ✅ ADD
    onNextStep: () => void;
    onSetFeedback: (feedback: FeedbackType) => void;
    onFinalSubmit: () => void;
    setTimerActive: (active: boolean) => void;
    setCurrentStep: (step: number) => void;
}

export const VerificationPanel = ({
    currentStep,
    timer,
    verificationStatus,
    villagePlotCount,
    verifiedPlots,
    feedback,
    selectedVillage,
    isVerified,
    selectedReason,                 // ✅ ADD
    setSelectedReason,             // ✅ ADD
    onNextStep,
    onSetFeedback,
    onFinalSubmit,
    setTimerActive,
    setCurrentStep,
}: VerificationPanelProps) => {
    // const isDisabled = !selectedVillage ||
    //     verificationStatus?.status === 'correct' ||
    //     verificationStatus?.status === 'incorrect';
    const isDisabled = !selectedVillage || isVerified;

    const renderStepIndicator = () => {
        if (currentStep === 0 || isVerified) return null;
const fullscreenRoot = () => document.getElementById("map-fullscreen-root");
        return (
            <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4].map((step) => (
                    <div
                        key={step}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${step <= currentStep ? 'bg-primary' : 'bg-muted'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const renderContent = () => {
        console.log(currentStep, "__current step from renderContent")
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-3">
                        {verificationStatus?.status === 'correct' ? (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                                <p className="text-sm font-medium text-success">
                                    Village verified as <strong>Correct</strong>
                                </p>
                            </div>
                        ) : verificationStatus?.status === 'incorrect' ? (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                                <p className="text-sm font-medium text-destructive">
                                    Village verified as <strong>Incorrect</strong>
                                </p>
                            </div>
                        ) : null}
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Ready to verify the village map? Click below to begin the process.
                        </p>
                        <Button
                            onClick={() => { setCurrentStep(2); setTimerActive(true); }}
                            disabled={isDisabled}
                            className="w-full gap-2"
                        >
                            Start Verification
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                            <Timer className="h-5 w-5 text-warning flex-shrink-0 animate-pulse-subtle" />
                            <div>
                                <p className="text-sm font-medium">
                                    Time remaining: {Math.floor(timer / 60)}:
                                    {String(timer % 60).padStart(2, "0")}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Observe the map carefully
                                </p>
                            </div>
                        </div>

                        {timer <= 0 && (
                            <div className="space-y-4 animate-fade-in">
                                <p className="text-sm font-medium">
                                    How was the village map?
                                </p>

                                {/* Correct / Incorrect Buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant={feedback === "correct" ? "default" : "outline"}
                                        onClick={() => {
                                            onSetFeedback("correct")
                                            setSelectedReason("") // ✅ reset reason
                                        }}
                                        disabled={verifiedPlots > 0}
                                        className="gap-2"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Correct
                                    </Button>

                                    <Button
                                        variant={feedback === "incorrect" ? "destructive" : "outline"}
                                        onClick={() => onSetFeedback("incorrect")}
                                        disabled={verifiedPlots > 0 || isVerified}
                                        className="gap-2"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Incorrect
                                    </Button>
                                </div>

                                {/* Reason Dropdown (Only when Incorrect) */}
                                {feedback === "incorrect" && (
                                    <div className="space-y-2 animate-fade-in">
                                        <p className="text-xs text-white/70">
                                            Select a reason
                                        </p>

                                        <Select
                                            disabled={verifiedPlots > 0}
                                            value={selectedReason}
                                            onValueChange={(val) => setSelectedReason(val)}
                                        >
                                            <SelectTrigger
                                            >
                                                <SelectValue placeholder="Select reason" />
                                            </SelectTrigger>

                                            <SelectContent 
                                            className="bg-popover"
                                            container={document.getElementById("map-fullscreen-root") ?? document.body}>
                                                {/* Disabled placeholder option */}
                                                {/* <SelectItem value="__placeholder" >
                                                    Select reason
                                                </SelectItem> */}

                                                {incorrectReasons.map((reason) => (
                                                    <SelectItem key={reason} value={reason}>
                                                        {reason}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Continue Button */}
                                <Button
                                    onClick={onNextStep}
                                    disabled={
                                        !feedback ||
                                        (feedback === "incorrect" && !selectedReason)
                                    }
                                    className="w-full gap-2"
                                >
                                    Continue
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )


            case 3:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                Mark at least <Badge variant="secondary">{villagePlotCount?.mandatoryPlots || 5}</Badge> plots as{' '}
                                <span className={feedback === 'correct' ? 'text-success' : 'text-destructive'}>
                                    {feedback === 'correct' ? 'Correct' : 'Incorrect'}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Click on plots in the map to verify them
                            </p>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                            <span className="text-sm text-muted-foreground">Verified plots</span>
                            <Badge variant="outline" className="font-mono">
                                {verifiedPlots} / {villagePlotCount?.mandatoryPlots || 5}
                            </Badge>
                        </div>

                        {verifiedPlots >= (villagePlotCount?.mandatoryPlots || 5) && (
                            <Button
                                onClick={() => { setCurrentStep(4); setTimerActive(true); }}
                                disabled={!selectedVillage}
                                className="w-full gap-2 animate-fade-in"
                            >
                                Continue to Submit
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-success">Ready to submit</p>
                                <p className="text-xs text-muted-foreground">All requirements met</p>
                            </div>
                        </div>
                        <Button
                            onClick={onFinalSubmit}
                            disabled={isDisabled}
                            className="w-full"
                        >
                            Submit Village Survey
                        </Button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (

        // <div className="glass-panel rounded-xl p-4 animate-slide-up">
        //         <div
        //             className="
        //     rounded-2xl
        //     p-4
        //     animate-slide-up
        //     bg-white/15
        //     backdrop-blur-md
        //     border border-white/15
        //     shadow-xl
        //     pointer-events-auto
        //   "
        //         >
        <div
            className="
    rounded-2xl
    p-4
    animate-slide-up
    bg-white
    border border-gray-200
    shadow-xl
    pointer-events-auto
  "
        >


            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">
                    {isVerified ? 'Verification Status' : 'Village Verification'}
                </h3>
                {!isVerified && currentStep > 0 && currentStep <= 4 && (
                    <Badge variant="outline" className="text-xs">
                        Step {currentStep} of 4
                    </Badge>
                )}
            </div>
            {renderStepIndicator()}
            {renderContent()}
        </div>
    );
};
