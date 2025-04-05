
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
      default: return 'h-1'; // Set default to thin to match the image
    }
  };

  // Use the slide's progress percentage if provided, otherwise use passed progress
  const progressValue = slide.progressPercentage !== undefined 
    ? slide.progressPercentage 
    : progress;

  return (
    <div className="w-full">
      <Progress 
        value={progressValue} 
        className={getProgressBarHeight()}
        style={{ 
          backgroundColor: 'transparent', // Make background transparent
          '--progress-bar-color': slide.progressBarColor || '#ea384c', // Default to red color from image
          borderRadius: 0,
        } as React.CSSProperties}
      />
    </div>
  );
}
