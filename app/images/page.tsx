"use client";
import { useState } from "react";
import ImageEditor from "@/components/images/image-editor";
import { ImageProperties } from "@/components/fonts/shared-components";

export default function Page() {
  const [imageProperties, setImageProperties] = useState<ImageProperties>({
    blur: 0,
    contrast: 100,
    brightness: 100,
    dropShadow: "none",
    grayScale: 0,
    hueRotate: 0,
    invert: 0,
    saturate: 100,
    sepia: 0,
  });

  const handleImageChange = (properties: ImageProperties) => {
    setImageProperties(properties);
  };

  return (
    <div className="bg-background text-primary min-h-screen">
      <div className="container mx-auto py-8">        <h1 className="text-3xl font-bold mb-8">Image Editor</h1>
        <ImageEditor onImageChange={handleImageChange} />
      </div>
    </div>
  );
}