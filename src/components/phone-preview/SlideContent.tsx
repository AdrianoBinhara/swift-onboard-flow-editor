
import React from "react";
import { Slide, GlobalStyles } from "@/types/editor";
import { ImageSlide } from "./slide-types/ImageSlide";
import { VideoSlide } from "./slide-types/VideoSlide";
import { ChoiceSlide } from "./slide-types/ChoiceSlide";
import { InputSlide } from "./slide-types/InputSlide";
import { DateSlide } from "./slide-types/DateSlide";
import { BaseSlideContent } from "./BaseSlideContent";

interface SlideContentProps {
  slide: Slide;
  isAnimating: boolean;
  globalStyles?: GlobalStyles;
}

export function SlideContent({ slide, isAnimating, globalStyles }: SlideContentProps) {
  // Merge global styles with slide-specific styles, with slide styles taking precedence
  const mergedSlide = globalStyles ? { ...globalStyles, ...slide } : slide;
  
  return <BaseSlideContent slide={mergedSlide} isAnimating={isAnimating} />;
}

// Export this function for use in BaseSlideContent
export function SlideTypeContent({ slide }: { slide: Slide }) {
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
