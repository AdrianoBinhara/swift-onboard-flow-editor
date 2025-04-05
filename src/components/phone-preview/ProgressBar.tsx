
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
    <div className="absolute top-0 left-0 right-0 px-4 pt-4 z-10">
      {/* Show slide counter text if we have currentSlide and totalSlides */}
      {currentSlide && totalSlides && (
        <div className="flex justify-end mb-1 text-xs font-medium text-gray-600">
          {currentSlide} / {totalSlides}
        </div>
      )}
      <Progress 
        value={progressValue} 
        className={getProgressBarHeight()}
        style={{ 
          backgroundColor: slide.progressBarColor ? `${slide.progressBarColor}40` : undefined,
          '--progress-bar-color': slide.progressBarColor 
        } as React.CSSProperties}
      />
    </div>
  );
}
