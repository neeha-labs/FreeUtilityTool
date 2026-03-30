import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, Check, Layers } from "lucide-react";

type Category = "Length" | "Weight" | "Volume";

const UNITS: Record<Category, Record<string, number>> = {
  Length: {
    Meters: 1,
    Kilometers: 0.001,
    Centimeters: 100,
    Millimeters: 1000,
    Miles: 0.000621371,
    Yards: 1.09361,
    Feet: 3.28084,
    Inches: 39.3701
  },
  Weight: {
    Kilograms: 1,
    Grams: 1000,
    Milligrams: 1000000,
    Pounds: 2.20462,
    Ounces: 35.274
  },
  Volume: {
    Liters: 1,
    Milliliters: 1000,
    Gallons: 0.264172,
    Quarts: 1.05669,
    Pints: 2.11338,
    Cups: 4.22675
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("Length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<string>("Meters");
  const [copied, setCopied] = useState(false);

  // Reset fromUnit when category changes
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(Object.keys(UNITS[cat])[0]);
  };

  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;

    const currentUnits = UNITS[category];
    const baseValue = val / (currentUnits[fromUnit] as number);
    
    return Object.entries(currentUnits).reduce((acc, [unit, rate]) => {
      acc[unit] = (baseValue * (rate as number)).toFixed(4);
      return acc;
    }, {} as Record<string, string>);
  }, [value, fromUnit, category]);

  const downloadResults = () => {
    if (!results) return;
    const content = `
Unit Conversion Results (${category})
-----------------------
Input: ${value} ${fromUnit}
${Object.entries(results).map(([unit, val]) => `${unit}: ${val}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "unit-conversion.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!results) return;
    const content = Object.entries(results).map(([unit, val]) => `${val} ${unit}`).join(', ');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Category</Label>
          <Select value={category} onValueChange={(v) => handleCategoryChange(v as Category)}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Length">Length</SelectItem>
              <SelectItem value="Weight">Weight</SelectItem>
              <SelectItem value="Volume">Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Value to Convert</Label>
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="h-12 text-lg font-mono" />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">From Unit</Label>
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(UNITS[category]).map((unit) => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
          <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" /> Conversion Info
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed italic">
            Select a category and enter a value to see conversions across multiple units instantly.
          </p>
        </div>
      </div>

      <div className="space-y-6 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {results && Object.entries(results).map(([unit, val]) => (
            <div key={unit} className={`p-5 bg-white rounded-2xl border border-slate-100 shadow-sm ${unit === fromUnit ? 'ring-2 ring-indigo-500' : ''}`}>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">{unit}</p>
              <p className="text-2xl font-black text-indigo-600 truncate">{val}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full pt-4 border-t border-slate-100">
          <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl font-bold uppercase tracking-wider text-[10px]">
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-11 rounded-xl border-slate-200 font-bold uppercase tracking-wider text-[10px]">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Results"}
          </Button>
        </div>
      </div>
    </div>
  );
}
