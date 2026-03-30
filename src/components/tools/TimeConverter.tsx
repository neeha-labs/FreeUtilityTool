import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, Check, Clock } from "lucide-react";

type Unit = "Seconds" | "Minutes" | "Hours" | "Days" | "Weeks";

const CONVERSION_RATES: Record<Unit, number> = {
  Seconds: 1,
  Minutes: 60,
  Hours: 3600,
  Days: 86400,
  Weeks: 604800
};

export default function TimeConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<Unit>("Hours");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;

    const baseValue = val * CONVERSION_RATES[fromUnit];
    
    return (Object.keys(CONVERSION_RATES) as Unit[]).reduce((acc, unit) => {
      acc[unit] = (baseValue / CONVERSION_RATES[unit]).toFixed(4);
      return acc;
    }, {} as Record<Unit, string>);
  }, [value, fromUnit]);

  const downloadResults = () => {
    if (!results) return;
    const content = `
Time Conversion Results
-----------------------
Input: ${value} ${fromUnit}
${Object.entries(results).map(([unit, val]) => `${unit}: ${val}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "time-conversion.txt";
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
          <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs">Value to Convert</Label>
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="h-12 text-lg font-mono" />
        </div>

        <div className="space-y-4">
          <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs">From Unit</Label>
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as Unit)}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Seconds">Seconds</SelectItem>
              <SelectItem value="Minutes">Minutes</SelectItem>
              <SelectItem value="Hours">Hours</SelectItem>
              <SelectItem value="Days">Days</SelectItem>
              <SelectItem value="Weeks">Weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
          <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4" /> Time Info
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed italic">
            1 Hour = 60 Minutes = 3600 Seconds<br/>
            1 Day = 24 Hours
          </p>
        </div>
      </div>

      <div className="space-y-6 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="space-y-4">
          {results && (Object.entries(results) as [Unit, string][]).map(([unit, val]) => (
            <div key={unit} className={`p-5 bg-white rounded-2xl border border-slate-100 shadow-sm ${unit === fromUnit ? 'ring-2 ring-indigo-500' : ''}`}>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">{unit}</p>
              <p className="text-3xl font-black text-indigo-600 truncate">{val}</p>
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
