import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Trash2, FileJson } from "lucide-react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = (indent = 2) => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">Input JSON</label>
            <Button variant="ghost" size="sm" onClick={clear} className="text-slate-400 hover:text-red-500">
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
          <textarea
            className="w-full h-[400px] p-4 font-mono text-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-slate-50"
            placeholder='Paste your JSON here... e.g. {"name": "John", "age": 30}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">Formatted Output</label>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={!output} className="text-indigo-600">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="relative h-[400px]">
            <textarea
              readOnly
              className={`w-full h-full p-4 font-mono text-sm border rounded-xl outline-none resize-none bg-slate-900 text-indigo-300 ${error ? 'border-red-500' : ''}`}
              value={output || error}
              placeholder="Formatted JSON will appear here..."
            />
            {error && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                Error
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => formatJSON(2)} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
          <FileJson className="w-4 h-4" /> Format (2 Spaces)
        </Button>
        <Button onClick={() => formatJSON(4)} variant="outline" className="gap-2">
          Format (4 Spaces)
        </Button>
        <Button onClick={minifyJSON} variant="secondary" className="gap-2">
          Minify JSON
        </Button>
      </div>
    </div>
  );
}
