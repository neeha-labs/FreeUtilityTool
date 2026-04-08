import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Image as ImageIcon, Lock, Unlock } from "lucide-react";

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImage(imgUrl);
        setResizedImage(null);
        
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = imgUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const resizeImage = () => {
    if (!image || width <= 0 || height <= 0) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Preserve original format if possible, default to png
        const format = fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".jpeg") ? "image/jpeg" : "image/png";
        const dataUrl = canvas.toDataURL(format, 0.9);
        setResizedImage(dataUrl);
      }
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (resizedImage) {
      const link = document.createElement("a");
      link.href = resizedImage;
      const parts = fileName.split(".");
      const ext = parts.pop();
      const name = parts.join(".");
      link.download = `${name}-${width}x${height}.${ext}`;
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
                <div>
                  <span className="font-medium text-slate-700 block truncate max-w-[200px] sm:max-w-xs">{fileName}</span>
                  <span className="text-xs text-slate-500">Original: {originalDimensions.width} x {originalDimensions.height} px</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setImage(null); setResizedImage(null); }}>
                Change
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width || ""}
                    onChange={handleWidthChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height || ""}
                    onChange={handleHeightChange}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                    className="text-slate-600"
                  >
                    {maintainAspectRatio ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                    {maintainAspectRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                  </Button>
                </div>

                <div className="pt-4">
                  <Button onClick={resizeImage} className="w-full">
                    Resize Image
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-200 p-4 min-h-[200px]">
                {resizedImage ? (
                  <div className="space-y-4 text-center w-full">
                    <p className="text-sm font-medium text-green-600">Resized successfully!</p>
                    <div className="relative max-w-full overflow-hidden rounded border border-slate-200 bg-white p-1 mx-auto">
                      <img src={resizedImage} alt="Resized" className="max-h-[200px] object-contain mx-auto" />
                    </div>
                    <Button onClick={downloadImage} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
