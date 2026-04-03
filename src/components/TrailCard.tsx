import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin } from "lucide-react";
import type { NpsPark } from "@/lib/types";
import { Button } from "./ui/button";

/*
kinda ugly
want to slowly expand states on hover
w-0 opacity-0 => w-auto? opacity-100 in transition
*/

interface TrailCardProps {
  park?: NpsPark;
  isSelected?: boolean;
  isLoading?: boolean;
  onSelect?: (id: string) => void;
}

const TrailCard = ({ park, isSelected = false, isLoading = false, onSelect }: TrailCardProps) => {
  if (isLoading) {
    return (
      <Card className="p-0 border-2 border-secondary animate-pulse">
        <div className="relative bg-secondary h-[150px] sm:h-[120px]" />
        <CardTitle className="font-sans px-2 text-lg w-full text-center bg-secondary text-white h-6" />
        <CardContent className="p-2 space-y-2">
          <div className="h-3 bg-muted/30 rounded" />
          <div className="h-3 bg-muted/30 rounded" />
          <div className="h-3 bg-muted/30 rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!park) return "There are no parks in this area. Move around the map to find some. Don't forget Alaska and Hawaii!";

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all p-0 border-2 border-secondary",
        // isSelected && "outline-2 ring-primary shadow-md"
      )}
      onClick={() => onSelect?.(park.parkCode)}
    >
    {park.images?.[0] && (
      <div className="relative bg-secondary h-[150px] sm:h-[120px]">
        <img
          src={park.images[0].url}
          alt={park.images[0].altText || park.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )}
    <CardTitle className="font-sans px-2 text-lg w-full text-center bg-secondary text-white">
      {park.name}
    </CardTitle>

    <CardContent className="p-2">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-muted-foreground/80  items-center flex gap-1">
          <MapPin size={10} /> <span>{park.addresses ? park.addresses[0]?.city + ", " + park.addresses[0]?.stateCode : park.states}</span>
        </p>
       {park.designation && (
          <Badge className="whitespace-nowrap text-[10px] h-fit px-1.5 py-0" variant="brown">
            {park.designation}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-0.5 mb-1">
          {(park.topics.length >= 3 ? park.topics.slice(0, 3) : park.topics).map((t) => (
            <Badge key={t.id} variant="purple" className="whitespace-nowrap text-[10px] px-1.5 py-0 mr-1">
            {t.name}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-0.5">
        {(park.activities.length >= 6 ? park.activities.slice(0, 6) : park.activities).map((a) => (
          <Badge key={a.id} variant="default" className="whitespace-nowrap text-[10px] px-1.5 py-0 mr-1">
            {a.name}
          </Badge>
        ))}
      </div>
      <Button variant="link" size="sm" className="group text-xs p-0 m-0 mt-3 text-muted hover:text-primary rounded-none h-fit">
        <ArrowLeft className="translate-x-1 group-hover:-translate-x-0 transition-transform" /> Show on Map
      </Button>
    </CardContent>
  </Card>
);
};

export default TrailCard;
