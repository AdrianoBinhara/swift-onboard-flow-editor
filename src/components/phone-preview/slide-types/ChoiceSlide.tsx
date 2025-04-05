
import React, { useState } from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ChoiceSlideProps {
  slide: Slide;
}

export function ChoiceSlide({ slide }: ChoiceSlideProps) {
  // State for tracking the selected choice option
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  
  // Ensure we have default options if none are provided
  const displayOptions = slide.options && slide.options.length > 0 
    ? slide.options 
    : ["Option 1", "Option 2"];
    
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
          onClick={() => setSelectedChoice(option)}
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
