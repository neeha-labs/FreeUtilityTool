import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Download, Copy, Check, Globe } from "lucide-react";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange";
import { toast } from "sonner";

export default function EMICalculator() {
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [copied, setCopied] = useState(false);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;
  const locale = selectedCurrency.locale;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newAmount = Number((amount * rate).toFixed(2));
      setAmount(newAmount);
      setAmountInput(newAmount.toString());
      setCurrency(newCurrency);
      toast.success(`Converted values to ${newCurrency}`);
    } catch (error) {
      setCurrency(newCurrency);
    }
  };

  // Local string states for inputs to allow empty state (backspacing zero)
  const [amountInput, setAmountInput] = useState("1000000");
  const [rateInput, setRateInput] = useState("8.5");
  const [tenureInput, setTenureInput] = useState("20");

  const handleAmountInputChange = (val: string) => {
    if (val === "") {
      setAmountInput("");
      return;
    }
    let processed = val.replace(/^0+(?!\.)/, "");
    if (processed === "") processed = "0";
    if (/^\d*\.?\d*$/.test(processed)) {
      setAmountInput(processed);
      const num = parseFloat(processed);
      if (!isNaN(num)) setAmount(num);
    }
  };

  const handleRateInputChange = (val: string) => {
    if (val === "") {
      setRateInput("");
      return;
    }
    let processed = val.replace(/^0+(?!\.)/, "");
    if (processed === "") processed = "0";
    if (/^\d*\.?\d*$/.test(processed)) {
      setRateInput(processed);
      const num = parseFloat(processed);
      if (!isNaN(num)) setRate(num);
    }
  };

  const handleTenureInputChange = (val: string) => {
    if (val === "") {
      setTenureInput("");
      return;
    }
    let processed = val.replace(/^0+(?!\.)/, "");
    if (processed === "") processed = "0";
    if (/^\d*$/.test(processed)) {
      setTenureInput(processed);
      const num = parseInt(processed);
      if (!isNaN(num)) setTenure(num);
    }
  };

  // Sync inputs when sliders or tenure type changes
  const handleSliderAmount = (v: number[]) => {
    if (v && v.length > 0) {
      setAmount(v[0]);
      setAmountInput(v[0].toString());
    }
  };

  const handleSliderRate = (v: number[]) => {
    if (v && v.length > 0) {
      setRate(v[0]);
      setRateInput(v[0].toString());
    }
  };

  const handleSliderTenure = (v: number[]) => {
    if (v && v.length > 0) {
      setTenure(v[0]);
      setTenureInput(v[0].toString());
    }
  };

  // Restore default values on blur if empty
  const handleBlur = (type: 'amount' | 'rate' | 'tenure') => {
    if (type === 'amount' && (amountInput === "" || isNaN(parseFloat(amountInput)))) {
      setAmountInput(amount.toString());
    } else if (type === 'rate' && (rateInput === "" || isNaN(parseFloat(rateInput)))) {
      setRateInput(rate.toString());
    } else if (type === 'tenure' && (tenureInput === "" || isNaN(parseFloat(tenureInput)))) {
      setTenureInput(tenure.toString());
    }
  };

  const emiData = useMemo(() => {
    const p = amount;
    const r = rate / 12 / 100;
    const n = tenureType === "years" ? tenure * 12 : tenure;
    
    if (n === 0 || r === 0) return { emi: 0, totalInterest: 0, totalPayment: 0, chartData: [] };

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      chartData: [
        { name: "Principal Amount", value: p },
        { name: "Total Interest", value: Math.round(totalInterest) },
      ]
    };
  }, [amount, rate, tenure, tenureType]);

  const COLORS = ["#4f46e5", "#f43f5e"];

  const downloadResults = () => {
    const content = `
EMI Calculation Results (${currency})
-----------------------
Loan Amount: ${formatCurrency(amount, currency)}
Interest Rate: ${rate}% P.A.
Tenure: ${tenure} ${tenureType}
Monthly EMI: ${formatCurrency(emiData.emi, currency)}
Total Interest: ${formatCurrency(emiData.totalInterest, currency)}
Total Payment: ${formatCurrency(emiData.totalPayment, currency)}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `EMI: ${formatCurrency(emiData.emi, currency)}, Total Interest: ${formatCurrency(emiData.totalInterest, currency)}, Total Payment: ${formatCurrency(emiData.totalPayment, currency)}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Select value={currency} onValueChange={handleCurrencyChange}>
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
              <Label className="text-slate-700 font-bold">Loan Amount ({symbol})</Label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{formatCurrency(amount, currency)}</span>
            </div>
            <Slider value={[amount]} min={0} max={10000000} step={50000} onValueChange={handleSliderAmount} />
            <Input 
              type="text" 
              inputMode="numeric"
              value={amountInput} 
              onChange={(e) => handleAmountInputChange(e.target.value)} 
              onBlur={() => handleBlur('amount')}
              className="font-mono" 
            />
          </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-bold">Interest Rate (% P.A.)</Label>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{rate}%</span>
          </div>
          <Slider value={[rate]} min={0} max={20} step={0.1} onValueChange={handleSliderRate} />
          <Input 
            type="text" 
            inputMode="decimal"
            value={rateInput} 
            onChange={(e) => handleRateInputChange(e.target.value)} 
            onBlur={() => handleBlur('rate')}
            className="font-mono" 
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-bold">Loan Tenure</Label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <Button 
                variant={tenureType === "years" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => {
                  setTenureType("years");
                  setTenure(Math.min(tenure, 30));
                  setTenureInput(Math.min(tenure, 30).toString());
                }}
                className="h-7 px-3 text-xs"
              >
                Years
              </Button>
              <Button 
                variant={tenureType === "months" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => {
                  setTenureType("months");
                  setTenure(Math.min(tenure * 12, 360));
                  setTenureInput(Math.min(tenure * 12, 360).toString());
                }}
                className="h-7 px-3 text-xs"
              >
                Months
              </Button>
            </div>
          </div>
          <Slider 
            value={[tenure]} 
            min={0} 
            max={tenureType === "years" ? 30 : 360} 
            step={1} 
            onValueChange={handleSliderTenure} 
          />
          <div className="flex gap-4 items-center">
            <Input 
              type="text" 
              inputMode="numeric"
              value={tenureInput} 
              onChange={(e) => handleTenureInputChange(e.target.value)} 
              onBlur={() => handleBlur('tenure')}
              className="font-mono flex-1" 
            />
            <span className="text-sm font-medium text-slate-500 w-16">{tenureType}</span>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-700 italic">
          * Disclaimer: This calculator is for estimation purposes only. Actual bank rates and EMIs may vary based on processing fees and other charges.
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Monthly EMI</p>
          <h3 className="text-5xl font-black text-indigo-600">{formatCurrency(emiData.emi, currency)}</h3>
        </div>

        <div className="w-full h-[280px] min-h-[280px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <PieChart>
              <Pie
                data={emiData.chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {emiData.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => formatCurrency(value, currency)} 
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Interest</p>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(emiData.totalInterest, currency)}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Payment</p>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(emiData.totalPayment, currency)}</p>
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
