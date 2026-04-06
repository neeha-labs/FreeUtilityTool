import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Binary, Type } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BinaryConverter() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [mode, setMode] = useState<"text" | "number">("text");

  const textToBinary = (str: string) => {
    if (!str) return "";
    try {
      if (mode === "number") {
        // Remove non-numeric characters for number mode
        const cleanNum = str.replace(/[^0-9]/g, "");
        if (!cleanNum) return "";
        return BigInt(cleanNum).toString(2);
      }
      const encoder = new TextEncoder();
      const bytes = encoder.encode(str);
      return Array.from(bytes)
        .map((byte) => byte.toString(2).padStart(8, "0"))
        .join(" ");
    } catch (e) {
      return "Error encoding";
    }
  };

  const binaryToText = (bin: string) => {
    if (!bin) return "";
    try {
      const cleanBin = bin.replace(/[^01]/g, "");
      if (!cleanBin) return "";

      if (mode === "number") {
        return BigInt("0b" + cleanBin).toString(10);
      }

      if (cleanBin.length % 8 !== 0) return "Invalid Binary (must be multiple of 8 bits)";
      
      const bytes = [];
      for (let i = 0; i < cleanBin.length; i += 8) {
        bytes.push(parseInt(cleanBin.substr(i, 8), 2));
      }
      
      const decoder = new TextDecoder();
      return decoder.decode(new Uint8Array(bytes));
    } catch (e) {
      return "Invalid Binary format";
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

  const handleModeChange = (newMode: "text" | "number") => {
    setMode(newMode);
    // Recalculate based on current input
    if (text) {
      setBinary(textToBinary(text));
    } else if (binary) {
      setText(binaryToText(binary));
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
    setText("");
    setBinary("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Tabs value={mode} onValueChange={(v) => handleModeChange(v as "text" | "number")} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="gap-2">
              <Type className="h-4 w-4" /> Text Mode
            </TabsTrigger>
            <TabsTrigger value="number" className="gap-2">
              <Binary className="h-4 w-4" /> Number Mode
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">
            {mode === "text" ? "Text Input" : "Decimal Number Input"}
          </label>
          <Textarea
            placeholder={mode === "text" ? "Enter text here..." : "Enter decimal number..."}
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
            <strong>Text Mode:</strong> Converts each character of your text into its 8-bit binary representation using UTF-8 encoding. 
            Perfect for encoding messages or strings.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mt-2">
            <strong>Number Mode:</strong> Converts a decimal number directly into its binary equivalent. 
            Useful for mathematical calculations and understanding base-2 numbering.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
