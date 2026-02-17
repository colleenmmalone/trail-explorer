import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { singlePark, useApiKey } from "@/hooks/useNpsApi";
import MountainBackground from "@/components/MountainBackground";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Mountain, Settings } from "lucide-react";

const Index = () => {
  const { getKey } = useApiKey();
  const [apiKey, setApiKey] = useState(getKey);
  const parkID = window.location.pathname.split("/park/")[1] || "";
  const { data: park = [], isLoading, error } = singlePark({ apiKey, parkID });
  console.log("Park data:", park[0]);

  // Re-check key when returning from settings
  useEffect(() => {
    const handleFocus = () => setApiKey(getKey());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [getKey]);

  if (!apiKey) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <MountainBackground />
        <div className="relative z-10 space-y-6">
          <Mountain className="h-16 w-16 text-primary mx-auto" />
          <h1 className="text-4xl font-display font-bold text-foreground">
            Hiking Trails Explorer
          </h1>
          <p className="text-muted-foreground">
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
    <div className="relative flex flex-col justify-center lg:flex-row gap-4 p-4 min-h-[calc(100vh-3.5rem)]">
      <MountainBackground />

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
        <div className="relative z-10 lg:w-96">
          <h2 className="font-header font-bold text-lg mb-3 text-foreground">
            Enjoy this park: {park[0]?.fullName || "Unknown Park"}
          </h2>
          <p>
            {park[0]?.description || "No description available."}
          </p>

          <p className="mt-3 flex flex-wrap gap-2 items-center">
            {park[0]?.activities?.slice(0, 4).map((activity, i) => (
              <span
                key={`${activity.name}-${i}`}
                className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-foreground/90"
              >
                {activity.name}
              </span>
            ))}

            {park[0]?.activities && park[0].activities.length > 4 && (
              <span className="text-sm text-muted-foreground">
                +{park[0].activities.length - 4} more
              </span>
            )}

          </p>
          <p>
         
                  {park[0]?.addresses ? 
            `${park[0]?.addresses[0].city}, ${park[0]?.addresses[0].stateCode}`
            : "Location not available"}
          </p>

          <a href={park[0]?.url} target="_blank" rel="noopener noreferrer" className="text-primary mt-4 inline-block">
            Visit Official Site
          </a>

          <img src={park[0]?.images[0]?.url} alt={park[0]?.images[0]?.altText || "Park Image"} className="mt-4 rounded-lg border" />

              {park[0]?.images?.slice(1, park[0].images.length - 1).map((image, i) => (
                <div
                  key={`image-${i}`}
                  className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-foreground/90"
                >
                  <img src={image.url} alt={image.altText || "Park Image"} className="mt-4 rounded-lg border" />
                </div>
              ))}
        </div>
      )}



    </div>
  );
};

export default Index;
