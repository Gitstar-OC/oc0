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
      <TypographySection fontProperties={fontProperties} updateProperty={updateProperty} />
      <CaseSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <AlignmentSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <DecorationSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <FillSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <EffectsSection fontProperties={fontProperties} updateProperty={updateProperty} />
      <StrokeSection fontProperties={fontProperties} updateProperty={updateProperty} />
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-medium text-primary mb-3">{children}</h3>
  );
}

type SectionProps = {
  fontProperties: FontProperties;
  updateProperty: (key: keyof FontProperties, value: any) => void;
};

function TypographySection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-6">
      <Heading>Typography</Heading>
      <div className="space-y-2">
        {/* Full width font family select */}
        <Select
          value={fontProperties.fontFamily}
          onValueChange={(value) => updateProperty("fontFamily", value)}
        >
          <SelectTrigger className="border-0 bg-background rounded-lg shadow-sm h-10 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
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
            onChange={(e) =>
              updateProperty("fontSize", Number.parseInt(e.target.value))
            }
            className="border-0 bg-background rounded-lg shadow-sm h-10"
            placeholder="Size"
            min="8"
            max="200"
          />

          <Select
            value={fontProperties.fontWeight}
            onValueChange={(value) => updateProperty("fontWeight", value)}
          >
            <SelectTrigger className="border-0 bg-background w-full rounded-lg shadow-sm h-10">
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

          <Input
            className="border-0 bg-background rounded-lg shadow-sm h-10"
            placeholder="Text Style 1"
          />

          <Input
            className="border-0 bg-background rounded-lg shadow-sm h-10"
            placeholder="Text Style 2"
          />
        </div>
      </div>
    </div>
  );
}

function CaseSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-6 flex place-content-between">
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
            className={`h-8 w-8 rounded-md ${
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
  );
}

function AlignmentSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-6 flex place-content-between">
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
            className={`h-8 w-8 rounded-md ${
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
  );
}

function DecorationSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-6 flex place-content-between">
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
            className={`h-8 w-8 rounded-md ${
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
  );
}

function FillSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-6 flex place-content-between">
      <Heading>Fill</Heading>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={fontProperties.color}
            onChange={(e) => updateProperty("color", e.target.value)}
            className="w-10 h-10 rounded-2xl border-0 shadow-sm cursor-pointer"
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
  );
}

function EffectsSection({ fontProperties, updateProperty }: SectionProps) {
  return (
    <div className="mb-6 flex place-content-between">
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
  );
}

function StrokeSection({ fontProperties, updateProperty }: SectionProps) {
  return (
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
  );
}