import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Backpack, Footprints, Mountain, Compass, Tent, FlameKindling, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";

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

export default function Styles() {
  return (
    <div className="relative min-h-[80vh] p-4 pt-8">
      <div className="relative z-10 container max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold text-foreground mb-2">
            Hiking Gear Partners
          </h1>
          <h2 className="text-4xl font-display font-bold text-foreground mb-2">
            Hiking Gear Partners
          </h2>
          <h3 className="text-3xl font-display font-bold text-foreground mb-2">
            Hiking Gear Partners
          </h3>
          <h4 className="text-2xl font-display font-bold text-foreground mb-2">
            Hiking Gear Partners
          </h4>
          <h5 className="text-xl font-display font-bold text-foreground mb-2">
            Hiking Gear Partners
          </h5>
          <h6 className="text-lg font-display font-bold text-foreground mb-2">
            Hiking Gear Partners
          </h6>
          <p className="text-muted-foreground max-w-md mx-auto">
            Trusted brands we collaborate with to keep you trail-ready.
          </p>
          <p className="text-muted-foreground/80 max-w-md mx-auto">
            Trusted brands we collaborate with to keep you trail-ready.
          </p>
        </div>

        {/* Buttons  */}
        <div className="mb-8 mx-auto w-fit">
          <Button variant="default" className="mr-2 mb-2">
            Default Button
          </Button>
          <Button variant="secondary" className="mr-2 mb-2">
            Secondary Button
          </Button>
          <Button variant="tertiary" className="mr-2 mb-2">
            Tertiary Button
          </Button>
          <Button variant="destructive" className="mr-2 mb-2">
            Destructive Button
          </Button>
          <br />
          <Button variant="outline" className="mr-2 mb-2">
            Outline Button
          </Button>
          <Button variant="ghost" className="mr-2 mb-2">
            Ghost Button
          </Button>
          <Button variant="link" className="mr-2 mb-2">
            Link Button
          </Button>
          <Button variant="icon" className="mr-2 mb-2">
            <Mountain className="h-4 w-4" />
          </Button>
        </div>

        {/* Styles  */}
        <div className="mb-8 gap-2 mx-auto w-fit bg-card border rounded-lg flex p-4">
          <Badge variant="default" className="">
            Default
          </Badge>
          <Badge variant="dark" className="">
            Dark
          </Badge>
          <Badge variant="neutral" className="">
            Neutral
          </Badge>
          <Badge variant="green" className="">
            Green
          </Badge>
          <Badge variant="purple" className="">
            Purple
          </Badge>
          <Badge variant="brown" className="">
            Brown
          </Badge>
          <Badge variant="red" className="">
            Red
          </Badge>
        </div>
        <div className=" group w-fit text-secondary bg-background border-secondary border-2 p-2 rounded-full hidden sm:flex items-center gap-1 text-sm ">
          <MapPin className="h-5 w-5" />
          <span className="hidden group-hover:flex">KY, TN</span>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <Callout variant="purple" title="Free & Instant" description="Get your key at api.nps.gov — no credit card needed. Takes about 30 seconds." />
          <Callout 
          title="Free & Instant" 
          description="You need a unique API key to access the National Park Service data. It's totally free and sent right to your inbox! As this app stores the key in your local storage, you may need to reenter it from time-to-time, so hold on to that email." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => {
            const Icon = brand.icon;
            return (
              <Card
                key={brand.name}
                className="bg-card rounded-lg hover:shadow-lg transition-shadow flex flex-col"
              >
                <CardHeader className="flex-row items-center gap-3 pb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-light">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="my-auto">
                    <CardTitle className="text-lg leading-tight">
                      {brand.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-tight">{brand.category}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-1 flex flex-1 flex-col justify-between">
                  <p className="text-md text-foreground/80 mb-3">
                    {brand.description}
                  </p>
                  <div className="flex gap-1">
                    {brand.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="purple"
                        className=" text-[12px] px-2 py-0"
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
  )
}
