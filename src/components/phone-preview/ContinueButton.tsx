
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slide } from "@/types/editor";

interface ContinueButtonProps {
  slide: Slide;
}

export function ContinueButton({ slide }: ContinueButtonProps) {
  return (
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
  );
}
