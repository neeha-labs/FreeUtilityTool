import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import TurndownService from "turndown";

export default function HTMLToMarkdown() {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");

  const handleConvert = () => {
    if (!html) return;
    try {
      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
      });
      const result = turndownService.turndown(html);
      setMarkdown(result);
      toast.success("Converted to Markdown!");
    } catch (e) {
      toast.error("Error converting HTML!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">HTML Input</label>
          <Textarea
            placeholder="Paste your HTML here..."
            className="h-96 resize-none font-mono text-xs"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
          <Button className="w-full" onClick={handleConvert} disabled={!html}>
            Convert to Markdown <ArrowLeftRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Markdown Output</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!markdown}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadResult} disabled={!markdown}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Markdown will appear here..."
            className="h-[432px] resize-none font-mono text-xs bg-slate-50"
            value={markdown}
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => { setHtml(""); setMarkdown(""); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool converts complex HTML code into simplified Markdown syntax. 
            It's perfect for cleaning up web content, migrating blog posts, or keeping your documentation in a readable format. 
            It handles headings, lists, links, images, and basic formatting.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
