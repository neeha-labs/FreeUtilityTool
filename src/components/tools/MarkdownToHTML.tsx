import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Eye, Code } from "lucide-react";
import { toast } from "sonner";
import { marked } from "marked";

export default function MarkdownToHTML() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [view, setView] = useState<"preview" | "code">("preview");

  useEffect(() => {
    const convert = async () => {
      if (!markdown) {
        setHtml("");
        return;
      }
      const result = await marked.parse(markdown);
      setHtml(result);
    };
    convert();
  }, [markdown]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    toast.success("HTML copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Markdown Input</label>
          <Textarea
            placeholder="Enter Markdown here..."
            className="h-96 resize-none font-mono text-xs"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        <div className="space-y-4 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant={view === "preview" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setView("preview")}
              >
                <Eye className="h-4 w-4 mr-2" /> Preview
              </Button>
              <Button 
                variant={view === "code" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setView("code")}
              >
                <Code className="h-4 w-4 mr-2" /> HTML Code
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!html}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadResult} disabled={!html}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 border rounded-xl overflow-hidden bg-white">
            {view === "preview" ? (
              <div 
                className="h-full p-6 overflow-y-auto prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: html || "<p class='text-slate-300 italic'>Preview will appear here...</p>" }}
              />
            ) : (
              <Textarea
                className="h-full border-none resize-none font-mono text-xs bg-slate-50"
                value={html}
                readOnly
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => setMarkdown("")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool converts Markdown syntax into clean, valid HTML code. 
            Markdown is a lightweight markup language used for formatting text on the web. 
            You can see a live preview of the rendered content or copy the raw HTML code for use in your website or blog.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
