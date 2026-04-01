import { useState } from "react";
import { useApiKey } from "@/hooks/useNpsApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Trash2, ExternalLink, KeyRound } from "lucide-react";
import { toast } from "sonner";

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

  const handleClear = () => {
    clearKey();
    setValue("");
    setSaved(false);
    toast("API key removed.");
  };

  return (
    <div className="relative min-h-[80vh] flex items-start justify-center p-4 pt-12">
      <Card className="relative z-10 w-full max-w-lg bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <KeyRound className="h-5 w-5 text-primary" />
            NPS API Key
          </CardTitle>
          <CardDescription>
            Enter your National Park Service API key to load trail data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
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
          </div>

          {saved && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Check className="h-4 w-4" />
              Key saved to your browser.
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://www.nps.gov/subjects/developer/get-started.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:underline flex items-center gap-1"
            >
              Get a free API key
              <ExternalLink className="h-3 w-3" />
            </a>
            {saved && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
