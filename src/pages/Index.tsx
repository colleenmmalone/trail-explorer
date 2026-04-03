import { useState, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useParks, useApiKey } from "@/hooks/useNpsApi";
import TrailMap from "@/components/TrailMap";
import TrailCard from "@/components/TrailCard";
import FeaturedPark from "@/components/FeaturedPark";
import { Button } from "@/components/ui/button";
import { Mountain, Settings, Loader2, AlertTriangle, Map } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import L from "leaflet";

/*
TODO
loads extrememly slow, feels clunky
add filters: state
reset map button

*/

const Index = () => {
  const { getKey } = useApiKey();
  const [apiKey, setApiKey] = useState(getKey);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const { data: parks = [], isLoading, error } = useParks(apiKey);

  // Re-check key when returning from settings
  useEffect(() => {
    const handleFocus = () => setApiKey(getKey());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [getKey]);

  const handleSelect = useCallback((parkCode: string) => setSelectedId(parkCode), []);
  const handleBoundsChange = useCallback((bounds: L.LatLngBounds) => setMapBounds(bounds), []);

  const visibleParks = useMemo(() => {
    if (!mapBounds) return parks;
    return parks.filter((p) => {
      const lat = parseFloat(p.latitude);
      const lng = parseFloat(p.longitude);
      return mapBounds.contains([lat, lng]);
    }).slice(0, 35); // Limit to 35 for performance
  }, [parks, mapBounds]);

  if (!apiKey) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="relative z-10 space-y-6">
          <Mountain className="h-16 w-16 text-primary mx-auto" />
          <h1 className="text-4xl font-display font-bold text-foreground">
            Hiking Trails Explorer
          </h1>
          <p className="text-muted-foreground max-w-md">
            Discover national parks and trails across the United States. To get started, add your NPS API key in Settings.
          </p>
          <Button asChild size="lg">
            <Link to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Go to Settings
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col p-4 min-h-[calc(100vh-3.5rem)] gap-4">
      <div className="relative flex flex-col lg:flex-row gap-4 flex-1">
        {/* Map */}
        <div className="relative z-10 lg:flex-1 min-h-[400px]">
          {isLoading ? (
            <div className="p-0 h-full border rounded-lg bg-[#aad3df] border-border animate-pulse flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-foreground mx-auto my-20 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full rounded-lg border bg-card/80 gap-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <p className="text-sm text-muted-foreground">Failed to load trails. Check your API key.</p>
            </div>
          ) : (
            <TrailMap parks={visibleParks} selectedId={selectedId} onSelect={handleSelect} onBoundsChange={handleBoundsChange} isLoading={isLoading} />
          )}
        </div>

        {/* Trail List */}
        <div className="relative z-10 lg:w-[30%]">
          <div className="flex flex-col items-start justify-center mb-3">
            <h2 className="font-display font-bold text-xl text-foreground">
              Parks & Trails
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                ({visibleParks.length} of {parks.length})
              </span>
            </h2>
            <p className="text-foreground/70 text-xs">
              Move the map around to discover more parks!
            </p>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-3 pr-3">

              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <TrailCard key={`loading-${index}`} isLoading />
                ))
              ) : (
                visibleParks.map((park) => (
                  <TrailCard
                    key={park.parkCode}
                    park={park}
                    isSelected={selectedId === park.parkCode}
                    onSelect={handleSelect}
                  />
                ))
              )}
              {!isLoading && visibleParks.length === 0 && parks.length > 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No parks in the current map view. Pan or zoom out to find more.
                </p>
              )}
              {!isLoading && parks.length === 0 && apiKey && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No parks found. Check your API key in Settings.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Featured Park */}
      {!isLoading && !error && parks.length > 0 && (
        <FeaturedPark parks={parks} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default Index;
