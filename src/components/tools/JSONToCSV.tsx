import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";

const JSONToCSV = () => {
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");

  useEffect(() => {
    if (!json.trim()) {
      setCsv("");
      return;
    }

    try {
      const parsed = JSON.parse(json);
      const data = Array.isArray(parsed) ? parsed : [parsed];
      const result = Papa.unparse(data);
      setCsv(result);
    } catch (e) {
      setCsv("Invalid JSON format. Please provide an array of objects or a single object.");
    }
  }, [json]);

  const copyResults = () => {
    navigator.clipboard.writeText(csv);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='Enter JSON here (e.g., [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}])...'
              className="min-h-[300px] font-mono"
              value={json}
              onChange={(e) => setJson(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CSV Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="CSV output will appear here..."
              className="min-h-[300px] bg-muted font-mono"
              value={csv}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!csv}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!csv}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JSONToCSV;
