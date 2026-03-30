import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const OctalToDecimal = () => {
  const [octal, setOctal] = useState("");
  const [decimal, setDecimal] = useState("");

  useEffect(() => {
    if (!octal.trim()) {
      setDecimal("");
      return;
    }

    try {
      const cleanOctal = octal.replace(/[^0-7]/g, "");
      if (!cleanOctal) {
        setDecimal("");
        return;
      }
      const num = BigInt("0o" + cleanOctal);
      setDecimal(num.toString());
    } catch (e) {
      setDecimal("Invalid octal number");
    }
  }, [octal]);

  const copyResults = () => {
    navigator.clipboard.writeText(decimal);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([decimal], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decimal-output.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Octal to Decimal Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Octal Number</Label>
            <Input
              type="text"
              placeholder="Enter octal number (0-7)..."
              value={octal}
              onChange={(e) => setOctal(e.target.value.replace(/[^0-7]/g, ""))}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>Decimal Result</Label>
            <div className="p-4 bg-muted rounded-lg font-mono break-all min-h-[60px]">
              {decimal || "Decimal output will appear here..."}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!decimal}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!decimal}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OctalToDecimal;
