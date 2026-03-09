import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { VillageData, FeedbackType } from './village';

interface VillageMapProps {
  villageData: VillageData | null;
  onPlotClick?: ((plot: { surveyNumber: string }) => void) | null;
  verificationStatus: FeedbackType;
  verifiedPlotMap: Record<
    string,
    { status: "correct" | "incorrect"; remarks?: string }
  >;
  onMapLoaded?: () => void;
}

// const VillageMap = ({ villageData, onPlotClick, verificationStatus, verifiedPlotMap, onMapLoaded }: VillageMapProps) => {
//   const mapRef = useRef<L.Map | null>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const plotLayersRef = useRef<Record<string, { layer: L.Polygon; plotId: string; plot: any }>>({});
//   const getVerifiedInfo = (surveyNo: string) => {
//     return verifiedPlotMap?.[String(surveyNo)] || null;
//   };

//   const villageCheck = !villageData || villageData === null;

//   // Initialize map only once
//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);
//     mapRef.current.zoomControl.setPosition('bottomright');

//     L.tileLayer(
//       'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//       {
//         attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
//         maxZoom: 18,
//       }
//     ).addTo(mapRef.current);

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [villageCheck]);

//   // Render plots only when villageData changes
//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Clear previous polygon & marker layers
//     mapRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Polygon || layer instanceof L.Marker) {
//         mapRef.current?.removeLayer(layer);
//       }
//     });

//     // Clear plot layer references
//     plotLayersRef.current = {};

//     // Draw village boundary
//     if (villageData?.villageBoundary2?.geometry) {
//       const coords = villageData.villageBoundary2.geometry.coordinates;
//       const ring = coords[0];
//       const latLngPolygon = ring.map(([lng, lat]: [number, number]) => [lat, lng] as L.LatLngTuple);

//       L.polygon(latLngPolygon, {
//         color: 'black',
//         weight: 3,
//         fillOpacity: 0,
//       }).addTo(mapRef.current);
//     }

//     // If villageData is null or has no plots, just return after cleanup
//     if (!villageData?.plots?.length) return;

//     const allLatLngs: L.LatLngTuple[] = [];

//     villageData.plots.forEach((plot) => {
//       const polygons = plot.geometry.coordinates.map((poly: any) =>
//         poly.map((ring: any) => ring.map(([lng, lat]: [number, number]) => [lat, lng] as L.LatLngTuple))
//       );

//       polygons.forEach((polygon: L.LatLngTuple[][], polyIndex: number) => {
//         const polygonLayer = L.polygon(polygon, {
//           color: 'orange',
//           weight: 2,
//           fillOpacity: 0.1,
//         }).addTo(mapRef.current!);

//         // Store reference to this layer
//         const layerKey = `${plot.id || plot.surveyNumber}-${polyIndex}`;
//         plotLayersRef.current[layerKey] = {
//           layer: polygonLayer,
//           plotId: plot.id || plot.surveyNumber,
//           plot: plot
//         };

//         // Enable click only if onPlotClick is provided
//         if (onPlotClick) {
//           polygonLayer.on('click', () => {
//             if (verificationStatus === 'correct') {
//               polygonLayer.setStyle({
//                 color: 'green',
//                 fillOpacity: 0.3,
//               });
//             } else if (verificationStatus === 'incorrect') {
//               polygonLayer.setStyle({
//                 color: 'red',
//                 fillOpacity: 0.3,
//               });
//             }
//             onPlotClick(plot);
//           });
//           (polygonLayer.getElement() as HTMLElement)?.style.setProperty('cursor', 'pointer');
//         }

//         // Add marker at polygon center
//         const center = polygonLayer.getBounds().getCenter();
//         L.marker(center, {
//           icon: L.divIcon({
//             className: 'plot-marker',
//             html: `<div style="color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${plot.surveyNumber}</div>`,
//             iconSize: [30, 20],
//           }),
//         }).addTo(mapRef.current!);

//         allLatLngs.push(...polygon.flat());
//       });
//     });

//     // Fit map bounds to show all polygons
//     if (allLatLngs.length > 0) {
//       const bounds = L.latLngBounds(allLatLngs);
//       mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [villageData]);

//   useEffect(() => {
//     if (villageData && onMapLoaded) {
//       const timer = setTimeout(() => {
//         if (onMapLoaded) {
//           onMapLoaded();
//         }
//       }, 800);
//       return ()=> clearTimeout(timer)
//     }
//   }, [villageData, onMapLoaded]);
//   // Update click handlers when onPlotClick changes
//   useEffect(() => {
//     if (!mapRef.current) return;

//     Object.values(plotLayersRef.current).forEach(({ layer, plot }) => {
//       layer.off('click');

//       if (onPlotClick) {
//         layer.on('click', () => {
//           if (verificationStatus === 'correct') {
//             layer.setStyle({
//               color: 'green',
//               fillOpacity: 0.3,
//             });
//           } else if (verificationStatus === 'incorrect') {
//             layer.setStyle({
//               color: 'red',
//               fillOpacity: 0.3,
//             });
//           }
//           onPlotClick(plot);
//         });
//         (layer.getElement() as HTMLElement)?.style.setProperty('cursor', 'pointer');
//       } else {
//         (layer.getElement() as HTMLElement)?.style.setProperty('cursor', 'default');
//       }
//     });
//   }, [onPlotClick, verificationStatus]);

//   return (
//     <div
//       ref={mapContainerRef}
//       className="w-full h-full min-h-[500px] rounded-xl"
//       style={{ zIndex: 0 }}
//     />
//   );
// };

// export default VillageMap;

// wokring at some case lagging issue downward
// const VillageMap = ({
//   villageData,
//   onPlotClick,
//   verificationStatus,
//   verifiedPlotMap,
//   onMapLoaded,
// }: VillageMapProps) => {
//   const mapRef = useRef<L.Map | null>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);

//   const plotLayersRef = useRef<
//     Record<
//       string,
//       { layer: L.Polygon; plotId: string; plot: any }
//     >
//   >({});

//   const getVerifiedInfo = (surveyNo: string) => {
//     console.log(verifiedPlotMap?.[String(surveyNo)],"__verfiedPlotMap__");
//     return verifiedPlotMap?.[String(surveyNo)] || null;
//   };

//   const villageCheck = !villageData || villageData === null;

//   // -------------------------------
//   // INIT MAP (ONCE)
//   // -------------------------------
//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     mapRef.current = L.map(mapContainerRef.current, {
//       preferCanvas: true,
//     }).setView([27.1767, 78.0081], 13);

//     mapRef.current.zoomControl.setPosition("bottomright");

//     L.tileLayer(
//       "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//       {
//         attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
//         maxZoom: 18,
//       }
//     ).addTo(mapRef.current);

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [villageCheck]);

//   // -------------------------------
//   // DRAW PLOTS
//   // -------------------------------
//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Clear old layers
//     mapRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Polygon || layer instanceof L.Marker) {
//         mapRef.current?.removeLayer(layer);
//       }
//     });

//     plotLayersRef.current = {};

//     // Draw village boundary
//     if (villageData?.villageBoundary2?.geometry) {
//       const coords = villageData.villageBoundary2.geometry.coordinates;
//       const ring = coords[0];

//       const latLngPolygon = ring.map(
//         ([lng, lat]: [number, number]) =>
//           [lat, lng] as L.LatLngTuple
//       );

//       L.polygon(latLngPolygon, {
//         color: "black",
//         weight: 3,
//         fillOpacity: 0,
//         interactive: false,
//       }).addTo(mapRef.current);
//     }

//     // if (!villageData?.plots?.length) return;
//     if (!villageData?.plots?.length) {
//       // Still try to fit village boundary if available
//       if (villageData?.villageBoundary2?.geometry) {
//         const coords = villageData.villageBoundary2.geometry.coordinates[0];
//         const latLngs = coords.map(
//           ([lng, lat]: [number, number]) => [lat, lng] as L.LatLngTuple
//         );
//         const bounds = L.latLngBounds(latLngs);
//         mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//       }
//       return;
//     }

//     const allLatLngs: L.LatLngTuple[] = [];

//     villageData.plots.forEach((plot) => {
//       if (
//         !plot?.geometry ||
//         !Array.isArray(plot.geometry.coordinates) ||
//         plot.geometry.coordinates.length === 0
//       ) {
//         console.warn("Skipping plot without geometry:", plot?.surveyNumber);
//         return;
//       }
//       const polygons = plot.geometry.coordinates.map((poly: any) =>
//         poly.map((ring: any) =>
//           ring.map(
//             ([lng, lat]: [number, number]) =>
//               [lat, lng] as L.LatLngTuple
//           )
//         )
//       );

//       polygons.forEach((polygon: L.LatLngTuple[][], polyIndex: number) => {
//         const surveyNo = String(plot.surveyNumber);
//         // const verified = getVerifiedInfo(surveyNo);
//         const verified =
//           verifiedPlotMap &&
//             Object.keys(verifiedPlotMap).length > 0
//             ? getVerifiedInfo(surveyNo)
//             : null;

//         // -----------------------
//         // STYLE BASED ON STATUS
//         // -----------------------
//         const baseColor = verified
//           ? verified.status === "correct"
//             ? "green"
//             : "red"
//           : "orange";

//         const polygonLayer = L.polygon(polygon, {
//           color: baseColor,
//           weight: 2,
//           fillOpacity: verified ? 0.35 : 0.1,
//           // interactive: !verified, // 🔒 LOCK verified plots
//         }).addTo(mapRef.current!);

//         const layerKey = `${plot.id || plot.surveyNumber}-${polyIndex}`;
//         plotLayersRef.current[layerKey] = {
//           layer: polygonLayer,
//           plotId: plot.id || plot.surveyNumber,
//           plot,
//         };

//         // -----------------------
//         // CLICK HANDLER
//         // -----------------------
//         // if (!verified && onPlotClick) {
//         //   polygonLayer.on("click", () => {
//         //     if (verificationStatus === "correct") {
//         //       polygonLayer.setStyle({
//         //         color: "green",
//         //         fillOpacity: 0.35,
//         //       });
//         //     } else if (verificationStatus === "incorrect") {
//         //       polygonLayer.setStyle({
//         //         color: "red",
//         //         fillOpacity: 0.35,
//         //       });
//         //     }

//         //     onPlotClick(plot);
//         //   });

//         //   (polygonLayer.getElement() as HTMLElement)?.style.setProperty(
//         //     "cursor",
//         //     "pointer"
//         //   );
//         // } else {
//         //   (polygonLayer.getElement() as HTMLElement)?.style.setProperty(
//         //     "cursor",
//         //     "not-allowed"
//         //   );
//         // }
//         if (onPlotClick && !verified) {
//           polygonLayer.on("click", () => {
//             if (verificationStatus === "correct") {
//               polygonLayer.setStyle({
//                 color: "green",
//                 fillOpacity: 0.35,
//               });
//             } else if (verificationStatus === "incorrect") {
//               polygonLayer.setStyle({
//                 color: "red",
//                 fillOpacity: 0.35,
//               });
//             }

//             // ✅ BACKEND SAFE FORMAT
//             onPlotClick({
//               surveyNumber: surveyNo
//             });
//           });

//           (polygonLayer.getElement() as HTMLElement)?.style.setProperty(
//             "cursor",
//             "pointer"
//           );
//         } else {
//           (polygonLayer.getElement() as HTMLElement)?.style.setProperty(
//             "cursor",
//             "not-allowed"
//           );
//         }


//         // -----------------------
//         // TOOLTIP FOR VERIFIED
//         // -----------------------
//         if (verified) {
//           polygonLayer.bindTooltip(
//             `
//             <div style="font-size:12px;">
//               <b>Survey:</b> ${surveyNo}<br/>
//               <b>Status:</b> ${verified.status.toUpperCase()}<br/>
//               <b>Reason:</b> ${verified.remarks || "—"}
//             </div>
//           `,
//             { sticky: true }
//           );
//         }

//         // -----------------------
//         // MARKER
//         // -----------------------
//         const center = polygonLayer.getBounds().getCenter();
//         const markerColor = verified
//           ? verified.status === "correct"
//             ? "#16a34a"
//             : "#dc2626"
//           : "#f97316";

//         L.marker(center, {
//           icon: L.divIcon({
//             className: "plot-marker",
//             // html: `
//             //   <div style="
//             //     background:${markerColor};
//             //     color:white;
//             //     padding:2px 6px;
//             //     border-radius:4px;
//             //     font-weight:bold;
//             //     font-size:11px;
//             //   ">

//             //     ${surveyNo}
//             //   </div>
//             // `,
//             html: `<div style="color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${surveyNo}</div>`,

//             iconSize: [30, 20],
//           }),
//         }).addTo(mapRef.current!);

//         allLatLngs.push(...polygon.flat());
//       });
//     });

//     if (allLatLngs.length > 0) {
//       const bounds = L.latLngBounds(allLatLngs);
//       mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [villageData, verifiedPlotMap]);

//   // -------------------------------
//   // MAP LOADED CALLBACK
//   // -------------------------------
//   useEffect(() => {
//     if (villageData && onMapLoaded) {
//       const timer = setTimeout(() => {
//         onMapLoaded();
//       }, 800);
//       return () => clearTimeout(timer);
//     }
//   }, [villageData, onMapLoaded]);

//   return (
//     <div
//       ref={mapContainerRef}
//       className="w-full h-full min-h-[500px] rounded-xl"
//       style={{ zIndex: 0 }}
//     />
//   );
// };

// export default VillageMap;

const VillageMap = ({
  villageData,
  onPlotClick,
  verificationStatus,
  verifiedPlotMap,
  onMapLoaded,
}: VillageMapProps) => {
  console.log(villageData, "__villageData__");
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const hasInitializedBounds = useRef(false);
  const currentVillageId = useRef<string | null>(null);
  const plotLayersRef = useRef<
    Record<
      string,
      { layer: L.Polygon; plotId: string; plot: any }
    >
  >({});
  const isInitialLoad = useRef(true);

  const getVerifiedInfo = (surveyNo: string) => {
    return verifiedPlotMap?.[String(surveyNo)] || null;
  };

  // -------------------------------
  // 🔧 FIX #5: INIT MAP ONCE (removed villageCheck dependency)
  // -------------------------------
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      preferCanvas: true,
    }).setView([27.1767, 78.0081], 13);

    mapRef.current.zoomControl.setPosition("bottomright");
    // mapRef.current.addControl(
    //   new (L.Control as any).FullScreen({
    //     position: "topright",
    //   })
    // );

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 18,
      }
    ).addTo(mapRef.current);
    // import("leaflet.fullscreen").then(() => {
    //   mapRef.current?.addControl(
    //     new (L.Control as any).FullScreen({
    //       position: "topright",
    //     })
    //   );
    // });
    // 🔵 LOAD FULLSCREEN CONTROL
    // 🔵 FULLSCREEN CONTROL (above zoom buttons)
    const FullscreenControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create("div", "leaflet-bar");

        const btn = L.DomUtil.create("a", "", container);
        btn.innerHTML = "⛶";
        btn.href = "#";
        btn.title = "Fullscreen";
        btn.style.fontSize = "18px";
        btn.style.textAlign = "center";
        btn.style.lineHeight = "30px";
        btn.style.width = "30px";
        btn.style.height = "30px";
        btn.style.background = "white";

        L.DomEvent.disableClickPropagation(btn);

        // btn.onclick = (e: any) => {
        //   e.preventDefault();
        //   // const mapContainer = mapRef.current?.getContainer();
        //   const mapContainer = document.getElementById("map-fullscreen-root");


        //   if (!document.fullscreenElement) {
        //     mapContainer?.requestFullscreen();
        //   } else {
        //     document.exitFullscreen();
        //   }
        // };
        btn.onclick = (e: any) => {
          e.preventDefault();

          const containerEl = document.getElementById("map-fullscreen-root");

          if (!document.fullscreenElement) {
            containerEl?.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        };

        // 🔵 LISTEN FOR FULLSCREEN CHANGE
        const updateIcon = () => {
          if (document.fullscreenElement) {
            btn.innerHTML = "⛶";   // collapse icon ※
            btn.title = "Exit fullscreen";
          } else {
            btn.innerHTML = "⛶";   // fullscreen icon
            btn.title = "Fullscreen";
          }
        };

        document.addEventListener("fullscreenchange", updateIcon);
        return container;
      },
    });

    mapRef.current.addControl(
      new FullscreenControl({ position: "bottomright" })
    );


    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // ✅ Only run once on mount

  useEffect(() => {
    const handleExit = () => {
      if (!document.fullscreenElement) {
        mapRef.current?.invalidateSize();
      }
    };

    document.addEventListener("fullscreenchange", handleExit);
    return () =>
      document.removeEventListener("fullscreenchange", handleExit);
  }, []);

  // -------------------------------
  // DRAW PLOTS (INITIAL RENDER)
  // -------------------------------
  useEffect(() => {
    if (!mapRef.current || !villageData) return;

    // Clear old layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    plotLayersRef.current = {};
    // hasInitializedBounds.current = false;
    const isNewVillage = currentVillageId.current !== villageData.lgdCode
    if (isNewVillage) {
      currentVillageId.current = villageData.lgdCode;
      hasInitializedBounds.current = true;
    }

    // Draw village boundary
    if (villageData?.villageBoundary2?.geometry) {
      const coords = villageData.villageBoundary2.geometry.coordinates;
      const ring = coords[0];

      const latLngPolygon = ring.map(
        ([lng, lat]: [number, number]) =>
          [lat, lng] as L.LatLngTuple
      );

      L.polygon(latLngPolygon, {
        color: "black",
        weight: 3,
        fillOpacity: 0,
        interactive: false,
      }).addTo(mapRef.current);
    }

    if (!villageData?.plots?.length) {
      if (villageData?.villageBoundary2?.geometry) {
        const coords = villageData.villageBoundary2.geometry.coordinates[0];
        const latLngs = coords.map(
          ([lng, lat]: [number, number]) => [lat, lng] as L.LatLngTuple
        );
        const bounds = L.latLngBounds(latLngs);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        isInitialLoad.current = false;
      }
      return;
    }

    const allLatLngs: L.LatLngTuple[] = [];

    villageData.plots.forEach((plot) => {
      if (
        !plot?.geometry ||
        !Array.isArray(plot.geometry.coordinates) ||
        plot.geometry.coordinates.length === 0
      ) {
        console.warn("Skipping plot without geometry:", plot?.surveyNumber);
        return;
      }

      const polygons = plot.geometry.coordinates.map((poly: any) =>
        poly.map((ring: any) =>
          ring.map(
            ([lng, lat]: [number, number]) =>
              [lat, lng] as L.LatLngTuple
          )
        )
      );

      polygons.forEach((polygon: L.LatLngTuple[][], polyIndex: number) => {
        const surveyNo = String(plot.surveyNumber);
        const verified =
          verifiedPlotMap &&
            Object.keys(verifiedPlotMap).length > 0
            ? getVerifiedInfo(surveyNo)
            : null;

        const baseColor = verified
          ? verified.status === "correct"
            ? "green"
            : "red"
          : "orange";

        const polygonLayer = L.polygon(polygon, {
          color: baseColor,
          weight: 2,
          fillOpacity: verified ? 0.35 : 0.1,
        }).addTo(mapRef.current!);

        // 🔧 FIX #7: Use surveyNumber consistently (not plot.id)
        const layerKey = `${plot.surveyNumber}-${polyIndex}`;
        plotLayersRef.current[layerKey] = {
          layer: polygonLayer,
          plotId: String(plot.surveyNumber), // ✅ Always use surveyNumber
          plot,
        };

        // 🔧 FIX #2: Check if THIS specific plot is verified
        if (onPlotClick && !verified) {
          polygonLayer.on("click", () => {
            if (verificationStatus === "correct") {
              polygonLayer.setStyle({
                color: "green",
                fillOpacity: 0.35,
              });
            } else if (verificationStatus === "incorrect") {
              polygonLayer.setStyle({
                color: "red",
                fillOpacity: 0.35,
              });
            }

            onPlotClick({
              surveyNumber: surveyNo
            });
          });

          (polygonLayer.getElement() as HTMLElement)?.style.setProperty(
            "cursor",
            "pointer"
          );
        } else {
          (polygonLayer.getElement() as HTMLElement)?.style.setProperty(
            "cursor",
            "not-allowed"
          );
        }

        if (verified) {
          polygonLayer.bindTooltip(
            `
            <div style="font-size:12px;">
              <b>Survey:</b> ${surveyNo}<br/>
              <b>Status:</b> ${verified.status.toUpperCase()}<br/>
              <b>Reason:</b> ${verified.remarks || "—"}
            </div>
          `,
            { sticky: true }
          );
        }

        const center = polygonLayer.getBounds().getCenter();
        const markerColor = verified
          ? verified.status === "correct"
            ? "#16a34a"
            : "#dc2626"
          : "#f97316";

        L.marker(center, {
          icon: L.divIcon({
            className: "plot-marker",
            html: `<div style="color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${surveyNo}</div>`,
            iconSize: [30, 20],
          }),
        }).addTo(mapRef.current!);

        allLatLngs.push(...polygon.flat());
      });
    });

    // 🔧 FIX #3: Only fit bounds once
    // if (allLatLngs.length > 0 && !hasInitializedBounds.current) {
    //   const bounds = L.latLngBounds(allLatLngs);
    //   mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    //   hasInitializedBounds.current = true;
    // }

    // if (allLatLngs.length > 0 && isInitialLoad.current) {
    //   const bounds = L.latLngBounds(allLatLngs);
    //   mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    //   isInitialLoad.current = false;
    // }else if (isInitialLoad.current === false){
    //   console.log("Skipping fitbounds on subsequent loads");
    // }
    if (allLatLngs.length > 0 && isNewVillage) {
      const bounds = L.latLngBounds(allLatLngs);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [villageData, onPlotClick, verificationStatus]);

  // -------------------------------
  // 🔧 FIX #3: UPDATE STYLES ONLY (no re-rendering)
  // -------------------------------
  useEffect(() => {
    if (!mapRef.current || !villageData?.plots) return;

    Object.entries(plotLayersRef.current).forEach(([layerKey, { layer, plot }]) => {
      const surveyNo = String(plot.surveyNumber);
      const verified = verifiedPlotMap?.[surveyNo] || null;

      const newColor = verified
        ? verified.status === "correct"
          ? "green"
          : "red"
        : "orange";

      layer.setStyle({
        color: newColor,
        fillOpacity: verified ? 0.35 : 0.1,
      });

      if (verified) {
        (layer.getElement() as HTMLElement)?.style.setProperty(
          "cursor",
          "not-allowed"
        );

        layer.bindTooltip(
          `
          <div style="font-size:12px;">
            <b>Survey:</b> ${surveyNo}<br/>
            <b>Status:</b> ${verified.status.toUpperCase()}<br/>
            <b>Reason:</b> ${verified.remarks || "—"}
          </div>
        `,
          { sticky: true }
        );
      } else if (onPlotClick) {
        (layer.getElement() as HTMLElement)?.style.setProperty(
          "cursor",
          "pointer"
        );
        layer.unbindTooltip();
      }
    });
  }, [verifiedPlotMap, villageData?.plots, onPlotClick]);

  useEffect(() => {
    if (villageData && onMapLoaded) {
      const timer = setTimeout(() => {
        onMapLoaded();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [villageData, onMapLoaded]);
  // -------------------------------
  // RESET MAP WHEN VILLAGE CLEARS
  // -------------------------------
  useEffect(() => {
    if (!mapRef.current) return;

    if (!villageData) {
      // Remove only vector layers (keep tiles)
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Reset view
      mapRef.current.setView([27.1767, 78.0081], 13);

      // Reset village tracking
      currentVillageId.current = null;
    }
  }, [villageData]);


  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full min-h-[500px] rounded-xl"
      style={{ zIndex: 1 }}
    />
  );


};

export default VillageMap;


