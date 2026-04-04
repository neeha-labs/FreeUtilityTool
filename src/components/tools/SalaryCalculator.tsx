import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Globe } from "lucide-react";
import { toast } from "sonner";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange";

const SalaryCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [annualSalary, setAnnualSalary] = useState(50000);
  const [annualSalaryInput, setAnnualSalaryInput] = useState("50000");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [weeksPerYearInput, setWeeksPerYearInput] = useState("52");

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newSalary = Number((annualSalary * rate).toFixed(2));
      setAnnualSalary(newSalary);
      setAnnualSalaryInput(newSalary.toString());
      setCurrency(newCurrency);
      toast.success(`Converted values to ${newCurrency}`);
    } catch (error) {
      setCurrency(newCurrency);
    }
  };

  const [results, setResults] = useState({
    hourly: 0,
    daily: 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
    annual: 0,
  });

  useEffect(() => {
    const hourly = annualSalary / (hoursPerWeek * weeksPerYear);
    const weekly = annualSalary / weeksPerYear;
    const daily = weekly / 5; // Assuming 5-day work week
    const biweekly = weekly * 2;
    const monthly = annualSalary / 12;

    setResults({
      hourly,
      daily,
      weekly,
      biweekly,
      monthly,
      annual: annualSalary,
    });
  }, [annualSalary, hoursPerWeek, weeksPerYear]);

  const copyResults = () => {
    const text = `Salary Breakdown (${currency}):
Annual: ${formatCurrency(results.annual, currency)}
Monthly: ${formatCurrency(results.monthly, currency)}
Bi-weekly: ${formatCurrency(results.biweekly, currency)}
Weekly: ${formatCurrency(results.weekly, currency)}
Daily: ${formatCurrency(results.daily, currency)}
Hourly: ${formatCurrency(results.hourly, currency)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Salary Breakdown (${currency}):
Annual: ${formatCurrency(results.annual, currency)}
Monthly: ${formatCurrency(results.monthly, currency)}
Bi-weekly: ${formatCurrency(results.biweekly, currency)}
Weekly: ${formatCurrency(results.weekly, currency)}
Daily: ${formatCurrency(results.daily, currency)}
Hourly: ${formatCurrency(results.hourly, currency)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "salary-breakdown.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Salary Calculator</CardTitle>
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[100px] h-8">
              <Globe className="mr-2 h-3 w-3" />
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Annual Salary ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={annualSalaryInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setAnnualSalaryInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setAnnualSalary(num);
                  }
                }}
                onBlur={() => {
                  if (annualSalaryInput === "" || isNaN(parseFloat(annualSalaryInput))) {
                    setAnnualSalaryInput(annualSalary.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Hours per Week</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={hoursPerWeekInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*$/.test(val)) {
                    setHoursPerWeekInput(val);
                    const num = parseInt(val);
                    if (!isNaN(num)) setHoursPerWeek(num);
                  }
                }}
                onBlur={() => {
                  if (hoursPerWeekInput === "" || isNaN(parseInt(hoursPerWeekInput))) {
                    setHoursPerWeekInput(hoursPerWeek.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Weeks per Year</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={weeksPerYearInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*$/.test(val)) {
                    setWeeksPerYearInput(val);
                    const num = parseInt(val);
                    if (!isNaN(num)) setWeeksPerYear(num);
                  }
                }}
                onBlur={() => {
                  if (weeksPerYearInput === "" || isNaN(parseInt(weeksPerYearInput))) {
                    setWeeksPerYearInput(weeksPerYear.toString());
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Hourly</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(results.hourly, currency)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(results.daily, currency)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Weekly</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(results.weekly, currency)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Bi-weekly</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(results.biweekly, currency)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(results.monthly, currency)}</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Annual</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(results.annual, currency)}</h3>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyResults}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" className="flex-1" onClick={downloadResults}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryCalculator;
