"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline,
  Strikethrough,
  Minus,
} from "lucide-react";

interface FontPickerProps {
  onFontChange?: (properties: FontProperties) => void;
}

interface FontProperties {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
  textAlign: string;
  textTransform: string;
  textDecoration: string;
  color: string;
  backgroundColor: string;
  textShadow: string;
  strokeWidth: number;
  strokeColor: string;
}

const fontFamilies = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Oswald",
  "Raleway",
  "PT Sans",
];

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
];

export default function FontPicker({ onFontChange }: FontPickerProps) {
    const lineClass = "mb-6 flex place-content-between"

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
  });

  const updateProperty = (key: keyof FontProperties, value: any) => {
    const updated = { ...fontProperties, [key]: value };
    setFontProperties(updated);
    onFontChange?.(updated);
  };

  return (
    <div className="w-80 bg-primary-foreground rounded-2xl p-8 m-6 shadow-sm">
      <div className="mb-6">
        <Heading>Typography</Heading>               

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={fontProperties.fontFamily}
              onValueChange={(value) => updateProperty("fontFamily", value)}
            >
              <SelectTrigger className="border-0 bg-background rounded-lg shadow-sm h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem
                    key={font}
                    value={font}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              value={fontProperties.fontSize}
              onChange={(e) =>
                updateProperty("fontSize", Number.parseInt(e.target.value))
              }
              className="border-0 bg-background rounded-lg shadow-sm h-10"
              placeholder="Size"
              min="8"
              max="200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              value={fontProperties.fontWeight}
              onValueChange={(value) => updateProperty("fontWeight", value)}
            >
              <SelectTrigger className="border-0 bg-background rounded-lg shadow-sm h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem key={weight.value} value={weight.value}>
                    {weight.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              value={fontProperties.lineHeight}
              onChange={(e) =>
                updateProperty("lineHeight", Number.parseFloat(e.target.value))
              }
              className="border-0 bg-background rounded-lg shadow-sm h-10"
              placeholder="Line Height"
              min="0.5"
              max="3"
              step="0.1"
            />
          </div>

          <Input
            type="number"
            value={fontProperties.letterSpacing}
            onChange={(e) =>
              updateProperty("letterSpacing", Number.parseFloat(e.target.value))
            }
            className="border-0 bg-background rounded-lg shadow-sm h-10"
            placeholder="Letter Spacing"
            min="-5"
            max="10"
            step="0.1"
          />
        </div>
      </div>

      <div className={lineClass}>
        <Heading>Case</Heading>

        <div className="flex gap-2">
          {[
            { value: "none", label: "Aa" },
            { value: "uppercase", label: "AA" },
            { value: "lowercase", label: "aa" },
            { value: "capitalize", label: "Aa" },
          ].map((caseOption) => (
            <Button
              key={caseOption.value}
              variant={
                fontProperties.textTransform === caseOption.value
                  ? "default"
                  : "ghost"
              }
              className={`h-10 px-3 rounded-lg ${
                fontProperties.textTransform === caseOption.value
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-background text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
              onClick={() => updateProperty("textTransform", caseOption.value)}
            >
              {caseOption.label}
            </Button>
          ))}
        </div>
      </div>

      <div className={lineClass}>
        <Heading>Alignment</Heading>
        <div className="flex gap-2">
          {[
            { value: "left", icon: AlignLeft },
            { value: "center", icon: AlignCenter },
            { value: "right", icon: AlignRight },
            { value: "justify", icon: AlignJustify },
          ].map((align) => (
            <Button
              key={align.value}
              variant="ghost"
              className={`h-10 w-10 p-0 rounded-lg ${
                fontProperties.textAlign === align.value
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-background text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
              onClick={() => updateProperty("textAlign", align.value)}
            >
              <align.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      <div className={lineClass}>
        <Heading>Decoration</Heading>
        <div className="flex gap-2">
          {[
            { value: "none", icon: Minus },
            { value: "underline", icon: Underline },
            { value: "line-through", icon: Strikethrough },
          ].map((decoration) => (
            <Button
              key={decoration.value}
              variant="ghost"
              className={`h-10 w-10 p-0 rounded-lg ${
                fontProperties.textDecoration === decoration.value
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-background text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
              onClick={() => updateProperty("textDecoration", decoration.value)}
            >
              <decoration.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      <div className={lineClass}>
        <Heading>Fill</Heading>     
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={fontProperties.color}
              onChange={(e) => updateProperty("color", e.target.value)}
              className="w-10 h-10 rounded-lg border-0 shadow-sm cursor-pointer"
            />
            <Input
              value={fontProperties.color}
              onChange={(e) => updateProperty("color", e.target.value)}
              className="border-0 bg-background rounded-lg shadow-sm h-10 flex-1"
              placeholder="Text Color"
            />
          </div>
        </div>
      </div>

      <div className={lineClass}>
        <Heading>Effects</Heading>
        <Select
          value={fontProperties.textShadow}
          onValueChange={(value) => updateProperty("textShadow", value)}
        >
          <SelectTrigger className="border-0 bg-background rounded-lg shadow-sm h-10">
            <SelectValue placeholder="Text Shadow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="1px 1px 2px rgba(0,0,0,0.3)">Light</SelectItem>
            <SelectItem value="2px 2px 4px rgba(0,0,0,0.5)">Medium</SelectItem>
            <SelectItem value="3px 3px 6px rgba(0,0,0,0.7)">Strong</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Heading>Stroke</Heading>       
        <div className="space-y-4">
          <Input
            type="number"
            value={fontProperties.strokeWidth}
            onChange={(e) =>
              updateProperty("strokeWidth", Number.parseFloat(e.target.value))
            }
            className="border-0 bg-background rounded-lg shadow-sm h-10"
            placeholder="Stroke Width"
            min="0"
            max="5"
            step="0.5"
          />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={fontProperties.strokeColor}
              onChange={(e) => updateProperty("strokeColor", e.target.value)}
              className="w-10 h-10 rounded-lg border-0 shadow-sm cursor-pointer"
            />
            <Input
              value={fontProperties.strokeColor}
              onChange={(e) => updateProperty("strokeColor", e.target.value)}
              className="border-0 bg-background rounded-lg shadow-sm h-10 flex-1"
              placeholder="Stroke Color"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-medium text-primary mb-3">{children}</h3>
  );
}

