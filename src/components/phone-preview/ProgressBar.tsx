
import React from "react";
import { Progress } from "../ui/progress";
import { Slide } from "@/types/editor";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { getBackgroundStyle } from "./utils";
import { cn } from "@/lib/utils";

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
      case 'medium': return 'h-1.5';
      case 'thick': return 'h-2';
      default: return 'h-1'; // Default to thin
    }
  };

  // Use the slide's progress percentage if provided, otherwise use passed progress
  const progressValue = slide.progressPercentage !== undefined 
    ? slide.progressPercentage 
    : progress;

  // Format text for current and total slides
  const slideCountText = currentSlide && totalSlides 
    ? `${currentSlide} of ${totalSlides}` 
    : '';

  // Get background style from the slide
  const backgroundStyle = getBackgroundStyle(slide);

  // Determine if rounded corners should be used
  const useRoundedCorners = slide.roundedCorners !== false;

  return (
    <div 
      className="w-full pt-4 transition-all duration-300" 
      style={backgroundStyle}
    >
      <div className="flex flex-col px-4 pb-2">
        <div className="flex items-center mb-1">
          {/* Back button displayed at the left side */}
          <div className="w-16">
            {showBackButton && (
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "flex items-center gap-1 text-sm text-gray-500 p-0 h-auto hover:text-gray-700 transition-colors",
                  useRoundedCorners ? "rounded-md" : "rounded-none"
                )}
                onClick={onBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          
          {/* Slide count displayed on the right */}
          {slideCountText && (
            <div className="text-xs text-gray-500 ml-auto">
              {slideCountText}
            </div>
          )}
        </div>
        
        {/* Progress bar filling the entire width */}
        <Progress 
          value={progressValue} 
          className={cn(
            getProgressBarHeight(),
            useRoundedCorners ? "rounded-full" : "rounded-none",
            "overflow-hidden backdrop-blur-sm"
          )}
          style={{ 
            '--progress-bar-color': slide.progressBarColor || '#4299e1',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
