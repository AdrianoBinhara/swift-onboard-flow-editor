
import React from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ImageSlideProps {
  slide: Slide;
}

export function ImageSlide({ slide }: ImageSlideProps) {
  return (
    <div className="mb-6 w-full flex justify-center">
      {slide.imageUrl ? (
        <img 
          src={slide.imageUrl} 
          alt={slide.title || "Slide image"}
          className={cn(
            "max-w-full mx-auto object-contain",
            slide.roundedCorners && "rounded-lg"
          )}
        />
      ) : (
        <div className={cn(
          "w-full aspect-video bg-gray-100 flex flex-col items-center justify-center",
          slide.roundedCorners && "rounded-lg"
        )}>
          <ImageIcon className="h-12 w-12 text-gray-400" />
          <p className="text-gray-500 mt-2">No image selected</p>
        </div>
      )}
    </div>
  );
}
