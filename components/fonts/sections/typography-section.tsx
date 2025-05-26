import {
  Heading,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SectionProps,
} from "../shared-components";
import { useState, useEffect, useMemo } from "react";
import { LineChart, Type, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
}

interface GoogleFontsResponse {
  items: GoogleFont[];
}

// Popular fonts as fallback and initial options
const popularFonts: GoogleFont[] = [
  { family: "Inter", variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], category: "sans-serif" },
  { family: "Roboto", variants: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"], category: "sans-serif" },
  { family: "Open Sans", variants: ["300", "400", "500", "600", "700", "800"], subsets: ["latin"], category: "sans-serif" },
  { family: "Lato", variants: ["100", "300", "400", "700", "900"], subsets: ["latin"], category: "sans-serif" },
  { family: "Montserrat", variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], category: "sans-serif" },
  { family: "Poppins", variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], category: "sans-serif" },
  { family: "Source Sans Pro", variants: ["200", "300", "400", "600", "700", "900"], subsets: ["latin"], category: "sans-serif" },
  { family: "Nunito", variants: ["200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], category: "sans-serif" },
];

const fontSizes = [8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72];

export function TypographySection({
  fontProperties,
  updateProperty,
}: SectionProps) {
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>(popularFonts);
  const [loading, setLoading] = useState(false);
  const [selectedFont, setSelectedFont] = useState<GoogleFont | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);
  const [customFontSize, setCustomFontSize] = useState(false);

  const GOOGLE_FONTS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "YOUR_API_KEY";

  useEffect(() => {
    if (fontProperties.fontFamily && googleFonts.length > 0) {
      const font = googleFonts.find((f) => f.family === fontProperties.fontFamily);
      setSelectedFont(font || null);
    }
  }, [fontProperties.fontFamily, googleFonts]);

  const fetchGoogleFonts = async () => {
    if (fontsLoaded) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=popularity&subset=latin`
      );
      const data: GoogleFontsResponse = await response.json();
      if (data.items && data.items.length > 0) {
        // Only take first 200 fonts for performance
        setGoogleFonts(data.items.slice(0, 200));
        setFontsLoaded(true);
      }
    } catch (error) {
      console.error("Failed to fetch Google Fonts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Memoized font display list for performance
  const displayFonts = useMemo(() => {
    if (!selectedFont) return googleFonts.slice(0, 8);
    
    const selectedIndex = googleFonts.findIndex(f => f.family === selectedFont.family);
    if (selectedIndex === -1) return googleFonts.slice(0, 8);
    
    // Show 4 fonts before and 4 fonts after selected font
    const start = Math.max(0, selectedIndex - 4);
    const end = Math.min(googleFonts.length, selectedIndex + 5);
    
    return googleFonts.slice(start, end);
  }, [selectedFont, googleFonts]);

  const loadGoogleFont = (fontFamily: string) => {
    const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/ /g, '+')}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const handleFontChange = (fontFamily: string) => {
    updateProperty("fontFamily", fontFamily);
    loadGoogleFont(fontFamily);
    setFontOpen(false);
  };

  const getAvailableWeights = () => {
    if (!selectedFont) return [];

    const weightMap: { [key: string]: string } = {
      "100": "Thin",
      "200": "Extra Light", 
      "300": "Light",
      "400": "Regular",
      "500": "Medium",
      "600": "Semi Bold",
      "700": "Bold",
      "800": "Extra Bold",
      "900": "Black",
    };

    const uniqueWeights = new Map<string, { value: string; label: string }>();

    selectedFont.variants.forEach((variant) => {
      let value = variant === "regular" ? "400" : variant.replace(/italic/g, "");
      
      if (value && weightMap[value] && !uniqueWeights.has(value)) {
        uniqueWeights.set(value, {
          value,
          label: weightMap[value],
        });
      }
    });

    return Array.from(uniqueWeights.values()).sort((a, b) => Number.parseInt(a.value) - Number.parseInt(b.value));
  };

  return (
    <div className="space-y-4">
      <Heading>Typography</Heading>

      {/* Font Family - Full Width with Combobox */}
      <div className="w-full">
        <Popover open={fontOpen} onOpenChange={setFontOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={fontOpen}
              className="w-full h-10 justify-between border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
              onClick={() => {
                if (!fontsLoaded) {
                  fetchGoogleFonts();
                }
              }}
            >
              {fontProperties.fontFamily || "Select font family..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search fonts..." />
              <CommandList>
                <CommandEmpty>
                  {loading ? "Loading fonts..." : "No font found."}
                </CommandEmpty>
                <CommandGroup>
                  {(loading ? displayFonts : googleFonts).map((font) => (
                    <CommandItem
                      key={font.family}
                      value={font.family}
                      onSelect={handleFontChange}
                      style={{ fontFamily: font.family }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          fontProperties.fontFamily === font.family ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex justify-between items-center w-full">
                        <span>{font.family}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {font.category}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Grid with consistent heights and widths */}
      <div className="grid grid-cols-2 gap-3">
        {/* Font Size - Combined Dropdown and Input */}
        <div className="flex gap-2">
          <Select
            value={customFontSize ? "custom" : fontProperties.fontSize.toString()}
            onValueChange={(value) => {
              if (value === "custom") {
                setCustomFontSize(true);
              } else {
                setCustomFontSize(false);
                updateProperty("fontSize", Number.parseInt(value));
              }
            }}
          >
            <SelectTrigger className="h-10 flex-1 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}px
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          
          {customFontSize && (
            <Input
              type="number"
              value={fontProperties.fontSize}
              onChange={(e) => updateProperty("fontSize", Number.parseInt(e.target.value) || 16)}
              className="h-10 w-20 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
              min="1"
              max="500"
            />
          )}
        </div>

        {/* Font Weight */}
        <div>
          <Select
            value={fontProperties.fontWeight}
            onValueChange={(value) => updateProperty("fontWeight", value)}
            disabled={!selectedFont}
          >
            <SelectTrigger className="h-10 w-full border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring">
              <SelectValue placeholder="Weight" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableWeights().map((weight) => (
                <SelectItem key={`weight-${weight.value}`} value={weight.value}>
                  {weight.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Line Height */}
        <div className="relative">
          <LineChart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.lineHeight}
            onChange={(e) =>
              updateProperty("lineHeight", Number.parseFloat(e.target.value) || 1.5)
            }
            className="h-10 w-full pl-10 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Line height"
            min="0.5"
            max="3"
            step="0.1"
          />
        </div>

        {/* Letter Spacing */}
        <div className="relative">
          <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.letterSpacing}
            onChange={(e) =>
              updateProperty("letterSpacing", Number.parseFloat(e.target.value) || 0)
            }
            className="h-10 w-full pl-10 border bg-background rounded-lg text-sm focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Letter spacing"
            min="-5"
            max="10"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}