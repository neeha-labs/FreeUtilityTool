import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, Image as ImageIcon, FileWarning, RefreshCw } from "lucide-react";
import imageCompression from 'browser-image-compression';

interface ImageCompressorProps {
  title?: string;
  targetSizeKB?: number;
}

export default function ImageCompressor({ title, targetSizeKB }: ImageCompressorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [targetSize, setTargetSize] = useState<number>(targetSizeKB || 500); // default 500KB if not specified
  const [useTargetSize, setUseTargetSize] = useState<boolean>(!!targetSizeKB);
  const [compressing, setCompressing] = useState(false);
  const [stats, setStats] = useState({ originalSize: 0, compressedSize: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (targetSizeKB) {
      setTargetSize(targetSizeKB);
      setUseTargetSize(true);
    }
  }, [targetSizeKB]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setStats({ ...stats, originalSize: file.size });
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCompressedImage(null);
        setCompressedFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async () => {
    if (!originalFile) return;
    setCompressing(true);
    
    try {
      const options = {
        maxSizeMB: useTargetSize ? targetSize / 1024 : undefined,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: useTargetSize ? undefined : quality,
      };

      const compressedBlob = await imageCompression(originalFile, options);
      setCompressedFile(compressedBlob as File);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompressedImage(event.target?.result as string);
        setStats(prev => ({ ...prev, compressedSize: compressedBlob.size }));
        setCompressing(false);
      };
      reader.readAsDataURL(compressedBlob);
    } catch (error) {
      console.error("Compression error:", error);
      setCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedImage || !compressedFile) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed_${originalFile?.name || "image.jpg"}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-10 py-4">
      {!image ? (
        <div 
          className="border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload Image to Compress</h3>
          <p className="text-slate-500">Drag and drop or click to select a file (PNG, JPG, WEBP)</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center">
              <img src={image} alt="Original" className="max-h-full object-contain" />
              <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                Original: {formatSize(stats.originalSize)}
              </div>
            </div>

            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={!useTargetSize} 
                    onChange={() => setUseTargetSize(false)}
                    className="text-indigo-600"
                  />
                  <span>By Quality</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={useTargetSize} 
                    onChange={() => setUseTargetSize(true)}
                    className="text-indigo-600"
                  />
                  <span>By Target Size</span>
                </label>
              </div>

              {!useTargetSize ? (
                <>
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">Compression Quality</Label>
                    <span className="text-indigo-600 font-bold">{Math.round(quality * 100)}%</span>
                  </div>
                  <Slider value={[quality * 100]} min={1} max={100} step={1} onValueChange={(v) => setQuality(v[0] / 100)} />
                </>
              ) : (
                <div className="space-y-2">
                  <Label className="font-bold">Target Size (KB)</Label>
                  <Input 
                    type="number" 
                    value={targetSize} 
                    onChange={(e) => setTargetSize(Number(e.target.value))}
                    min={1}
                  />
                  <p className="text-xs text-slate-500">The tool will try to compress the image close to this size.</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button onClick={compressImage} className="flex-1 bg-indigo-600 hover:bg-indigo-700" disabled={compressing}>
                  {compressing ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Compressing...</> : "Compress Image"}
                </Button>
                <Button variant="outline" onClick={() => setImage(null)} className="text-slate-500">
                  Change Image
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
              {compressedImage ? (
                <img src={compressedImage} alt="Compressed" className="max-h-full object-contain" />
              ) : (
                <div className="text-slate-600 flex flex-col items-center gap-4">
                  <ImageIcon className="w-12 h-12 opacity-20" />
                  <p className="text-sm italic">Click "Compress Image" to see preview</p>
                </div>
              )}
              {compressedImage && (
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                  Compressed: {formatSize(stats.compressedSize)}
                </div>
              )}
            </div>

            {compressedImage && (
              <div className="space-y-4">
                <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-green-800 font-bold text-lg">Success!</p>
                    <p className="text-green-600 text-sm">Reduced by {Math.round((1 - stats.compressedSize / stats.originalSize) * 100)}%</p>
                  </div>
                  <Button onClick={downloadImage} className="bg-green-600 hover:bg-green-700 gap-2">
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
