import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const TextToASCII = () => {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");

  useEffect(() => {
    const result = text.split('').map(char => char.charCodeAt(0)).join(' ');
    setAscii(result);
  }, [text]);

  const copyResults = () => {
    navigator.clipboard.writeText(ascii);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([ascii], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-codes.txt";
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
            <CardTitle>Text Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text here..."
              className="min-h-[200px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ASCII Codes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="ASCII codes will appear here..."
              className="min-h-[200px] bg-muted font-mono"
              value={ascii}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!ascii}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!ascii}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextToASCII;
