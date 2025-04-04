
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { Slide } from "../types/editor";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SlideCardProps {
  slide: Slide;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function SlideCard({ slide, isSelected, onSelect, onDelete }: SlideCardProps) {
  const getSlideIcon = () => {
    switch (slide.type) {
      case 'text':
        return <div className="text-lg font-bold text-primary">T</div>;
      case 'image':
        return <div className="text-lg font-bold text-green-500">I</div>;
      case 'video':
        return <div className="text-lg font-bold text-red-500">V</div>;
      case 'choice':
        return <div className="text-lg font-bold text-blue-500">C</div>;
      case 'input':
        return <div className="text-lg font-bold text-amber-500">F</div>;
      case 'date':
        return <div className="text-lg font-bold text-purple-500">D</div>;
      default:
        return <div className="text-lg font-bold">?</div>;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center h-32 w-32 border rounded-lg transition-all cursor-pointer hover:border-primary",
        isSelected && "border-primary bg-accent/50"
      )}
      onClick={onSelect}
    >
      <div className="absolute top-1 left-1">
        <DragHandleDots2Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-12 h-12 bg-accent/70 rounded-md flex items-center justify-center mb-2">
        {getSlideIcon()}
      </div>
      <div className="text-xs truncate max-w-[80%] text-center">
        {slide.title || `${slide.type.charAt(0).toUpperCase() + slide.type.slice(1)} Slide`}
      </div>
    </div>
  );
}
