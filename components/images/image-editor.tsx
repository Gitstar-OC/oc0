"use client"

import * as React from "react"
import { type ImageProperties } from "../fonts/shared-components"
import { FilterSection } from "./sections/filter-section"
import { ColorSection } from "./sections/color-section"
import { EffectsSection } from "./sections/effects-section"

interface ImageEditorProps {
  onImageChange?: (properties: ImageProperties) => void
}

export default function ImageEditor({ onImageChange }: ImageEditorProps) {
  const [imageProperties, setImageProperties] = React.useState<ImageProperties>({
    blur: 0,
    contrast: 100,
    brightness: 100,
    dropShadow: "none",
    grayScale: 0,
    hueRotate: 0,
    invert: 0,
    saturate: 100,
    sepia: 0,
  })

  const updateProperty = React.useCallback(
    (key: keyof ImageProperties, value: any) => {
      setImageProperties((prev) => {
        const updated = { ...prev, [key]: value }
        onImageChange?.(updated)
        return updated
      })
    },
    [onImageChange],
  )

  const getFilterStyle = () => {
    const filters = []
    if (imageProperties.blur > 0) filters.push(`blur(${imageProperties.blur}px)`)
    if (imageProperties.contrast !== 100) filters.push(`contrast(${imageProperties.contrast}%)`)
    if (imageProperties.brightness !== 100) filters.push(`brightness(${imageProperties.brightness}%)`)
    if (imageProperties.grayScale > 0) filters.push(`grayscale(${imageProperties.grayScale}%)`)
    if (imageProperties.hueRotate !== 0) filters.push(`hue-rotate(${imageProperties.hueRotate}deg)`)
    if (imageProperties.invert > 0) filters.push(`invert(${imageProperties.invert}%)`)
    if (imageProperties.saturate !== 100) filters.push(`saturate(${imageProperties.saturate}%)`)
    if (imageProperties.sepia > 0) filters.push(`sepia(${imageProperties.sepia}%)`)
    
    return filters.length > 0 ? filters.join(' ') : 'none'
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-background rounded text-center">
        <div className="relative w-full h-48 bg-gray-200 rounded overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
            alt="Sample"
            className="w-full h-full object-cover"
            style={{
              filter: getFilterStyle(),
              boxShadow: imageProperties.dropShadow,
            }}
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Blur: {imageProperties.blur}px, Contrast: {imageProperties.contrast}%, Brightness: {imageProperties.brightness}%
        </div>
      </div>
      
      <div className="w-80 bg-accent rounded-2xl p-6 m-6 border">
        <FilterSection imageProperties={imageProperties} updateProperty={updateProperty} />

        <div className="h-px bg-border my-3"></div>

        <ColorSection imageProperties={imageProperties} updateProperty={updateProperty} />

        <div className="h-px bg-border my-3"></div>

        <EffectsSection imageProperties={imageProperties} updateProperty={updateProperty} />
      </div>
    </div>
  )
}