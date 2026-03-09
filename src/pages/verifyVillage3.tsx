// import { Map } from 'lucide-react';
// import { LocationSelector } from '@/components/Verify/LocationSelector';
// import { VerificationPanel } from '@/components/Verify/VerificationPanel';
// import { VillageMapView } from '@/components/Verify/VillageMapView';
// import { LoadingOverlay } from '@/components/Verify/LoadingOverlay';
// import { useVillageVerification } from '@/hooks/useVillageVerification';
// import Navbar from '@/components/Navbar';
// import SearchableDropdown from '@/components/SearchableDropdown';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

// const VerifyVillage = () => {
//     const {
//         selectedDistrict,
//         selectedSubDistrict,
//         selectedVillage,
//         districts,
//         subDistricts,
//         villages,
//         villageData,
//         isVerified,
//         loading,
//         verificationStatus,
//         villagePlotCount,
//         currentStep,
//         timer,
//         feedback,
//         verifiedPlots,
//         setSelectedDistrict,
//         setSelectedSubDistrict,
//         setSelectedVillage,
//         setCurrentStep,
//         setTimerActive,
//         setFeedback,
//         handlePlotVerification,
//         handleFinalSubmit,
//     } = useVillageVerification();

//     return (
//         <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
//             {/* <div className="min-h-screen w-screen bg-background flex flex-col overflow-y-auto"> */}

//             <Navbar />
//             <LoadingOverlay isVisible={loading} />

//             {/* Header */}
//             <header className="flex-shrink-0 border-b bg-card/50 backdrop-blur-sm">
//                 <div className="px-4 py-3">
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
//                             <Map className="h-5 w-5 text-primary" />
//                         </div>
//                         <div>
//                             <h1 className="text-xl font-bold text-foreground">Verify Village Land</h1>
//                             <p className="text-xs text-muted-foreground">
//                                 Select location and verify village boundaries
//                             </p>
//                         </div>
//                     </div>



//                     {/* Location Selector */}
//                     <LocationSelector
//                         districts={districts}
//                         subDistricts={subDistricts}
//                         villages={villages}
//                         selectedDistrict={selectedDistrict}
//                         selectedSubDistrict={selectedSubDistrict}
//                         selectedVillage={selectedVillage}
//                         onDistrictChange={setSelectedDistrict}
//                         onSubDistrictChange={setSelectedSubDistrict}
//                         onVillageChange={setSelectedVillage}
//                         loading={loading}
//                     />
//                 </div>
//             </header>

//             {/* Main Content - Full Screen Map with Overlay Panel */}
//             <main className="flex-1 relative overflow-hidden">
//                 {/* <main className="relative overflow-hidden h-[calc(100vh-4rem)]"> */}
//                 {/* <main className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex-1"> */}
//                 {/* <main className="relative min-h-[120vh] overflow-visible"> */}

//                 {/* <div style={{border: '4px solid red', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 30}}> */}


//                 {/* Full Screen Map */}
//                 <VillageMapView
//                     villageData={villageData}
//                     verificationStatus={verificationStatus}
//                     currentStep={currentStep}
//                     feedback={feedback}
//                     onPlotClick={currentStep === 3 ? handlePlotVerification : null}
//                 />

//                 {/* </div> */}
//                 {/* Verification Panel - Floating Overlay */}
//                 <div className="absolute bottom-4 right-4 w-80 z-20">
//                     <VerificationPanel
//                         currentStep={currentStep}
//                         timer={timer}
//                         verificationStatus={verificationStatus}
//                         villagePlotCount={villagePlotCount}
//                         verifiedPlots={verifiedPlots}
//                         feedback={feedback}
//                         selectedVillage={selectedVillage}
//                         isVerified={isVerified}
//                         onNextStep={() => setCurrentStep(3)}
//                         onSetFeedback={setFeedback}
//                         onFinalSubmit={handleFinalSubmit}
//                         setTimerActive={setTimerActive}
//                         setCurrentStep={setCurrentStep}
//                     />
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default VerifyVillage;
import { Filter, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchableDropdown from "@/components/SearchableDropdown";
import { VerificationPanel } from "@/components/Verify/VerificationPanel";
import { VillageMapView } from "@/components/Verify/VillageMapView";
import { LoadingOverlay } from "@/components/Verify/LoadingOverlay";
import { useVillageVerification } from "@/hooks/useVillageVerification";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CardContent } from "@/components/ui/card";
import { verify } from "crypto";
import { useState } from "react";

const VerifyVillage = () => {
    const {
        selectedDistrict,
        selectedSubDistrict,
        selectedVillage,
        districts,
        subDistricts,
        villages,
        villageData,
        isVerified,
        loading,
        verificationStatus,
        villagePlotCount,
        currentStep,
        timer,
        feedback,
        verifiedPlots,
        selectedReason,
        mapLoading,
        user,
        verifiedPlotMap,
        isVerifyingPlot,
        verifyingPlotNumber,
        setMapLoading,
        setSelectedReason,
        setSelectedDistrict,
        setSelectedSubDistrict,
        setSelectedVillage,
        setCurrentStep,
        setTimerActive,
        setFeedback,
        handlePlotVerification,
        handleFinalSubmit,
    } = useVillageVerification();
    const role = user?.role;

    const canSeeDistrict =
        role === "Admin" || role === "Super Admin";

    const canSeeSubDistrict =
        role === "Admin" ||
        role === "Super Admin" ||
        role === "District";

    const canSeeVillage = true; // everyone sees village

    if (user.role == "Verifier") {
        // then only show the village selection card
    } else if (user.role == "Admin" || user.role == "Super Admin") {
        //then show everything
    } else if (user.role == "District") {
        // then show only subDistrict card and village selection card
    }

    // return (
    //     <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
    //         <Navbar />
    //         <LoadingOverlay isVisible={loading} />

    //         <header className="flex-shrink-0 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-30">
    //             <div className="px-4 py-3">
    //                 <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    //                     {/* LEFT — Title */}
    //                     <div className="flex items-center gap-3">
    //                         <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
    //                             <Map className="h-5 w-5 text-primary" />
    //                         </div>
    //                         <div>
    //                             <h1 className="text-xl font-bold text-foreground">
    //                                 Verify Village Land
    //                             </h1>
    //                             <p className="text-xs text-muted-foreground">
    //                                 Select location and verify village boundaries
    //                             </p>
    //                         </div>
    //                     </div>

    //                     {/* RIGHT — Horizontal Toolbar */}
    //                     {/* <div className="rounded-xl border bg-muted/40 backdrop-blur-sm shadow-sm px-4 py-3">
    //                         <div className="flex flex-wrap items-end gap-4">

    //                             District
    //                             <div className="flex flex-col w-[180px]">
    //                                 <span className="text-xs font-medium text-muted-foreground mb-1">
    //                                     District
    //                                 </span>
    //                                 <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
    //                                     <SelectTrigger className="h-9">
    //                                         <SelectValue placeholder="Select district" />
    //                                     </SelectTrigger>
    //                                     <SelectContent className="bg-popover">
    //                                         {districts.map((district) => (
    //                                             <SelectItem key={district.id} value={district.id}>
    //                                                 {district.name}
    //                                             </SelectItem>
    //                                         ))}
    //                                     </SelectContent>
    //                                 </Select>
    //                             </div>

    //                             Sub-District
    //                             <div className="flex flex-col w-[200px]">
    //                                 <span className="text-xs font-medium text-muted-foreground mb-1">
    //                                     Sub-District
    //                                 </span>
    //                                 <Select
    //                                     value={selectedSubDistrict}
    //                                     onValueChange={setSelectedSubDistrict}
    //                                     disabled={!selectedDistrict}
    //                                 >
    //                                     <SelectTrigger className="h-9">
    //                                         <SelectValue placeholder="Select sub-district" />
    //                                     </SelectTrigger>
    //                                     <SelectContent className="bg-popover">
    //                                         {subDistricts.map((sub) => (
    //                                             <SelectItem key={sub.id} value={sub.id}>
    //                                                 {sub.name}
    //                                             </SelectItem>
    //                                         ))}
    //                                     </SelectContent>
    //                                 </Select>
    //                             </div>

    //                             Village
    //                             <div className="flex flex-col w-[260px]">
    //                                 <span className="text-xs font-medium text-muted-foreground mb-1">
    //                                     Village
    //                                 </span>
    //                                 <SearchableDropdown
    //                                     id="village-header"
    //                                     options={villages}
    //                                     label="name"
    //                                     selectedVal={
    //                                         villages.find((v) => v.id === selectedVillage)?.name || ""
    //                                     }
    //                                     handleChange={(val) => {
    //                                         const selected = villages.find((v) => v.name === val);
    //                                         setSelectedVillage(selected ? selected.id : "");
    //                                     }}
    //                                     disabled={!selectedSubDistrict}
    //                                 />
    //                             </div>

    //                         </div>
    //                     </div> */}
    //                     {/* RIGHT — Horizontal Toolbar */}
    //                     <div className="rounded-xl border bg-muted/40 backdrop-blur-sm shadow-sm px-4 py-3">
    //                         <div className="flex flex-wrap items-end gap-4">

    //                             {/* District */}
    //                             {canSeeDistrict && (
    //                                 <div className="flex flex-col w-[180px]">
    //                                     <span className="text-xs font-medium text-muted-foreground mb-1">
    //                                         District
    //                                     </span>
    //                                     <Select
    //                                         value={selectedDistrict}
    //                                         onValueChange={setSelectedDistrict}
    //                                     >
    //                                         <SelectTrigger className="h-9">
    //                                             <SelectValue placeholder="Select district" />
    //                                         </SelectTrigger>
    //                                         <SelectContent className="bg-popover">
    //                                             {districts.map((district) => (
    //                                                 <SelectItem key={district.id} value={district.id}>
    //                                                     {district.name}
    //                                                 </SelectItem>
    //                                             ))}
    //                                         </SelectContent>
    //                                     </Select>
    //                                 </div>
    //                             )}

    //                             {/* Sub-District */}
    //                             {canSeeSubDistrict && (
    //                                 <div className="flex flex-col w-[200px]">
    //                                     <span className="text-xs font-medium text-muted-foreground mb-1">
    //                                         Sub-District
    //                                     </span>
    //                                     <Select
    //                                         value={selectedSubDistrict}
    //                                         onValueChange={setSelectedSubDistrict}
    //                                         disabled={!selectedDistrict && canSeeDistrict}
    //                                     >
    //                                         <SelectTrigger className="h-9">
    //                                             <SelectValue placeholder="Select sub-district" />
    //                                         </SelectTrigger>
    //                                         <SelectContent className="bg-popover">
    //                                             {subDistricts.map((sub) => (
    //                                                 <SelectItem key={sub.id} value={sub.id}>
    //                                                     {sub.name}
    //                                                 </SelectItem>
    //                                             ))}
    //                                         </SelectContent>
    //                                     </Select>
    //                                 </div>
    //                             )}

    //                             {/* Village */}
    //                             {canSeeVillage && (
    //                                 <div className="flex flex-col w-[260px]">
    //                                     <span className="text-xs font-medium text-muted-foreground mb-1">
    //                                         Village
    //                                     </span>
    //                                     <SearchableDropdown
    //                                         id="village-header"
    //                                         options={villages}
    //                                         label="name"
    //                                         selectedVal={
    //                                             villages.find((v) => v.id === selectedVillage)?.name || ""
    //                                         }
    //                                         handleChange={(val) => {
    //                                             const selected = villages.find((v) => v.name === val);
    //                                             setSelectedVillage(selected ? selected.id : "");
    //                                         }}
    //                                         disabled={
    //                                             canSeeSubDistrict && !selectedSubDistrict
    //                                         }
    //                                     />
    //                                 </div>
    //                             )}

    //                         </div>
    //                     </div>

    //                     {/* </CardContent> */}

    //                 </div>
    //             </div>
    //         </header>


    //         {/* Main Content */}
    //         {/* <main className="flex-1 relative overflow-hidden"> */}
    //         <main
    //             id="map-fullscreen-root"
    //             className="flex-1 relative overflow-hidden"
    //         >


    //             {/* Fullscreen Map */}
    //             <VillageMapView
    //                 villageData={villageData}
    //                 verificationStatus={verificationStatus}
    //                 currentStep={currentStep}
    //                 feedback={feedback}
    //                 onPlotClick={currentStep === 3 ? handlePlotVerification : null}
    //                 mapLoading={mapLoading}
    //                 onMapLoaded={() => setMapLoading(false)}
    //                 verifiedPlotMap={verifiedPlotMap}
    //             />
    //             {/* {isVerifyingPlot && verifyingPlotNumber && (
    //                 <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md">
    //                     <p className="text-sm text-gray-800">
    //                         Verifying plot number: <span className="font-semibold">{verifyingPlotNumber}</span>
    //                     </p>
    //                 </div>
    //             )  } */}
    //             {isVerifyingPlot && verifyingPlotNumber &&
    //                 (<div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1001]">
    //                     <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-pulse ring-2 ring-green-400/60">
    //                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //                         <span className="font-medium">
    //                             Verifying Plot {verifyingPlotNumber}...
    //                         </span>
    //                     </div>
    //                 </div>)
    //             }

    //             {/* Floating Verification Panel */}
    //             <div className="absolute bottom-4 left-4 w-80 z-20">

    //                 <VerificationPanel
    //                     currentStep={currentStep}
    //                     timer={timer}
    //                     verificationStatus={verificationStatus}
    //                     villagePlotCount={villagePlotCount}
    //                     verifiedPlots={verifiedPlots}
    //                     feedback={feedback}
    //                     selectedVillage={selectedVillage}
    //                     isVerified={isVerified}
    //                     selectedReason={selectedReason}        // ✅ ADD
    //                     setSelectedReason={setSelectedReason} // ✅ ADD
    //                     onNextStep={() => setCurrentStep(3)}
    //                     onSetFeedback={setFeedback}
    //                     onFinalSubmit={handleFinalSubmit}
    //                     setTimerActive={setTimerActive}
    //                     setCurrentStep={setCurrentStep}
    //                 />
    //             </div>
    //         </main>
    //     </div>
    // );

    return (
        <div className="h-screen w-screen overflow-hidden bg-background flex">

            {/* LEFT SIDEBAR */}
            {/* <Navbar /> */}
            {/* <Navbar
                    extraContent={
                        <div className="space-y-3">

                            <Select
                                value={selectedDistrict}
                                onValueChange={setSelectedDistrict}
                            >
                                <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="District" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districts.map(d => (
                                        <SelectItem key={d.id} value={d.id}>
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedSubDistrict}
                                onValueChange={setSelectedSubDistrict}
                            >
                                <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="Sub-District" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subDistricts.map(s => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <SearchableDropdown
                                id="village-nav"
                                options={villages}
                                label="name"
                                selectedVal={
                                    villages.find(v => v.id === selectedVillage)?.name || ""
                                }
                                handleChange={(val) => {
                                    const selected = villages.find(v => v.name === val);
                                    setSelectedVillage(selected ? selected.id : "");
                                }}
                            />

                        </div>
                    }
                /> */}

            <Navbar
                extraContent={
                    <div className="space-y-4">

                        {canSeeDistrict && (
                            <div className="flex flex-col">
                                <span className="text-xs mb-1">District</span>
                                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                                    <SelectTrigger className="h-8 text-xs">
                                        <SelectValue placeholder="Select district" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((district) => (
                                            <SelectItem key={district.id} value={district.id}>
                                                {district.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {canSeeSubDistrict && (
                            <div className="flex flex-col">
                                <span className="text-xs mb-1">Sub-District</span>
                                <Select
                                    value={selectedSubDistrict}
                                    onValueChange={setSelectedSubDistrict}
                                    disabled={!selectedDistrict && canSeeDistrict}
                                >
                                    <SelectTrigger className="h-8 text-xs">
                                        <SelectValue placeholder="Select sub-district" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subDistricts.map((sub) => (
                                            <SelectItem key={sub.id} value={sub.id}>
                                                {sub.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {canSeeVillage && (
                            <div className="flex flex-col">
                                <span className="text-xs mb-1">Village</span>
                                <SearchableDropdown
                                    id="village-nav"
                                    options={villages}
                                    label="name"
                                    selectedVal={
                                        villages.find((v) => v.id === selectedVillage)?.name || ""
                                    }
                                    handleChange={(val) => {
                                        const selected = villages.find((v) => v.name === val);
                                        setSelectedVillage(selected ? selected.id : "");
                                        const containerEl = document.getElementById("map-fullscreen-root");
                                        if (containerEl &&!document.fullscreenElement) {
                                            containerEl.requestFullscreen().catch((err) => {
                                                // If fullscreen request fails, fallback to scrolling
                                                console.log("Fullscreen request failed, scrolling to map instead.",err);
                                            })
                                        }
                                    }}
                                    disabled={canSeeSubDistrict && !selectedSubDistrict}
                                />
                            </div>
                        )}

                    </div>
                }
            />


            {/* RIGHT SIDE CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">

                <LoadingOverlay isVisible={loading} />

                {/* TOP HEADER */}
                <header className="flex-shrink-0 border-b bg-card/50 backdrop-blur-sm z-30">
                    <div className="px-2 py-1">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            {/* LEFT TITLE */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                                    <Map className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-foreground">
                                        Verify Village Land
                                    </h1>
                                    {/* <p className="text-xs text-muted-foreground">
                                        Select location and verify village boundaries
                                    </p> */}
                                </div>
                            </div>

                            {/* TOOLBAR */}
                            {/* <div className="rounded-xl border bg-muted/40 backdrop-blur-sm shadow-sm px-4 py-3">
                                <div className="flex flex-wrap items-end gap-4">

                                    {canSeeDistrict && (
                                        <div className="flex flex-col w-[180px]">
                                            <span className="text-xs mb-1">District</span>
                                            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Select district" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {districts.map((district) => (
                                                        <SelectItem key={district.id} value={district.id}>
                                                            {district.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {canSeeSubDistrict && (
                                        <div className="flex flex-col w-[200px]">
                                            <span className="text-xs mb-1">Sub-District</span>
                                            <Select
                                                value={selectedSubDistrict}
                                                onValueChange={setSelectedSubDistrict}
                                                disabled={!selectedDistrict && canSeeDistrict}
                                            >
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Select sub-district" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subDistricts.map((sub) => (
                                                        <SelectItem key={sub.id} value={sub.id}>
                                                            {sub.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {canSeeVillage && (
                                        <div className="flex flex-col w-[260px]">
                                            <span className="text-xs mb-1">Village</span>
                                            <SearchableDropdown
                                                id="village-header"
                                                options={villages}
                                                label="name"
                                                selectedVal={
                                                    villages.find((v) => v.id === selectedVillage)?.name || ""
                                                }
                                                handleChange={(val) => {
                                                    const selected = villages.find((v) => v.name === val);
                                                    setSelectedVillage(selected ? selected.id : "");
                                                }}
                                                disabled={canSeeSubDistrict && !selectedSubDistrict}
                                            />
                                        </div>
                                    )}

                                </div>
                            </div> */}
                            {/* FILTER CONTROL INSIDE MAP */}



                        </div>
                    </div>
                </header>

                {/* MAIN MAP AREA */}
                <main
                    id="map-fullscreen-root"
                    className="flex-1 relative overflow-hidden"
                >
                {/* <main id="map-fullscreen-root" className="flex-1 relative"> */}
                    <VillageMapView
                        villageData={villageData}
                        verificationStatus={verificationStatus}
                        currentStep={currentStep}
                        feedback={feedback}
                        onPlotClick={currentStep === 3 ? handlePlotVerification : null}
                        mapLoading={mapLoading}
                        onMapLoaded={() => setMapLoading(false)}
                        verifiedPlotMap={verifiedPlotMap}
                    />

                    {isVerifyingPlot && verifyingPlotNumber && (
                        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1001]">
                            <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-pulse">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying Plot {verifyingPlotNumber}...
                            </div>
                        </div>
                    )}

                    {/* FLOATING PANEL */}
                    <div className="absolute bottom-4 left-4 w-80 z-20">
                        <VerificationPanel
                            currentStep={currentStep}
                            timer={timer}
                            verificationStatus={verificationStatus}
                            villagePlotCount={villagePlotCount}
                            verifiedPlots={verifiedPlots}
                            feedback={feedback}
                            selectedVillage={selectedVillage}
                            isVerified={isVerified}
                            selectedReason={selectedReason}
                            setSelectedReason={setSelectedReason}
                            onNextStep={() => setCurrentStep(3)}
                            onSetFeedback={setFeedback}
                            onFinalSubmit={handleFinalSubmit}
                            setTimerActive={setTimerActive}
                            setCurrentStep={setCurrentStep}
                        />
                    </div>
                </main>

            </div>
        </div>
    );

};

export default VerifyVillage;