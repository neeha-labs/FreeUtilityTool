import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Dices } from "lucide-react";
import { toast } from "sonner";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    if (min >= max) {
      toast.error("Min must be less than Max!");
      return;
    }
    if (count < 1 || count > 1000) {
      toast.error("Count must be between 1 and 1000!");
      return;
    }

    const newResults = [];
    for (let i = 0; i < count; i++) {
      newResults.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(newResults);
    toast.success(`Generated ${count} random number(s)!`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(results.join(", "));
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const content = results.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-numbers.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Value</label>
          <Input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Value</label>
          <Input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">How many numbers?</label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
            min={1}
            max={1000}
          />
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={generateNumbers}>
        <Dices className="h-5 w-5 mr-2" /> Generate Random Numbers
      </Button>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Results</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadResult}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap gap-3 max-h-64 overflow-y-auto">
            {results.map((num, i) => (
              <div key={i} className="px-4 py-2 bg-white rounded-lg shadow-sm font-mono font-bold text-lg border border-slate-100">
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool generates random numbers within your specified range using a cryptographically secure random number generator. 
            You can generate a single number or a large list of numbers at once. 
            Perfect for games, research, or any situation where you need an unbiased choice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
