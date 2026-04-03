export interface NpsResponse {
  total: string;
  data: NpsPark[];
}

export interface NpsPark {
  id: string;
  name: string;
  description: string;
  states: string;
  latitude: string;
  longitude: string;
  url: string;
  images: { url: string; altText: string; title: string }[];
  activities: { id: string; name: string }[];
  designation: string;
  parkCode: string;
  addresses?: { city: string; stateCode: string }[];
  topics?: { id: string; name: string }[];
}
