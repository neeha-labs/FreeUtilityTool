import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";

const UNITS: Record<string, number> = {
  "Millimeter (mm)": 0.001,
  "Centimeter (cm)": 0.01,
  "Meter (m)": 1,
  "Kilometer (km)": 1000,
  "Inch (in)": 0.0254,
  "Foot (ft)": 0.3048,
  "Yard (yd)": 0.9144,
  "Mile (mi)": 1609.34,
};

export default function LengthConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("Meter (m)");
  const [to, setTo] = useState("Foot (ft)");
  const [copied, setCopied] = useState(false);

  const convert = (val: number, f: string, t: string) => {
    const meters = val * UNITS[f];
    return meters / UNITS[t];
  };

  const result = convert(value, from, to).toFixed(4);

  const downloadResults = () => {
    const content = `
Length Conversion Results
------------------------
Value: ${value} ${from}
Converted Value: ${result} ${to}
Date: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `length-conversion-${from}-to-${to}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `${value} ${from} = ${result} ${to}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">Value</Label>
            <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="h-11 rounded-xl font-mono" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">From Unit</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(UNITS).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">To Unit</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(UNITS).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">Result</Label>
            <div className="h-11 flex items-center px-4 bg-slate-50 border border-slate-100 rounded-xl font-black text-indigo-600 text-lg">
              {result}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 text-white rounded-3xl p-10 text-center shadow-xl shadow-indigo-100 border border-indigo-500">
        <p className="text-indigo-100 text-xs uppercase tracking-widest font-bold mb-2">Conversion Result</p>
        <h3 className="text-4xl md:text-5xl font-black">{value} {from.split(" ")[0]} = {result} {to.split(" ")[0]}</h3>
      </div>

      <div className="flex gap-4">
        <Button onClick={downloadResults} className="flex-1 gap-2 bg-slate-900 hover:bg-black h-12 rounded-2xl">
          <Download className="w-4 h-4" /> Download
        </Button>
        <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-12 rounded-2xl border-slate-200">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy Results"}
        </Button>
      </div>
    </div>
  );
}
