import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [reversed, setReversed] = useState("");

  const handleReverseText = () => {
    if (!text) return;
    setReversed(text.split("").reverse().join(""));
    toast.success("Text reversed!");
  };

  const handleReverseWords = () => {
    if (!text) return;
    setReversed(text.split(/\s+/).reverse().join(" "));
    toast.success("Words reversed!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reversed);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([reversed], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reversed-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Enter text to reverse..."
          className="h-48 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleReverseText} disabled={!text}>
          <RotateCcw className="h-4 w-4 mr-2" /> Reverse Characters
        </Button>
        <Button variant="secondary" onClick={handleReverseWords} disabled={!text}>
          <RotateCcw className="h-4 w-4 mr-2" /> Reverse Words
        </Button>
        <Button variant="ghost" onClick={() => { setText(""); setReversed(""); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      {reversed && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Reversed Output</h3>
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
            className="h-48 resize-none bg-slate-50"
            value={reversed}
            readOnly
          />
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool allows you to reverse your text in two ways: 
            'Reverse Characters' flips every single character in the string, while 'Reverse Words' keeps the words intact but reverses their order in the sentence. 
            It's a fun and simple way to manipulate text for puzzles or creative projects.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
