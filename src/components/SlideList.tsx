
import { Plus } from "lucide-react";
import { SlideCard } from "./SlideCard";
import { Button } from "./ui/button";
import { Slide } from "@/types/editor";
import { useState } from "react";
import { SlideTypeSelector } from "./SlideTypeSelector";

interface SlideListProps {
  slides: Slide[];
  selectedSlideId: string | null;
  onSelectSlide: (slideId: string) => void;
  onAddSlide: (type: Slide["type"]) => void;
  onDeleteSlide: (slideId: string) => void;
}

export function SlideList({
  slides,
  selectedSlideId,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
}: SlideListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {slides.map((slide) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            isSelected={selectedSlideId === slide.id}
            onSelect={() => onSelectSlide(slide.id)}
            onDelete={() => onDeleteSlide(slide.id)}
          />
        ))}
        <div
          className="flex flex-col items-center justify-center h-32 w-32 border rounded-lg border-dashed cursor-pointer hover:border-primary transition-colors"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-6 w-6 mb-2 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Add Slide</span>
        </div>
      </div>

      <SlideTypeSelector
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSelectType={(type) => {
          onAddSlide(type);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
