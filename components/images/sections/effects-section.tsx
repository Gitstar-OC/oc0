"use client"

import { Heading, Slider, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../fonts/shared-components"
import { type ImageSectionProps } from "../../fonts/shared-components"

export function EffectsSection({ imageProperties, updateProperty }: ImageSectionProps) {
  const shadowPresets = [
    { label: "None", value: "none" },
    { label: "Small", value: "0 1px 3px rgba(0,0,0,0.12)" },
    { label: "Medium", value: "0 4px 6px rgba(0,0,0,0.1)" },
    { label: "Large", value: "0 10px 15px rgba(0,0,0,0.1)" },
    { label: "Extra Large", value: "0 20px 25px rgba(0,0,0,0.15)" },
  ]

  return (
    <div className="space-y-3">
      <Heading>Effects</Heading>
      
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Invert: {imageProperties.invert}%</label>
        <Slider
          value={[imageProperties.invert]}
          onValueChange={(value) => updateProperty("invert", value[0])}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Sepia: {imageProperties.sepia}%</label>
        <Slider
          value={[imageProperties.sepia]}
          onValueChange={(value) => updateProperty("sepia", value[0])}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Drop Shadow</label>
        <Select
          value={imageProperties.dropShadow}
          onValueChange={(value) => updateProperty("dropShadow", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shadowPresets.map((preset) => (
              <SelectItem key={preset.value} value={preset.value}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}