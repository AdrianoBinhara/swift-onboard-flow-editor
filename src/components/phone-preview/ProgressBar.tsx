
import React from "react";
import { Progress } from "../ui/progress";
import { Slide } from "@/types/editor";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface ProgressBarProps {
  slide: Slide;
  progress?: number;
  currentSlide?: number;
  totalSlides?: number;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ProgressBar({ 
  slide, 
  progress = 60,
  currentSlide,
  totalSlides,
  showBackButton = false,
  onBack
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
    <div className="w-full bg-white flex flex-col">
      {/* Top area for progress bar */}
      <div className="w-full pt-2 pb-1">
        <Progress 
          value={progressValue} 
          className={getProgressBarHeight()}
          style={{ 
            '--progress-bar-color': slide.progressBarColor || '#4299e1', // Default to blue color from screenshot
          } as React.CSSProperties}
        />
      </div>
      
      {/* Area for back button if needed */}
      {showBackButton && (
        <div className="px-4 py-2 border-b border-gray-100">
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-1 text-sm text-gray-500 p-0 h-auto"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
