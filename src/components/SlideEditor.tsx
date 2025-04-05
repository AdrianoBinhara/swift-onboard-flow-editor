
import { Slide } from "@/types/editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  AlignHorizontalSpaceAround, 
  AlignVerticalSpaceAround, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp,
  PaintBucket,
  Palette,
  Image as ImageIcon,
  Type,
  MoveHorizontal,
  CornerDownRight,
  X,
  CalendarIcon,
  CheckCircle2,
  CircleOff,
  Layers,
  Sliders,
  ChevronsUpDown
} from "lucide-react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "./ui/tabs";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface SlideEditorProps {
  slide: Slide | null;
  onSlideUpdate: (updatedSlide: Slide) => void;
}

export function SlideEditor({ slide, onSlideUpdate }: SlideEditorProps) {
  if (!slide) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select a slide to edit</p>
      </div>
    );
  }

  const handleFieldChange = (field: keyof Slide, value: any) => {
    onSlideUpdate({
      ...slide,
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
    onSlideUpdate({
      ...slide,
      backgroundGradient: undefined
    });
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-full">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mr-2">
          <span className="text-xs font-bold text-purple-700">
            {slide.type === 'text' ? 'T' : 
             slide.type === 'image' ? 'I' :
             slide.type === 'video' ? 'V' :
             slide.type === 'choice' ? 'C' :
             slide.type === 'input' ? 'F' :
             slide.type === 'date' ? 'D' : '?'}
          </span>
        </div>
        <h2 className="text-lg font-medium">
          {slide.type.charAt(0).toUpperCase() + slide.type.slice(1)} Slide
        </h2>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-3 mb-4 bg-purple-50">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={slide.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter slide title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={slide.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Add your content here"
              rows={4}
              className="resize-none"
            />
          </div>

          {slide.type === 'choice' && (
            <div>
              <Label className="mb-2 block">Options</Label>
              <div className="space-y-2">
                {(slide.options?.length ? slide.options : ['', '']).map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(slide.options || ['', ''])];
                        newOptions[index] = e.target.value;
                        handleFieldChange('options', newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={() => {
                        const newOptions = (slide.options || ['', '']).filter((_, i) => i !== index);
                        handleFieldChange('options', newOptions);
                      }}
                      disabled={(slide.options || ['', '']).length <= 1}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newOptions = [...(slide.options || ['', '']), ''];
                    handleFieldChange('options', newOptions);
                  }}
                  className="w-full"
                >
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {slide.type === 'input' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="inputPlaceholder">Placeholder Text</Label>
                <Input
                  id="inputPlaceholder"
                  value={slide.inputPlaceholder || ''}
                  onChange={(e) => handleFieldChange('inputPlaceholder', e.target.value)}
                  placeholder="Enter placeholder text"
                />
              </div>
              <div>
                <Label htmlFor="inputType">Input Type</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(['text', 'email', 'number'] as const).map((type) => (
                    <Button
                      key={type}
                      variant={slide.inputType === type ? 'default' : 'outline'}
                      onClick={() => handleFieldChange('inputType', type)}
                      className="capitalize"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slide.type === 'date' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="defaultDate" className="mb-2 block">Default Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="defaultDate"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !slide.defaultDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {slide.defaultDate ? (
                        format(new Date(slide.defaultDate), "PPP")
                      ) : (
                        <span>Pick a default date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={slide.defaultDate ? new Date(slide.defaultDate) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          handleFieldChange('defaultDate', date.toISOString());
                        } else {
                          handleFieldChange('defaultDate', undefined);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="datePlaceholder">Placeholder Text</Label>
                <Input
                  id="datePlaceholder"
                  value={slide.datePlaceholder || ''}
                  onChange={(e) => handleFieldChange('datePlaceholder', e.target.value)}
                  placeholder="Select a date..."
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dateRequired">Required</Label>
                <Switch
                  id="dateRequired"
                  checked={slide.dateRequired || false}
                  onCheckedChange={(checked) => handleFieldChange('dateRequired', checked)}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Date Constraints</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minDate" className="text-sm">Minimum Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="minDate"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !slide.minDate && "text-muted-foreground"
                          )}
                        >
                          {slide.minDate ? (
                            format(new Date(slide.minDate), "PPP")
                          ) : (
                            <span>No minimum</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-2 flex justify-between border-b">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleFieldChange('minDate', undefined)}
                          >
                            Clear
                          </Button>
                        </div>
                        <Calendar
                          mode="single"
                          selected={slide.minDate ? new Date(slide.minDate) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              handleFieldChange('minDate', date.toISOString());
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="maxDate" className="text-sm">Maximum Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="maxDate"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !slide.maxDate && "text-muted-foreground"
                          )}
                        >
                          {slide.maxDate ? (
                            format(new Date(slide.maxDate), "PPP")
                          ) : (
                            <span>No maximum</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-2 flex justify-between border-b">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleFieldChange('maxDate', undefined)}
                          >
                            Clear
                          </Button>
                        </div>
                        <Calendar
                          mode="single"
                          selected={slide.maxDate ? new Date(slide.maxDate) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              handleFieldChange('maxDate', date.toISOString());
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          )}

          {slide.type === 'image' && (
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={slide.imageUrl || ''}
                onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                placeholder="Enter image URL"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can also upload images via the Upload button
              </p>
            </div>
          )}

          {slide.type === 'video' && (
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={slide.videoUrl || ''}
                onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
                placeholder="Enter video URL"
              />
            </div>
          )}

          <div>
            <Label className="mb-2 block">Vertical Alignment</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={cn("alignment-button", slide.verticalAlignment === 'top' && "active")}
                onClick={() => handleFieldChange('verticalAlignment', 'top')}
              >
                <ArrowUp className="w-4 h-4 mr-1" /> Top
              </button>
              <button
                className={cn("alignment-button", slide.verticalAlignment === 'center' && "active")}
                onClick={() => handleFieldChange('verticalAlignment', 'center')}
              >
                <AlignVerticalSpaceAround className="w-4 h-4 mr-1" /> Center
              </button>
              <button
                className={cn("alignment-button", slide.verticalAlignment === 'bottom' && "active")}
                onClick={() => handleFieldChange('verticalAlignment', 'bottom')}
              >
                <ArrowDown className="w-4 h-4 mr-1" /> Bottom
              </button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Horizontal Alignment</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={cn("alignment-button", slide.horizontalAlignment === 'left' && "active")}
                onClick={() => handleFieldChange('horizontalAlignment', 'left')}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Left
              </button>
              <button
                className={cn("alignment-button", slide.horizontalAlignment === 'center' && "active")}
                onClick={() => handleFieldChange('horizontalAlignment', 'center')}
              >
                <AlignHorizontalSpaceAround className="w-4 h-4 mr-1" /> Center
              </button>
              <button
                className={cn("alignment-button", slide.horizontalAlignment === 'right' && "active")}
                onClick={() => handleFieldChange('horizontalAlignment', 'right')}
              >
                <ArrowRight className="w-4 h-4 mr-1" /> Right
              </button>
            </div>
          </div>
        </TabsContent>

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
                            slide.backgroundColor === color && "ring-2 ring-purple-500 ring-offset-2"
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
                        value={slide.backgroundColor || ''}
                        onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
                      />
                      {slide.backgroundColor && (
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
                      {slide.backgroundGradient && (
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
                            slide.backgroundGradient === gradient && "ring-2 ring-purple-500"
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
                        value={slide.backgroundImage || ''}
                        onChange={(e) => handleFieldChange('backgroundImage', e.target.value)}
                      />
                      {slide.backgroundImage && (
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
                          variant={slide.titleFontSize === size ? "default" : "outline"}
                          onClick={() => handleFieldChange('titleFontSize', size)}
                          className={cn(
                            "capitalize",
                            slide.titleFontSize === size && "bg-purple-500 hover:bg-purple-600"
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
                          variant={slide.descriptionFontSize === size ? "default" : "outline"}
                          onClick={() => handleFieldChange('descriptionFontSize', size)}
                          className={cn(
                            "capitalize",
                            slide.descriptionFontSize === size && "bg-purple-500 hover:bg-purple-600"
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
                            slide.titleColor === color && "ring-2 ring-purple-500 ring-offset-2"
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
                        value={slide.titleColor || ''}
                        onChange={(e) => handleFieldChange('titleColor', e.target.value)}
                      />
                      {slide.titleColor && (
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
                            slide.descriptionColor === color && "ring-2 ring-purple-500 ring-offset-2"
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
                        value={slide.descriptionColor || ''}
                        onChange={(e) => handleFieldChange('descriptionColor', e.target.value)}
                      />
                      {slide.descriptionColor && (
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
                            slide.buttonColor === color && "ring-2 ring-purple-500 ring-offset-2"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleFieldChange('buttonColor', color)}
                          title={color}
                        />
                      ))}
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                          !slide.buttonColor && "ring-2 ring-purple-500 ring-offset-2"
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
                        value={slide.buttonColor || ''}
                        onChange={(e) => handleFieldChange('buttonColor', e.target.value)}
                      />
                      {slide.buttonColor && (
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
                          slide.buttonTextColor === '#000000' && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', '#000000')}
                      >
                        Black
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 bg-black text-white font-medium",
                          slide.buttonTextColor === '#ffffff' && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', '#ffffff')}
                      >
                        White
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 bg-gray-200 text-gray-800 font-medium",
                          slide.buttonTextColor === '#333333' && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', '#333333')}
                      >
                        Gray
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center h-10 rounded cursor-pointer border border-gray-200 font-medium",
                          !slide.buttonTextColor && "ring-2 ring-purple-500"
                        )}
                        onClick={() => handleFieldChange('buttonTextColor', undefined)}
                      >
                        Default
                      </div>
                    </div>
                    <Input
                      className="mt-2"
                      placeholder="#ffffff or rgb(255,255,255)"
                      value={slide.buttonTextColor || ''}
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
                          variant={slide.buttonPosition === 'bottom' ? "default" : "outline"}
                          onClick={() => handleFieldChange('buttonPosition', 'bottom')}
                          className={cn(
                            slide.buttonPosition === 'bottom' && "bg-purple-500 hover:bg-purple-600"
                          )}
                        >
                          Bottom
                        </Button>
                        <Button
                          variant={slide.buttonPosition === 'below-content' ? "default" : "outline"}
                          onClick={() => handleFieldChange('buttonPosition', 'below-content')}
                          className={cn(
                            slide.buttonPosition === 'below-content' && "bg-purple-500 hover:bg-purple-600"
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
                            variant={slide.buttonSize === size ? "default" : "outline"}
                            onClick={() => handleFieldChange('buttonSize', size)}
                            className={cn(
                              "capitalize",
                              slide.buttonSize === size && "bg-purple-500 hover:bg-purple-600"
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
                        variant={slide.buttonIcon === 'arrow-right' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'arrow-right')}
                        className={cn(
                          "flex items-center justify-center gap-2",
                          slide.buttonIcon === 'arrow-right' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        <span>Arrow</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={slide.buttonIcon === 'chevron-right' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'chevron-right')}
                        className={cn(
                          "flex items-center justify-center gap-2",
                          slide.buttonIcon === 'chevron-right' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        <span>Chevron</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={slide.buttonIcon === 'chevron-down' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'chevron-down')}
                        className={cn(
                          "flex items-center justify-center gap-2",
                          slide.buttonIcon === 'chevron-down' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        <span>Down</span>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={slide.buttonIcon === 'none' ? "default" : "outline"}
                        onClick={() => handleFieldChange('buttonIcon', 'none')}
                        className={cn(
                          slide.buttonIcon === 'none' && "bg-purple-500 hover:bg-purple-600"
                        )}
                      >
                        No Icon
                      </Button>
                    </div>
                  </div>

                  {/* Button Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <Label className="flex items-center space-x-2 cursor-pointer" htmlFor="full-width">
                        <span>Button Full Width</span>
                      </Label>
                      <Switch
                        id="full-width"
                        checked={slide.buttonFullWidth || false}
                        onCheckedChange={(checked) => handleFieldChange('buttonFullWidth', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <Label className="flex items-center space-x-2 cursor-pointer" htmlFor="rounded-corners">
                        <CornerDownRight className="w-4 h-4 mr-2" />
                        <span>Rounded Corners</span>
                      </Label>
                      <Switch
                        id="rounded-corners"
                        checked={slide.roundedCorners || false}
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
                    <Label className="flex items-center cursor-pointer" htmlFor="show-progress">
                      <span>Show Progress Bar</span>
                    </Label>
                    <Switch
                      id="show-progress"
                      checked={slide.showProgressBar !== false}
                      onCheckedChange={(checked) => handleFieldChange('showProgressBar', checked)}
                    />
                  </div>

                  {slide.showProgressBar !== false && (
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
                                slide.progressBarColor === color && "ring-2 ring-purple-500 ring-offset-2"
                              )}
                              style={{ backgroundColor: color }}
                              onClick={() => handleFieldChange('progressBarColor', color)}
                              title={color}
                            />
                          ))}
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                              !slide.progressBarColor && "ring-2 ring-purple-500 ring-offset-2"
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
                            value={slide.progressBarColor || ''}
                            onChange={(e) => handleFieldChange('progressBarColor', e.target.value)}
                          />
                          {slide.progressBarColor && (
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
                              variant={slide.progressBarHeight === height ? "default" : "outline"}
                              onClick={() => handleFieldChange('progressBarHeight', height)}
                              className={cn(
                                "capitalize",
                                slide.progressBarHeight === height && "bg-purple-500 hover:bg-purple-600"
                              )}
                            >
                              {height}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Manual Progress Percentage */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-sm text-muted-foreground">Manual Progress Percentage</Label>
                          {slide.progressPercentage !== undefined && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleFieldChange('progressPercentage', undefined)} 
                              className="h-6 px-2 text-xs"
                            >
                              <CircleOff className="h-3 w-3 mr-1" />
                              <span>Auto</span>
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            className="flex-1"
                            type="number"
                            min={0}
                            max={100}
                            placeholder="Enter a value (0-100)"
                            value={slide.progressPercentage?.toString() || ''}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                handleFieldChange('progressPercentage', value);
                              }
                            }}
                          />
                          <Button 
                            variant="outline" 
                            className="whitespace-nowrap"
                            onClick={() => {
                              const value = slide.progressPercentage === undefined ? 50 : undefined;
                              handleFieldChange('progressPercentage', value);
                            }}
                          >
                            {slide.progressPercentage === undefined ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                <span>Manual</span>
                              </>
                            ) : (
                              <>
                                <CircleOff className="h-4 w-4 mr-1" />
                                <span>Auto</span>
                              </>
                            )}
                          </Button>
                        </div>
                        {slide.progressPercentage !== undefined && (
                          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${slide.progressPercentage}%` }}
                            ></div>
                          </div>
                        )}
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
                  variant={slide.animation === animType ? "default" : "outline"}
                  onClick={() => handleFieldChange('animation', animType)}
                  className={cn(
                    "capitalize",
                    slide.animation === animType && "bg-purple-500 hover:bg-purple-600"
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
