import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { NpsPark } from "@/hooks/useNpsApi";

// Fix default marker icons
import markerIcon2x from "@/assets/pebl-marker.png";
import markerIcon from "@/assets/pebl-marker.png";
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
  onSelect: (parkCode: string) => void;
  onBoundsChange?: (bounds: L.LatLngBounds) => void;
}

const TrailMap = ({ parks, selectedId, onSelect, onBoundsChange }: TrailMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const onBoundsChangeRef = useRef(onBoundsChange);
  onBoundsChangeRef.current = onBoundsChange;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current).setView([39.5, -98.35], 4);
    mapInstance.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

        const emitBounds = () => onBoundsChangeRef.current?.(map.getBounds());
    map.on("moveend", emitBounds);
    map.on("zoomend", emitBounds);
    // Emit initial bounds after map is ready
    map.whenReady(() => setTimeout(() => emitBounds(), 100));

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
        .bindPopup(`<strong>${park.fullName}</strong><br/>${park.states}<br/><a href="/park/${park.parkCode}" target="_blank">View Details</a>`);
      marker.on("click", () => onSelect(park.parkCode));
      markersRef.current[park.parkCode] = marker;
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
      className="w-full h-[380px] lg:h-full rounded-lg border overflow-hidden"
    />
  );
};

export default TrailMap;
