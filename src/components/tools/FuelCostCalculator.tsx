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

const FuelCostCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [distance, setDistance] = useState(100);
  const [distanceInput, setDistanceInput] = useState("100");
  const [fuelEfficiency, setFuelEfficiency] = useState(25);
  const [fuelEfficiencyInput, setFuelEfficiencyInput] = useState("25");
  const [fuelPrice, setFuelPrice] = useState(3.5);
  const [fuelPriceInput, setFuelPriceInput] = useState("3.5");
  const [totalCost, setTotalCost] = useState(0);
  const [fuelNeeded, setFuelNeeded] = useState(0);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newPrice = Number((fuelPrice * rate).toFixed(2));
      setFuelPrice(newPrice);
      setFuelPriceInput(newPrice.toString());
      setCurrency(newCurrency);
      toast.success(`Converted values to ${newCurrency}`);
    } catch (error) {
      setCurrency(newCurrency);
    }
  };

  useEffect(() => {
    const needed = distance / fuelEfficiency;
    const cost = needed * fuelPrice;
    setFuelNeeded(needed);
    setTotalCost(cost);
  }, [distance, fuelEfficiency, fuelPrice]);

  const copyResults = () => {
    const text = `Fuel Cost Results (${currency}):
Distance: ${distance} miles
Fuel Efficiency: ${fuelEfficiency} MPG
Fuel Price: ${formatCurrency(fuelPrice, currency)}/gal
Fuel Needed: ${fuelNeeded.toFixed(2)} gal
Total Cost: ${formatCurrency(totalCost, currency)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Fuel Cost Results (${currency}):
Distance: ${distance} miles
Fuel Efficiency: ${fuelEfficiency} MPG
Fuel Price: ${formatCurrency(fuelPrice, currency)}/gal
Fuel Needed: ${fuelNeeded.toFixed(2)} gal
Total Cost: ${formatCurrency(totalCost, currency)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fuel-cost-results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Fuel Cost Calculator</CardTitle>
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
              <Label>Distance (Miles)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={distanceInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setDistanceInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setDistance(num);
                  }
                }}
                onBlur={() => {
                  if (distanceInput === "" || isNaN(parseFloat(distanceInput))) {
                    setDistanceInput(distance.toString());
                  }
                }}
              />
              <Slider
                value={[distance]}
                min={1}
                max={5000}
                step={10}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setDistance(val);
                    setDistanceInput(val.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Fuel Efficiency (MPG)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={fuelEfficiencyInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setFuelEfficiencyInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setFuelEfficiency(num);
                  }
                }}
                onBlur={() => {
                  if (fuelEfficiencyInput === "" || isNaN(parseFloat(fuelEfficiencyInput))) {
                    setFuelEfficiencyInput(fuelEfficiency.toString());
                  }
                }}
              />
              <Slider
                value={[fuelEfficiency]}
                min={1}
                max={100}
                step={1}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setFuelEfficiency(val);
                    setFuelEfficiencyInput(val.toString());
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Fuel Price ({symbol} per Gallon)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={fuelPriceInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d*$/.test(val)) {
                    setFuelPriceInput(val);
                    const num = parseFloat(val);
                    if (!isNaN(num)) setFuelPrice(num);
                  }
                }}
                onBlur={() => {
                  if (fuelPriceInput === "" || isNaN(parseFloat(fuelPriceInput))) {
                    setFuelPriceInput(fuelPrice.toString());
                  }
                }}
              />
              <Slider
                value={[fuelPrice]}
                min={0.1}
                max={10}
                step={0.01}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  if (val !== undefined) {
                    setFuelPrice(val);
                    setFuelPriceInput(val.toString());
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Fuel Needed</p>
              <h3 className="text-2xl font-bold text-primary">{fuelNeeded.toFixed(2)} gal</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Cost</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(totalCost, currency)}</h3>
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

export default FuelCostCalculator;
