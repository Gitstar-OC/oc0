import { 
  Heading, 
  type SectionProps 
} from "../shared-components"
import {
  Underline,
  Strikethrough,
  Minus,
} from "lucide-react"

export function DecorationSection({ fontProperties, updateProperty }: SectionProps) {
  const decorationOptions = [
    { value: "none", icon: Minus },
    { value: "underline", icon: Underline },
    { value: "line-through", icon: Strikethrough },
  ]

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Decoration</Heading>
        <div className="bg-primary-foreground rounded-lg p-0.5 flex">
          {decorationOptions.map((decoration) => (
            <button
              key={decoration.value}
              className={`h-6 w-7 rounded-md flex items-center justify-center transition-all ${
                fontProperties.textDecoration === decoration.value
                  ? "bg-background text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => updateProperty("textDecoration", decoration.value)}
            >
              <decoration.icon className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}