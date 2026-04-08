import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, Image as ImageIcon, Crop as CropIcon } from "lucide-react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCrop() {
  const [imgSrc, setImgSrc] = useState('');
  const [fileName, setFileName] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      setFileName(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const getCroppedImg = async (
    image: HTMLImageElement,
    crop: PixelCrop,
    fileName: string
  ): Promise<string> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          window.URL.revokeObjectURL(croppedImageUrl);
          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  };

  const handleCropComplete = async () => {
    if (completedCrop && imgRef.current) {
      try {
        const url = await getCroppedImg(imgRef.current, completedCrop, fileName);
        setCroppedImageUrl(url);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const downloadImage = () => {
    if (croppedImageUrl) {
      const link = document.createElement("a");
      link.href = croppedImageUrl;
      const parts = fileName.split(".");
      const ext = parts.pop();
      const name = parts.join(".");
      link.download = `${name}-cropped.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)
      if (imgRef.current) {
        const { width, height } = imgRef.current
        setCrop(centerAspectCrop(width, height, 16 / 9))
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {!imgSrc ? (
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
              onChange={onSelectFile}
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
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={handleToggleAspectClick}>
                  Toggle Aspect {aspect ? 'Off' : 'On'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { setImgSrc(''); setCroppedImageUrl(''); }}>
                  Change
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 overflow-auto bg-slate-100 rounded-lg border border-slate-200 p-2 flex items-center justify-center min-h-[300px]">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    onLoad={onImageLoad}
                    className="max-h-[500px] object-contain"
                  />
                </ReactCrop>
              </div>
              
              <div className="w-full lg:w-64 flex flex-col space-y-4">
                <Button onClick={handleCropComplete} className="w-full" disabled={!completedCrop?.width || !completedCrop?.height}>
                  <CropIcon className="w-4 h-4 mr-2" />
                  Crop Image
                </Button>

                {croppedImageUrl && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-700">Preview:</p>
                    <div className="relative overflow-hidden rounded border border-slate-200 bg-white p-1">
                      <img src={croppedImageUrl} alt="Cropped" className="w-full h-auto object-contain" />
                    </div>
                    <Button onClick={downloadImage} className="w-full" variant="secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
