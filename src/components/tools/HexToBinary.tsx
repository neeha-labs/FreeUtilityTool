import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const HexToBinary = () => {
  const [hex, setHex] = useState("");
  const [binary, setBinary] = useState("");

  useEffect(() => {
    if (!hex.trim()) {
      setBinary("");
      return;
    }

    try {
      // Clean hex input
      const cleanHex = hex.replace(/[^0-9A-Fa-f]/g, "");
      if (!cleanHex) {
        setBinary("");
        return;
      }

      let result = "";
      for (let i = 0; i < cleanHex.length; i++) {
        const bin = parseInt(cleanHex[i], 16).toString(2).padStart(4, "0");
        result += bin + (i < cleanHex.length - 1 ? " " : "");
      }
      setBinary(result);
    } catch (e) {
      setBinary("Invalid hex input");
    }
  }, [hex]);

  const copyResults = () => {
    navigator.clipboard.writeText(binary);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([binary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "binary-output.txt";
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
            <CardTitle>Hex Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter hex (0-9, A-F)..."
              className="min-h-[200px] font-mono"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Binary Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="Binary output will appear here..."
              className="min-h-[200px] bg-muted font-mono"
              value={binary}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!binary}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!binary}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HexToBinary;
