import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const BinaryToHex = () => {
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");

  useEffect(() => {
    if (!binary.trim()) {
      setHex("");
      return;
    }

    try {
      // Clean binary input
      const cleanBin = binary.replace(/[^01]/g, "");
      if (!cleanBin) {
        setHex("");
        return;
      }

      // Pad binary string to multiple of 4
      const paddedBin = cleanBin.padStart(Math.ceil(cleanBin.length / 4) * 4, "0");
      
      let result = "";
      for (let i = 0; i < paddedBin.length; i += 4) {
        const chunk = paddedBin.substring(i, i + 4);
        result += parseInt(chunk, 2).toString(16).toUpperCase();
      }
      setHex(result);
    } catch (e) {
      setHex("Invalid binary input");
    }
  }, [binary]);

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Binary Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter binary (0s and 1s)..."
              className="min-h-[200px] font-mono"
              value={binary}
              onChange={(e) => setBinary(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hexadecimal Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="Hex output will appear here..."
              className="min-h-[200px] bg-muted font-mono"
              value={hex}
            />
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
    </div>
  );
};

export default BinaryToHex;
