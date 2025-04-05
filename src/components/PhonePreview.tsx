
import { useState, useEffect } from "react";
import { Slide, GlobalStyles } from "@/types/editor";
import { cn } from "@/lib/utils";
import { getBackgroundStyle, getVerticalAlignment } from "./phone-preview/utils";
import { EmptyPreview } from "./phone-preview/EmptyPreview";
import { ProgressBar } from "./phone-preview/ProgressBar";
import { SlideContent } from "./phone-preview/SlideContent";
import { ContinueButton } from "./phone-preview/ContinueButton";
import { ReplayButton } from "./phone-preview/ReplayButton";
import { PreviewData } from "./phone-preview/PreviewData";
import { Code, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface PhonePreviewProps {
  slide: Slide | null;
  allSlides?: Slide[]; 
  globalStyles?: GlobalStyles;
}

export function PhonePreview({ slide, allSlides = [], globalStyles }: PhonePreviewProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideId, setSlideId] = useState<string | null>(slide?.id || null);
  const [previewDataOpen, setPreviewDataOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // If no slide is selected, show empty preview
  if (!slide) {
    return <EmptyPreview />;
  }

  // Merge global styles with slide-specific styles for background and progress bar
  const mergedSlide = globalStyles ? { ...globalStyles, ...slide } : slide;

  // Find the current slide index
  const currentIndex = allSlides.findIndex(s => s.id === slide.id);
  const progressPercentage = allSlides.length > 0 
    ? Math.round(((currentIndex + 1) / allSlides.length) * 100) 
    : 0;

  // Update current slide index when slide changes
  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentSlideIndex(currentIndex);
    }
  }, [currentIndex]);

  // Reset animation when slide changes
  useEffect(() => {
    if (slide.id !== slideId) {
      setSlideId(slide.id);
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [slide, slideId]);

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

  const navigateToPrevSlide = () => {
    const prevSlide = allSlides[currentIndex - 1];
    if (prevSlide) {
      setIsAnimating(false);
      // Update the slide ID - This will trigger the parent component to update the selected slide
      const event = new CustomEvent('slide-change', { 
        detail: { slideId: prevSlide.id } 
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[375px] h-[667px] border-8 border-gray-800 rounded-[40px] overflow-hidden relative flex flex-col">
        {/* Progress bar with padding for better visibility */}
        <ProgressBar 
          slide={{
            ...mergedSlide,
            progressBarHeight: 'thin',
            progressBarColor: '#4299e1', // Blue color as shown in second screenshot
          }} 
          progress={progressPercentage} 
        />
        
        {/* Back button navigation - only show if not on the first slide */}
        {currentIndex > 0 && (
          <div className="w-full bg-white px-4 py-3 border-b border-gray-100">
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 text-sm text-gray-500 p-0 h-auto"
              onClick={navigateToPrevSlide}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        )}
        
        <div 
          className="flex flex-1 flex-col px-6 relative overflow-auto"
          style={getBackgroundStyle(mergedSlide)}
        >
          {/* Content area with vertical and horizontal alignment */}
          <div className={cn(
            "flex flex-1 w-full justify-center", 
            getVerticalAlignment(mergedSlide.verticalAlignment)
          )}>
            <SlideContent slide={slide} isAnimating={isAnimating} globalStyles={globalStyles} />
          </div>
          
          {/* Button at the specified position */}
          <ContinueButton slide={mergedSlide} />
        </div>
      </div>
      
      {/* Controls below the phone frame */}
      <div className="mt-4 flex items-center gap-2">
        <ReplayButton onReplay={handleReplayAnimation} />
        <Button 
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setPreviewDataOpen(true)}
        >
          <Code className="h-4 w-4" />
          Preview Data
        </Button>
      </div>

      {/* Preview Data Dialog */}
      <PreviewData 
        open={previewDataOpen} 
        onOpenChange={setPreviewDataOpen} 
        slides={allSlides}
      />
    </div>
  );
}
