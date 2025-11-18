// import { useEffect, useRef, useState } from 'react';
// import React from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const VillageMap = ({ villageData ,onPlotClick}) => {
//   const mapRef = useRef(null);
//   const mapContainerRef = useRef(null);


//   // Utility: Convert GeoJSON [lng, lat] → [lat, lng]
//   const convertCoordinates = (coords) => {
//     if (typeof coords[0] === "number") {
//       return [coords[1], coords[0]];
//     }
//     return coords.map(convertCoordinates);
//   };

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize map
//     if (!mapRef.current) {
//       mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);

//       // ✅ Move zoom control to bottom-right
//       mapRef.current.zoomControl.setPosition('topright');
//       // Satellite tile layer
//       L.tileLayer(
//         'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//         {
//           attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
//           maxZoom: 18,
//         }
//       ).addTo(mapRef.current);
//     }

//     // Clear previous layers
//     if (mapRef.current) {
//       mapRef.current.eachLayer((layer) => {
//         if (layer instanceof L.Polygon || layer instanceof L.Marker) {
//           mapRef.current?.removeLayer(layer);
//         }
//       });
//     }

//     // Render plots
//       if (villageData?.plots?.length > 0 && mapRef.current) {
//         const allLatLngs = [];

//         villageData.plots.forEach((plot) => {
//           // Convert MultiPolygon to array of polygons for Leaflet
//           const polygons = plot.geometry.coordinates.map((poly) =>
//             poly.map((ring) => ring.map(([lng, lat]) => [lat, lng]))
//           );

//           polygons.forEach((polygon) => {
//             const polygonLayer = L.polygon(polygon, {
//               color: 'orange', weight: 2, fillOpacity: 0.10
//             }).addTo(mapRef.current);

//             // Marker at polygon center with survey number
//             const center = polygonLayer.getBounds().getCenter();
//             L.marker(center, {
//               icon: L.divIcon({
//                 className: 'plot-marker',
//                 html: `<div style=" color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${plot.surveyNumber}</div>`,
//                 iconSize: [30, 20],
//               }),
//             }).addTo(mapRef.current);

//             allLatLngs.push(...polygon.flat());
//           });
//         });

//         // Fit map to show all polygons
//         if (allLatLngs.length > 0) {
//           const bounds = L.latLngBounds(allLatLngs);
//           mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//         }
//       }
//       // Small delay to make loader smoother

//   }, [villageData]);

//   return (
//     <div
//       ref={mapContainerRef}
//       className="w-full h-[500px] lg:h-[600px] rounded-b-lg"
//       style={{ zIndex: 0 }}
//     />
//   );
// };

// export default VillageMap;


// ==== with plot click handler downward ====

// import { useEffect, useRef } from 'react';
// import React from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const VillageMap = ({ villageData, onPlotClick }) => {
//   const mapRef = useRef(null);
//   const mapContainerRef = useRef(null);

//   // Utility: Convert GeoJSON [lng, lat] → [lat, lng]
//   const convertCoordinates = (coords) => {
//     if (typeof coords[0] === "number") {
//       return [coords[1], coords[0]];
//     }
//     return coords.map(convertCoordinates);
//   };

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize map only once
//     if (!mapRef.current) {
//       mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);
//       mapRef.current.zoomControl.setPosition('topright');

//       L.tileLayer(
//         'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//         {
//           attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
//           maxZoom: 18,
//         }
//       ).addTo(mapRef.current);
//     }

//     // Remove old polygon & marker layers
//     mapRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Polygon || layer instanceof L.Marker) {
//         mapRef.current.removeLayer(layer);
//       }
//     });

//     if (villageData?.plots?.length > 0 && mapRef.current) {
//       const allLatLngs = [];

//       villageData.plots.forEach((plot) => {
//         const polygons = plot.geometry.coordinates.map((poly) =>
//           poly.map((ring) => ring.map(([lng, lat]) => [lat, lng]))
//         );

//         polygons.forEach((polygon) => {
//           const polygonLayer = L.polygon(polygon, {
//             color: 'orange',
//             weight: 2,
//             fillOpacity: 0.1,
//           }).addTo(mapRef.current);

//           // ✅ Enable click only if onPlotClick is provided
//           if (onPlotClick) {
//             polygonLayer.on('click', () => onPlotClick(plot));
//             polygonLayer.setStyle({ cursor: 'pointer' });
//           } else {
//             polygonLayer.off('click'); // remove any old listeners
//             polygonLayer.setStyle({ cursor: 'default' });
//           }

//           // Add marker
//           const center = polygonLayer.getBounds().getCenter();
//           L.marker(center, {
//             icon: L.divIcon({
//               className: 'plot-marker',
//               html: `<div style="color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${plot.surveyNumber}</div>`,
//               iconSize: [30, 20],
//             }),
//           }).addTo(mapRef.current);

//           allLatLngs.push(...polygon.flat());
//         });
//       });

//       if (allLatLngs.length > 0) {
//         const bounds = L.latLngBounds(allLatLngs);
//         mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//       }
//     }
//   }, [villageData, onPlotClick]); // <- re-run when step changes (onPlotClick changes)

//   return (
//     <div
//       ref={mapContainerRef}
//       className="w-full h-[500px] lg:h-[600px] rounded-b-lg"
//       style={{ zIndex: 0 }}
//     />
//   );
// };

// export default VillageMap;


import { useEffect, useRef } from 'react';
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const VillageMap = ({ villageData, onPlotClick, verificationStatus }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const plotLayersRef = useRef({}); // Store references to polygon layers by plot ID
  // Utility: Convert GeoJSON [lng, lat] → [lat, lng]
  const convertCoordinates = (coords) => {
    if (typeof coords[0] === "number") {
      return [coords[1], coords[0]];
    }
    return coords.map(convertCoordinates);
  };
console.log(villageData,"__villageData")
let villageCheck 
  if(!villageData || villageData === null){
    villageCheck=true
  }
  // Initialize map only once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);
    mapRef.current.zoomControl.setPosition('topright');

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 18,
      }
    ).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [villageCheck]);

  // Render plots only when villageData changes
  useEffect(() => {
    // if (!mapRef.current || !villageData?.plots?.length) return;
     if (!mapRef.current) return;

    // Clear previous polygon & marker layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Clear plot layer references
    plotLayersRef.current = {};
  // If villageData is null or has no plots, just return after cleanup
  if (!villageData?.plots?.length) return;

    const allLatLngs = [];

    villageData.plots.forEach((plot) => {
      const polygons = plot.geometry.coordinates.map((poly) =>
        poly.map((ring) => ring.map(([lng, lat]) => [lat, lng]))
      );

      polygons.forEach((polygon, polyIndex) => {
        const polygonLayer = L.polygon(polygon, {
          color: 'orange',
          weight: 2,
          fillOpacity: 0.1,
        }).addTo(mapRef.current);

        // Store reference to this layer
        const layerKey = `${plot.id || plot.surveyNumber}-${polyIndex}`;
        plotLayersRef.current[layerKey] = {
          layer: polygonLayer,
          plotId: plot.id || plot.surveyNumber,
          plot: plot
        };

        // Enable click only if onPlotClick is provided
        if (onPlotClick) {
          polygonLayer.on('click', () => {
            // Change color immediately on click
            console.log("verificationStatus",verificationStatus);
            if (verificationStatus && verificationStatus === 'correct') {
              polygonLayer.setStyle({
                color: 'green',
                fillOpacity: 0.3,
              });
            } else if (verificationStatus && verificationStatus === 'incorrect') {
              polygonLayer.setStyle({
                color: 'red',
                fillOpacity: 0.3,
              });
            }

            // Call the parent callback
            onPlotClick(plot);
          });
          polygonLayer.setStyle({ cursor: 'pointer' });
        } else {
          polygonLayer.off('click');
          polygonLayer.setStyle({ cursor: 'default' });
        }

        // Add marker at polygon center
        const center = polygonLayer.getBounds().getCenter();
        L.marker(center, {
          icon: L.divIcon({
            className: 'plot-marker',
            html: `<div style="color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${plot.surveyNumber}</div>`,
            iconSize: [30, 20],
          }),
        }).addTo(mapRef.current);

        allLatLngs.push(...polygon.flat());
      });
    });

    // Fit map bounds to show all polygons
    if (allLatLngs.length > 0) {
      const bounds = L.latLngBounds(allLatLngs);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [villageData]); // Only re-render when villageData changes

  // Update click handlers when onPlotClick changes
  useEffect(() => {
    if (!mapRef.current) return;

    Object.values(plotLayersRef.current).forEach(({ layer, plot }) => {
      // Remove old click handlers
      layer.off('click');

      if (onPlotClick) {
        layer.on('click', () => {
          // Change color immediately on click
          // layer.setStyle({
          //   color: 'green',
          //   fillOpacity: 0.3,
          // });
             if (verificationStatus && verificationStatus === 'correct') {
              layer.setStyle({
                color: 'green',
                fillOpacity: 0.3,
              });
            } else if (verificationStatus && verificationStatus === 'incorrect') {
              layer.setStyle({
                color: 'red',
                fillOpacity: 0.3,
              });
            }

          // Call the parent callback
          onPlotClick(plot);
        });
        layer.setStyle({ cursor: 'pointer' });
      } else {
        layer.setStyle({ cursor: 'default' });
      }
    });
  }, [onPlotClick]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] lg:h-[600px] rounded-b-lg"
      style={{ zIndex: 0 }}
    />
  );
};

export default VillageMap;


// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const VillageMap = ({ villageData, onPlotClick, verificationStatus }) => {
//   const mapRef = useRef(null);
//   const mapContainerRef = useRef(null);
//   const plotLayersRef = useRef({}); // Store references to polygon layers by plot ID

//   // ✅ Initialize map only once
//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);
//     mapRef.current.zoomControl.setPosition("topright");

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
//   }, []);

//   // ✅ Render village plots
//   useEffect(() => {
//     if (!mapRef.current || !villageData?.plots?.length) return;

//     // Clear old layers
//     mapRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Polygon || layer instanceof L.Marker) {
//         mapRef.current.removeLayer(layer);
//       }
//     });

//     plotLayersRef.current = {};
//     const allLatLngs = [];

//     villageData.plots.forEach((plot) => {
//       const polygons = plot.geometry.coordinates.map((poly) =>
//         poly.map((ring) => ring.map(([lng, lat]) => [lat, lng]))
//       );

//       polygons.forEach((polygon, polyIndex) => {
//         const polygonLayer = L.polygon(polygon, {
//           color: "orange",
//           weight: 2,
//           fillOpacity: 0.1,
//         }).addTo(mapRef.current);

//         const layerKey = `${plot.id || plot.surveyNumber}-${polyIndex}`;
//         plotLayersRef.current[layerKey] = { layer: polygonLayer, plot };

//         // ✅ Click logic
//         polygonLayer.on("click", () => {
//           // Apply color based on current verification status
//           if (verificationStatus === "correct") {
//             polygonLayer.setStyle({ color: "green", fillColor: "green", fillOpacity: 0.3 });
//           } else if (verificationStatus === "incorrect") {
//             polygonLayer.setStyle({ color: "red", fillColor: "red", fillOpacity: 0.3 });
//           } else {
//             polygonLayer.setStyle({ color: "orange", fillColor: "orange", fillOpacity: 0.1 });
//           }

//           // Hit parent callback
//           onPlotClick && onPlotClick(plot);
//         });

//         polygonLayer.setStyle({ cursor: onPlotClick ? "pointer" : "default" });

//         // Label (Survey Number)
//         const center = polygonLayer.getBounds().getCenter();
//         L.marker(center, {
//           icon: L.divIcon({
//             className: "plot-marker",
//             html: `<div style="color:white;padding:4px 8px;border-radius:4px;font-weight:bold;">${plot.surveyNumber}</div>`,
//             iconSize: [30, 20],
//           }),
//         }).addTo(mapRef.current);

//         allLatLngs.push(...polygon.flat());
//       });
//     });

//     if (allLatLngs.length > 0) {
//       const bounds = L.latLngBounds(allLatLngs);
//       mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [villageData]);

//   // ✅ Update color dynamically if verificationStatus changes after click
//   useEffect(() => {
//     Object.values(plotLayersRef.current).forEach(({ layer }) => {
//       // Only update style if the layer is already clicked (non-orange)
//       const currentColor = layer.options.color;
//       if (currentColor !== "orange") {
//         if (verificationStatus === "correct") {
//           layer.setStyle({ color: "green", fillColor: "green", fillOpacity: 0.3 });
//         } else if (verificationStatus === "incorrect") {
//           layer.setStyle({ color: "red", fillColor: "red", fillOpacity: 0.3 });
//         }
//       }
//     });
//   }, [verificationStatus]);

//   return (
//     <div
//       ref={mapContainerRef}
//       className="w-full h-[500px] lg:h-[600px] rounded-b-lg"
//       style={{ zIndex: 0 }}
//     />
//   );
// };

// export default VillageMap;


