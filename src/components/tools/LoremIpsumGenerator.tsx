import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, RefreshCw, FileText } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);

  const generateText = useMemo(() => {
    return () => {
      let result = "";
      for (let p = 0; p < paragraphs; p++) {
        let paragraph = "";
        const sentenceCount = Math.floor(Math.random() * 5) + 5;
        for (let s = 0; s < sentenceCount; s++) {
          let sentence = "";
          const wordCount = Math.floor(Math.random() * 10) + 8;
          for (let w = 0; w < wordCount; w++) {
            const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
            sentence += (w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + (w === wordCount - 1 ? ". " : " ");
          }
          paragraph += sentence;
        }
        result += paragraph + "\n\n";
      }
      setGeneratedText(result.trim());
    };
  }, [paragraphs]);

  useMemo(() => {
    generateText();
  }, [generateText]);

  const downloadResults = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div className="space-y-4">
          <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs">Number of Paragraphs: {paragraphs}</Label>
          <Slider value={[paragraphs]} min={1} max={20} step={1} onValueChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            if (val !== undefined) setParagraphs(val);
          }} />
        </div>
        <Button onClick={generateText} className="h-12 gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold uppercase tracking-wider">
          <RefreshCw className="w-4 h-4" /> Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" /> Generated Text
          </Label>
          <span className="text-xs text-slate-400 font-mono">{generatedText.split(/\s+/).length} words</span>
        </div>
        <Textarea 
          readOnly 
          value={generatedText} 
          className="min-h-[400px] text-lg p-8 rounded-3xl border-slate-200 bg-slate-50/50 leading-relaxed"
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
    </div>
  );
}
