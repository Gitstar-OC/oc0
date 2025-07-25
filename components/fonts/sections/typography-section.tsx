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
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { LineChart, Type, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
}

interface GoogleFontsResponse {
  items: GoogleFont[];
}

const popularFonts: GoogleFont[] = [
  {
    family: "Inter",
    variants: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "400italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Roboto",
    variants: [
      "100",
      "300",
      "400",
      "500",
      "700",
      "900",
      "100italic",
      "300italic",
      "400italic",
      "500italic",
      "700italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Open Sans",
    variants: [
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "400italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Lato",
    variants: [
      "100",
      "300",
      "400",
      "700",
      "900",
      "100italic",
      "300italic",
      "400italic",
      "700italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Montserrat",
    variants: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "400italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Poppins",
    variants: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "400italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Source Sans Pro",
    variants: [
      "200",
      "300",
      "400",
      "600",
      "700",
      "900",
      "200italic",
      "300italic",
      "400italic",
      "600italic",
      "700italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
  {
    family: "Nunito",
    variants: [
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "400italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    subsets: ["latin"],
    category: "sans-serif",
  },
];

const fontSizes = [
  8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72,
];

// Font item component for react-window
const FontItem = ({ index, style, data }: ListChildComponentProps) => {
  const { fonts, selectedFont, onSelect, hoveredIndex, onHover } = data;
  const font = fonts[index];
  const isSelected = font.family === selectedFont;
  const isHovered = index === hoveredIndex;

  return (
    <div style={style}>
      <button
        onClick={() => onSelect(font.family)}
        onMouseEnter={() => onHover(index)}
        className={cn(
          "flex items-center w-full h-8 px-3 text-xs cursor-pointer transition-colors text-left",
          "hover:bg-accent hover:text-accent-foreground",
          isHovered && "bg-accent text-accent-foreground",
          isSelected && "bg-muted"
        )}
        style={{ fontFamily: font.family }}
      >
        <Check
          className={cn(
            "mr-2 h-3 w-3",
            isSelected ? "opacity-100" : "opacity-0"
          )}
        />
        <span>{font.family}</span>
      </button>
    </div>
  );
};

export function TypographySection({
  fontProperties,
  updateProperty,
}: SectionProps) {
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>(popularFonts);
  const [loading, setLoading] = useState(false);
  const [selectedFont, setSelectedFont] = useState<GoogleFont | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const listRef = useRef<any>(null);

  const GOOGLE_FONTS_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "YOUR_API_KEY";

  useEffect(() => {
    if (fontProperties.fontFamily && googleFonts.length > 0) {
      const font = googleFonts.find(
        (f) => f.family === fontProperties.fontFamily
      );
      setSelectedFont(font || null);
    }
  }, [fontProperties.fontFamily, googleFonts]);

  const filteredFonts = useMemo(
    () =>
      googleFonts.filter((f) =>
        f.family.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, googleFonts]
  );

  useEffect(() => {
    if (fontOpen && fontProperties.fontFamily && listRef.current) {
      const selectedIndex = filteredFonts.findIndex(
        (font) => font.family === fontProperties.fontFamily
      );
      if (selectedIndex >= 0) {
        setHoveredIndex(selectedIndex);
        const itemHeight = 32;
        const containerHeight = 200;
        const visibleItems = Math.floor(containerHeight / itemHeight);
        const targetScrollTop = Math.max(
          0,
          (selectedIndex - Math.floor(visibleItems / 2)) * itemHeight
        );
        listRef.current.scrollTo(targetScrollTop);
      }
    }
  }, [fontOpen, fontProperties.fontFamily, filteredFonts]);

  const handleFontChange = useCallback(
    (fontFamily: string) => {
      updateProperty("fontFamily", fontFamily);
      loadGoogleFont(fontFamily);
      setFontOpen(false);
      setSearchTerm("");
      setHoveredIndex(-1);
    },
    [updateProperty]
  ); 

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!fontOpen || filteredFonts.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          const nextIndex = Math.min(
            hoveredIndex + 1,
            filteredFonts.length - 1
          );
          setHoveredIndex(nextIndex);
          if (listRef.current) {
            listRef.current.scrollToItem(nextIndex, "smart");
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevIndex = Math.max(hoveredIndex - 1, 0);
          setHoveredIndex(prevIndex);
          if (listRef.current) {
            listRef.current.scrollToItem(prevIndex, "smart");
          }
          break;
        case "Enter":
          e.preventDefault();
          if (hoveredIndex >= 0 && filteredFonts[hoveredIndex]) {
            handleFontChange(filteredFonts[hoveredIndex].family);
          }
          break;
        case "Escape":
          e.preventDefault();
          setFontOpen(false);
          break;
      }
    },
    [fontOpen, filteredFonts, hoveredIndex, handleFontChange]
  );

  const fetchGoogleFonts = async () => {
    if (fontsLoaded) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=popularity&subset=latin`
      );
      const data: GoogleFontsResponse = await response.json();
      if (data.items && data.items.length > 0) {
        setGoogleFonts(data.items);
        setFontsLoaded(true);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const loadGoogleFont = (fontFamily: string) => {
    const existingLink = document.querySelector(
      `link[href*="${fontFamily.replace(/ /g, "+")}"]`
    );
    if (existingLink) return;
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      / /g,
      "+"
    )}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
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
    const weights: { value: string; label: string }[] = [];
    const processed = new Set<string>();
    selectedFont.variants.forEach((v) => {
      let weight = v;
      let italic = false;
      if (v.includes("italic")) {
        italic = true;
        weight = v.replace("italic", "") || "400";
      }
      if (v === "regular") {
        weight = "400";
      }
      if (weightMap[weight] && !processed.has(weight)) {
        processed.add(weight);
        weights.push({ value: weight, label: weightMap[weight] });
      }
      if (italic && weightMap[weight] && !processed.has(weight + "italic")) {
        processed.add(weight + "italic");
        weights.push({
          value: weight + "italic",
          label: `${weightMap[weight]} Italic`,
        });
      }
    });
    return weights.sort((a, b) => {
      const aw = parseInt(a.value.replace("italic", ""));
      const bw = parseInt(b.value.replace("italic", ""));
      if (aw === bw) {
        return a.value.includes("italic") ? 1 : -1;
      }
      return aw - bw;
    });
  };

  return (
    <div className="space-y-3">
      <Heading>Typography</Heading>
      <div className="w-full">
        <Popover open={fontOpen} onOpenChange={setFontOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={fontOpen}
              className="w-full h-8 justify-between border bg-background dark:bg-background rounded-md text-xs focus:ring-1 focus:ring-ring hover:bg-neutral-50 hover:cursor-pointer focus:border-ring"
              onClick={() => {
                if (!fontsLoaded) {
                  fetchGoogleFonts();
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {fontProperties.fontFamily || "Select font family..."}
              <ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[270px] p-0"
            align="start"
            side="bottom"
            sideOffset={4}
            onKeyDown={handleKeyDown}
          >
            <Command>
              <CommandInput
                placeholder="Search fonts..."
                className="h-8 text-xs"
                value={searchTerm}
                onValueChange={(val) => setSearchTerm(val)}
                onKeyDown={handleKeyDown}
              />
              <CommandList className="max-h-[200px] p-0">
                {filteredFonts.length === 0 ? (
                  <CommandEmpty className="py-4 text-xs px-4">
                    {loading ? "Loading fonts..." : "No font found."}
                  </CommandEmpty>
                ) : (
                  <List
                    ref={listRef}
                    height={200}
                    width="100%"
                    itemCount={filteredFonts.length}
                    itemSize={32}
                    itemData={{
                      fonts: filteredFonts,
                      selectedFont: fontProperties.fontFamily,
                      onSelect: handleFontChange,
                      hoveredIndex,
                      onHover: setHoveredIndex,
                    }}
                  >
                    {FontItem}
                  </List>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Input
            type="number"
            value={fontProperties.fontSize}
            onChange={(e) =>
              updateProperty("fontSize", Number.parseInt(e.target.value) || 16)
            }
            className="h-8 w-full pr-8 border bg-background dark:bg-background rounded-md text-xs focus:ring-1 focus:ring-ring focus:border-ring"
            min="1"
            max="500"
            placeholder="Size"
          />
          <Popover open={sizeOpen} onOpenChange={setSizeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-32 p-1"
              align="end"
              side="bottom"
              sideOffset={4}
            >
              <List
                height={128}
                width={128}
                itemCount={fontSizes.length}
                itemSize={24}
                itemData={{
                  sizes: fontSizes,
                  onSelect: (size: number) => {
                    updateProperty("fontSize", size);
                    setSizeOpen(false);
                  },
                }}
              >
                {({ index, style, data }: ListChildComponentProps) => {
                  const size = data.sizes[index];
                  return (
                    <div style={style}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-6 text-xs justify-start px-2"
                        onClick={() => data.onSelect(size)}
                      >
                        {size}px
                      </Button>
                    </div>
                  );
                }}
              </List>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Select
            value={fontProperties.fontWeight}
            onValueChange={(value) => updateProperty("fontWeight", value)}
            disabled={!selectedFont}
          >
            <SelectTrigger className="h-8 w-full border bg-background dark:bg-background rounded-md text-xs focus:ring-1 focus:ring-ring focus:border-ring">
              <SelectValue placeholder="Weight" />
            </SelectTrigger>
            <SelectContent align="start" side="bottom" sideOffset={4}>
              {getAvailableWeights().map((weight) => (
                <SelectItem
                  key={`weight-${weight.value}`}
                  value={weight.value}
                  className="text-xs"
                >
                  {weight.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <LineChart className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.lineHeight}
            onChange={(e) =>
              updateProperty(
                "lineHeight",
                Number.parseFloat(e.target.value) || 1.5
              )
            }
            className="h-8 w-full pl-7 border bg-background dark:bg-background rounded-md text-xs focus:ring-1 focus:ring-ring focus:border-ring"
            placeholder="Line height"
            min="0.5"
            max="3"
            step="0.1"
          />
        </div>
        <div className="relative">
          <Type className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            type="number"
            value={fontProperties.letterSpacing}
            onChange={(e) =>
              updateProperty(
                "letterSpacing",
                Number.parseFloat(e.target.value) || 0
              )
            }
            className="h-8 w-full pl-7 border bg-background dark:bg-background rounded-md text-xs focus:ring-1 focus:ring-ring focus:border-ring"
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