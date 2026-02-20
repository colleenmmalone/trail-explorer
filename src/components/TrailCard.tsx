import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { NpsPark } from "@/hooks/useNpsApi";

interface TrailCardProps {
  park: NpsPark;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TrailCard = ({ park, isSelected, onSelect }: TrailCardProps) => (
  <Card
    className={cn(
      "cursor-pointer transition-all hover:shadow-md p-0 border-2 border-secondary",
      isSelected && "ring-2 ring-primary shadow-md"
    )}
    onClick={() => onSelect(park.id)}
  >
    {park.images?.[0] && (
      <div className="relative h-[200px] sm:h-[280px]">
        <img
          src={park.images[0].url}
          alt={park.images[0].altText || park.fullName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <p className="absolute -bottom-2 sm:bottom-2 left-0 w-full text-center bg-secondary text-white text-xs px-2 py-2">
          <CardTitle className="text-base font-sans text-xl">
            {park.fullName}
          </CardTitle>
          <div className="absolute group -top-8 left-2 text-secondary bg-background border-secondary border-2 p-2 rounded-full hidden sm:flex items-center gap-1 text-sm ">
            <MapPin className="h-5 w-5" />
            <span className="hidden group-hover:flex">{park.states.replace(/,\s*/g, ', ')}&nbsp;</span>
          </div>
        </p>

      </div>
    )}


    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
        {park.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {park.activities.slice(0, 3).map((a) => (
          <Badge key={a.id} variant="outline" className="text-[12px] px-1.5 py-0">
            {a.name}
          </Badge>
        ))}
        {park.activities.length > 3 && (
          <Badge variant="outline" className="text-[12px] px-1.5 py-0">
            +{park.activities.length - 3}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

export default TrailCard;
