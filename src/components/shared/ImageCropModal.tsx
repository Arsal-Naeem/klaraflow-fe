"use client";

import React, { useState, useRef, useCallback } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/utils/toast";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string, croppedImageFile: File) => void;
  aspectRatio?: number;
}

// Helper function to create a centered crop
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

// Helper function to convert canvas to file
function canvasToFile(
  canvas: HTMLCanvasElement,
  fileName: string
): Promise<File> {
  return new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], fileName, { type: "image/jpeg" });
          resolve(file);
        }
      },
      "image/jpeg",
      0.9
    );
  });
}

// Helper function to crop the image
async function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string
): Promise<{ url: string; file: File }> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

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

  const url = canvas.toDataURL("image/jpeg", 0.9);
  const file = await canvasToFile(canvas, fileName);

  return { url, file };
}

export default function ImageCropModal({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  aspectRatio = 1, // Square by default
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    },
    [aspectRatio]
  );

  const handleCropComplete = useCallback(async () => {
    if (completedCrop && imgRef.current) {
      try {
        const { url, file } = await getCroppedImg(
          imgRef.current,
          completedCrop,
          "cropped-image.jpg"
        );
        onCropComplete(url, file);
        onClose();
      } catch (error) {
        console.error("Error cropping image:", error);
        toast.error("Failed to crop image. Please try again.");
      }
    }
  }, [completedCrop, onCropComplete, onClose]);

  const handleCancel = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>
            Adjust the crop area to select the portion of the image you want to
            use.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center overflow-hidden max-h-[60vh]">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              className="max-w-full max-h-[60vh]"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
                className="max-w-full max-h-[60vh] object-contain"
              />
            </ReactCrop>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="accent" onClick={handleCropComplete} disabled={!completedCrop}>
            Apply Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
