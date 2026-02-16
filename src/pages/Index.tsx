import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParks, useApiKey } from "@/hooks/useNpsApi";
import TrailMap from "@/components/TrailMap";
import TrailCard from "@/components/TrailCard";
import MountainBackground from "@/components/MountainBackground";
import { Button } from "@/components/ui/button";
import { Mountain, Settings, Loader2, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { getKey } = useApiKey();
  const [apiKey, setApiKey] = useState(getKey);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: parks = [], isLoading, error } = useParks(apiKey);

  // Re-check key when returning from settings
  useEffect(() => {
    const handleFocus = () => setApiKey(getKey());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [getKey]);

  const handleSelect = useCallback((id: string) => setSelectedId(id), []);

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
    <div className="relative flex flex-col lg:flex-row gap-4 p-4 min-h-[calc(100vh-3.5rem)]">
      <MountainBackground />

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
          <TrailMap parks={parks} selectedId={selectedId} onSelect={handleSelect} />
        )}
      </div>

      {/* Trail List */}
      <div className="relative z-10 lg:w-96">
        <h2 className="font-display font-bold text-lg mb-3 text-foreground">
          Parks & Trails ({parks.length})
        </h2>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-3 pr-3">
            {parks.map((park) => (
              <TrailCard
                key={park.id}
                park={park}
                isSelected={selectedId === park.id}
                onSelect={handleSelect}
              />
            ))}
            {!isLoading && parks.length === 0 && apiKey && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No parks found. Check your API key in Settings.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
