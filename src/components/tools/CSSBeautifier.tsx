import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Layout, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import beautify from "js-beautify";

export default function CSSBeautifier() {
  const [code, setCode] = useState("");

  const handleBeautify = () => {
    if (!code) return;
    try {
      const formatted = beautify.css(code, {
        indent_size: 2,
        space_around_combinator: true,
      });
      setCode(formatted);
      toast.success("CSS Beautified!");
    } catch (e) {
      toast.error("Error beautifying code!");
    }
  };

  const handleMinify = () => {
    if (!code) return;
    try {
      // Basic minification for CSS
      const minified = code
        .replace(/\s+/g, " ")
        .replace(/\/\*.*?\*\//g, "")
        .replace(/:\s+/g, ":")
        .replace(/;\s+/g, ";")
        .replace(/\{\s+/g, "{")
        .replace(/\}\s+/g, "}")
        .trim();
      setCode(minified);
      toast.success("CSS Minified!");
    } catch (e) {
      toast.error("Error minifying code!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([code], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "styles.css";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">CSS Input</label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!code}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadResult}
              disabled={!code}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>
        <Textarea
          placeholder="Paste your CSS code here..."
          className="h-96 resize-none font-mono text-xs"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleBeautify} disabled={!code}>
          <Layout className="h-4 w-4 mr-2" /> Beautify CSS
        </Button>
        <Button variant="secondary" onClick={handleMinify} disabled={!code}>
          <Minimize2 className="h-4 w-4 mr-2" /> Minify CSS
        </Button>
        <Button variant="ghost" onClick={() => setCode("")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool helps you format and clean up your CSS stylesheets. 
            Beautifying adds indentation and spacing for better readability, while minifying removes all unnecessary characters to reduce file size. 
            It's perfect for organizing messy CSS or preparing it for production.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
