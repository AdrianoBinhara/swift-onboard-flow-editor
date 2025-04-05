import React, { useState } from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ChoiceSlideProps {
  slide: Slide;
  onSelect?: (option: string) => void;
}

export function ChoiceSlide({ slide, onSelect }: ChoiceSlideProps) {
  // State for tracking the selected choice option
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  
  // Ensure we have default options if none are provided
  const displayOptions = slide.options && slide.options.length > 0 
    ? slide.options 
    : ["Option 1", "Option 2"];
    
  const handleChoiceSelect = (option: string) => {
    setSelectedChoice(option);
    
    // If onSelect prop is provided, call it
    if (onSelect) {
      onSelect(option);
    } else {
      // Otherwise dispatch the event directly
      const responseEvent = new CustomEvent('user-response', {
        detail: {
          slideId: slide.id,
          slideType: 'choice',
          question: slide.title || "Untitled Question",
          answer: option,
          sdkKey: `key_${slide.id.replace("slide-", "")}`
        }
      });
      
      window.dispatchEvent(responseEvent);
    }
  };
    
  return (
    <div className="flex flex-col gap-2 mb-6 w-full">
      {displayOptions.map((option, index) => (
        <button
          key={index}
          className={cn(
            "py-2 px-4 border w-full text-left relative",
            slide.roundedCorners ? "rounded-lg" : "",
            "transition-colors hover:bg-black/5",
            selectedChoice === option && "border-2 bg-black/5"
          )}
          style={{ 
            backgroundColor: slide.buttonColor || undefined,
            color: slide.buttonTextColor || undefined,
            borderColor: selectedChoice === option 
              ? (slide.buttonTextColor || 'black')
              : (slide.buttonColor || 'hsl(var(--border))')
          }}
          onClick={() => handleChoiceSelect(option)}
        >
          <div className="flex items-center justify-between">
            <span>{option}</span>
            {selectedChoice === option && (
              <Check className="h-4 w-4" />
            )}
          </div>
        </button>
      ))}
      
      {/* Display selected choice summary if available */}
      {selectedChoice && (
        <div className="mt-4 p-3 bg-muted rounded-md text-sm">
          <p className="font-medium">Selected: {selectedChoice}</p>
        </div>
      )}
    </div>
  );
}
