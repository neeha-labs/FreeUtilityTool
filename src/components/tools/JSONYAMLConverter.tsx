import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import yaml from "js-yaml";

export default function JSONYAMLConverter() {
  const [json, setJson] = useState("");
  const [yamlStr, setYamlStr] = useState("");

  const handleJsonToYaml = () => {
    if (!json) return;
    try {
      const data = JSON.parse(json);
      const result = yaml.dump(data);
      setYamlStr(result);
      toast.success("Converted to YAML!");
    } catch (e) {
      toast.error("Invalid JSON format!");
    }
  };

  const handleYamlToJson = () => {
    if (!yamlStr) return;
    try {
      const data = yaml.load(yamlStr);
      const result = JSON.stringify(data, null, 2);
      setJson(result);
      toast.success("Converted to JSON!");
    } catch (e) {
      toast.error("Invalid YAML format!");
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
    setJson("");
    setYamlStr("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Button className="w-full" onClick={handleJsonToYaml} disabled={!json}>
            Convert to YAML <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">YAML Input/Output</label>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(yamlStr)}
                disabled={!yamlStr}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => downloadResult(yamlStr, "data.yaml")}
                disabled={!yamlStr}
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Paste YAML here..."
            className="h-64 resize-none font-mono text-xs"
            value={yamlStr}
            onChange={(e) => setYamlStr(e.target.value)}
          />
          <Button className="w-full" variant="secondary" onClick={handleYamlToJson} disabled={!yamlStr}>
            Convert to JSON <ArrowLeftRight className="ml-2 h-4 w-4" />
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
            This tool provides bi-directional conversion between JSON and YAML formats. 
            JSON is standard for APIs, while YAML is highly readable and popular for configuration files. 
            All processing is done in your browser, ensuring your data remains private.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
