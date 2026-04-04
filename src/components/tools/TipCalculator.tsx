import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, Check, Utensils, Globe } from "lucide-react";
import { SUPPORTED_CURRENCIES } from "@/lib/currencies";

export default function TipCalculator() {
  const [currency, setCurrency] = useState("INR");
  const [bill, setBill] = useState(1000);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [people, setPeople] = useState(1);
  const [copied, setCopied] = useState(false);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;
  const locale = currency === "INR" ? "en-IN" : "en-US";

  const results = useMemo(() => {
    const totalTip = (bill * tipPercentage) / 100;
    const totalBill = bill + totalTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = totalBill / people;

    return {
      totalTip: Math.round(totalTip * 100) / 100,
      totalBill: Math.round(totalBill * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100,
      totalPerPerson: Math.round(totalPerPerson * 100) / 100
    };
  }, [bill, tipPercentage, people]);

  const downloadResults = () => {
    const content = `
Tip Calculation Results (${currency})
-----------------------
Bill Amount: ${symbol}${bill.toLocaleString(locale)}
Tip Percentage: ${tipPercentage}%
Number of People: ${people}
Total Tip: ${symbol}${results.totalTip.toLocaleString(locale)}
Total Bill: ${symbol}${results.totalBill.toLocaleString(locale)}
Tip per Person: ${symbol}${results.tipPerPerson.toLocaleString(locale)}
Total per Person: ${symbol}${results.totalPerPerson.toLocaleString(locale)}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tip-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `Total Bill: ${symbol}${results.totalBill.toLocaleString(locale)}, Total per Person: ${symbol}${results.totalPerPerson.toLocaleString(locale)}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-[120px] h-9 bg-white border-slate-200">
            <Globe className="mr-2 h-4 w-4 text-slate-500" />
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_CURRENCIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-slate-700 font-bold">Bill Amount ({symbol})</Label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{symbol}{bill.toLocaleString(locale)}</span>
            </div>
            <Slider value={[bill]} min={0} max={50000} step={100} onValueChange={(v) => {
              const val = Array.isArray(v) ? v[0] : v;
              if (val !== undefined) setBill(val);
            }} />
            <Input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="font-mono" />
          </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-bold">Tip Percentage (%)</Label>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{tipPercentage}%</span>
          </div>
          <Slider value={[tipPercentage]} min={0} max={50} step={1} onValueChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            if (val !== undefined) setTipPercentage(val);
          }} />
          <Input type="number" value={tipPercentage} onChange={(e) => setTipPercentage(Number(e.target.value))} className="font-mono" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-bold">Number of People</Label>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{people}</span>
          </div>
          <Slider value={[people]} min={1} max={50} step={1} onValueChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            if (val !== undefined) setPeople(val);
          }} />
          <Input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} className="font-mono" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="text-center space-y-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Total per Person</p>
          <h3 className="text-7xl font-black text-indigo-600">{symbol}{results.totalPerPerson.toLocaleString(locale)}</h3>
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-2xl font-bold text-lg">
            <Utensils className="w-5 h-5" /> Tip {symbol}{results.tipPerPerson.toLocaleString(locale)} each
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Bill</p>
            <p className="text-lg font-bold text-slate-900">{symbol}{results.totalBill.toLocaleString(locale)}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Tip</p>
            <p className="text-lg font-bold text-slate-900">{symbol}{results.totalTip.toLocaleString(locale)}</p>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl">
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-11 rounded-xl border-slate-200">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Results"}
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}
