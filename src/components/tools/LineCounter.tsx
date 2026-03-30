import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Rows } from "lucide-react";
import { toast } from "sonner";

export default function LineCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    empty: 0,
    nonEmpty: 0,
  });

  const analyzeLines = (val: string) => {
    setText(val);
    if (!val) {
      setStats({ total: 0, empty: 0, nonEmpty: 0 });
      return;
    }
    const lines = val.split("\n");
    const total = lines.length;
    const nonEmpty = lines.filter((line) => line.trim() !== "").length;
    setStats({
      total,
      empty: total - nonEmpty,
      nonEmpty,
    });
  };

  const copyToClipboard = () => {
    const content = `Total Lines: ${stats.total}\nEmpty Lines: ${stats.empty}\nNon-Empty Lines: ${stats.nonEmpty}`;
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const content = `Line Count Analysis\n\nTotal Lines: ${stats.total}\nEmpty Lines: ${stats.empty}\nNon-Empty Lines: ${stats.nonEmpty}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "line-count.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Lines", value: stats.total, color: "bg-blue-50 text-blue-700" },
          { label: "Empty Lines", value: stats.empty, color: "bg-slate-50 text-slate-700" },
          { label: "Non-Empty Lines", value: stats.nonEmpty, color: "bg-green-50 text-green-700" },
        ].map((stat) => (
          <Card key={stat.label} className={`${stat.color} border-none`}>
            <CardContent className="pt-6 text-center">
              <p className="text-sm font-medium opacity-80">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Input Text</label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!text}>
              <Copy className="h-4 w-4 mr-2" /> Copy Stats
            </Button>
            <Button variant="outline" size="sm" onClick={downloadResult} disabled={!text}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>
        <Textarea
          placeholder="Paste your text or code here to count lines..."
          className="h-96 resize-none font-mono text-xs"
          value={text}
          onChange={(e) => analyzeLines(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => analyzeLines("")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool counts the number of lines in your text or code. 
            It provides a breakdown of total lines, empty lines, and non-empty lines. 
            This is useful for checking the length of scripts, configuration files, or any large text documents.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
