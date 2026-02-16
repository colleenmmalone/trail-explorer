import { useQuery } from "@tanstack/react-query";

export interface NpsPark {
  id: string;
  fullName: string;
  description: string;
  states: string;
  latitude: string;
  longitude: string;
  url: string;
  images: { url: string; altText: string; title: string }[];
  activities: { id: string; name: string }[];
  designation: string;
}

interface NpsResponse {
  total: string;
  data: NpsPark[];
}

export function useApiKey() {
  const getKey = () => localStorage.getItem("nps_api_key") || "";
  const setKey = (key: string) => localStorage.setItem("nps_api_key", key);
  const clearKey = () => localStorage.removeItem("nps_api_key");
  return { getKey, setKey, clearKey };
}

export function useParks(apiKey: string) {
  return useQuery<NpsPark[]>({
    queryKey: ["parks", apiKey],
    queryFn: async () => {
      const res = await fetch(
// &stateCode=va
// parks
        `https://developer.nps.gov/api/v1/parks?limit=50&api_key=${apiKey}`
        // `https://developer.nps.gov/api/v1/people?api_key=${apiKey}`
      );
      if (!res.ok) throw new Error("Failed to fetch parks");
      const data: NpsResponse = await res.json();
      return data.data.filter(
        (p) => p.latitude && p.longitude && parseFloat(p.latitude) !== 0
      );
    },
    enabled: !!apiKey,
    staleTime: 1000 * 60 * 10,
  });
}
