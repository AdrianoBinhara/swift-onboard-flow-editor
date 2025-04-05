
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slide } from "@/types/editor";

interface ContinueButtonProps {
  slide: Slide;
}

export function ContinueButton({ slide }: ContinueButtonProps) {
  const getButtonIcon = () => {
    if (slide.buttonIcon === 'none') return null;
    
    switch (slide.buttonIcon) {
      case 'arrow-right': return <ArrowRight className="ml-2 h-4 w-4" />;
      case 'chevron-down': return <ChevronDown className="ml-2 h-4 w-4" />;
      default: return <ChevronRight className="ml-2 h-4 w-4" />;
    }
  };

  const getButtonSize = () => {
    switch (slide.buttonSize) {
      case 'small': return 'h-8 px-3 text-xs';
      case 'large': return 'h-12 px-6 text-base';
      default: return ''; // default size
    }
  };

  const getButtonContainerClass = () => {
    if (slide.buttonPosition === 'below-content') {
      return "flex justify-center mt-6";
    }
    return "flex justify-center pb-6 mt-auto"; // default to bottom
  };
  
  return (
    <div className={getButtonContainerClass()}>
      <Button 
        className={cn(
          slide.roundedCorners ? "rounded-lg" : "rounded-md",
          getButtonSize(),
          slide.buttonFullWidth && "w-full",
        )}
        style={{ 
          backgroundColor: slide.buttonColor || undefined,
          color: slide.buttonTextColor || undefined
        }}
      >
        Continue
        {getButtonIcon()}
      </Button>
    </div>
  );
}
