import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Globe } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange";

const CompoundInterestCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [principal, setPrincipal] = useState(10000);
  const [principalInput, setPrincipalInput] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [monthlyContributionInput, setMonthlyContributionInput] = useState("500");
  const [years, setYears] = useState(10);
  const [yearsInput, setYearsInput] = useState("10");
  const [interestRate, setInterestRate] = useState(7);
  const [interestRateInput, setInterestRateInput] = useState("7");
  const [compoundFrequency, setCompoundFrequency] = useState("12");

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newPrincipal = Number((principal * rate).toFixed(2));
      const newMonthly = Number((monthlyContribution * rate).toFixed(2));
      
      setPrincipal(newPrincipal);
      setPrincipalInput(newPrincipal.toString());
      setMonthlyContribution(newMonthly);
      setMonthlyContributionInput(newMonthly.toString());
      
      setCurrency(newCurrency);
      toast.success(`Converted values to ${newCurrency}`);
    } catch (error) {
      setCurrency(newCurrency);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, monthlyContribution, years, interestRate, compoundFrequency]);

  const calculateCompoundInterest = () => {
    const P = principal;
    const PMT = monthlyContribution;
    const r = interestRate / 100;
    const n = parseInt(compoundFrequency);
    const t = years;

    const data = [];
    let currentBalance = P;
    let totalContributed = P;

    for (let year = 0; year <= t; year++) {
      if (year > 0) {
        for (let month = 1; month <= 12; month++) {
          currentBalance += PMT;
          totalContributed += PMT;
          // Apply interest based on frequency
          if (month % (12 / n) === 0) {
            currentBalance *= (1 + r / n);
          }
        }
      }
      data.push({
        year,
        balance: Math.round(currentBalance),
        contributions: Math.round(totalContributed),
        interest: Math.round(currentBalance - totalContributed),
      });
    }

    setTotalBalance(currentBalance);
    setTotalContributions(totalContributed);
    setTotalInterest(currentBalance - totalContributed);
    setChartData(data);
  };

  const copyResults = () => {
    const text = `Compound Interest Calculation Results (${currency}):
Principal: ${formatCurrency(principal, currency)}
Monthly Contribution: ${formatCurrency(monthlyContribution, currency)}
Years: ${years}
Interest Rate: ${interestRate}%
Total Balance: ${formatCurrency(totalBalance, currency)}
Total Contributions: ${formatCurrency(totalContributions, currency)}
Total Interest: ${formatCurrency(totalInterest, currency)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Compound Interest Calculation Results (${currency}):
Principal: ${formatCurrency(principal, currency)}
Monthly Contribution: ${formatCurrency(monthlyContribution, currency)}
Years: ${years}
Interest Rate: ${interestRate}%
Total Balance: ${formatCurrency(totalBalance, currency)}
Total Contributions: ${formatCurrency(totalContributions, currency)}
Total Interest: ${formatCurrency(totalInterest, currency)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compound-interest-results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Investment Details</CardTitle>
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Initial Principal ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={principalInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setPrincipalInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setPrincipal(num);
                  }
                }}
                onBlur={() => {
                  if (principalInput === "" || isNaN(parseFloat(principalInput))) {
                    setPrincipalInput(principal.toString());
                  }
                }}
              />
              <Slider
                value={[principal]}
                min={0}
                max={1000000}
                step={1000}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setPrincipal(val);
                    setPrincipalInput(val.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Contribution ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={monthlyContributionInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setMonthlyContributionInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setMonthlyContribution(num);
                  }
                }}
                onBlur={() => {
                  if (monthlyContributionInput === "" || isNaN(parseFloat(monthlyContributionInput))) {
                    setMonthlyContributionInput(monthlyContribution.toString());
                  }
                }}
              />
              <Slider
                value={[monthlyContribution]}
                min={0}
                max={10000}
                step={100}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setMonthlyContribution(val);
                    setMonthlyContributionInput(val.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Investment Period (Years)</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={yearsInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*$/.test(val)) {
                    setYearsInput(val);
                    const num = parseInt(val);
                    if (!isNaN(num)) setYears(num);
                  }
                }}
                onBlur={() => {
                  if (yearsInput === "" || isNaN(parseInt(yearsInput))) {
                    setYearsInput(years.toString());
                  }
                }}
              />
              <Slider
                value={[years]}
                min={1}
                max={50}
                step={1}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setYears(val);
                    setYearsInput(val.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={interestRateInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setInterestRateInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setInterestRate(num);
                  }
                }}
                onBlur={() => {
                  if (interestRateInput === "" || isNaN(parseFloat(interestRateInput))) {
                    setInterestRateInput(interestRate.toString());
                  }
                }}
              />
              <Slider
                value={[interestRate]}
                min={0.1}
                max={20}
                step={0.1}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setInterestRate(val);
                    setInterestRateInput(val.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Compound Frequency</Label>
              <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Balance</p>
              <h2 className="text-4xl font-bold text-primary">{formatCurrency(totalBalance, currency)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Contributions</p>
                <p className="font-semibold">{formatCurrency(totalContributions, currency)}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest, currency)}</p>
              </div>
            </div>

            <div className="h-[250px] w-full min-h-[250px]">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `${selectedCurrency.symbol}${value / 1000}k`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#0088FE" name="Total Balance" dot={false} />
                    <Line type="monotone" dataKey="contributions" stroke="#00C49F" name="Contributions" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
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
    </div>
  );
};

export default CompoundInterestCalculator;
