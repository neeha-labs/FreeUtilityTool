import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);
  const [compoundFrequency, setCompoundFrequency] = useState("12");

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
    const text = `Compound Interest Calculation Results:
Principal: $${principal.toLocaleString()}
Monthly Contribution: $${monthlyContribution.toLocaleString()}
Years: ${years}
Interest Rate: ${interestRate}%
Total Balance: $${totalBalance.toFixed(2)}
Total Contributions: $${totalContributions.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Compound Interest Calculation Results:
Principal: $${principal.toLocaleString()}
Monthly Contribution: $${monthlyContribution.toLocaleString()}
Years: ${years}
Interest Rate: ${interestRate}%
Total Balance: $${totalBalance.toFixed(2)}
Total Contributions: $${totalContributions.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}`;
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
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Initial Principal ($)</Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
              <Slider
                value={[principal]}
                min={0}
                max={1000000}
                step={1000}
                onValueChange={(val) => setPrincipal(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Contribution ($)</Label>
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              />
              <Slider
                value={[monthlyContribution]}
                min={0}
                max={10000}
                step={100}
                onValueChange={(val) => setMonthlyContribution(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Investment Period (Years)</Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
              <Slider
                value={[years]}
                min={1}
                max={50}
                step={1}
                onValueChange={(val) => setYears(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <Slider
                value={[interestRate]}
                min={0.1}
                max={20}
                step={0.1}
                onValueChange={(val) => setInterestRate(val[0])}
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
              <h2 className="text-4xl font-bold text-primary">${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Contributions</p>
                <p className="font-semibold">${totalContributions.toLocaleString()}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Interest</p>
                <p className="font-semibold">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="balance" stroke="#0088FE" name="Total Balance" dot={false} />
                  <Line type="monotone" dataKey="contributions" stroke="#00C49F" name="Contributions" dot={false} />
                </LineChart>
              </ResponsiveContainer>
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
