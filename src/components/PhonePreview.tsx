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
import { SdkIntegration } from "./SdkIntegration";
import { Code } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhonePreviewProps {
  slide: Slide | null;
  allSlides?: Slide[]; 
  globalStyles?: GlobalStyles;
  flowName?: string;
  onOpenSdkIntegration?: () => void;
  hideControls?: boolean;
  fullScreen?: boolean;
}

export function PhonePreview({ 
  slide, 
  allSlides = [], 
  globalStyles, 
  flowName = "My App",
  onOpenSdkIntegration,
  hideControls = false,
  fullScreen = false
}: PhonePreviewProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideId, setSlideId] = useState<string | null>(slide?.id || null);
  const [previewDataOpen, setPreviewDataOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const appId = `${flowName.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 10)}`;

  if (!slide) {
    return <EmptyPreview />;
  }

  const mergedSlide = globalStyles ? { ...globalStyles, ...slide } : slide;

  const currentIndex = allSlides.findIndex(s => s.id === slide.id);
  const progressPercentage = allSlides.length > 0 
    ? Math.round(((currentIndex + 1) / allSlides.length) * 100) 
    : 0;
  
  const isLastSlide = currentIndex === allSlides.length - 1;

  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentSlideIndex(currentIndex);
    }
  }, [currentIndex]);

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
      const event = new CustomEvent('slide-change', { 
        detail: { slideId: prevSlide.id } 
      });
      window.dispatchEvent(event);
    }
  };

  const navigateToNextSlide = () => {
    if (isLastSlide) {
      if (fullScreen) {
        if (window.webkit?.messageHandlers?.flowKitHandler) {
          window.webkit.messageHandlers.flowKitHandler.postMessage({
            action: 'complete'
          });
        }
      } else {
        toast.success("Onboarding completed!");
      }
      return;
    }
    
    const nextSlide = allSlides[currentIndex + 1];
    if (nextSlide) {
      setIsAnimating(false);
      const event = new CustomEvent('slide-change', { 
        detail: { slideId: nextSlide.id } 
      });
      window.dispatchEvent(event);
    }
  };

  const phoneFrameClasses = cn(
    fullScreen ? "w-full h-full border-0 rounded-none" : "w-[375px] h-[667px] border-8 border-gray-800 rounded-[40px]",
    "overflow-hidden relative flex flex-col"
  );

  return (
    <div className={cn("flex flex-col items-center", fullScreen ? "w-full h-full" : "")}>
      <div className={phoneFrameClasses}>
        <ProgressBar 
          slide={{
            ...mergedSlide,
            progressBarHeight: 'thin',
            progressBarColor: mergedSlide.progressBarColor || '#4299e1',
          }} 
          progress={progressPercentage}
          currentSlide={currentIndex + 1}
          totalSlides={allSlides.length}
          showBackButton={currentIndex > 0}
          onBack={navigateToPrevSlide}
        />
        
        <div 
          className="flex flex-1 flex-col px-6 relative overflow-auto"
          style={getBackgroundStyle(mergedSlide)}
        >
          <div className={cn(
            "flex flex-1 w-full justify-center", 
            getVerticalAlignment(mergedSlide.verticalAlignment)
          )}>
            <SlideContent slide={slide} isAnimating={isAnimating} globalStyles={globalStyles} />
          </div>
          
          <ContinueButton 
            slide={mergedSlide} 
            onContinue={navigateToNextSlide}
            isLastSlide={isLastSlide}
          />
        </div>
      </div>
      
      {!hideControls && (
        <div className="mt-4 flex items-center gap-2">
          <ReplayButton 
            onReplay={handleReplayAnimation} 
            buttonColor={mergedSlide.buttonColor} 
            buttonTextColor={mergedSlide.buttonTextColor}
            roundedCorners={mergedSlide.roundedCorners !== false}
          />
          <Button 
            size="sm"
            variant="outline"
            className={cn(
              "flex items-center gap-2",
              mergedSlide.roundedCorners === false ? "rounded-none" : "rounded-md"
            )}
            onClick={() => setPreviewDataOpen(true)}
          >
            <Code className="h-4 w-4" />
            Preview Data
          </Button>
        </div>
      )}

      <PreviewData 
        open={previewDataOpen} 
        onOpenChange={setPreviewDataOpen} 
        slides={allSlides}
      />
    </div>
  );
}
