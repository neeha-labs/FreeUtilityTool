import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Globe } from "lucide-react";
import { toast } from "sonner";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange";

const SalesTaxCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState(100);
  const [amountInput, setAmountInput] = useState("100");
  const [taxRate, setTaxRate] = useState(7.5);
  const [taxRateInput, setTaxRateInput] = useState("7.5");
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;

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

  useEffect(() => {
    const tax = (amount * taxRate) / 100;
    setTaxAmount(tax);
    setTotalAmount(amount + tax);
  }, [amount, taxRate]);

  const copyResults = () => {
    const text = `Sales Tax Results (${currency}):
Original Amount: ${formatCurrency(amount, currency)}
Tax Rate: ${taxRate}%
Tax Amount: ${formatCurrency(taxAmount, currency)}
Total Amount: ${formatCurrency(totalAmount, currency)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Sales Tax Results (${currency}):
Original Amount: ${formatCurrency(amount, currency)}
Tax Rate: ${taxRate}%
Tax Amount: ${formatCurrency(taxAmount, currency)}
Total Amount: ${formatCurrency(totalAmount, currency)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales-tax-results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Sales Tax Calculator</CardTitle>
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Amount ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={amountInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setAmountInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setAmount(num);
                  }
                }}
                onBlur={() => {
                  if (amountInput === "" || isNaN(parseFloat(amountInput))) {
                    setAmountInput(amount.toString());
                  }
                }}
              />
              <Slider
                value={[amount]}
                min={0}
                max={10000}
                step={1}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  if (v !== undefined) {
                    setAmount(v);
                    setAmountInput(v.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={taxRateInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setTaxRateInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setTaxRate(num);
                  }
                }}
                onBlur={() => {
                  if (taxRateInput === "" || isNaN(parseFloat(taxRateInput))) {
                    setTaxRateInput(taxRate.toString());
                  }
                }}
              />
              <Slider
                value={[taxRate]}
                min={0}
                max={30}
                step={0.1}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  if (v !== undefined) {
                    setTaxRate(v);
                    setTaxRateInput(v.toString());
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Tax Amount</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(taxAmount, currency)}</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Amount</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(totalAmount, currency)}</h3>
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

export default SalesTaxCalculator;
