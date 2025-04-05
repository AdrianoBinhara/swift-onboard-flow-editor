
import { useState, useEffect } from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { getBackgroundStyle, getVerticalAlignment } from "./phone-preview/utils";
import { EmptyPreview } from "./phone-preview/EmptyPreview";
import { ProgressBar } from "./phone-preview/ProgressBar";
import { SlideContent } from "./phone-preview/SlideContent";
import { ContinueButton } from "./phone-preview/ContinueButton";
import { ReplayButton } from "./phone-preview/ReplayButton";

interface PhonePreviewProps {
  slide: Slide | null;
}

export function PhonePreview({ slide }: PhonePreviewProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // If no slide is selected, show empty preview
  if (!slide) {
    return <EmptyPreview />;
  }

  const handleReplayAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  // Set a slight delay for animation
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, slide]);

  return (
    <div className="w-[375px] h-[667px] border-8 border-gray-800 rounded-[40px] overflow-hidden relative flex flex-col">
      {/* Progress bar at the top */}
      <ProgressBar slide={slide} />
      
      <div 
        className="flex flex-1 flex-col px-6 relative"
        style={getBackgroundStyle(slide)}
      >
        {/* Content area with vertical and horizontal alignment */}
        <div className={cn(
          "flex flex-1 w-full",
          getVerticalAlignment(slide.verticalAlignment)
        )}>
          <SlideContent slide={slide} isAnimating={isAnimating} />
        </div>
        
        {/* Button at the specified position */}
        <ContinueButton slide={slide} />
      </div>

      <ReplayButton onReplay={handleReplayAnimation} />
    </div>
  );
}
