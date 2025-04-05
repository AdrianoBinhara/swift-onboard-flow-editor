
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
  CornerDownRight
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
              <Label className="text-sm text-muted-foreground">Background Gradients</Label>
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
              <Input
                className="mt-2"
                placeholder="https://example.com/image.jpg"
                value={slide.backgroundImage || ''}
                onChange={(e) => handleFieldChange('backgroundImage', e.target.value)}
              />
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
                defaultValue={slide.titleFontSize || 'medium'}
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
                defaultValue={slide.descriptionFontSize || 'medium'}
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
              </div>
              <Input
                className="mt-2"
                placeholder="#ffffff or rgb(255,255,255)"
                value={slide.buttonTextColor || ''}
                onChange={(e) => handleFieldChange('buttonTextColor', e.target.value)}
              />
            </div>
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
