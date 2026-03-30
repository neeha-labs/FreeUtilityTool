import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function TextOctalConverter() {
  const [text, setText] = useState("");
  const [octal, setOctal] = useState("");

  const handleTextToOctal = () => {
    if (!text) return;
    try {
      const result = text
        .split("")
        .map((char) => char.charCodeAt(0).toString(8).padStart(3, "0"))
        .join(" ");
      setOctal(result);
      toast.success("Converted to Octal!");
    } catch (e) {
      toast.error("Error converting text!");
    }
  };

  const handleOctalToText = () => {
    if (!octal) return;
    try {
      const result = octal
        .split(/\s+/)
        .map((o) => String.fromCharCode(parseInt(o, 8)))
        .join("");
      setText(result);
      toast.success("Converted to Text!");
    } catch (e) {
      toast.error("Invalid Octal format!");
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
          <Button className="w-full" onClick={handleTextToOctal} disabled={!text}>
            Text to Octal <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Octal Input/Output</label>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(octal)} disabled={!octal}>
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => downloadResult(octal, "octal.txt")} disabled={!octal}>
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Enter octal here (e.g., 110 145 154 154 157)..."
            className="h-64 resize-none font-mono text-xs"
            value={octal}
            onChange={(e) => setOctal(e.target.value)}
          />
          <Button className="w-full" variant="secondary" onClick={handleOctalToText} disabled={!octal}>
            Octal to Text <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => { setText(""); setOctal(""); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool converts plain text into its octal representation and vice versa. 
            Each character is represented by its ASCII/Unicode value in base-8. 
            Octal is a base-8 number system that uses digits 0-7. It was once widely used in computing but is now less common than hexadecimal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
