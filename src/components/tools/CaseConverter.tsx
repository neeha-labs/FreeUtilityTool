import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, Type } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const convertCase = (type: "upper" | "lower" | "title" | "sentence") => {
    if (!text) return;
    
    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
    }
    setText(result);
  };

  const downloadResults = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
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
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Input Text</label>
          <span className="text-xs text-slate-400 font-mono">{text.length} characters</span>
        </div>
        <Textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Paste or type your text here..." 
          className="min-h-[300px] text-lg p-6 rounded-3xl border-slate-200 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={() => convertCase("upper")} variant="outline" className="h-12 font-bold uppercase tracking-wider">UPPERCASE</Button>
        <Button onClick={() => convertCase("lower")} variant="outline" className="h-12 font-bold uppercase tracking-wider">lowercase</Button>
        <Button onClick={() => convertCase("title")} variant="outline" className="h-12 font-bold uppercase tracking-wider">Title Case</Button>
        <Button onClick={() => convertCase("sentence")} variant="outline" className="h-12 font-bold uppercase tracking-wider">Sentence case</Button>
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
    </div>
  );
}
