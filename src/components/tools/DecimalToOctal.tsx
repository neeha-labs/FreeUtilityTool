import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const DecimalToOctal = () => {
  const [decimal, setDecimal] = useState("");
  const [octal, setOctal] = useState("");

  useEffect(() => {
    if (!decimal) {
      setOctal("");
      return;
    }

    try {
      const num = BigInt(decimal);
      setOctal(num.toString(8));
    } catch (e) {
      setOctal("Invalid decimal number");
    }
  }, [decimal]);

  const copyResults = () => {
    navigator.clipboard.writeText(octal);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([octal], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "octal-output.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decimal to Octal Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Decimal Number</Label>
            <Input
              type="text"
              placeholder="Enter decimal number..."
              value={decimal}
              onChange={(e) => setDecimal(e.target.value.replace(/[^0-9]/g, ""))}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>Octal Result</Label>
            <div className="p-4 bg-muted rounded-lg font-mono break-all min-h-[60px]">
              {octal || "Octal output will appear here..."}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!octal}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!octal}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecimalToOctal;
