import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { NpsPark } from "@/hooks/useNpsApi";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface TrailMapProps {
  parks: NpsPark[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const TrailMap = ({ parks, selectedId, onSelect }: TrailMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current).setView([39.5, -98.35], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    parks.forEach((park) => {
      const lat = parseFloat(park.latitude);
      const lng = parseFloat(park.longitude);
      const marker = L.marker([lat, lng])
        .addTo(map)
        // TODO add link to open park in new page with more details
        .bindPopup(`<strong>${park.fullName}</strong><br/>${park.states}<br/><a href="https://www.nps.gov/${park.parkCode}" target="_blank">View Details</a>`);
      marker.on("click", () => onSelect(park.id));
      markersRef.current[park.id] = marker;
    });
  }, [parks, onSelect]);

  useEffect(() => {
    if (!selectedId || !markersRef.current[selectedId]) return;
    const marker = markersRef.current[selectedId];
    const map = mapInstance.current;
    if (map) {
      map.setView(marker.getLatLng(), 7, { animate: true });
      marker.openPopup();
    }
  }, [selectedId]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] lg:h-full rounded-lg border overflow-hidden"
    />
  );
};

export default TrailMap;
