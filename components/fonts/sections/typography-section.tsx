import { 
  Heading, 
  Input, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  type SectionProps 
} from "../shared-components"
import { popularGoogleFonts } from "@/lib/fonts"
import { LineChart, Type } from "lucide-react"

const fontWeights = [
  { value: "100", label: "Thin" },
  { value: "200", label: "Extra Light" },
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
]

const fontSizes = [8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72]

export function TypographySection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="space-y-3">
      <Heading>Typography</Heading>

      <Select value={fontProperties.fontFamily} onValueChange={(value) => updateProperty("fontFamily", value)}>
        <SelectTrigger className="w-full h-8 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {popularGoogleFonts.map((font) => (
            <SelectItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          value={fontProperties.fontSize}
          onChange={(e) => updateProperty("fontSize", Number.parseInt(e.target.value) || 16)}
          className="h-8 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
          placeholder="Size"
          min="8"
          max="200"
        />

        <Select value={fontProperties.fontWeight} onValueChange={(value) => updateProperty("fontWeight", value)}>
          <SelectTrigger className="h-8 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
            <SelectValue placeholder="Weight" />
          </SelectTrigger>
          <SelectContent>
            {fontWeights.map((weight) => (
              <SelectItem key={weight.value} value={weight.value}>
                {weight.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        value={fontProperties.fontSize.toString()}
        onValueChange={(value) => updateProperty("fontSize", Number.parseInt(value))}
      >
        <SelectTrigger className="h-8 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
          <SelectValue placeholder="Size presets" />
        </SelectTrigger>
        <SelectContent>
          {fontSizes.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}px
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <LineChart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.lineHeight}
            onChange={(e) => updateProperty("lineHeight", Number.parseFloat(e.target.value) || 1.5)}
            className="h-8 pl-10 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Line Height"
            min="0.5"
            max="3"
            step="0.1"
          />
        </div>

        <div className="relative">
          <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.letterSpacing}
            onChange={(e) => updateProperty("letterSpacing", Number.parseFloat(e.target.value) || 0)}
            className="h-8 pl-10 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Letter Spacing"
            min="-5"
            max="10"
            step="0.1"
          />
        </div>
      </div>
    </div>
  )
}