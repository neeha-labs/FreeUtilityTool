import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, Check, Thermometer } from "lucide-react";

type Unit = "Celsius" | "Fahrenheit" | "Kelvin";

export default function TemperatureConverter() {
  const [value, setValue] = useState("0");
  const [fromUnit, setFromUnit] = useState<Unit>("Celsius");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;

    let celsius = 0;
    if (fromUnit === "Celsius") celsius = val;
    else if (fromUnit === "Fahrenheit") celsius = (val - 32) * 5 / 9;
    else if (fromUnit === "Kelvin") celsius = val - 273.15;

    return {
      Celsius: celsius.toFixed(2),
      Fahrenheit: (celsius * 9 / 5 + 32).toFixed(2),
      Kelvin: (celsius + 273.15).toFixed(2)
    };
  }, [value, fromUnit]);

  const downloadResults = () => {
    if (!results) return;
    const content = `
Temperature Conversion Results
-----------------------
Input: ${value} ${fromUnit}
Celsius: ${results.Celsius}°C
Fahrenheit: ${results.Fahrenheit}°F
Kelvin: ${results.Kelvin}K
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "temperature-conversion.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!results) return;
    const content = `${results.Celsius}°C, ${results.Fahrenheit}°F, ${results.Kelvin}K`;
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
              <SelectItem value="Celsius">Celsius (°C)</SelectItem>
              <SelectItem value="Fahrenheit">Fahrenheit (°F)</SelectItem>
              <SelectItem value="Kelvin">Kelvin (K)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
          <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Thermometer className="w-4 h-4" /> Conversion Info
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed italic">
            Celsius to Fahrenheit: (°C × 9/5) + 32 = °F<br/>
            Celsius to Kelvin: °C + 273.15 = K
          </p>
        </div>
      </div>

      <div className="space-y-6 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="space-y-4">
          {results && (Object.entries(results) as [Unit, string][]).map(([unit, val]) => (
            <div key={unit} className={`p-5 bg-white rounded-2xl border border-slate-100 shadow-sm ${unit === fromUnit ? 'ring-2 ring-indigo-500' : ''}`}>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">{unit}</p>
              <p className="text-3xl font-black text-indigo-600">{val}{unit === 'Kelvin' ? 'K' : '°' + unit[0]}</p>
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
