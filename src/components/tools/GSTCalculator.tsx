import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Copy, Check, Globe } from "lucide-react";
import { SUPPORTED_CURRENCIES } from "@/lib/currencies";

const GST_RATES = [5, 12, 18, 28];

export default function GSTCalculator() {
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<"inclusive" | "exclusive">("exclusive");
  const [copied, setCopied] = useState(false);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;
  const locale = currency === "INR" ? "en-IN" : "en-US";

  const gstData = useMemo(() => {
    let baseAmount, gstAmount, totalAmount;
    
    if (type === "exclusive") {
      baseAmount = amount;
      gstAmount = (amount * rate) / 100;
      totalAmount = amount + gstAmount;
    } else {
      totalAmount = amount;
      baseAmount = (amount * 100) / (100 + rate);
      gstAmount = totalAmount - baseAmount;
    }

    return {
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      cgst: Math.round((gstAmount / 2) * 100) / 100,
      sgst: Math.round((gstAmount / 2) * 100) / 100,
    };
  }, [amount, rate, type]);

  const downloadResults = () => {
    const content = `
GST Calculation Results (${currency})
-----------------------
Original Amount: ${symbol}${amount.toLocaleString(locale)}
GST Rate: ${rate}%
Calculation Type: GST ${type.charAt(0).toUpperCase() + type.slice(1)}
Base Amount: ${symbol}${gstData.baseAmount.toLocaleString(locale)}
Total GST: ${symbol}${gstData.gstAmount.toLocaleString(locale)}
CGST: ${symbol}${gstData.cgst.toLocaleString(locale)}
SGST/UTGST: ${symbol}${gstData.sgst.toLocaleString(locale)}
Total Amount: ${symbol}${gstData.totalAmount.toLocaleString(locale)}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gst-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `Base: ${symbol}${gstData.baseAmount.toLocaleString(locale)}, GST: ${symbol}${gstData.gstAmount.toLocaleString(locale)}, Total: ${symbol}${gstData.totalAmount.toLocaleString(locale)}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-[150px]">
            <Globe className="mr-2 h-4 w-4" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">Amount ({symbol})</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="font-mono" />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">GST Rate (%)</Label>
            <Select value={rate.toString()} onValueChange={(v) => setRate(Number(v))}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {GST_RATES.map(r => <SelectItem key={r} value={r.toString()}>{r}%</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-bold">GST Type</Label>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
              <Button 
                variant={type === "exclusive" ? "default" : "ghost"} 
                className="flex-1 rounded-lg h-9" 
                onClick={() => setType("exclusive")}
              >
                GST Exclusive
              </Button>
              <Button 
                variant={type === "inclusive" ? "default" : "ghost"} 
                className="flex-1 rounded-lg h-9" 
                onClick={() => setType("inclusive")}
              >
                GST Inclusive
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl">
              <Download className="w-4 h-4" /> Download
            </Button>
            <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-11 rounded-xl border-slate-200">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy Results"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-slate-400 text-sm uppercase tracking-wider">Base Amount</span>
                <span className="text-xl font-bold">{symbol}{gstData.baseAmount.toLocaleString(locale)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-slate-400 text-sm uppercase tracking-wider">Total GST ({rate}%)</span>
                <span className="text-xl font-bold text-indigo-400">{symbol}{gstData.gstAmount.toLocaleString(locale)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Total Amount</span>
                <span className="text-3xl font-black text-green-400">{symbol}{gstData.totalAmount.toLocaleString(locale)}</span>
              </div>
            </div>
          </div>

          <Table className="border rounded-2xl overflow-hidden shadow-sm">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700">Tax Component</TableHead>
                <TableHead className="text-right font-bold text-slate-700">Amount ({symbol})</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-slate-600">CGST ({rate/2}%)</TableCell>
                <TableCell className="text-right font-medium">{symbol}{gstData.cgst.toLocaleString(locale)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-slate-600">SGST/UTGST ({rate/2}%)</TableCell>
                <TableCell className="text-right font-medium">{symbol}{gstData.sgst.toLocaleString(locale)}</TableCell>
              </TableRow>
              <TableRow className="font-bold bg-slate-50/50">
                <TableCell className="text-indigo-600">Total GST</TableCell>
                <TableCell className="text-right text-indigo-600">{symbol}{gstData.gstAmount.toLocaleString(locale)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
