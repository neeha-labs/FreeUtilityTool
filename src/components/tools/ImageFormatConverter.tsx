import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, Image as ImageIcon, RefreshCw } from "lucide-react";

interface ImageFormatConverterProps {
  title?: string;
  defaultToFormat?: "png" | "jpeg" | "webp";
}

export default function ImageFormatConverter({ title, defaultToFormat = "png" }: ImageFormatConverterProps) {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [toFormat, setToFormat] = useState<"png" | "jpeg" | "webp">(defaultToFormat);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!image) return;
    setIsConverting(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        // Fill background with white for PNG to JPG conversion
        if (toFormat === "jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);
        const mimeType = `image/${toFormat}`;
        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        setConvertedImage(dataUrl);
      }
      setIsConverting(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (convertedImage) {
      const link = document.createElement("a");
      link.href = convertedImage;
      const originalName = fileName.split(".")[0];
      link.download = `${originalName}-converted.${toFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {!image ? (
          <div
            className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Image</h3>
            <p className="text-slate-500 mb-4">Drag and drop or click to select</p>
            <Button variant="outline">Select File</Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-6 h-6 text-indigo-500" />
                <span className="font-medium text-slate-700 truncate max-w-[200px] sm:max-w-xs">{fileName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setImage(null); setConvertedImage(null); }}>
                Change
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-auto flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Convert To</label>
                <select
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                  value={toFormat}
                  onChange={(e) => setToFormat(e.target.value as "png" | "jpeg" | "webp")}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPG / JPEG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <div className="w-full sm:w-auto flex items-end">
                <Button 
                  onClick={convertImage} 
                  disabled={isConverting}
                  className="w-full sm:w-auto"
                >
                  {isConverting ? (
                    <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Converting...</>
                  ) : (
                    "Convert Image"
                  )}
                </Button>
              </div>
            </div>

            {convertedImage && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Conversion Successful!</h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative max-w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <img src={convertedImage} alt="Converted" className="max-h-[300px] object-contain" />
                  </div>
                  <Button onClick={downloadImage} size="lg" className="w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Download {toFormat.toUpperCase()}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
