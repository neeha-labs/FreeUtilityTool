import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Layout, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import formatXml from "xml-formatter";

export default function XMLFormatter() {
  const [xml, setXml] = useState("");

  const handleBeautify = () => {
    if (!xml) return;
    try {
      const formatted = formatXml(xml, {
        indentation: "  ",
        collapseContent: true,
      });
      setXml(formatted);
      toast.success("XML Beautified!");
    } catch (e) {
      toast.error("Invalid XML format!");
    }
  };

  const handleMinify = () => {
    if (!xml) return;
    try {
      const minified = formatXml(xml, {
        indentation: "",
        collapseContent: true,
        lineSeparator: "",
      });
      setXml(minified);
      toast.success("XML Minified!");
    } catch (e) {
      toast.error("Invalid XML format!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xml);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.xml";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">XML Input/Output</label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!xml}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadResult}
              disabled={!xml}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>
        <Textarea
          placeholder="Paste your XML here..."
          className="h-96 resize-none font-mono text-xs"
          value={xml}
          onChange={(e) => setXml(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleBeautify} disabled={!xml}>
          <Layout className="h-4 w-4 mr-2" /> Beautify XML
        </Button>
        <Button variant="secondary" onClick={handleMinify} disabled={!xml}>
          <Minimize2 className="h-4 w-4 mr-2" /> Minify XML
        </Button>
        <Button variant="ghost" onClick={() => setXml("")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool helps you format and clean up your XML data. 
            'Beautify' adds indentation for better readability, while 'Minify' removes all unnecessary whitespace to reduce file size. 
            It's perfect for debugging configuration files or web service responses.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
