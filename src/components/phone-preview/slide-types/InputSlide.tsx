
import React from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";

interface InputSlideProps {
  slide: Slide;
}

export function InputSlide({ slide }: InputSlideProps) {
  return (
    <div className="mb-6 w-full">
      <input
        type={slide.inputType || 'text'}
        placeholder={slide.inputPlaceholder || "Enter your response"}
        className={cn(
          "w-full p-2 border", 
          slide.roundedCorners ? "rounded-lg" : ""
        )}
      />
    </div>
  );
}
