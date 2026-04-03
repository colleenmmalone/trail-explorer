import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ExternalLink } from "lucide-react";
import type { NpsPark } from "@/lib/types";

interface FeaturedParkProps {
  parks: NpsPark[];
  onSelect: (id: string) => void;
}

const FeaturedPark = ({ parks, onSelect }: FeaturedParkProps) => {
  const featured = useMemo(() => {
    if (!parks.length) return null;
    return parks[Math.floor(Math.random() * parks.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parks.length]);

  if (!featured) return null;

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Star className="h-4 w-4 text-accent fill-accent" />
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Featured Park
        </span>
      </div>
      <div className="rounded-xl border bg-card/90 backdrop-blur overflow-hidden shadow-lg flex flex-col sm:flex-row">
        {featured.images?.[0] && (
          <div className="sm:w-56 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={featured.images[0].url}
              alt={featured.images[0].altText || featured.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col justify-between p-4 flex-1 gap-3">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-1">
              {featured.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              {featured.states}
              {featured.designation && (
                <Badge className="ml-2 text-[10px] px-1.5 py-0" variant="brown">
                  {featured.designation}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-4">
              {featured.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-wrap gap-1 flex-1">
              {featured.activities.slice(0, 4).map((a) => (
                <Badge key={a.id} variant="purple" className="text-[10px] px-1.5 py-0">
                  {a.name}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="py-2" onClick={() => onSelect(featured.parkCode)}>
                View on Map
              </Button>
              {featured.url && (
                <Button size="sm" asChild className="py-2">
                  <a href={featured.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    NPS Page
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPark;
