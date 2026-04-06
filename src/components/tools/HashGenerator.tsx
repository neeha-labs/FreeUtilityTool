import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Fingerprint } from "lucide-react";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });

  const generateHashes = (val: string) => {
    if (val === undefined || val === null || val === "") {
      setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }
    // DO NOT trim the value. Cryptographic hashes must include all characters including spaces and newlines.
    try {
      // Use Utf8.parse to ensure consistent encoding across all algorithms
      const words = CryptoJS.enc.Utf8.parse(val);
      setHashes({
        md5: CryptoJS.MD5(words).toString(CryptoJS.enc.Hex),
        sha1: CryptoJS.SHA1(words).toString(CryptoJS.enc.Hex),
        sha256: CryptoJS.SHA256(words).toString(CryptoJS.enc.Hex),
        sha512: CryptoJS.SHA512(words).toString(CryptoJS.enc.Hex),
      });
    } catch (e) {
      console.error("Hash generation error", e);
    }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    generateHashes(val);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const content = `Input: ${text}\n\nMD5: ${hashes.md5}\nSHA-1: ${hashes.sha1}\nSHA-256: ${hashes.sha256}\nSHA-512: ${hashes.sha512}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hashes.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Enter text to hash..."
          className="h-32 resize-none"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase text-slate-500">{algo}</label>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(hash as string)}
                disabled={!hash}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs break-all min-h-[40px]">
              {hash || <span className="text-slate-300 italic">Hash will appear here...</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={downloadResult} disabled={!text}>
          <Download className="h-4 w-4 mr-2" /> Download Results
        </Button>
        <Button variant="ghost" onClick={() => handleTextChange("")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool generates cryptographic hashes (digital fingerprints) of your text using various algorithms. 
            MD5 is fast but less secure, while SHA-256 and SHA-512 are modern standards for data integrity and security.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
