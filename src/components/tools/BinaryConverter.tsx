import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function BinaryConverter() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");

  const textToBinary = (str: string) => {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  };

  const binaryToText = (bin: string) => {
    try {
      return bin
        .split(" ")
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join("");
    } catch (e) {
      return "Invalid Binary";
    }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    setBinary(textToBinary(val));
  };

  const handleBinaryChange = (val: string) => {
    setBinary(val);
    setText(binaryToText(val));
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
    setText("");
    setBinary("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Text Input</label>
          <Textarea
            placeholder="Enter text here..."
            className="h-48 resize-none"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => copyToClipboard(text)}
              disabled={!text}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => downloadResult(text, "text.txt")}
              disabled={!text}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Binary Output</label>
          <Textarea
            placeholder="Binary code will appear here..."
            className="h-48 resize-none font-mono"
            value={binary}
            onChange={(e) => handleBinaryChange(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => copyToClipboard(binary)}
              disabled={!binary}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => downloadResult(binary, "binary.txt")}
              disabled={!binary}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
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
            This tool converts each character of your text into its 8-bit binary representation using ASCII/Unicode values. 
            You can also paste binary code (separated by spaces) into the binary field to decode it back into plain text.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
