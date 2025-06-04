"use client"

import { Heading, Slider } from "../../fonts/shared-components"
import { type ImageSectionProps } from "../../fonts/shared-components"

export function ColorSection({ imageProperties, updateProperty }: ImageSectionProps) {
  return (
    <div className="space-y-3">
      <Heading>Color Adjustments</Heading>
      
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Saturate: {imageProperties.saturate}%</label>
        <Slider
          value={[imageProperties.saturate]}
          onValueChange={(value) => updateProperty("saturate", value[0])}
          max={200}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Hue Rotate: {imageProperties.hueRotate}°</label>
        <Slider
          value={[imageProperties.hueRotate]}
          onValueChange={(value) => updateProperty("hueRotate", value[0])}
          max={360}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Grayscale: {imageProperties.grayScale}%</label>
        <Slider
          value={[imageProperties.grayScale]}
          onValueChange={(value) => updateProperty("grayScale", value[0])}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  )
}