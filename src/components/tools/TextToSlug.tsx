import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Copy, Check, Link } from "lucide-react";

export default function TextToSlug() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [text]);

  const downloadResults = () => {
    if (!slug) return;
    const blob = new Blob([slug], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slug.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Enter Text to Slugify</Label>
        <Input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="e.g. How to create a slug from text?" 
          className="h-14 text-lg p-6 rounded-2xl border-slate-200 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Link className="w-4 h-4" /> Generated Slug
          </Label>
        </div>
        <div className="relative group">
          <Input 
            readOnly 
            value={slug} 
            className="h-14 text-xl font-mono text-indigo-600 bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl pr-12"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={copyResults}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-indigo-100 rounded-xl"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-indigo-400" />}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl">
          <Download className="w-4 h-4" /> Download Slug
        </Button>
        <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-12 rounded-2xl border-slate-200">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy to Clipboard"}
        </Button>
      </div>

      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">What is a Slug?</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          A slug is the part of a URL which identifies a particular page on a website in a human-readable format. 
          It's usually lowercase and uses hyphens to separate words.
        </p>
      </div>
    </div>
  );
}
