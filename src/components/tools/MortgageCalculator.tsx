import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, propertyTax, insurance]);

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    let monthlyPrincipalInterest = 0;
    if (monthlyRate === 0) {
      monthlyPrincipalInterest = loanAmount / numberOfPayments;
    } else {
      monthlyPrincipalInterest =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;

    setMonthlyPayment(totalMonthly);
    setTotalPayment(totalMonthly * numberOfPayments);
    setTotalInterest(monthlyPrincipalInterest * numberOfPayments - loanAmount);
  };

  const copyResults = () => {
    const text = `Mortgage Calculation Results:
Loan Amount: $${loanAmount.toLocaleString()}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
Monthly Payment: $${monthlyPayment.toFixed(2)}
Total Payment: $${totalPayment.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Mortgage Calculation Results:
Loan Amount: $${loanAmount.toLocaleString()}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
Monthly Payment: $${monthlyPayment.toFixed(2)}
Total Payment: $${totalPayment.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage-results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const chartData = [
    { name: "Principal", value: loanAmount },
    { name: "Total Interest", value: totalInterest },
    { name: "Tax & Insurance", value: propertyTax * loanTerm + insurance * loanTerm },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Loan Amount ($)</Label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <Slider
                value={[loanAmount]}
                min={10000}
                max={1000000}
                step={1000}
                onValueChange={(val) => setLoanAmount(val[0])}
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
                max={15}
                step={0.1}
                onValueChange={(val) => setInterestRate(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
              <Slider
                value={[loanTerm]}
                min={1}
                max={50}
                step={1}
                onValueChange={(val) => setLoanTerm(val[0])}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Annual Property Tax ($)</Label>
                <Input
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Annual Insurance ($)</Label>
                <Input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Monthly Payment</p>
              <h2 className="text-4xl font-bold text-primary">${monthlyPayment.toFixed(2)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Interest</p>
                <p className="font-semibold">${totalInterest.toFixed(2)}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Payment</p>
                <p className="font-semibold">${totalPayment.toFixed(2)}</p>
              </div>
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
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

export default MortgageCalculator;
