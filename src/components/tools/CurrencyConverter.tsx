import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, RefreshCw, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "SGD", "AED", "CNY"];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rate, setRate] = useState(83.5);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchRate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`);
      const data = await res.json();
      if (data.rates && data.rates[to]) {
        setRate(data.rates[to]);
      } else {
        throw new Error("Currency not supported by API");
      }
    } catch (error) {
      console.error("Failed to fetch rates, using fallback", error);
      // Fallback rates (approximate)
      const fallbacks: Record<string, Record<string, number>> = {
        "USD": { "INR": 83.5, "AED": 3.67, "EUR": 0.92, "GBP": 0.79, "JPY": 151.0, "AUD": 1.52, "CAD": 1.35, "SGD": 1.34, "CNY": 7.23 },
        "AED": { "INR": 22.74, "USD": 0.27, "EUR": 0.25, "GBP": 0.21, "JPY": 41.1, "AUD": 0.41, "CAD": 0.37, "SGD": 0.36, "CNY": 1.97 },
        "INR": { "USD": 0.012, "AED": 0.044, "EUR": 0.011, "GBP": 0.0095, "JPY": 1.81, "AUD": 0.018, "CAD": 0.016, "SGD": 0.016, "CNY": 0.087 }
      };

      if (fallbacks[from] && fallbacks[from][to]) {
        setRate(fallbacks[from][to]);
      } else if (fallbacks[to] && fallbacks[to][from]) {
        setRate(1 / fallbacks[to][from]);
      } else {
        setRate(1.0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [from, to]);

  const result = (amount * rate).toFixed(2);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const downloadResults = () => {
    const content = `
Currency Conversion Results
--------------------------
Amount: ${amount} ${from}
Converted Amount: ${result} ${to}
Exchange Rate: 1 ${from} = ${rate.toFixed(4)} ${to}
Date: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `currency-conversion-${from}-to-${to}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `${amount} ${from} = ${result} ${to}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <Label className="text-slate-700 font-bold">Amount</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="font-mono h-11 rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label className="text-slate-700 font-bold">From</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center pb-2">
          <Button variant="ghost" size="icon" onClick={swap} className="rounded-full hover:bg-indigo-50 text-indigo-600 h-11 w-11 border border-slate-100">
            <ArrowRightLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-700 font-bold">To</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-indigo-600 border border-indigo-500 rounded-3xl p-10 text-center space-y-4 shadow-xl shadow-indigo-100 text-white">
        <p className="text-indigo-100 font-medium tracking-wide uppercase text-xs">{amount} {from} equals</p>
        <h3 className="text-6xl font-black">{result} {to}</h3>
        <div className="flex items-center justify-center gap-2 text-xs text-indigo-200">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>1 {from} = {rate.toFixed(4)} {to}</span>
        </div>
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

      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-slate-400 italic text-center">
        * Rates are updated periodically from Frankfurter API. For critical financial transactions, please verify with your bank.
      </div>
    </div>
  );
}
