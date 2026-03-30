import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const DecimalToHex = () => {
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");

  useEffect(() => {
    if (!decimal) {
      setHex("");
      return;
    }

    try {
      const num = BigInt(decimal);
      setHex(num.toString(16).toUpperCase());
    } catch (e) {
      setHex("Invalid decimal number");
    }
  }, [decimal]);

  const copyResults = () => {
    navigator.clipboard.writeText(hex);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([hex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hex-output.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decimal to Hex Converter</CardTitle>
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
            <Label>Hexadecimal Result</Label>
            <div className="p-4 bg-muted rounded-lg font-mono break-all min-h-[60px]">
              {hex || "Hex output will appear here..."}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!hex}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!hex}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecimalToHex;
