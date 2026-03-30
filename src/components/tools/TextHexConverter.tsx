import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function TextHexConverter() {
  const [text, setText] = useState("");
  const [hex, setHex] = useState("");

  const handleTextToHex = () => {
    if (!text) return;
    try {
      const result = text
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(" ");
      setHex(result);
      toast.success("Converted to Hex!");
    } catch (e) {
      toast.error("Error converting text!");
    }
  };

  const handleHexToText = () => {
    if (!hex) return;
    try {
      const result = hex
        .split(/\s+/)
        .map((h) => String.fromCharCode(parseInt(h, 16)))
        .join("");
      setText(result);
      toast.success("Converted to Text!");
    } catch (e) {
      toast.error("Invalid Hex format!");
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Text Input/Output</label>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(text)} disabled={!text}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Enter text here..."
            className="h-64 resize-none font-mono text-xs"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button className="w-full" onClick={handleTextToHex} disabled={!text}>
            Text to Hex <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Hex Input/Output</label>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(hex)} disabled={!hex}>
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => downloadResult(hex, "hex.txt")} disabled={!hex}>
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Enter hex here (e.g., 48 65 6c 6c 6f)..."
            className="h-64 resize-none font-mono text-xs"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
          />
          <Button className="w-full" variant="secondary" onClick={handleHexToText} disabled={!hex}>
            Hex to Text <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => { setText(""); setHex(""); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool converts plain text into its hexadecimal representation and vice versa. 
            Each character is represented by its ASCII/Unicode value in base-16. 
            Hexadecimal is widely used in computer science to represent binary data in a more compact and readable format.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
