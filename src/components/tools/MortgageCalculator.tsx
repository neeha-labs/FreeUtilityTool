import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Globe } from "lucide-react";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange";

const MortgageCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [loanAmount, setLoanAmount] = useState(300000);
  const [loanAmountInput, setLoanAmountInput] = useState("300000");
  const [interestRate, setInterestRate] = useState(6.5);
  const [interestRateInput, setInterestRateInput] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState(30);
  const [loanTermInput, setLoanTermInput] = useState("30");
  const [propertyTax, setPropertyTax] = useState(3000);
  const [propertyTaxInput, setPropertyTaxInput] = useState("3000");
  const [insurance, setInsurance] = useState(1200);
  const [insuranceInput, setInsuranceInput] = useState("1200");

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newLoanAmount = Number((loanAmount * rate).toFixed(2));
      const newPropertyTax = Number((propertyTax * rate).toFixed(2));
      const newInsurance = Number((insurance * rate).toFixed(2));

      setLoanAmount(newLoanAmount);
      setLoanAmountInput(newLoanAmount.toString());
      setPropertyTax(newPropertyTax);
      setPropertyTaxInput(newPropertyTax.toString());
      setInsurance(newInsurance);
      setInsuranceInput(newInsurance.toString());

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
    const text = `Mortgage Calculation Results (${currency}):
Loan Amount: ${formatCurrency(loanAmount, currency)}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
Monthly Payment: ${formatCurrency(monthlyPayment, currency)}
Total Payment: ${formatCurrency(totalPayment, currency)}
Total Interest: ${formatCurrency(totalInterest, currency)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Mortgage Calculation Results (${currency}):
Loan Amount: ${formatCurrency(loanAmount, currency)}
Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
Monthly Payment: ${formatCurrency(monthlyPayment, currency)}
Total Payment: ${formatCurrency(totalPayment, currency)}
Total Interest: ${formatCurrency(totalInterest, currency)}`;
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Loan Details</CardTitle>
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
              <Label>Loan Amount ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={loanAmountInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setLoanAmountInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setLoanAmount(num);
                  }
                }}
                onBlur={() => {
                  if (loanAmountInput === "" || isNaN(parseFloat(loanAmountInput))) {
                    setLoanAmountInput(loanAmount.toString());
                  }
                }}
              />
              <Slider
                value={[loanAmount]}
                min={10000}
                max={1000000}
                step={1000}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  if (v !== undefined) {
                    setLoanAmount(v);
                    setLoanAmountInput(v.toString());
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
                max={15}
                step={0.1}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  if (v !== undefined) {
                    setInterestRate(v);
                    setInterestRateInput(v.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={loanTermInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*$/.test(val)) {
                    setLoanTermInput(val);
                    const num = parseInt(val);
                    if (!isNaN(num)) setLoanTerm(num);
                  }
                }}
                onBlur={() => {
                  if (loanTermInput === "" || isNaN(parseInt(loanTermInput))) {
                    setLoanTermInput(loanTerm.toString());
                  }
                }}
              />
              <Slider
                value={[loanTerm]}
                min={1}
                max={50}
                step={1}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  if (v !== undefined) {
                    setLoanTerm(v);
                    setLoanTermInput(v.toString());
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Annual Property Tax ({symbol})</Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={propertyTaxInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d*\.?\d*$/.test(val)) {
                      setPropertyTaxInput(val);
                      const num = parseFloat(val);
                      if (!isNaN(num)) setPropertyTax(num);
                    }
                  }}
                  onBlur={() => {
                    if (propertyTaxInput === "" || isNaN(parseFloat(propertyTaxInput))) {
                      setPropertyTaxInput(propertyTax.toString());
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Annual Insurance ({symbol})</Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={insuranceInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d*\.?\d*$/.test(val)) {
                      setInsuranceInput(val);
                      const num = parseFloat(val);
                      if (!isNaN(num)) setInsurance(num);
                    }
                  }}
                  onBlur={() => {
                    if (insuranceInput === "" || isNaN(parseFloat(insuranceInput))) {
                      setInsuranceInput(insurance.toString());
                    }
                  }}
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
              <h2 className="text-4xl font-bold text-primary">{formatCurrency(monthlyPayment, currency)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest, currency)}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-muted-foreground">Total Payment</p>
                <p className="font-semibold">{formatCurrency(totalPayment, currency)}</p>
              </div>
            </div>

            <div className="h-[250px] w-full min-h-[250px]">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
                    <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
                    <Legend />
                  </PieChart>
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

export default MortgageCalculator;
