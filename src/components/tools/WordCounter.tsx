import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Copy, Check } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "Sentences", value: stats.sentences },
          { label: "Reading Time", value: `${stats.readingTime} min` },
          { label: "No Spaces", value: stats.charsNoSpaces },
        ].map((stat) => (
          <Card key={stat.label} className="border-none bg-slate-50 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-indigo-600">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-700">Your Text</label>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setText("")} className="text-slate-400 hover:text-red-500">
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-indigo-600">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <textarea
          className="w-full h-[350px] p-6 text-lg border rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white shadow-inner"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}
