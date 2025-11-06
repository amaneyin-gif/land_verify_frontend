import { useEffect, useRef, useState } from 'react';
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const VillageMap = ({ villageData }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);


  // Utility: Convert GeoJSON [lng, lat] → [lat, lng]
  const convertCoordinates = (coords) => {
    if (typeof coords[0] === "number") {
      return [coords[1], coords[0]];
    }
    return coords.map(convertCoordinates);
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);

      // ✅ Move zoom control to bottom-right
      mapRef.current.zoomControl.setPosition('topright');
      // Satellite tile layer
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
          maxZoom: 18,
        }
      ).addTo(mapRef.current);
    }

    // Clear previous layers
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });
    }

    // Render plots
      if (villageData?.plots?.length > 0 && mapRef.current) {
        const allLatLngs = [];

        villageData.plots.forEach((plot) => {
          // Convert MultiPolygon to array of polygons for Leaflet
          const polygons = plot.geometry.coordinates.map((poly) =>
            poly.map((ring) => ring.map(([lng, lat]) => [lat, lng]))
          );

          polygons.forEach((polygon) => {
            const polygonLayer = L.polygon(polygon, {
              color: 'orange', weight: 2, fillOpacity: 0.10
            }).addTo(mapRef.current);

            // Marker at polygon center with survey number
            const center = polygonLayer.getBounds().getCenter();
            L.marker(center, {
              icon: L.divIcon({
                className: 'plot-marker',
                html: `<div style=" color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${plot.surveyNumber}</div>`,
                iconSize: [30, 20],
              }),
            }).addTo(mapRef.current);

            allLatLngs.push(...polygon.flat());
          });
        });

        // Fit map to show all polygons
        if (allLatLngs.length > 0) {
          const bounds = L.latLngBounds(allLatLngs);
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
      // Small delay to make loader smoother
   
  }, [villageData]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] lg:h-[600px] rounded-b-lg"
      style={{ zIndex: 0 }}
    />
  );
};

export default VillageMap;


