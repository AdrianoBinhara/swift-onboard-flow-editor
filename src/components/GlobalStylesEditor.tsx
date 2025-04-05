
import React, { useState } from "react";
import { GlobalStyles } from "@/types/editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { 
  AlignHorizontalSpaceAround, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  PaintBucket,
  Palette,
  Type,
  MoveHorizontal,
  CornerDownRight,
  X,
  CheckCircle2,
  CircleOff,
  Globe,
} from "lucide-react";
import { Switch } from "./ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface GlobalStylesEditorProps {
  globalStyles: GlobalStyles;
  onGlobalStylesUpdate: (updatedStyles: GlobalStyles) => void;
}

export function GlobalStylesEditor({ globalStyles, onGlobalStylesUpdate }: GlobalStylesEditorProps) {
  const handleFieldChange = (field: keyof GlobalStyles, value: any) => {
    onGlobalStylesUpdate({
      ...globalStyles,
      [field]: value,
    });
  };

  const presetGradients = [
    "linear-gradient(to right, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #a8c0ff, #3f2b96)",
    "linear-gradient(to right, #11998e, #38ef7d)",
    "linear-gradient(to right, #ff5f6d, #ffc371)",
    "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
    "linear-gradient(to right, #8e2de2, #4a00e0)",
  ];

  const presetBackgroundColors = [
    "#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6", 
    "#f1f8ff", "#f2f4f6", "#f0f4f8", "#ebf4f1",
    "#f5f5f5", "#f0f0f0", "#ebebeb", "#e0e0e0",
    "#ffefd5", "#e6f7ff", "#f0fff4", "#fff5f5"
  ];

  const presetTextColors = [
    "#000000", "#343a40", "#495057", "#6c757d",
    "#1a202c", "#2d3748", "#4a5568", "#718096",
    "#333333", "#555555", "#666666", "#888888"
  ];

  const presetButtonColors = [
    "#4299e1", "#38b2ac", "#48bb78", "#ed8936",
    "#ed64a6", "#667eea", "#9f7aea", "#f56565"
  ];

  const clearGradient = () => {
    onGlobalStylesUpdate({
      ...globalStyles,
      backgroundGradient: undefined
    });
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-full">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mr-2">
          <Globe className="h-4 w-4 text-purple-700" />
        </div>
        <h2 className="text-lg font-medium">Global Styles</h2>
        <p className="ml-auto text-xs text-muted-foreground">Applied to all slides unless overridden</p>
      </div>

      <Tabs defaultValue="style">
        <TabsList className="grid grid-cols-2 mb-4 bg-purple-50">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-4">
          <Accordion type="multiple" defaultValue={["background", "text", "button", "progress"]}>
            {/* Background Section */}
            <AccordionItem value="background" className="border rounded-md px-2 py-1 mb-3 bg-gray-50/50">
              <AccordionTrigger className="py-2 px-1 hover:no-underline">
                <div className="flex items-center">
                  <PaintBucket className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="font-medium">Background</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 px-1 pb-1">
                <div className="mb-4 space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Background Color</Label>
                    <div className="grid grid-cols-8 gap-2 mt-1">
                      {presetBackgroundColors.map((color) => (
                        <div
                          key={color}
                          className={cn(
                            "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                            globalStyles.backgroundColor === color && "ring-2 ring-purple-500 ring-offset-2"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleFieldChange('backgroundColor', color)}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        className="flex-1"
                        placeholder="#ffffff or rgb(255,255,255)"
                        value={globalStyles.backgroundColor || ''}
                        onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
                      />
                      {globalStyles.backgroundColor && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => handleFieldChange('backgroundColor', '')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm text-muted-foreground">Background Gradients</Label>
                      {globalStyles.backgroundGradient && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearGradient} 
                          className="h-6 px-2 text-xs"
                        >
                          <X className="h-3 w-3 mr-1" />
                          <span>Clear</span>
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {presetGradients.map((gradient) => (
                        <div
                          key={gradient}
                          className={cn(
                            "h-10 rounded cursor-pointer border border-gray-200",
                            globalStyles.backgroundGradient === gradient && "ring-2 ring-purple-500"
                          )}
                          style={{ background: gradient }}
                          onClick={() => handleFieldChange('backgroundGradient', gradient)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Background Image URL</Label>
                    <div className="relative">
                      <Input
                        className="pr-8"
                        placeholder="https://example.com/image.jpg"
                        value={globalStyles.backgroundImage || ''}
                        onChange={(e) => handleFieldChange('backgroundImage', e.target.value)}
                      />
                      {globalStyles.backgroundImage && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-1 top-1 h-8 w-8 p-0" 
                          onClick={() => handleFieldChange('backgroundImage', '')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Text Styling Section */}
            <AccordionItem value="text" className="border rounded-md px-2 py-1 mb-3 bg-gray-50/50">
              <AccordionTrigger className="py-2 px-1 hover:no-underline">
                <div className="flex items-center">
                  <Type className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="font-medium">Text Styling</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 px-1 pb-1">
                <div className="space-y-4">
                  {/* Title Font Size */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Title Font Size</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(["small", "medium", "large"] as const).map((size) => (
                        <Button
                          key={size}
                          variant={globalStyles.titleFontSize === size ? "default" : "outline"}
                          onClick={() => handleFieldChange('titleFontSize', size)}
                          className={cn(
                            "capitalize",
                            globalStyles.titleFontSize === size && "bg-purple-500 hover:bg-purple-600"
                          )}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Description Font Size */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Description Font Size</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(["small", "medium", "large"] as const).map((size) => (
                        <Button
                          key={size}
                          variant={globalStyles.descriptionFontSize === size ? "default" : "outline"}
                          onClick={() => handleFieldChange('descriptionFontSize', size)}
                          className={cn(
                            "capitalize",
                            globalStyles.descriptionFontSize === size && "bg-purple-500 hover:bg-purple-600"
                          )}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Title Color */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Title Color</Label>
                    <div className="grid grid-cols-8 gap-2 mt-1">
                      {presetTextColors.map((color) => (
                        <div
                          key={color}
                          className={cn(
                            "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                            globalStyles.titleColor === color && "ring-2 ring-purple-500 ring-offset-2"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleFieldChange('titleColor', color)}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        className="flex-1"
                        placeholder="#000000 or rgb(0,0,0)"
                        value={globalStyles.titleColor || ''}
                        onChange={(e) => handleFieldChange('titleColor', e.target.value)}
                      />
                      {globalStyles.titleColor && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => handleFieldChange('titleColor', '')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Description Color */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Description Color</Label>
                    <div className="grid grid-cols-8 gap-2 mt-1">
                      {presetTextColors.map((color) => (
                        <div
                          key={color}
                          className={cn(
                            "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                            globalStyles.descriptionColor === color && "ring-2 ring-purple-500 ring-offset-2"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleFieldChange('descriptionColor', color)}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        className="flex-1"
                        placeholder="#000000 or rgb(0,0,0)"
                        value={globalStyles.descriptionColor || ''}
                        onChange={(e) => handleFieldChange('descriptionColor', e.target.value)}
                      />
                      {globalStyles.descriptionColor && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => handleFieldChange('descriptionColor', '')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Button Styling Section */}
            <AccordionItem value="button" className="border rounded-md px-2 py-1 mb-3 bg-gray-50/50">
              <AccordionTrigger className="py-2 px-1 hover:no-underline">
                <div className="flex items-center">
                  <Palette className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="font-medium">Button Styling</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 px-1 pb-1">
                <div className="space-y-4">
                  {/* Button Color */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Button Color</Label>
                    <div className="grid grid-cols-8 gap-2 mt-1">
                      {presetButtonColors.map((color) => (
                        <div
                          key={color}
                          className={cn(
                            "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                            globalStyles.buttonColor === color && "ring-2 ring-purple-500 ring-offset-2"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleFieldChange('buttonColor', color)}
                          title={color}
                        />
                      ))}
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                          !globalStyles.buttonColor && "ring-2 ring-purple-500 ring-offset-2"
                        )}
                        onClick={() => handleFieldChange('buttonColor', undefined)}
                      >
                        <X className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        className="flex-1"
                        placeholder="#0070f3 or rgb(0,112,243)"
                        value={globalStyles.buttonColor || ''}
                        onChange={(e) => handleFieldChange('buttonColor', e.target.value)}
                      />
                      {globalStyles.buttonColor && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => handleFieldChange('buttonColor', undefined)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Button Text Color */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Button Text Color</Label>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 bg-white text-black font-medium",
                          globalStyles.buttonTextColor === '#000000' && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', '#000000')}
                      >
                        Black
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 bg-black text-white font-medium",
                          globalStyles.buttonTextColor === '#ffffff' && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', '#ffffff')}
                      >
                        White
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 bg-gray-200 text-gray-800 font-medium",
                          globalStyles.buttonTextColor === '#333333' && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', '#333333')}
                      >
                        Gray
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 font-medium",
                          !globalStyles.buttonTextColor && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', undefined)}
                      >
                        Default
                      </div>
                    </div>
                    <Input
                      className="mt-2"
                      placeholder="#ffffff or rgb(255,255,255)"
                      value={globalStyles.buttonTextColor || ''}
                      onChange={(e) => handleFieldChange('buttonTextColor', e.target.value)}
                    />
                  </div>

                  {/* Button Layout Options */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Button Position */}
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">Button Position</Label>
                      <div className="grid grid-cols-1 gap-2 mt-1">
                        <Button
                          variant={globalStyles.buttonPosition === 'bottom' ? "default" : "outline"}
                          onClick={() => handleFieldChange('buttonPosition', 'bottom')}
                          className={cn(
                            globalStyles.buttonPosition === 'bottom' && "bg-purple-500 hover:bg-purple-600"
                          )}
                        >
                          Bottom
                        </Button>
                        <Button
                          variant={globalStyles.buttonPosition === 'below-content' ? "default" : "outline"}
                          onClick={() => handleFieldChange('buttonPosition', 'below-content')}
                          className={cn(
                            globalStyles.buttonPosition === 'below-content' && "bg-purple-500 hover:bg-purple-600"
                          )}
                        >
                          Below Content
                        </Button>
                      </div>
                    </div>

                    {/* Button Size */}
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">Button Size</Label>
                      <div className="grid grid-cols-1 gap-2 mt-1">
                        {(['small', 'medium', 'large'] as const).map((size) => (
                          <Button
                            key={size}
                            variant={globalStyles.buttonSize === size ? "default" : "outline"}
                            onClick={() => handleFieldChange('buttonSize', size)}
                            className={cn(
                              "capitalize",
                              globalStyles.buttonSize === size && "bg-purple-500 hover:bg-purple-600"
                            )}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Button Icon */}
                  <div>
                    <Label className="text-sm text-muted-foreground mb-1 block">Button Icon</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        variant={globalStyles.buttonIcon === 'arrow-right' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'arrow-right')}
                        className={cn(
                          "flex items-center justify-center gap-2",
                          globalStyles.buttonIcon === 'arrow-right' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        <span>Arrow</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={globalStyles.buttonIcon === 'chevron-right' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'chevron-right')}
                        className={cn(
                          "flex items-center justify-center gap-2",
                          globalStyles.buttonIcon === 'chevron-right' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        <span>Chevron</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={globalStyles.buttonIcon === 'chevron-down' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'chevron-down')}
                        className={cn(
                          "flex items-center justify-center gap-2",
                          globalStyles.buttonIcon === 'chevron-down' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        <span>Down</span>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={globalStyles.buttonIcon === 'none' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'none')}
                        className={cn(
                          globalStyles.buttonIcon === 'none' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        No Icon
                      </Button>
                    </div>
                  </div>

                  {/* Button Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <Label className="flex items-center space-x-2 cursor-pointer" htmlFor="global-full-width">
                        <span>Button Full Width</span>
                      </Label>
                      <Switch
                        id="global-full-width"
                        checked={globalStyles.buttonFullWidth || false}
                        onCheckedChange={(checked) => handleFieldChange('buttonFullWidth', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <Label className="flex items-center space-x-2 cursor-pointer" htmlFor="global-rounded-corners">
                        <CornerDownRight className="w-4 h-4 mr-2" />
                        <span>Rounded Corners</span>
                      </Label>
                      <Switch
                        id="global-rounded-corners"
                        checked={globalStyles.roundedCorners || false}
                        onCheckedChange={(checked) => handleFieldChange('roundedCorners', checked)}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Progress Bar Section */}
            <AccordionItem value="progress" className="border rounded-md px-2 py-1 mb-3 bg-gray-50/50">
              <AccordionTrigger className="py-2 px-1 hover:no-underline">
                <div className="flex items-center">
                  <MoveHorizontal className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="font-medium">Progress Bar</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 px-1 pb-1">
                <div className="space-y-4">
                  {/* Progress Bar Display Toggle */}
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                    <Label className="flex items-center cursor-pointer" htmlFor="global-show-progress">
                      <span>Show Progress Bar</span>
                    </Label>
                    <Switch
                      id="global-show-progress"
                      checked={globalStyles.showProgressBar !== false}
                      onCheckedChange={(checked) => handleFieldChange('showProgressBar', checked)}
                    />
                  </div>

                  {globalStyles.showProgressBar !== false && (
                    <>
                      {/* Progress Bar Color */}
                      <div>
                        <Label className="text-sm text-muted-foreground mb-1 block">Progress Bar Color</Label>
                        <div className="grid grid-cols-8 gap-2 mt-1">
                          {presetButtonColors.map((color) => (
                            <div
                              key={color}
                              className={cn(
                                "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                                globalStyles.progressBarColor === color && "ring-2 ring-purple-500 ring-offset-2"
                              )}
                              style={{ backgroundColor: color }}
                              onClick={() => handleFieldChange('progressBarColor', color)}
                              title={color}
                            />
                          ))}
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                              !globalStyles.progressBarColor && "ring-2 ring-purple-500 ring-offset-2"
                            )}
                            onClick={() => handleFieldChange('progressBarColor', undefined)}
                          >
                            <X className="h-3 w-3" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Input
                            className="flex-1"
                            placeholder="#0070f3 or rgb(0,112,243)"
                            value={globalStyles.progressBarColor || ''}
                            onChange={(e) => handleFieldChange('progressBarColor', e.target.value)}
                          />
                          {globalStyles.progressBarColor && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => handleFieldChange('progressBarColor', undefined)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar Height */}
                      <div>
                        <Label className="text-sm text-muted-foreground mb-1 block">Progress Bar Height</Label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {(['thin', 'medium', 'thick'] as const).map((height) => (
                            <Button
                              key={height}
                              variant={globalStyles.progressBarHeight === height ? "default" : "outline"}
                              onClick={() => handleFieldChange('progressBarHeight', height)}
                              className={cn(
                                "capitalize",
                                globalStyles.progressBarHeight === height && "bg-purple-500 hover:bg-purple-600"
                              )}
                            >
                              {height}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="animation" className="space-y-4">
          <div>
            <Label className="mb-2 block">Animation Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['none', 'fade', 'slide-up', 'slide-left', 'zoom'] as const).map((animType) => (
                <Button
                  key={animType}
                  variant={globalStyles.animation === animType ? "default" : "outline"}
                  onClick={() => handleFieldChange('animation', animType)}
                  className={cn(
                    "capitalize",
                    globalStyles.animation === animType && "bg-purple-500 hover:bg-purple-600"
                  )}
                >
                  {animType.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
