import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const ProfitMarginCalculator = () => {
  const [cost, setCost] = useState(100);
  const [revenue, setRevenue] = useState(150);
  const [margin, setMargin] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const p = revenue - cost;
    const mar = revenue !== 0 ? (p / revenue) * 100 : 0;
    const mur = cost !== 0 ? (p / cost) * 100 : 0;

    setProfit(p);
    setMargin(mar);
    setMarkup(mur);
  }, [cost, revenue]);

  const copyResults = () => {
    const text = `Profit Margin Results:
Cost: $${cost.toFixed(2)}
Revenue: $${revenue.toFixed(2)}
Gross Profit: $${profit.toFixed(2)}
Gross Margin: ${margin.toFixed(2)}%
Markup: ${markup.toFixed(2)}%`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Profit Margin Results:
Cost: $${cost.toFixed(2)}
Revenue: $${revenue.toFixed(2)}
Gross Profit: $${profit.toFixed(2)}
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
        <CardHeader>
          <CardTitle>Profit Margin Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cost ($)</Label>
              <Input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Revenue ($)</Label>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Gross Profit</p>
              <h3 className="text-xl font-bold text-primary">${profit.toFixed(2)}</h3>
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
