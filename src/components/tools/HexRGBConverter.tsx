import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function HexRGBConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    const converted = hexToRgb(val);
    if (converted) {
      setRgb(converted);
    }
  };

  const handleRgbChange = (val: string) => {
    setRgb(val);
    const parts = val.split(",").map((p) => parseInt(p.trim()));
    if (parts.length === 3 && parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
      setHex(rgbToHex(parts[0], parts[1], parts[2]));
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const content = `Hex: ${hex}\nRGB: ${rgb}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-conversion.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed border-slate-200 mb-8 transition-colors duration-300" style={{ backgroundColor: hex }}>
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
          <p className="text-xl font-mono font-bold text-slate-900">{hex.toUpperCase()}</p>
          <p className="text-sm text-slate-500">rgb({rgb})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">HEX Color Code</label>
          <div className="flex gap-2">
            <Input
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="font-mono"
            />
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(hex)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">RGB Values (R, G, B)</label>
          <div className="flex gap-2">
            <Input
              value={rgb}
              onChange={(e) => handleRgbChange(e.target.value)}
              placeholder="0, 0, 0"
              className="font-mono"
            />
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(`rgb(${rgb})`)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={downloadResult}>
          <Download className="h-4 w-4 mr-2" /> Download Results
        </Button>
        <Button variant="ghost" onClick={() => handleHexChange("#3b82f6")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool converts between Hexadecimal color codes (used in web design) and RGB (Red, Green, Blue) values. 
            Simply enter a Hex code or RGB values to see the conversion and a live preview of the color.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
