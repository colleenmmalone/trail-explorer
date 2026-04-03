import { useQuery } from "@tanstack/react-query";
import { NpsPark, NpsResponse } from "@/lib/types";

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
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}`
        // `https://developer.nps.gov/api/v1/people?api_key=${apiKey}`
      );
      if (!res.ok) throw new Error("Failed to fetch parks");
      const data: NpsResponse = await res.json();
      console.log("Fetched parks:", data.data[0]);
      return data.data
        .filter((p) => p.latitude && p.longitude && parseFloat(p.latitude) !== 0)
    },
    enabled: !!apiKey,
    staleTime: 1000 * 60 * 10,
  });
}

export function singlePark(props: {apiKey: string, parkCode: string}) {
  return useQuery<NpsPark[]>({
    queryKey: ["parks", props.apiKey],
    queryFn: async () => {
      const res = await fetch(
        `https://developer.nps.gov/api/v1/parks?parkCode=${props.parkCode}&api_key=${props.apiKey}`
      );
      if (!res.ok) throw new Error("Failed to fetch parks");
      const data: NpsResponse = await res.json();
      return data.data.filter(
        (p) => p.latitude && p.longitude && parseFloat(p.latitude) !== 0
      );
    },
    enabled: !!props.apiKey,
    staleTime: 1000 * 60 * 10,
  });
}
