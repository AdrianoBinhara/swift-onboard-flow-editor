
import React, { useState } from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";

interface InputSlideProps {
  slide: Slide;
}

export function InputSlide({ slide }: InputSlideProps) {
  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Dispatch custom event with the input data
    const responseEvent = new CustomEvent('user-response', {
      detail: {
        slideId: slide.id,
        slideType: 'input',
        question: slide.title || "Untitled Question",
        answer: newValue,
        sdkKey: `key_${slide.id.replace("slide-", "")}`
      }
    });
    
    window.dispatchEvent(responseEvent);
  };

  return (
    <div className="mb-6 w-full">
      <input
        type={slide.inputType || 'text'}
        placeholder={slide.inputPlaceholder || "Enter your response"}
        value={value}
        onChange={handleInputChange}
        className={cn(
          "w-full p-2 border", 
          slide.roundedCorners ? "rounded-lg" : ""
        )}
      />
    </div>
  );
}
