import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, Code } from "lucide-react";

export default function HTMLFormatter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      let formatted = "";
      let indent = 0;
      const tokens = text.split(/(<[^>]*>)/g).filter(Boolean);

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].trim();
        if (!token) continue;

        if (token.startsWith("</")) {
          indent--;
          formatted += "  ".repeat(indent) + token + "\n";
        } else if (token.startsWith("<") && !token.endsWith("/>") && !token.startsWith("<!") && !token.startsWith("<?")) {
          formatted += "  ".repeat(indent) + token + "\n";
          if (!token.includes("</")) indent++;
        } else {
          formatted += "  ".repeat(indent) + token + "\n";
        }
      }
      setText(formatted.trim());
    } catch (e) {
      console.error("Formatting error", e);
    }
  };

  const handleMinify = () => {
    const minified = text.replace(/>\s+</g, "><").trim();
    setText(minified);
  };

  const downloadResults = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Code className="w-4 h-4" /> HTML Content
        </Label>
        <Textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Paste your HTML here..." 
          className="min-h-[400px] text-sm p-8 rounded-3xl border-slate-200 focus:ring-indigo-500 font-mono leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={handleFormat} className="h-14 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold uppercase tracking-wider">Beautify HTML</Button>
        <Button onClick={handleMinify} variant="outline" className="h-14 rounded-2xl font-bold uppercase tracking-wider border-slate-200">Minify HTML</Button>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl">
          <Download className="w-4 h-4" /> Download HTML
        </Button>
        <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-12 rounded-2xl border-slate-200">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy to Clipboard"}
        </Button>
      </div>
    </div>
  );
}
