import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, CopyMinus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function DuplicateLineRemover() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);

  const handleRemoveDuplicates = () => {
    if (!text) return;
    let lines = text.split("\n");
    if (removeEmpty) {
      lines = lines.filter((line) => line.trim() !== "");
    }

    const seen = new Set();
    const uniqueLines = lines.filter((line) => {
      const compareLine = caseSensitive ? line : line.toLowerCase();
      if (seen.has(compareLine)) return false;
      seen.add(compareLine);
      return true;
    });

    setResult(uniqueLines.join("\n"));
    toast.success(`Removed ${lines.length - uniqueLines.length} duplicate line(s)!`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "unique-lines.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium">Input List (one item per line)</label>
        <Textarea
          placeholder="Paste your list here..."
          className="h-64 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="case-sensitive" 
            checked={caseSensitive} 
            onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
          />
          <label htmlFor="case-sensitive" className="text-sm font-medium leading-none cursor-pointer">
            Case Sensitive
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remove-empty" 
            checked={removeEmpty} 
            onCheckedChange={(checked) => setRemoveEmpty(checked as boolean)}
          />
          <label htmlFor="remove-empty" className="text-sm font-medium leading-none cursor-pointer">
            Remove Empty Lines
          </label>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={handleRemoveDuplicates} disabled={!text}>
        <CopyMinus className="h-5 w-5 mr-2" /> Remove Duplicate Lines
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Unique List Output</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadResult}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </div>
          </div>
          <Textarea
            className="h-64 resize-none bg-slate-50"
            value={result}
            readOnly
          />
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool helps you clean up your lists by removing duplicate entries. 
            It keeps the first occurrence of each line and removes subsequent duplicates. 
            You can choose to make the comparison case-sensitive and also remove all empty lines in the process. 
            Perfect for cleaning up email lists, keyword lists, or any other data sets.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
