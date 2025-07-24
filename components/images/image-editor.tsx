"use client"

import * as React from "react"
import { type ImageProperties } from "../fonts/shared-components"
import { FilterSection } from "./sections/filter-section"
import { ColorSection } from "./sections/color-section"
import { EffectsSection } from "./sections/effects-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Download, RotateCcw } from "lucide-react"

interface ImageEditorProps {
  onImageChange?: (properties: ImageProperties) => void
}

export default function ImageEditor({ onImageChange }: ImageEditorProps) {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null)
  const [imageProperties, setImageProperties] = React.useState<ImageProperties>({
    blur: 0,
    contrast: 100,
    brightness: 100,
    dropShadow: "none",
    grayScale: 0,
    hueRotate: 0,
    invert: 0,
    saturate: 100,
    sepia: 0,
  })

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)

  const applyFiltersToCanvas = React.useCallback(() => {
    if (!uploadedImage || !canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = imageRef.current

    if (!ctx) return

    // Set canvas size to match image
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Reset any previous filters and shadows
    ctx.filter = 'none'
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Apply drop shadow first if specified
    if (imageProperties.dropShadow !== "none") {
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 5
    }

    // Apply CSS filters to context
    const filters = [
      `blur(${imageProperties.blur}px)`,
      `contrast(${imageProperties.contrast}%)`,
      `brightness(${imageProperties.brightness}%)`,
      `grayscale(${imageProperties.grayScale}%)`,
      `hue-rotate(${imageProperties.hueRotate}deg)`,
      `invert(${imageProperties.invert}%)`,
      `saturate(${imageProperties.saturate}%)`,
      `sepia(${imageProperties.sepia}%)`,
    ].join(' ')

    ctx.filter = filters

    // Draw image with all filters applied
    ctx.drawImage(img, 0, 0)
  }, [uploadedImage, imageProperties])

  // Update canvas whenever image properties change
  React.useEffect(() => {
    if (uploadedImage && imageRef.current?.complete) {
      applyFiltersToCanvas()
    }
  }, [imageProperties, uploadedImage, applyFiltersToCanvas])

  const handleImageUpload = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const updateProperty = React.useCallback(
    (key: keyof ImageProperties, value: any) => {
      setImageProperties((prev) => {
        const updated = { ...prev, [key]: value }
        onImageChange?.(updated)
        return updated
      })
    },
    [onImageChange],
  )

  const resetFilters = React.useCallback(() => {
    const resetProperties: ImageProperties = {
      blur: 0,
      contrast: 100,
      brightness: 100,
      dropShadow: "none",
      grayScale: 0,
      hueRotate: 0,
      invert: 0,
      saturate: 100,
      sepia: 0,
    }
    setImageProperties(resetProperties)
    onImageChange?.(resetProperties)
  }, [onImageChange])

  const exportImage = React.useCallback(() => {
    if (!canvasRef.current || !uploadedImage || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = imageRef.current

    if (!ctx) return

    // Ensure we have the latest image dimensions
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Reset filters and shadows
    ctx.filter = 'none'
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Apply drop shadow first if specified
    if (imageProperties.dropShadow !== "none") {
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 5
    }

    // Build and apply filter string
    const filters = [
      `blur(${imageProperties.blur}px)`,
      `contrast(${imageProperties.contrast}%)`,
      `brightness(${imageProperties.brightness}%)`,
      `grayscale(${imageProperties.grayScale}%)`,
      `hue-rotate(${imageProperties.hueRotate}deg)`,
      `invert(${imageProperties.invert}%)`,
      `saturate(${imageProperties.saturate}%)`,
      `sepia(${imageProperties.sepia}%)`,
    ].join(' ')

    ctx.filter = filters

    ctx.drawImage(img, 0, 0)

    // Create download link
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `edited-image-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    }, 'image/png', 1.0) // Use highest quality
  }, [uploadedImage, imageProperties, imageRef])

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getFilterStyle = () => {
    const filters = []
    if (imageProperties.blur > 0) filters.push(`blur(${imageProperties.blur}px)`)
    if (imageProperties.contrast !== 100) filters.push(`contrast(${imageProperties.contrast}%)`)
    if (imageProperties.brightness !== 100) filters.push(`brightness(${imageProperties.brightness}%)`)
    if (imageProperties.grayScale > 0) filters.push(`grayscale(${imageProperties.grayScale}%)`)
    if (imageProperties.hueRotate !== 0) filters.push(`hue-rotate(${imageProperties.hueRotate}deg)`)
    if (imageProperties.invert > 0) filters.push(`invert(${imageProperties.invert}%)`)
    if (imageProperties.saturate !== 100) filters.push(`saturate(${imageProperties.saturate}%)`)
    if (imageProperties.sepia > 0) filters.push(`sepia(${imageProperties.sepia}%)`)
    
    return filters.length > 0 ? filters.join(' ') : 'none'
  }

  if (!uploadedImage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div 
            onClick={triggerFileInput}
            className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-muted-foreground/50 transition-colors cursor-pointer bg-muted/5 hover:bg-muted/10"
          >
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center px-4">
              Click to upload an image or drag and drop
            </p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-7xl mx-auto p-4">
      {/* Controls Panel */}
      <div className="w-full lg:w-80 space-y-4">
        <div className="bg-card rounded-lg border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Image Editor</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Upload Section */}
          <div className="space-y-2">
            <Button
              onClick={triggerFileInput}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Export Section */}
          {uploadedImage && (
            <Button
              onClick={exportImage}
              className="w-full flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Image
            </Button>
          )}
        </div>

        {/* Filter Controls */}
        {uploadedImage && (
          <div className="space-y-4">
            <div className="bg-card rounded-lg border p-4">
              <FilterSection imageProperties={imageProperties} updateProperty={updateProperty} />
            </div>
            
            <div className="bg-card rounded-lg border p-4">
              <ColorSection imageProperties={imageProperties} updateProperty={updateProperty} />
            </div>
            
            <div className="bg-card rounded-lg border p-4">
              <EffectsSection imageProperties={imageProperties} updateProperty={updateProperty} />
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="flex-1">
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          
          {!uploadedImage ? (
            <div className="flex flex-col items-center justify-center h-64 lg:h-96 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Upload className="w-8 h-8 lg:w-12 lg:h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center text-sm lg:text-base px-4">
                Upload an image to start editing
              </p>
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="mt-4"
                size="sm"
              >
                Choose Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview Image */}
              <div className="flex justify-center">
                <div className="relative max-w-full">
                  <img
                    ref={imageRef}
                    src={uploadedImage}
                    alt="Preview"
                    style={{
                      filter: getFilterStyle(),
                      boxShadow: imageProperties.dropShadow !== "none" ? imageProperties.dropShadow : undefined,
                    }}
                    className="max-w-full max-h-64 lg:max-h-96 rounded-lg shadow-lg"
                    onLoad={() => {
                      // Small delay to ensure image is fully loaded
                      setTimeout(applyFiltersToCanvas, 10)
                    }}
                  />
                </div>
              </div>
              
              {/* Hidden canvas for export */}
              <canvas
                ref={canvasRef}
                className="hidden"
              />
                
              {/* Image Info */}
              <div className="text-sm text-muted-foreground text-center">
                <p>Click &quot;Export Image&quot; to download your edited image</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}