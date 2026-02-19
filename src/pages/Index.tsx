import { useState, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useParks, useApiKey } from "@/hooks/useNpsApi";
import TrailMap from "@/components/TrailMap";
import TrailCard from "@/components/TrailCard";
import FeaturedPark from "@/components/FeaturedPark";
import MountainBackground from "@/components/MountainBackground";
import { Button } from "@/components/ui/button";
import { Mountain, Settings, Loader2, AlertTriangle, Map } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import L from "leaflet";

const Index = () => {
  const { getKey } = useApiKey();
  const [apiKey, setApiKey] = useState(getKey);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [filterByView, setFilterByView] = useState(true);
  const { data: parks = [], isLoading, error } = useParks(apiKey);

  // Re-check key when returning from settings
  useEffect(() => {
    const handleFocus = () => setApiKey(getKey());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [getKey]);

  const handleSelect = useCallback((id: string) => setSelectedId(id), []);
  const handleBoundsChange = useCallback((bounds: L.LatLngBounds) => setMapBounds(bounds), []);

  const visibleParks = useMemo(() => {
    if (!filterByView || !mapBounds) return parks;
    return parks.filter((p) => {
      const lat = parseFloat(p.latitude);
      const lng = parseFloat(p.longitude);
      return mapBounds.contains([lat, lng]);
    });
  }, [parks, mapBounds, filterByView]);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 50; // Fixed page size for simplicity

  const totalPages = Math.max(1, Math.ceil(visibleParks.length / pageSize));

  useEffect(() => {
    // Reset to first page when filters or page size change
    setPage(1);
  }, [visibleParks.length, pageSize]);

  const paginatedParks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return visibleParks.slice(start, start + pageSize);
  }, [visibleParks, page, pageSize]);

  if (!apiKey) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <MountainBackground />
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
      <MountainBackground />



      <div className="relative flex flex-col lg:flex-row gap-4 flex-1">
      {/* Map */}
      <div className="relative z-10 lg:flex-1 min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full rounded-lg border bg-card/80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border bg-card/80 gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <p className="text-sm text-muted-foreground">Failed to load trails. Check your API key.</p>
          </div>
        ) : (
          <TrailMap parks={parks} selectedId={selectedId} onSelect={handleSelect} onBoundsChange={handleBoundsChange} />
        )}
      </div>

      {/* Trail List */}
      <div className="relative z-10 lg:w-[30%]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg text-foreground">
            Parks & Trails
            <span className="ml-1.5 text-sm font-normal text-muted-foreground">
              ({filterByView ? `${visibleParks.length} of ${parks.length}` : parks.length})
            </span>
          </h2>
          <button
            onClick={() => setFilterByView((v) => !v)}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-colors font-medium ${
              filterByView
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
            }`}
          >
            <Map className="h-3 w-3" />
            {filterByView ? "In View" : "Filter by View"}
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-3 pr-3">
            {paginatedParks.map((park) => (
              <TrailCard
                key={park.id}
                park={park}
                isSelected={selectedId === park.id}
                onSelect={handleSelect}
              />
            ))}
            {!isLoading && visibleParks.length === 0 && parks.length > 0 && filterByView && (
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
        { visibleParks.length > pageSize ?
        <div className="flex items-center justify-between mt-3 gap-2">


          <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {visibleParks.length === 0
                ? "0"
                : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, visibleParks.length)}`}
              {` of ${visibleParks.length}`}
          </div>


          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Prev
            </Button>
            <div className="text-sm text-muted-foreground px-2">{page} / {totalPages}</div>
            <Button size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next
            </Button>
          </div>

        </div>
        :
        <></>}
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
