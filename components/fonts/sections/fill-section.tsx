import { useState, useRef, useEffect } from "react"  
import { 
  Heading, 
  type SectionProps 
} from "../shared-components"

export function FillSection({ fontProperties, updateProperty }: SectionProps) {
  const [hexValue, setHexValue] = useState(fontProperties.color.replace("#", ""))
  const colorInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
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
              className="w-32 bg-background rounded-lg h-8 pl-10 pr-2 text-xs border focus:ring-1 focus:ring-ring focus:outline-none focus:border-ring transition-all"
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
