import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, Scissors } from "lucide-react";

export default function RemoveExtraSpaces() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const cleanedText = useMemo(() => {
    return text
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .replace(/^\s+|\s+$/g, ""); // Trim leading and trailing spaces
  }, [text]);

  const downloadResults = () => {
    if (!cleanedText) return;
    const blob = new Blob([cleanedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!cleanedText) return;
    navigator.clipboard.writeText(cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Input Text with Extra Spaces</Label>
        <Textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Paste your text here..." 
          className="min-h-[200px] text-lg p-6 rounded-3xl border-slate-200 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Scissors className="w-4 h-4" /> Cleaned Text
          </Label>
        </div>
        <Textarea 
          readOnly 
          value={cleanedText} 
          className="min-h-[200px] text-lg p-6 rounded-3xl border-indigo-100 bg-indigo-50/50 text-indigo-900"
        />
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl">
          <Download className="w-4 h-4" /> Download Text
        </Button>
        <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-12 rounded-2xl border-slate-200">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy to Clipboard"}
        </Button>
      </div>

      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Why remove extra spaces?</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Extra spaces can cause issues in formatting, data processing, and SEO. This tool ensures your text is clean and professional by replacing multiple spaces with a single space and trimming the edges.
        </p>
      </div>
    </div>
  );
}
