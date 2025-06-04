"use client"

import { Heading, Slider } from "../../fonts/shared-components"
import { type ImageSectionProps } from "../../fonts/shared-components"

export function FilterSection({ imageProperties, updateProperty }: ImageSectionProps) {
  return (
    <div className="space-y-3">
      <Heading>Filters</Heading>
      
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Blur: {imageProperties.blur}px</label>
        <Slider
          value={[imageProperties.blur]}
          onValueChange={(value) => updateProperty("blur", value[0])}
          max={20}
          min={0}
          step={0.1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Contrast: {imageProperties.contrast}%</label>
        <Slider
          value={[imageProperties.contrast]}
          onValueChange={(value) => updateProperty("contrast", value[0])}
          max={200}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Brightness: {imageProperties.brightness}%</label>
        <Slider
          value={[imageProperties.brightness]}
          onValueChange={(value) => updateProperty("brightness", value[0])}
          max={200}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  )
}