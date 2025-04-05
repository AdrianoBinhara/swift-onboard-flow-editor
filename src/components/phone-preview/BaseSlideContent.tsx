
import React from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { 
  getTitleFontSize, 
  getDescriptionFontSize, 
  getAnimationClass, 
  getHorizontalAlignment 
} from "./utils";
import { SlideTypeContent } from "./SlideContent";

interface BaseSlideContentProps {
  slide: Slide;
  isAnimating: boolean;
}

export function BaseSlideContent({ slide, isAnimating }: BaseSlideContentProps) {
  return (
    <div className={cn(
      "flex flex-col max-w-[280px] w-full mx-auto", 
      getHorizontalAlignment(slide.horizontalAlignment),
      getAnimationClass(isAnimating, slide.animation)
    )}>
      {/* Display title first */}
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

      {/* Display description next */}
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
      
      {/* Render the appropriate slide type component */}
      <SlideTypeContent slide={slide} />
    </div>
  );
}
