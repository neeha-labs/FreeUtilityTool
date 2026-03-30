import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Activity } from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [copied, setCopied] = useState(false);

  const bmiData = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert to meters

    if (isNaN(w) || isNaN(h) || h === 0) return null;

    const bmi = w / (h * h);
    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Normal Weight";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-orange-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }

    return { bmi: bmi.toFixed(1), category, color };
  }, [weight, height]);

  const downloadResults = () => {
    if (!bmiData) return;
    const content = `
BMI Calculation Results
-----------------------
Weight: ${weight} kg
Height: ${height} cm
BMI: ${bmiData.bmi}
Category: ${bmiData.category}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bmi-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!bmiData) return;
    const content = `BMI: ${bmiData.bmi}, Category: ${bmiData.category}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-slate-700 font-bold">Weight (kg)</Label>
          <Input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            className="h-12 text-lg"
            placeholder="e.g. 70"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-slate-700 font-bold">Height (cm)</Label>
          <Input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            className="h-12 text-lg"
            placeholder="e.g. 170"
          />
        </div>

        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-3">
          <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider">BMI Categories</h4>
          <ul className="text-xs space-y-1 text-indigo-700">
            <li className="flex justify-between"><span>Underweight</span> <span>&lt; 18.5</span></li>
            <li className="flex justify-between"><span>Normal weight</span> <span>18.5 – 24.9</span></li>
            <li className="flex justify-between"><span>Overweight</span> <span>25 – 29.9</span></li>
            <li className="flex justify-between"><span>Obesity</span> <span>BMI of 30 or greater</span></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        {bmiData ? (
          <>
            <div className="text-center space-y-4">
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Your BMI Result</p>
              <h3 className={`text-7xl font-black ${bmiData.color}`}>{bmiData.bmi}</h3>
              <p className={`text-2xl font-bold uppercase tracking-wider ${bmiData.color}`}>
                {bmiData.category}
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl">
                <Download className="w-4 h-4" /> Download
              </Button>
              <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-11 rounded-xl border-slate-200">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Results"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 opacity-20">
            <Activity className="w-20 h-20 mx-auto" />
            <p className="font-bold uppercase tracking-widest">Enter details to see BMI</p>
          </div>
        )}
      </div>
    </div>
  );
}
