import { useState } from "react";
import { useApiKey } from "@/hooks/useNpsApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Trash2, ExternalLink, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Callout } from "@/components/ui/callout";

const Settings = () => {
  const { getKey, setKey, clearKey } = useApiKey();
  const [value, setValue] = useState(getKey);
  const [saved, setSaved] = useState(!!getKey());

  const handleSave = () => {
    if (!value.trim()) return;
    setKey(value.trim());
    setSaved(true);
    toast.success("API key saved successfully!");
  };

  return (
    <div className="relative min-h-[80vh] flex items-start justify-center p-4 pt-12">
      <Card
        className={cn(
          "w-full max-w-xl bg-card/95 p-0 rounded-lg overflow-hidden",
          "backdrop-blur shadow-lg"
        )}>
        <CardHeader className="bg-primary text-primary-foreground p-6 pt-10">
          <CardTitle className="flex items-center gap-2 font-display">
            <KeyRound className="h-6 w-6" />
            NPS API Key
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-1">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                placeholder="Your NPS API key"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setSaved(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <Button onClick={handleSave} disabled={!value.trim() || saved}>
                {saved ? <Check className="h-4 w-4" /> : "Save"}
              </Button>
            </div>
            {saved && (
              <div className="flex items-center gap-2 text-sm text-muted leading-tight">
                <Check className="h-4 w-4" />
                Key saved to your browser.
              </div>
            )}
          </div>

          <Callout
            title="Free & Instant"
            description="You need a unique API key to access the National Park Service data. It's totally free and sent right to your inbox! As this app stores the key in your local storage, you may need to reenter it from time-to-time, so hold on to that email."
          />
          
          <div className="flex items-center justify-between">
            <Link
              to="https://www.nps.gov/subjects/developer/get-started.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-foreground hover:underline flex items-center gap-1"
            >
              Get a free API key
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
