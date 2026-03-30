import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

export default function VigenereCipher() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("KEY");
  const [result, setResult] = useState("");

  const isLetter = (char: string) => char.match(/[a-z]/i);

  const processText = (isEncrypt: boolean) => {
    if (!text || !key) return;
    const k = key.toUpperCase();
    let j = 0;
    const output = text
      .split("")
      .map((char) => {
        if (isLetter(char)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          const shift = k.charCodeAt(j % k.length) - 65;
          const s = isEncrypt ? shift : (26 - shift) % 26;
          j++;
          return String.fromCharCode(((code - base + s) % 26) + base);
        }
        return char;
      })
      .join("");
    setResult(output);
    toast.success(isEncrypt ? "Text Encrypted!" : "Text Decrypted!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Result copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vigenere-result.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Input Text</label>
          <Textarea
            placeholder="Enter text to encrypt or decrypt..."
            className="h-48 resize-none font-mono text-xs"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-slate-500">Keyword (Key)</label>
              <Input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase())}
                placeholder="Enter keyword..."
              />
            </div>
            <div className="flex gap-2 pt-6">
              <Button onClick={() => processText(true)} disabled={!text || !key}>
                <Lock className="h-4 w-4 mr-2" /> Encrypt
              </Button>
              <Button variant="secondary" onClick={() => processText(false)} disabled={!text || !key}>
                <Unlock className="h-4 w-4 mr-2" /> Decrypt
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Result</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!result}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadResult} disabled={!result}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Result will appear here..."
            className="h-[312px] resize-none font-mono text-xs bg-slate-50"
            value={result}
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => { setText(""); setResult(""); setKey("KEY"); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            The Vigenere Cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers based on the letters of a keyword. 
            It is a polyalphabetic substitution cipher, meaning it uses multiple substitution alphabets. 
            The keyword determines which Caesar cipher is used for each letter of the plaintext.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
