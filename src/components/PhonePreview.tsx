
import { useState } from "react";
import { Slide } from "@/types/editor";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface PhonePreviewProps {
  slide: Slide | null;
}

export function PhonePreview({ slide }: PhonePreviewProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  if (!slide) {
    return (
      <div className="w-[375px] h-[667px] border-8 border-gray-800 rounded-[40px] bg-gray-100 flex items-center justify-center">
        <p className="text-muted-foreground">Select a slide to preview</p>
      </div>
    );
  }

  const getTitleFontSize = () => {
    switch (slide.titleFontSize) {
      case 'small': return 'text-xl';
      case 'large': return 'text-4xl';
      default: return 'text-2xl';
    }
  };

  const getDescriptionFontSize = () => {
    switch (slide.descriptionFontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getAnimationClass = () => {
    if (isAnimating) {
      switch (slide.animation) {
        case 'fade': return 'animate-fade-in';
        case 'slide-up': return 'animate-slide-up';
        case 'slide-left': return 'animate-slide-from-right';
        case 'zoom': return 'animate-scale-in';
        default: return '';
      }
    }
    return '';
  };

  const getVerticalAlignment = () => {
    switch (slide.verticalAlignment) {
      case 'top': return 'items-start pt-20';
      case 'bottom': return 'items-end pb-20';
      default: return 'items-center';
    }
  };

  const getHorizontalAlignment = () => {
    switch (slide.horizontalAlignment) {
      case 'left': return 'justify-start text-left';
      case 'right': return 'justify-end text-right';
      default: return 'justify-center text-center';
    }
  };

  const getBackgroundStyle = () => {
    if (slide.backgroundGradient) {
      return { background: slide.backgroundGradient };
    }
    if (slide.backgroundImage) {
      return { 
        backgroundImage: `url(${slide.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    if (slide.backgroundColor) {
      return { backgroundColor: slide.backgroundColor };
    }
    return {};
  };

  const handleReplayAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  // Calculate progress percentage based on slide index
  const getProgressPercentage = () => {
    // This is a placeholder. In a real implementation, you'd get this from the context/props
    // For demo purposes, let's assume 60% progress
    return 60;
  };

  // Set a slight delay for animation
  setTimeout(() => {
    if (!isAnimating) setIsAnimating(true);
  }, 100);

  return (
    <div className="w-[375px] h-[667px] border-8 border-gray-800 rounded-[40px] overflow-hidden relative flex flex-col">
      {/* Progress bar at the top */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-4 z-10">
        <Progress value={getProgressPercentage()} className="h-1.5" />
      </div>
      
      <div 
        className="flex flex-1 flex-col px-6 relative"
        style={getBackgroundStyle()}
      >
        {/* Content area with vertical and horizontal alignment */}
        <div className={cn(
          "flex flex-1 w-full",
          getVerticalAlignment()
        )}>
          <div className={cn(
            "flex flex-col max-w-[280px]",
            getHorizontalAlignment(),
            getAnimationClass()
          )}>
            {slide.title && (
              <h2 
                className={cn(
                  "font-bold mb-4", 
                  getTitleFontSize()
                )}
                style={{ color: slide.titleColor }}
              >
                {slide.title}
              </h2>
            )}

            {slide.description && (
              <p 
                className={cn(
                  "mb-6",
                  getDescriptionFontSize()
                )}
                style={{ color: slide.descriptionColor }}
              >
                {slide.description}
              </p>
            )}

            {slide.type === 'image' && slide.imageUrl && (
              <img 
                src={slide.imageUrl} 
                alt={slide.title || "Slide image"}
                className={cn(
                  "max-w-full mb-6 mx-auto",
                  slide.roundedCorners && "rounded-lg"
                )}
              />
            )}

            {slide.type === 'video' && slide.videoUrl && (
              <div className={cn(
                "mb-6",
                slide.roundedCorners && "rounded-lg overflow-hidden"
              )}>
                <video 
                  src={slide.videoUrl} 
                  controls 
                  className="max-w-full"
                />
              </div>
            )}

            {slide.type === 'choice' && slide.options && (
              <div className="flex flex-col gap-2 mb-6">
                {slide.options.map((option, index) => (
                  <button
                    key={index}
                    className={cn(
                      "py-2 px-4 border w-full text-left",
                      slide.roundedCorners ? "rounded-lg" : "",
                      "transition-colors hover:bg-black/5"
                    )}
                    style={{ 
                      backgroundColor: slide.buttonColor || undefined,
                      color: slide.buttonTextColor || undefined,
                      borderColor: slide.buttonColor || 'hsl(var(--border))'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {slide.type === 'input' && (
              <div className="mb-6">
                <input
                  type={slide.inputType || 'text'}
                  placeholder={slide.inputPlaceholder || "Enter your response"}
                  className={cn(
                    "w-full p-2 border", 
                    slide.roundedCorners ? "rounded-lg" : ""
                  )}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Button always at the bottom */}
        <div className="flex justify-center pb-6 mt-auto">
          <Button 
            className={cn(
              slide.roundedCorners ? "rounded-lg" : "rounded-md"
            )}
            style={{ 
              backgroundColor: slide.buttonColor || undefined,
              color: slide.buttonTextColor || undefined
            }}
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          size="sm"
          variant="outline"
          onClick={handleReplayAnimation}
          className="text-xs"
        >
          Replay Animation
        </Button>
      </div>
    </div>
  );
}
