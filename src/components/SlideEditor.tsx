
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
  CalendarIcon
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
        <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center mr-2">
          <span className="text-xs font-bold">
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
        <TabsList className="grid grid-cols-3 mb-4">
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
          <div>
            <Label className="mb-2 block flex items-center">
              <PaintBucket className="w-4 h-4 mr-2" /> Background
            </Label>
            
            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Background Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {presetBackgroundColors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                      slide.backgroundColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFieldChange('backgroundColor', color)}
                  />
                ))}
              </div>
              <Input
                className="mt-2"
                placeholder="#ffffff or rgb(255,255,255)"
                value={slide.backgroundColor || ''}
                onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm text-muted-foreground">Background Gradients</Label>
                {slide.backgroundGradient && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearGradient} 
                    className="h-6 px-2 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" /> Clear gradient
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {presetGradients.map((gradient) => (
                  <div
                    key={gradient}
                    className={cn(
                      "h-10 rounded cursor-pointer border border-gray-200",
                      slide.backgroundGradient === gradient && "ring-2 ring-primary"
                    )}
                    style={{ background: gradient }}
                    onClick={() => handleFieldChange('backgroundGradient', gradient)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Background Image URL</Label>
              <div className="relative">
                <Input
                  className="mt-2 pr-8"
                  placeholder="https://example.com/image.jpg"
                  value={slide.backgroundImage || ''}
                  onChange={(e) => handleFieldChange('backgroundImage', e.target.value)}
                />
                {slide.backgroundImage && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-3 h-6 w-6 p-0" 
                    onClick={() => handleFieldChange('backgroundImage', '')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-2 block flex items-center">
              <Type className="w-4 h-4 mr-2" /> Text Styling
            </Label>
            
            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Title Font Size</Label>
              <RadioGroup 
                className="grid grid-cols-3 gap-2 mt-2" 
                value={slide.titleFontSize || 'medium'}
                onValueChange={(value) => handleFieldChange('titleFontSize', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="title-small" />
                  <Label htmlFor="title-small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="title-medium" />
                  <Label htmlFor="title-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="title-large" />
                  <Label htmlFor="title-large">Large</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Description Font Size</Label>
              <RadioGroup 
                className="grid grid-cols-3 gap-2 mt-2" 
                value={slide.descriptionFontSize || 'medium'}
                onValueChange={(value) => handleFieldChange('descriptionFontSize', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="desc-small" />
                  <Label htmlFor="desc-small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="desc-medium" />
                  <Label htmlFor="desc-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="desc-large" />
                  <Label htmlFor="desc-large">Large</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Title Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {presetTextColors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                      slide.titleColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFieldChange('titleColor', color)}
                  />
                ))}
              </div>
              <Input
                className="mt-2"
                placeholder="#000000 or rgb(0,0,0)"
                value={slide.titleColor || ''}
                onChange={(e) => handleFieldChange('titleColor', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Description Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {presetTextColors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                      slide.descriptionColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFieldChange('descriptionColor', color)}
                  />
                ))}
              </div>
              <Input
                className="mt-2"
                placeholder="#000000 or rgb(0,0,0)"
                value={slide.descriptionColor || ''}
                onChange={(e) => handleFieldChange('descriptionColor', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-2 block flex items-center">
              <Palette className="w-4 h-4 mr-2" /> Button Styling
            </Label>
            
            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Button Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {presetButtonColors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                      slide.buttonColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFieldChange('buttonColor', color)}
                  />
                ))}
                <div
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                    !slide.buttonColor && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => handleFieldChange('buttonColor', undefined)}
                >
                  <X className="h-3 w-3" />
                </div>
              </div>
              <Input
                className="mt-2"
                placeholder="#0070f3 or rgb(0,112,243)"
                value={slide.buttonColor || ''}
                onChange={(e) => handleFieldChange('buttonColor', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Button Text Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border border-gray-200 bg-white",
                    slide.buttonTextColor === '#ffffff' && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => handleFieldChange('buttonTextColor', '#ffffff')}
                />
                <div
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border border-gray-200 bg-black",
                    slide.buttonTextColor === '#000000' && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => handleFieldChange('buttonTextColor', '#000000')}
                />
                <div
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                    !slide.buttonTextColor && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => handleFieldChange('buttonTextColor', undefined)}
                >
                  <X className="h-3 w-3" />
                </div>
              </div>
              <Input
                className="mt-2"
                placeholder="#ffffff or rgb(255,255,255)"
                value={slide.buttonTextColor || ''}
                onChange={(e) => handleFieldChange('buttonTextColor', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Button Position</Label>
              <RadioGroup 
                className="grid grid-cols-2 gap-2 mt-2" 
                value={slide.buttonPosition || 'bottom'}
                onValueChange={(value) => handleFieldChange('buttonPosition', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bottom" id="button-bottom" />
                  <Label htmlFor="button-bottom">Bottom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="below-content" id="button-below" />
                  <Label htmlFor="button-below">Below Content</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Button Icon</Label>
              <RadioGroup 
                className="grid grid-cols-4 gap-2 mt-2" 
                value={slide.buttonIcon || 'chevron-right'}
                onValueChange={(value) => handleFieldChange('buttonIcon', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="arrow-right" id="icon-arrow" />
                  <Label htmlFor="icon-arrow">Arrow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chevron-right" id="icon-chevron" />
                  <Label htmlFor="icon-chevron">Chevron</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chevron-down" id="icon-down" />
                  <Label htmlFor="icon-down">Down</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="icon-none" />
                  <Label htmlFor="icon-none">None</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Button Size</Label>
              <RadioGroup 
                className="grid grid-cols-3 gap-2 mt-2" 
                value={slide.buttonSize || 'medium'}
                onValueChange={(value) => handleFieldChange('buttonSize', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="button-small" />
                  <Label htmlFor="button-small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="button-medium" />
                  <Label htmlFor="button-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="button-large" />
                  <Label htmlFor="button-large">Large</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Label className="flex items-center space-x-2" htmlFor="full-width">
                <span>Button Full Width</span>
              </Label>
              <Switch
                id="full-width"
                checked={slide.buttonFullWidth || false}
                onCheckedChange={(checked) => handleFieldChange('buttonFullWidth', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center space-x-2" htmlFor="rounded-corners">
                <CornerDownRight className="w-4 h-4" />
                <span>Rounded Corners</span>
              </Label>
              <Switch
                id="rounded-corners"
                checked={slide.roundedCorners || false}
                onCheckedChange={(checked) => handleFieldChange('roundedCorners', checked)}
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-2 block flex items-center">
              <MoveHorizontal className="w-4 h-4 mr-2" /> Progress Bar
            </Label>
            
            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Progress Bar Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {presetButtonColors.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer border border-gray-200",
                      slide.progressBarColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFieldChange('progressBarColor', color)}
                  />
                ))}
                <div
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center",
                    !slide.progressBarColor && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => handleFieldChange('progressBarColor', undefined)}
                >
                  <X className="h-3 w-3" />
                </div>
              </div>
              <Input
                className="mt-2"
                placeholder="#0070f3 or rgb(0,112,243)"
                value={slide.progressBarColor || ''}
                onChange={(e) => handleFieldChange('progressBarColor', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Progress Bar Height</Label>
              <RadioGroup 
                className="grid grid-cols-3 gap-2 mt-2" 
                value={slide.progressBarHeight || 'medium'}
                onValueChange={(value) => handleFieldChange('progressBarHeight', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thin" id="progress-thin" />
                  <Label htmlFor="progress-thin">Thin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="progress-medium" />
                  <Label htmlFor="progress-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thick" id="progress-thick" />
                  <Label htmlFor="progress-thick">Thick</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label className="text-sm text-muted-foreground">Progress Percentage</Label>
              <Input
                className="mt-2"
                type="number"
                min={0}
                max={100}
                placeholder="60"
                value={slide.progressPercentage?.toString() || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    handleFieldChange('progressPercentage', value);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <Label className="flex items-center space-x-2" htmlFor="show-progress">
                <span>Show Progress Bar</span>
              </Label>
              <Switch
                id="show-progress"
                checked={slide.showProgressBar !== false}
                onCheckedChange={(checked) => handleFieldChange('showProgressBar', checked)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="animation" className="space-y-4">
          <div>
            <Label className="mb-2 block">Animation Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['none', 'fade', 'slide-up', 'slide-left', 'zoom'] as const).map((animType) => (
                <Button
                  key={animType}
                  variant={slide.animation === animType ? 'default' : 'outline'}
                  onClick={() => handleFieldChange('animation', animType)}
                  className="capitalize"
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
