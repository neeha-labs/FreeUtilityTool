import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Copy, Check, Palette } from "lucide-react";

export default function ColorPicker() {
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const downloadResults = () => {
    const content = `
Color Information
-----------------------
HEX: ${color}
RGB: ${hexToRgb(color)}
HSL: ${hexToHsl(color)}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-info.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Select Color</Label>
          <div className="flex gap-4">
            <Input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="h-24 w-24 p-1 rounded-2xl cursor-pointer border-2 border-slate-100"
            />
            <Input 
              type="text" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="h-24 flex-1 text-4xl font-black uppercase text-center rounded-2xl border-2 border-slate-100 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-3">
          <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4" /> Color Formats
          </h4>
          <div className="space-y-3">
            {[
              { label: "HEX", value: color },
              { label: "RGB", value: hexToRgb(color) },
              { label: "HSL", value: hexToHsl(color) }
            ].map((format) => (
              <div key={format.label} className="flex items-center justify-between bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                <div>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{format.label}</p>
                  <p className="text-sm font-mono font-bold text-indigo-900">{format.value}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyResults(format.value)} className="hover:bg-indigo-50">
                  <Copy className="w-4 h-4 text-indigo-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div 
          className="w-full h-64 rounded-3xl shadow-2xl border-8 border-white ring-1 ring-slate-100 transition-colors duration-200"
          style={{ backgroundColor: color }}
        />

        <div className="flex gap-3 w-full">
          <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl">
            <Download className="w-4 h-4" /> Download Info
          </Button>
          <Button variant="outline" onClick={() => copyResults(color)} className="flex-1 gap-2 h-11 rounded-xl border-slate-200">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied HEX" : "Copy HEX"}
          </Button>
        </div>
      </div>
    </div>
  );
}
