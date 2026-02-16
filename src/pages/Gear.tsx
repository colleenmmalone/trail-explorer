import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MountainBackground from "@/components/MountainBackground";
import { Backpack, Footprints, Mountain, Compass, Tent, FlameKindling } from "lucide-react";

const brands = [
  {
    name: "Summit Stride",
    category: "Hiking Boots",
    icon: Footprints,
    description: "Durable, waterproof boots for any terrain.",
    tags: ["Footwear", "Waterproof"],
  },
  {
    name: "TrailPack Co.",
    category: "Backpacks",
    icon: Backpack,
    description: "Lightweight packs built for long-distance adventures.",
    tags: ["Packs", "Ultralight"],
  },
  {
    name: "Peak Compass",
    category: "Navigation Gear",
    icon: Compass,
    description: "Precision compasses and GPS devices for the backcountry.",
    tags: ["Navigation", "Tech"],
  },
  {
    name: "Alpine Shelter",
    category: "Tents & Shelters",
    icon: Tent,
    description: "All-season tents engineered for mountain weather.",
    tags: ["Shelter", "4-Season"],
  },
  {
    name: "Ridge Line Poles",
    category: "Trekking Poles",
    icon: Mountain,
    description: "Carbon-fiber poles with ergonomic grips.",
    tags: ["Poles", "Carbon"],
  },
  {
    name: "BaseCamp Stoves",
    category: "Camp Cooking",
    icon: FlameKindling,
    description: "Compact stoves for quick meals on the trail.",
    tags: ["Cooking", "Compact"],
  },
];

const Gear = () => (
  <div className="relative min-h-[80vh] p-4 pt-8">
    <MountainBackground />
    <div className="relative z-10 container max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Hiking Gear Partners
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Trusted brands we collaborate with to keep you trail-ready.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => {
          const Icon = brand.icon;
          return (
            <Card
              key={brand.name}
              className="bg-card/90 backdrop-blur hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-display">
                    {brand.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{brand.category}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-2">
                  {brand.description}
                </p>
                <div className="flex gap-1">
                  {brand.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </div>
);

export default Gear;
