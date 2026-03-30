import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const ASCIIToText = () => {
  const [ascii, setAscii] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const result = ascii
        .split(/[\s,]+/)
        .filter(code => code.trim() !== "")
        .map(code => String.fromCharCode(parseInt(code)))
        .join('');
      setText(result);
    } catch (e) {
      setText("Invalid ASCII codes");
    }
  }, [ascii]);

  const copyResults = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-to-text.txt";
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
            <CardTitle>ASCII Codes Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter ASCII codes separated by spaces or commas (e.g., 72 101 108 108 111)..."
              className="min-h-[200px] font-mono"
              value={ascii}
              onChange={(e) => setAscii(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Text Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="Text will appear here..."
              className="min-h-[200px] bg-muted"
              value={text}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!text}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!text}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ASCIIToText;
