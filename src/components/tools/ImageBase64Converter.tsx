import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

export default function ImageBase64Converter() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBase64(result);
      setPreview(result);
      toast.success("Image converted to Base64!");
    };
    reader.readAsDataURL(file);
  };

  const handleBase64Change = (val: string) => {
    setBase64(val);
    if (val.startsWith("data:image/")) {
      setPreview(val);
    } else {
      setPreview(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    toast.success("Base64 string copied!");
  };

  const downloadImage = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = "decoded-image.png";
    a.click();
    toast.success("Image downloaded!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Image to Base64</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-slate-400" />
                <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-slate-400">PNG, JPG, GIF or WEBP</p>
              </div>
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-500 uppercase">Base64 String</label>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard} disabled={!base64}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Textarea
              className="h-32 resize-none font-mono text-[10px] break-all"
              value={base64}
              onChange={(e) => handleBase64Change(e.target.value)}
              placeholder="Base64 string will appear here..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Base64 to Image Preview</label>
          <div className="flex items-center justify-center w-full h-[312px] border rounded-xl bg-slate-50 overflow-hidden relative group">
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" onClick={downloadImage}>
                    <Download className="h-4 w-4 mr-2" /> Download Image
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p className="text-sm text-slate-400">Paste a Base64 string or upload an image to see preview</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => { setBase64(""); setPreview(null); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool allows you to convert images into Base64 strings and vice versa. 
            Base64 encoding is useful for embedding images directly into HTML, CSS, or JSON files. 
            Simply upload an image to get its Base64 code, or paste a Base64 string to preview and download the original image.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
