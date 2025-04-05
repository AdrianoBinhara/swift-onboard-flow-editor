
import React from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { 
  getTitleFontSize, 
  getDescriptionFontSize, 
  getAnimationClass, 
  getHorizontalAlignment 
} from "./utils";

interface SlideContentProps {
  slide: Slide;
  isAnimating: boolean;
}

export function SlideContent({ slide, isAnimating }: SlideContentProps) {
  return (
    <div className={cn(
      "flex flex-col max-w-[280px] w-full mx-auto", // Added w-full and mx-auto to center content
      getHorizontalAlignment(slide.horizontalAlignment),
      getAnimationClass(isAnimating, slide.animation)
    )}>
      {slide.title && (
        <h2 
          className={cn(
            "font-bold mb-4", 
            getTitleFontSize(slide.titleFontSize)
          )}
          style={{ color: slide.titleColor }}
        >
          {slide.title}
        </h2>
      )}

      {slide.description && (
        <p 
          className={cn(
            "mb-6",
            getDescriptionFontSize(slide.descriptionFontSize)
          )}
          style={{ color: slide.descriptionColor }}
        >
          {slide.description}
        </p>
      )}

      <SlideTypeContent slide={slide} />
    </div>
  );
}

function SlideTypeContent({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case 'image':
      return slide.imageUrl ? (
        <img 
          src={slide.imageUrl} 
          alt={slide.title || "Slide image"}
          className={cn(
            "max-w-full mb-6 mx-auto",
            slide.roundedCorners && "rounded-lg"
          )}
        />
      ) : null;
    
    case 'video':
      return slide.videoUrl ? (
        <div className={cn(
          "mb-6",
          slide.roundedCorners && "rounded-lg overflow-hidden"
        )}>
          <video 
            src={slide.videoUrl} 
            controls 
            className="max-w-full"
          />
        </div>
      ) : null;
    
    case 'choice':
      return slide.options ? (
        <div className="flex flex-col gap-2 mb-6">
          {slide.options.map((option, index) => (
            <button
              key={index}
              className={cn(
                "py-2 px-4 border w-full text-left",
                slide.roundedCorners ? "rounded-lg" : "",
                "transition-colors hover:bg-black/5"
              )}
              style={{ 
                backgroundColor: slide.buttonColor || undefined,
                color: slide.buttonTextColor || undefined,
                borderColor: slide.buttonColor || 'hsl(var(--border))'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null;
    
    case 'input':
      return (
        <div className="mb-6">
          <input
            type={slide.inputType || 'text'}
            placeholder={slide.inputPlaceholder || "Enter your response"}
            className={cn(
              "w-full p-2 border", 
              slide.roundedCorners ? "rounded-lg" : ""
            )}
          />
        </div>
      );
    
    default:
      return null;
  }
}
