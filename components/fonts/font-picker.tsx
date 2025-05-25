"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-with-preview"
import { popularGoogleFonts } from "@/lib/google-fonts"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline,
  Strikethrough,
  Minus,
  LineChart,
  Type,
} from "lucide-react"

interface FontPickerProps {
  onFontChange?: (properties: FontProperties) => void
}

interface FontProperties {
  fontFamily: string
  fontSize: number
  fontWeight: string
  lineHeight: number
  letterSpacing: number
  textAlign: string
  textTransform: string
  textDecoration: string
  color: string
  backgroundColor: string
  textShadow: string
  strokeWidth: number
  strokeColor: string
}

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

export default function FontPicker({ onFontChange }: FontPickerProps) {
  const [fontProperties, setFontProperties] = React.useState<FontProperties>({
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: "left",
    textTransform: "none",
    textDecoration: "none",
    color: "#000000",
    backgroundColor: "transparent",
    textShadow: "none",
    strokeWidth: 0,
    strokeColor: "#000000",
  })

  const updateProperty = React.useCallback(
    (key: keyof FontProperties, value: any) => {
      setFontProperties((prev) => {
        const updated = { ...prev, [key]: value }
        onFontChange?.(updated)
        return updated
      })
    },
    [onFontChange],
  )

  // Load Google Fonts dynamically
  React.useEffect(() => {
    const link = document.createElement("link")
    link.href = `https://fonts.googleapis.com/css2?family=${popularGoogleFonts
      .map((font) => font.replace(/\s+/g, "+") + ":wght@100;200;300;400;500;600;700;800;900")
      .join("&family=")}&display=swap`
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <div className="w-80 bg-background rounded-2xl p-6 m-6 border">
      <TypographySection fontProperties={fontProperties} updateProperty={updateProperty} />

      {/* Separator */}
      <div className="h-px bg-border my-3"></div>

      <CaseSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <AlignmentSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <DecorationSection fontProperties={fontProperties} updateProperty={updateProperty} />

      {/* Separator */}
      <div className="h-px bg-border my-3"></div>

      <FillSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <EffectsSection fontProperties={fontProperties} updateProperty={updateProperty} />

      {/* Separator */}
      <div className="h-px bg-border my-3"></div>

      <StrokeSection fontProperties={fontProperties} updateProperty={updateProperty} />
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-medium text-primary mb-2">{children}</h3>
}

type SectionProps = {
  fontProperties: FontProperties
  updateProperty: (key: keyof FontProperties, value: any) => void
}

function TypographySection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="space-y-3">
      <Heading>Typography</Heading>

      {/* Font Family - Full width */}
      <Select value={fontProperties.fontFamily} onValueChange={(value) => updateProperty("fontFamily", value)}>
        <SelectTrigger className="w-full h-8 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
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

      {/* Font Size and Weight */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          value={fontProperties.fontSize}
          onChange={(e) => updateProperty("fontSize", Number.parseInt(e.target.value) || 16)}
          className="h-8 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
          placeholder="Size"
          min="8"
          max="200"
        />

        <Select value={fontProperties.fontWeight} onValueChange={(value) => updateProperty("fontWeight", value)}>
          <SelectTrigger className="h-8 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
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

      {/* Font Size Presets */}
      <Select
        value={fontProperties.fontSize.toString()}
        onValueChange={(value) => updateProperty("fontSize", Number.parseInt(value))}
      >
        <SelectTrigger className="h-8 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
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

      {/* Line Height and Letter Spacing with Icons */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <LineChart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.lineHeight}
            onChange={(e) => updateProperty("lineHeight", Number.parseFloat(e.target.value) || 1.5)}
            className="h-8 pl-10 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
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
            className="h-8 pl-10 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
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

function CaseSection({ fontProperties, updateProperty }: SectionProps) {
  const caseOptions = [
    { value: "none", label: "Aa" },
    { value: "uppercase", label: "AA" },
    { value: "lowercase", label: "aa" },
    { value: "capitalize", label: "Aa" },
  ]

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Case</Heading>
        <div className="bg-muted rounded-lg p-0.5 flex">
          {caseOptions.map((caseOption) => (
            <button
              key={caseOption.value}
              className={`h-6 w-7 rounded-md text-xs font-medium transition-all ${
                fontProperties.textTransform === caseOption.value
                  ? "bg-background text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => updateProperty("textTransform", caseOption.value)}
            >
              {caseOption.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlignmentSection({ fontProperties, updateProperty }: SectionProps) {
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
        <div className="bg-muted rounded-lg p-0.5 flex">
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

function DecorationSection({ fontProperties, updateProperty }: SectionProps) {
  const decorationOptions = [
    { value: "none", icon: Minus },
    { value: "underline", icon: Underline },
    { value: "line-through", icon: Strikethrough },
  ]

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Decoration</Heading>
        <div className="bg-muted rounded-lg p-0.5 flex">
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

function FillSection({ fontProperties, updateProperty }: SectionProps) {
  const [hexValue, setHexValue] = React.useState(fontProperties.color.replace("#", ""))
  const colorInputRef = React.useRef<HTMLInputElement>(null)

  const handleHexChange = (value: string) => {
    const cleanValue = value
      .replace(/[^0-9a-fA-F]/g, "")
      .toLowerCase()
      .slice(0, 6)
    setHexValue(cleanValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (hexValue.length === 1) {
        const completedHex = hexValue.repeat(6)
        setHexValue(completedHex)
        updateProperty("color", `#${completedHex}`)
      } else if (hexValue.length >= 3) {
        const paddedHex = hexValue.length < 6 ? hexValue.padEnd(6, "0") : hexValue
        setHexValue(paddedHex)
        updateProperty("color", `#${paddedHex}`)
      }
    }
  }

  const handleColorBoxClick = () => {
    colorInputRef.current?.click()
  }

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    const newHex = color.replace("#", "")
    setHexValue(newHex)
    updateProperty("color", color)
  }

  React.useEffect(() => {
    setHexValue(fontProperties.color.replace("#", ""))
  }, [fontProperties.color])

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Fill</Heading>
        <div className="relative">
          <div className="relative flex items-center">
            <button
              onClick={handleColorBoxClick}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded border hover:border-ring transition-colors cursor-pointer z-10"
              style={{ backgroundColor: `#${hexValue}` }}
            />

            <input
              ref={colorInputRef}
              type="color"
              value={`#${hexValue}`}
              onChange={handleColorPickerChange}
              className="absolute opacity-0 pointer-events-none"
            />

            <span
              className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs pointer-events-none"
              style={{
                fontFamily:
                  'JetBrains Mono, SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
              }}
            >
              #
            </span>
            <input
              type="text"
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-32 bg-accent rounded-lg h-8 pl-10 pr-2 text-xs border focus:ring-1 focus:ring-ring focus:outline-none focus:border-ring transition-all"
              placeholder="000000"
              maxLength={6}
              style={{
                fontFamily:
                  'JetBrains Mono, SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function EffectsSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <Heading>Effects</Heading>
        <Select value={fontProperties.textShadow} onValueChange={(value) => updateProperty("textShadow", value)}>
          <SelectTrigger className="w-32 h-8 border bg-accent rounded-lg text-xs focus:ring-1 focus:ring-ring focus:border-ring">
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

function StrokeSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div>
      <Heading>Stroke</Heading>
      <div className="space-y-2">
        <Input
          type="number"
          value={fontProperties.strokeWidth}
          onChange={(e) => updateProperty("strokeWidth", Number.parseFloat(e.target.value) || 0)}
          className="h-8 border bg-accent rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
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
            className="h-8 border bg-accent rounded-lg text-sm flex-1 focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Stroke Color"
          />
        </div>
      </div>
    </div>
  )
}
