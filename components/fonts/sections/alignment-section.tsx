import { 
  Heading, 
  type SectionProps 
} from "../shared-components"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react"

export function AlignmentSection({ fontProperties, updateProperty }: SectionProps) {
  const alignOptions = [
    { value: "left", icon: AlignLeft },
    { value: "center", icon: AlignCenter },
    { value: "right", icon: AlignRight },
    { value: "justify", icon: AlignJustify },
  ]

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Alignment</Heading>
        <div className="bg-primary-foreground rounded-lg p-0.5 flex">
          {alignOptions.map((align) => (
            <button
              key={align.value}
              className={`h-6 w-7 rounded-md flex items-center justify-center transition-all ${
                fontProperties.textAlign === align.value
                  ? "bg-background text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => updateProperty("textAlign", align.value)}
            >
              <align.icon className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
