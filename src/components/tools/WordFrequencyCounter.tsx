import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export default function WordFrequencyCounter() {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState<{ word: string; count: number; percentage: string }[]>([]);

  const analyzeFrequency = () => {
    if (!text) return;
    const words = text.toLowerCase().match(/\b\w+\b/g);
    if (!words) {
      setFrequencies([]);
      return;
    }

    const totalWords = words.length;
    const counts: Record<string, number> = {};
    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });

    const sortedFrequencies = Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / totalWords) * 100).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count);

    setFrequencies(sortedFrequencies);
    toast.success("Text analyzed successfully!");
  };

  const copyToClipboard = () => {
    const content = frequencies.map((f) => `${f.word}: ${f.count} (${f.percentage}%)`).join("\n");
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const content = `Word Frequency Analysis\n\n` + frequencies.map((f) => `${f.word}: ${f.count} (${f.percentage}%)`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Paste your text here to analyze word frequency..."
          className="h-48 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button className="w-full" onClick={analyzeFrequency} disabled={!text}>
          <BarChart3 className="h-4 w-4 mr-2" /> Analyze Word Frequency
        </Button>
      </div>

      {frequencies.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Frequency Analysis</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" /> Copy Results
              </Button>
              <Button variant="outline" size="sm" onClick={downloadResult}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </div>
          </div>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Word</th>
                  <th className="px-6 py-3">Count</th>
                  <th className="px-6 py-3">Frequency (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {frequencies.slice(0, 50).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-slate-900">{item.word}</td>
                    <td className="px-6 py-3 text-slate-600">{item.count}</td>
                    <td className="px-6 py-3 text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-12 text-right">{item.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {frequencies.length > 50 && (
            <p className="text-center text-xs text-slate-400 italic">Showing top 50 words</p>
          )}
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool analyzes your text to identify how many times each word appears. 
            It calculates the total count and the percentage frequency for each unique word. 
            This is useful for SEO keyword analysis, identifying repetitive writing, or simply understanding the themes in a piece of text.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
