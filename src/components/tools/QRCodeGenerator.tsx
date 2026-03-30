import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Copy, Check, QrCode } from "lucide-react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://google.com");
  const [qrUrl, setQrUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text) {
      setQrUrl("");
      return;
    }
    QRCode.toDataURL(text, { width: 400, margin: 2 }, (err, url) => {
      if (err) console.error(err);
      setQrUrl(url);
    });
  }, [text]);

  const downloadResults = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyResults = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Enter Text or URL</Label>
          <Input 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="e.g. https://yourwebsite.com" 
            className="h-14 text-lg p-6 rounded-2xl border-slate-200 focus:ring-indigo-500"
          />
        </div>

        <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-3">
          <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <QrCode className="w-4 h-4" /> QR Code Info
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed">
            QR codes (Quick Response codes) are two-dimensional barcodes that can be scanned by smartphones to quickly access websites, text, or other data.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        {qrUrl ? (
          <>
            <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-white ring-1 ring-slate-100">
              <img src={qrUrl} alt="QR Code" className="w-64 h-64 rounded-xl" />
            </div>

            <div className="flex gap-3 w-full">
              <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl">
                <Download className="w-4 h-4" /> Download PNG
              </Button>
              <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-11 rounded-xl border-slate-200">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied Link" : "Copy Link"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 opacity-20">
            <QrCode className="w-20 h-20 mx-auto" />
            <p className="font-bold uppercase tracking-widest">Enter text to generate QR</p>
          </div>
        )}
      </div>
    </div>
  );
}
