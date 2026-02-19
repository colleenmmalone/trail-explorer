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
      "border border-border border-1 cursor-pointer transition-all hover:shadow-md p-0",
      isSelected && "ring-2 ring-primary shadow-md"
    )}
    onClick={() => onSelect(park.id)}
  >
    {park.images?.[0] && (
      <div className="h-36 mb-3">
        <img
          src={park.images[0].url}
          alt={park.images[0].altText || park.fullName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )}
    <CardHeader className="pb-2 px-4">
      <CardTitle className="text-base font-display leading-tight">
        {park.fullName}
      </CardTitle>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        {park.states}
      </div>
    </CardHeader>
    <CardContent className="pt-0 pb-4 px-4">
      <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
        {park.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {park.activities.slice(0, 3).map((a) => (
          <Badge key={a.id} variant="secondary" className="text-[10px] px-1.5 py-0">
            {a.name}
          </Badge>
        ))}
        {park.activities.length > 3 && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            +{park.activities.length - 3}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

export default TrailCard;
