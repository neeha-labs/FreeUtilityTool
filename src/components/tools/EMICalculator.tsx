import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Download, Copy, Check } from "lucide-react";

export default function EMICalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [copied, setCopied] = useState(false);

  // Local string states for inputs to allow empty state (backspacing zero)
  const [amountInput, setAmountInput] = useState("1000000");
  const [rateInput, setRateInput] = useState("8.5");
  const [tenureInput, setTenureInput] = useState("20");

  // Sync inputs when sliders or tenure type changes
  const handleSliderAmount = (v: number[]) => {
    setAmount(v[0]);
    setAmountInput(v[0].toString());
  };

  const handleSliderRate = (v: number[]) => {
    setRate(v[0]);
    setRateInput(v[0].toString());
  };

  const handleSliderTenure = (v: number[]) => {
    setTenure(v[0]);
    setTenureInput(v[0].toString());
  };

  const handleAmountInputChange = (val: string) => {
    setAmountInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) setAmount(num);
  };

  const handleRateInputChange = (val: string) => {
    setRateInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) setRate(num);
  };

  const handleTenureInputChange = (val: string) => {
    setTenureInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) setTenure(num);
  };

  // Default to zero after 2 seconds of inactivity if input is empty
  useEffect(() => {
    const timer = setTimeout(() => {
      if (amountInput === "") {
        setAmountInput("0");
        setAmount(0);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [amountInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rateInput === "") {
        setRateInput("0");
        setRate(0);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [rateInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tenureInput === "") {
        setTenureInput("0");
        setTenure(0);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [tenureInput]);

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
EMI Calculation Results
-----------------------
Loan Amount: ₹${amount.toLocaleString("en-IN")}
Interest Rate: ${rate}% P.A.
Tenure: ${tenure} ${tenureType}
Monthly EMI: ₹${emiData.emi.toLocaleString("en-IN")}
Total Interest: ₹${emiData.totalInterest.toLocaleString("en-IN")}
Total Payment: ₹${emiData.totalPayment.toLocaleString("en-IN")}
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
    const content = `EMI: ₹${emiData.emi.toLocaleString("en-IN")}, Total Interest: ₹${emiData.totalInterest.toLocaleString("en-IN")}, Total Payment: ₹${emiData.totalPayment.toLocaleString("en-IN")}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-bold">Loan Amount (₹)</Label>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">₹{amount.toLocaleString("en-IN")}</span>
          </div>
          <Slider value={[amount]} min={0} max={10000000} step={50000} onValueChange={handleSliderAmount} />
          <Input 
            type="text" 
            inputMode="numeric"
            value={amountInput} 
            onChange={(e) => handleAmountInputChange(e.target.value)} 
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
          <h3 className="text-5xl font-black text-indigo-600">₹{emiData.emi.toLocaleString("en-IN")}</h3>
        </div>

        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
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
                formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} 
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Interest</p>
            <p className="text-lg font-bold text-slate-900">₹{emiData.totalInterest.toLocaleString("en-IN")}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Payment</p>
            <p className="text-lg font-bold text-slate-900">₹{emiData.totalPayment.toLocaleString("en-IN")}</p>
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
  );
}
