import { 
  Heading, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  type SectionProps 
} from "../shared-components"

export function EffectsSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Effects</Heading>
        <Select value={fontProperties.textShadow} onValueChange={(value) => updateProperty("textShadow", value)}>
          <SelectTrigger className="w-32 h-8 border bg-background rounded-lg text-xs focus:ring-1 focus:ring-ring focus:border-ring">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="1px 1px 2px rgba(0,0,0,0.3)">Light</SelectItem>
            <SelectItem value="2px 2px 4px rgba(0,0,0,0.5)">Medium</SelectItem>
            <SelectItem value="3px 3px 6px rgba(0,0,0,0.7)">Strong</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}