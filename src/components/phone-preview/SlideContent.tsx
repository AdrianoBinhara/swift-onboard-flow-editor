
import React from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { 
  getTitleFontSize, 
  getDescriptionFontSize, 
  getAnimationClass, 
  getHorizontalAlignment 
} from "./utils";
import { ImageSlide } from "./slide-types/ImageSlide";
import { VideoSlide } from "./slide-types/VideoSlide";
import { ChoiceSlide } from "./slide-types/ChoiceSlide";
import { InputSlide } from "./slide-types/InputSlide";
import { DateSlide } from "./slide-types/DateSlide";

interface SlideContentProps {
  slide: Slide;
  isAnimating: boolean;
}

export function SlideContent({ slide, isAnimating }: SlideContentProps) {
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

function SlideTypeContent({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case 'image':
      return <ImageSlide slide={slide} />;
    case 'video':
      return <VideoSlide slide={slide} />;
    case 'choice':
      return <ChoiceSlide slide={slide} />;
    case 'input':
      return <InputSlide slide={slide} />;
    case 'date':
      return <DateSlide slide={slide} />;
    default:
      return null;
  }
}
