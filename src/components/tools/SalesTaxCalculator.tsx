import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const SalesTaxCalculator = () => {
  const [amount, setAmount] = useState(100);
  const [taxRate, setTaxRate] = useState(7.5);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const tax = (amount * taxRate) / 100;
    setTaxAmount(tax);
    setTotalAmount(amount + tax);
  }, [amount, taxRate]);

  const copyResults = () => {
    const text = `Sales Tax Results:
Original Amount: $${amount.toFixed(2)}
Tax Rate: ${taxRate}%
Tax Amount: $${taxAmount.toFixed(2)}
Total Amount: $${totalAmount.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Sales Tax Results:
Original Amount: $${amount.toFixed(2)}
Tax Rate: ${taxRate}%
Tax Amount: $${taxAmount.toFixed(2)}
Total Amount: $${totalAmount.toFixed(2)}`;
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
        <CardHeader>
          <CardTitle>Sales Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <Slider
                value={[amount]}
                min={0}
                max={10000}
                step={1}
                onValueChange={(val) => setAmount(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
              />
              <Slider
                value={[taxRate]}
                min={0}
                max={30}
                step={0.1}
                onValueChange={(val) => setTaxRate(val[0])}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Tax Amount</p>
              <h3 className="text-2xl font-bold text-primary">${taxAmount.toFixed(2)}</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Amount</p>
              <h3 className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</h3>
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
