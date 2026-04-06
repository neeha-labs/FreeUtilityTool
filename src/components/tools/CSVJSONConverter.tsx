import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";
import JSON5 from "json5";

export default function CSVJSONConverter() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  const handleCsvToJSON = () => {
    if (!csv) return;
    try {
      const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
      setJson(JSON.stringify(result.data, null, 2));
      toast.success("Converted to JSON!");
    } catch (e) {
      toast.error("Invalid CSV format!");
    }
  };

  const handleJsonToCSV = () => {
    if (!json) return;
    try {
      const data = JSON5.parse(json);
      // Ensure data is an array for Papa.unparse
      const arrayData = Array.isArray(data) ? data : [data];
      const result = Papa.unparse(arrayData);
      setCsv(result);
      toast.success("Converted to CSV!");
    } catch (e) {
      toast.error("Invalid JSON format!");
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  const clearAll = () => {
    setCsv("");
    setJson("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">CSV Input/Output</label>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(csv)}
                disabled={!csv}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => downloadResult(csv, "data.csv")}
                disabled={!csv}
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Paste CSV here..."
            className="h-64 resize-none font-mono text-xs"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />
          <Button className="w-full" onClick={handleCsvToJSON} disabled={!csv}>
            Convert to JSON <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">JSON Input/Output</label>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(json)}
                disabled={!json}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => downloadResult(json, "data.json")}
                disabled={!json}
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Paste JSON here..."
            className="h-64 resize-none font-mono text-xs"
            value={json}
            onChange={(e) => setJson(e.target.value)}
          />
          <Button className="w-full" variant="secondary" onClick={handleJsonToCSV} disabled={!json}>
            Convert to CSV <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={clearAll}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool provides bi-directional conversion between CSV (Comma Separated Values) and JSON (JavaScript Object Notation). 
            CSV is great for spreadsheets, while JSON is the standard for web data exchange. 
            Make sure your CSV has a header row for the best results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
