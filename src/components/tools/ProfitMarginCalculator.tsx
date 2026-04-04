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

const ProfitMarginCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [cost, setCost] = useState(100);
  const [costInput, setCostInput] = useState("100");
  const [revenue, setRevenue] = useState(150);
  const [revenueInput, setRevenueInput] = useState("150");
  const [margin, setMargin] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [profit, setProfit] = useState(0);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newCost = Number((cost * rate).toFixed(2));
      const newRevenue = Number((revenue * rate).toFixed(2));
      setCost(newCost);
      setCostInput(newCost.toString());
      setRevenue(newRevenue);
      setRevenueInput(newRevenue.toString());
      setCurrency(newCurrency);
      toast.success(`Converted values to ${newCurrency}`);
    } catch (error) {
      setCurrency(newCurrency);
    }
  };

  useEffect(() => {
    const p = revenue - cost;
    const mar = revenue !== 0 ? (p / revenue) * 100 : 0;
    const mur = cost !== 0 ? (p / cost) * 100 : 0;

    setProfit(p);
    setMargin(mar);
    setMarkup(mur);
  }, [cost, revenue]);

  const copyResults = () => {
    const text = `Profit Margin Results (${currency}):
Cost: ${formatCurrency(cost, currency)}
Revenue: ${formatCurrency(revenue, currency)}
Gross Profit: ${formatCurrency(profit, currency)}
Gross Margin: ${margin.toFixed(2)}%
Markup: ${markup.toFixed(2)}%`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Profit Margin Results (${currency}):
Cost: ${formatCurrency(cost, currency)}
Revenue: ${formatCurrency(revenue, currency)}
Gross Profit: ${formatCurrency(profit, currency)}
Gross Margin: ${margin.toFixed(2)}%
Markup: ${markup.toFixed(2)}%`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profit-margin-results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Profit Margin Calculator</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cost ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={costInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setCostInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setCost(num);
                  }
                }}
                onBlur={() => {
                  if (costInput === "" || isNaN(parseFloat(costInput))) {
                    setCostInput(cost.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Revenue ({symbol})</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={revenueInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setRevenueInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setRevenue(num);
                  }
                }}
                onBlur={() => {
                  if (revenueInput === "" || isNaN(parseFloat(revenueInput))) {
                    setRevenueInput(revenue.toString());
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Gross Profit</p>
              <h3 className="text-xl font-bold text-primary">{formatCurrency(profit, currency)}</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Gross Margin</p>
              <h3 className="text-xl font-bold text-primary">{margin.toFixed(2)}%</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Markup</p>
              <h3 className="text-xl font-bold text-primary">{markup.toFixed(2)}%</h3>
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

export default ProfitMarginCalculator;
