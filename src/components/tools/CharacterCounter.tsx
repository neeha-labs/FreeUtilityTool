import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, Hash } from "lucide-react";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;

    return { chars, charsNoSpaces, words, sentences, paragraphs };
  }, [text]);

  const downloadResults = () => {
    const content = `
Text Analysis Results
-----------------------
Characters: ${stats.chars}
Characters (no spaces): ${stats.charsNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}

Text Content:
${text}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `Characters: ${stats.chars}, Words: ${stats.words}, Sentences: ${stats.sentences}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Characters", value: stats.chars },
          { label: "No Spaces", value: stats.charsNoSpaces },
          { label: "Words", value: stats.words },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs }
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
            <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-indigo-600">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Hash className="w-4 h-4" /> Text Content
        </Label>
        <Textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Start typing or paste your text here..." 
          className="min-h-[300px] text-lg p-8 rounded-3xl border-slate-200 focus:ring-indigo-500 leading-relaxed"
        />
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl">
          <Download className="w-4 h-4" /> Download Analysis
        </Button>
        <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-12 rounded-2xl border-slate-200">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy Stats"}
        </Button>
      </div>
    </div>
  );
}
