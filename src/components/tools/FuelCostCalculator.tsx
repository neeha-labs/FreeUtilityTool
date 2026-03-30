import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const FuelCostCalculator = () => {
  const [distance, setDistance] = useState(100);
  const [fuelEfficiency, setFuelEfficiency] = useState(25);
  const [fuelPrice, setFuelPrice] = useState(3.5);
  const [totalCost, setTotalCost] = useState(0);
  const [fuelNeeded, setFuelNeeded] = useState(0);

  useEffect(() => {
    const needed = distance / fuelEfficiency;
    const cost = needed * fuelPrice;
    setFuelNeeded(needed);
    setTotalCost(cost);
  }, [distance, fuelEfficiency, fuelPrice]);

  const copyResults = () => {
    const text = `Fuel Cost Results:
Distance: ${distance} miles
Fuel Efficiency: ${fuelEfficiency} MPG
Fuel Price: $${fuelPrice}/gal
Fuel Needed: ${fuelNeeded.toFixed(2)} gal
Total Cost: $${totalCost.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Fuel Cost Results:
Distance: ${distance} miles
Fuel Efficiency: ${fuelEfficiency} MPG
Fuel Price: $${fuelPrice}/gal
Fuel Needed: ${fuelNeeded.toFixed(2)} gal
Total Cost: $${totalCost.toFixed(2)}`;
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
        <CardHeader>
          <CardTitle>Fuel Cost Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Distance (Miles)</Label>
              <Input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
              />
              <Slider
                value={[distance]}
                min={1}
                max={5000}
                step={10}
                onValueChange={(val) => setDistance(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Fuel Efficiency (MPG)</Label>
              <Input
                type="number"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(Number(e.target.value))}
              />
              <Slider
                value={[fuelEfficiency]}
                min={1}
                max={100}
                step={1}
                onValueChange={(val) => setFuelEfficiency(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Fuel Price ($ per Gallon)</Label>
              <Input
                type="number"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
              />
              <Slider
                value={[fuelPrice]}
                min={0.1}
                max={10}
                step={0.01}
                onValueChange={(val) => setFuelPrice(val[0])}
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
              <h3 className="text-2xl font-bold text-primary">${totalCost.toFixed(2)}</h3>
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
