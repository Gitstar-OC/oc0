"use client"

import * as React from "react"
import { popularGoogleFonts } from "@/lib/fonts"
import { type FontProperties } from "./shared-components"
import { TypographySection } from "./sections/typography-section"
import { CaseSection } from "./sections/case-section"
import { AlignmentSection } from "./sections/alignment-section"
import { DecorationSection } from "./sections/decoration-section"
import { FillSection } from "./sections/fill-section"
import { EffectsSection } from "./sections/effects-section"
import { StrokeSection } from "./sections/stroke-section"


interface FontPickerProps {
  onFontChange?: (properties: FontProperties) => void
}


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
    <div className="w-80 bg-accent rounded-2xl p-6 m-6 border">
      <TypographySection fontProperties={fontProperties} updateProperty={updateProperty} />

      <div className="h-px bg-border my-3"></div>

      <CaseSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <AlignmentSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <DecorationSection fontProperties={fontProperties} updateProperty={updateProperty} />

      <div className="h-px bg-border my-3"></div>

      <FillSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <EffectsSection fontProperties={fontProperties} updateProperty={updateProperty} />

      <div className="h-px bg-border my-3"></div>

      <StrokeSection fontProperties={fontProperties} updateProperty={updateProperty} />
    </div>
  )
}








