import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Trash2, ArrowRightLeft } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = (val: string, m: "encode" | "decode") => {
    try {
      if (m === "encode") {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
    } catch (e) {
      setOutput("Error: Invalid input for " + m + "ing.");
    }
  };

  const handleInput = (val: string) => {
    setInput(val);
    process(val, mode);
  };

  const toggleMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    process(output, newMode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
          <Button 
            variant={mode === "encode" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => { setMode("encode"); process(input, "encode"); }}
            className="rounded-lg"
          >
            Encode
          </Button>
          <Button 
            variant={mode === "decode" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => { setMode("decode"); process(input, "decode"); }}
            className="rounded-lg"
          >
            Decode
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">Input Text</label>
            <Button variant="ghost" size="sm" onClick={() => setInput("")} className="text-slate-400 hover:text-red-500">
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
          <textarea
            className="w-full h-[300px] p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white shadow-sm"
            placeholder={mode === "encode" ? "Enter plain text to encode..." : "Enter Base64 string to decode..."}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>

        <div className="hidden md:flex justify-center">
          <Button variant="outline" size="icon" onClick={toggleMode} className="rounded-full w-12 h-12 text-indigo-600 border-indigo-100 bg-indigo-50 hover:bg-indigo-100">
            <ArrowRightLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">Output</label>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={!output} className="text-indigo-600">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <textarea
            readOnly
            className="w-full h-[300px] p-4 font-mono text-sm border rounded-xl outline-none resize-none bg-slate-900 text-indigo-300"
            value={output}
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
