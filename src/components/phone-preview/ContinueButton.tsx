
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slide } from "@/types/editor";

interface ContinueButtonProps {
  slide: Slide;
}

export function ContinueButton({ slide }: ContinueButtonProps) {
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
          "rounded-md",
          getButtonSize(),
          slide.buttonFullWidth && "w-full",
          "bg-blue-500 hover:bg-blue-600" // Blue color to match the screenshot
        )}
        style={{ 
          backgroundColor: slide.buttonColor || "#4299e1", // Blue color from the screenshot
          color: slide.buttonTextColor || "#ffffff"
        }}
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
