import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const SalaryCalculator = () => {
  const [annualSalary, setAnnualSalary] = useState(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  const [results, setResults] = useState({
    hourly: 0,
    daily: 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
    annual: 0,
  });

  useEffect(() => {
    const hourly = annualSalary / (hoursPerWeek * weeksPerYear);
    const weekly = annualSalary / weeksPerYear;
    const daily = weekly / 5; // Assuming 5-day work week
    const biweekly = weekly * 2;
    const monthly = annualSalary / 12;

    setResults({
      hourly,
      daily,
      weekly,
      biweekly,
      monthly,
      annual: annualSalary,
    });
  }, [annualSalary, hoursPerWeek, weeksPerYear]);

  const copyResults = () => {
    const text = `Salary Breakdown:
Annual: $${results.annual.toLocaleString()}
Monthly: $${results.monthly.toFixed(2)}
Bi-weekly: $${results.biweekly.toFixed(2)}
Weekly: $${results.weekly.toFixed(2)}
Daily: $${results.daily.toFixed(2)}
Hourly: $${results.hourly.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const downloadResults = () => {
    const text = `Salary Breakdown:
Annual: $${results.annual.toLocaleString()}
Monthly: $${results.monthly.toFixed(2)}
Bi-weekly: $${results.biweekly.toFixed(2)}
Weekly: $${results.weekly.toFixed(2)}
Daily: $${results.daily.toFixed(2)}
Hourly: $${results.hourly.toFixed(2)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "salary-breakdown.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Salary Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Annual Salary ($)</Label>
              <Input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Hours per Week</Label>
              <Input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Weeks per Year</Label>
              <Input
                type="number"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Hourly</p>
              <h3 className="text-xl font-bold text-primary">${results.hourly.toFixed(2)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily</p>
              <h3 className="text-xl font-bold text-primary">${results.daily.toFixed(2)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Weekly</p>
              <h3 className="text-xl font-bold text-primary">${results.weekly.toFixed(2)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Bi-weekly</p>
              <h3 className="text-xl font-bold text-primary">${results.biweekly.toFixed(2)}</h3>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly</p>
              <h3 className="text-xl font-bold text-primary">${results.monthly.toFixed(2)}</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Annual</p>
              <h3 className="text-xl font-bold text-primary">${results.annual.toLocaleString()}</h3>
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

export default SalaryCalculator;
