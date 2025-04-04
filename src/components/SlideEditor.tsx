
import { Slide } from "@/types/editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AlignHorizontalSpaceAround, AlignVerticalSpaceAround, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

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

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-full">
      <div className="flex items-center">
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

      <div className="space-y-4">
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
      </div>
    </div>
  );
}
