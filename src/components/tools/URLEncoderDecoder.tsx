import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check, Globe } from "lucide-react";

export default function URLEncoderDecoder() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setText(encodeURIComponent(text));
    } catch (e) {
      console.error("Encoding error", e);
    }
  };

  const handleDecode = () => {
    try {
      setText(decodeURIComponent(text));
    } catch (e) {
      console.error("Decoding error", e);
    }
  };

  const downloadResults = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "url-encoded-decoded.txt";
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
          <Globe className="w-4 h-4" /> URL Content
        </Label>
        <Textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Paste URL or text here..." 
          className="min-h-[300px] text-lg p-8 rounded-3xl border-slate-200 focus:ring-indigo-500 font-mono"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={handleEncode} className="h-14 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold uppercase tracking-wider">Encode URL</Button>
        <Button onClick={handleDecode} variant="outline" className="h-14 rounded-2xl font-bold uppercase tracking-wider border-slate-200">Decode URL</Button>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl">
          <Download className="w-4 h-4" /> Download Result
        </Button>
        <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-12 rounded-2xl border-slate-200">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy to Clipboard"}
        </Button>
      </div>

      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">What is URL Encoding?</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          URL encoding converts characters into a format that can be transmitted over the Internet. 
          URLs can only be sent over the Internet using the ASCII character-set. 
          Since URLs often contain characters outside the ASCII set, the URL has to be converted into a valid ASCII format.
        </p>
      </div>
    </div>
  );
}
