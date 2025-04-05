
import React from "react";
import { Progress } from "../ui/progress";
import { Slide } from "@/types/editor";

interface ProgressBarProps {
  slide: Slide;
  progress?: number;
  currentSlide?: number;
  totalSlides?: number;
}

export function ProgressBar({ 
  slide, 
  progress = 60,
  currentSlide,
  totalSlides
}: ProgressBarProps) {
  // If showProgressBar is explicitly set to false, don't render
  if (slide.showProgressBar === false) {
    return null;
  }

  const getProgressBarHeight = () => {
    switch (slide.progressBarHeight) {
      case 'thin': return 'h-1';
      case 'thick': return 'h-2';
      default: return 'h-1.5'; // medium is default
    }
  };

  // Use the slide's progress percentage if provided, otherwise use passed progress
  const progressValue = slide.progressPercentage !== undefined 
    ? slide.progressPercentage 
    : progress;

  return (
    <div className="px-0 w-full">
      <Progress 
        value={progressValue} 
        className={getProgressBarHeight()}
        style={{ 
          backgroundColor: slide.progressBarColor ? `${slide.progressBarColor}40` : undefined,
          '--progress-bar-color': slide.progressBarColor,
          borderRadius: 0
        } as React.CSSProperties}
      />
    </div>
  );
}
