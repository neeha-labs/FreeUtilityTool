import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Percent } from "lucide-react";

export default function PercentageCalculator() {
  const [val1, setVal1] = useState(20);
  const [val2, setVal2] = useState(100);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const whatIsPOfX = (val1 * val2) / 100;
    const xIsWhatPOfY = (val1 / val2) * 100;
    const pIncrease = ((val2 - val1) / val1) * 100;

    return {
      whatIsPOfX: whatIsPOfX.toFixed(2),
      xIsWhatPOfY: xIsWhatPOfY.toFixed(2),
      pIncrease: pIncrease.toFixed(2)
    };
  }, [val1, val2]);

  const downloadResults = () => {
    const content = `
Percentage Calculation Results
-----------------------
Input Value 1: ${val1}
Input Value 2: ${val2}
${val1}% of ${val2} is: ${results.whatIsPOfX}
${val1} is what % of ${val2}: ${results.xIsWhatPOfY}%
Percentage Increase from ${val1} to ${val2}: ${results.pIncrease}%
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "percentage-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `${val1}% of ${val2} is ${results.whatIsPOfX}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs">Value 1</Label>
          <Input type="number" value={val1} onChange={(e) => setVal1(Number(e.target.value))} className="h-12 text-lg font-mono" />
        </div>

        <div className="space-y-4">
          <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs">Value 2</Label>
          <Input type="number" value={val2} onChange={(e) => setVal2(Number(e.target.value))} className="h-12 text-lg font-mono" />
        </div>

        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
          <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Percent className="w-4 h-4" /> Quick Reference
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed italic">
            Percentage calculations are useful for discounts, growth tracking, and statistical analysis.
          </p>
        </div>
      </div>

      <div className="space-y-6 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">What is {val1}% of {val2}?</p>
            <p className="text-3xl font-black text-indigo-600">{results.whatIsPOfX}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">{val1} is what % of {val2}?</p>
            <p className="text-3xl font-black text-indigo-600">{results.xIsWhatPOfY}%</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">% Increase from {val1} to {val2}</p>
            <p className="text-3xl font-black text-indigo-600">{results.pIncrease}%</p>
          </div>
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
