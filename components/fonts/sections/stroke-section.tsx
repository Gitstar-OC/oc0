import { 
  Heading, 
  Input, 
  type SectionProps 
} from "../shared-components"

export function StrokeSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div>
      <Heading>Stroke</Heading>
      <div className="space-y-2">
        <Input
          type="number"
          value={fontProperties.strokeWidth}
          onChange={(e) => updateProperty("strokeWidth", Number.parseFloat(e.target.value) || 0)}
          className="h-8 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
          placeholder="Stroke Width"
          min="0"
          max="5"
          step="0.5"
        />
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={fontProperties.strokeColor}
            onChange={(e) => updateProperty("strokeColor", e.target.value)}
            className="w-8 h-8 rounded-lg border cursor-pointer"
          />
          <Input
            value={fontProperties.strokeColor}
            onChange={(e) => updateProperty("strokeColor", e.target.value)}
            className="h-8 border bg-background rounded-lg text-sm flex-1 focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Stroke Color"
          />
        </div>
      </div>
    </div>
  )
}