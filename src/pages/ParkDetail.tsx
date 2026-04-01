import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { singlePark, useApiKey } from "@/hooks/useNpsApi";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Images, Loader2, Mountain, Settings } from "lucide-react";
import Footer from "@/components/Footer";

/* TODO
 lazy load Images
 desktop image view as gallery
 click to see fullsize image
 use random image as background instead of 2nd
*/ 

const Index = () => {
  const { getKey } = useApiKey();
  const [apiKey, setApiKey] = useState(getKey);
  const parkCode = window.location.pathname.split("/park/")[1] || "";
  const { data: park = [], isLoading, error } = singlePark({ apiKey, parkCode });
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
    <div className={`relative flex flex-col justify-center pt-8 max-h-[100vh] overflow-auto bg-background`}>

      {park[0]?.images[0]?.url ?
        <div className="hidden sm:block fixed inset-0 object-cover z-0 pointer-events-none overflow-hidden">
          <img src={park[0]?.images[1]?.url} alt={park[0]?.images[1]?.altText || "Park Image"} className="w-full h-full object-cover" />
        </div>
        :
        <></>
      }

      {
        isLoading ? (
          <div className="flex items-center justify-center h-[100vh] overflow-y-auto p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border bg-card/80 gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <p className="text-sm text-muted-foreground">Failed to load trails. Check your API key.</p>
          </div>
        ) : (
          <div className="p-0 inset-0 w-full flex justify-center items-start flex-col">
            <div className="h-full z-10 lg:max-w-3xl pb-10 mx-auto">
              <div className="flex flex-col gap-2 bg-background border-secondary border-2 p-4">

                {/* park name  */}
                <h2 className="font-header font-bold text-lg text-foreground">
                  {park[0]?.fullName || "Unknown Park"}
                </h2>

                {/* city, state  */}
                <p className="text-sm text-foreground/70">
                  {park[0]?.addresses?.[0] ?
                    `${park[0]?.addresses?.[0]?.city}, ${park[0]?.addresses?.[0]?.stateCode}`
                    : "Location not available"}
                </p>
                <p>
                  {park[0]?.description || "No description available."}
                </p>

                <p className="mt-3 flex flex-wrap gap-2 items-center">
                  {park[0]?.activities?.slice(0, 5).map((activity, i) => (
                    <span
                      key={`${activity.name}-${i}`}
                      className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-foreground/90"
                    >
                      {activity.name}
                    </span>
                  ))}

                  {park[0]?.activities && park[0].activities.length > 5 && (
                    <span className="text-sm text-muted-foreground">
                      +{park[0].activities.length - 5} more
                    </span>
                  )}

                </p>


                <a href={park[0]?.url} target="_blank" rel="noopener noreferrer" className="text-primary mt-4 inline-block">
                  Visit Official Site
                </a>
              </div>
              <div className="max-w-xl mx-auto">
                {park[0]?.images?.map((image, i) => (
                  <div
                    key={`image-${i}`}
                    className="inline-flex items-center"
                  >
                    <img src={image.url} alt={image.altText || "Park Image"} className="mt-4 border-2 border-secondary shadow-xl w-full" />
                  </div>
                ))}
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        )
      }



    </div >
  );
};

export default Index;
