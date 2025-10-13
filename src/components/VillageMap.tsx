import { useEffect, useRef } from 'react';
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
console.log(React.version,"__version")
const VillageMap = ({ villageData }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([27.1767, 78.0081], 13);

      // Add satellite tile layer (OpenStreetMap with satellite imagery alternative)
      // Note: For production, you may want to use a proper satellite imagery provider
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 18,
      }).addTo(mapRef.current);
    }

    // Clear existing layers except the base layer
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });
    }

    // Add village polygons if data exists
    if (villageData && villageData.coordinates.length > 0 && mapRef.current) {
      villageData.coordinates.forEach((polygon, index) => {
        const latLngs = polygon.map(([lng, lat]) => [lat, lng]);

        const polygonLayer = L.polygon(latLngs, {
          color: '#22c55e',
          fillColor: '#22c55e',
          fillOpacity: 0.3,
          weight: 2,
        }).addTo(mapRef.current);

        // Add plot number markers
        if (villageData.plotNumbers[index]) {
          const center = polygonLayer.getBounds().getCenter();
          const marker = L.marker(center, {
            icon: L.divIcon({
              className: 'plot-marker',
              html: `<div style="background: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${villageData.plotNumbers[index]}</div>`,
              iconSize: [40, 30],
            }),
          }).addTo(mapRef.current);
        }
      });

      // Fit map to show all polygons
      const allLatLngs = villageData.coordinates.flatMap((polygon) =>
        polygon.map(([lng, lat]) => [lat, lng])
      );
      const bounds = L.latLngBounds(allLatLngs);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      // Cleanup is handled by checking if map exists
    };
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
