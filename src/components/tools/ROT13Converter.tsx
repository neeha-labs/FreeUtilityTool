import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ROT13Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  useEffect(() => {
    setOutput(rot13(input));
  }, [input]);

  const copyResults = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rot13-output.txt";
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
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text to encode/decode..."
              className="min-h-[200px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROT13 Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="Output will appear here..."
              className="min-h-[200px] bg-muted"
              value={output}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!output}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!output}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROT13Converter;
