
import React from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";

interface VideoSlideProps {
  slide: Slide;
}

export function VideoSlide({ slide }: VideoSlideProps) {
  return (
    <div className={cn(
      "mb-6 w-full",
      slide.roundedCorners && "rounded-lg overflow-hidden"
    )}>
      {slide.videoUrl ? (
        <video 
          src={slide.videoUrl} 
          controls 
          className="max-w-full mx-auto"
        />
      ) : (
        <div className="w-full aspect-video bg-gray-100 flex flex-col items-center justify-center">
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 mt-2">No video selected</p>
        </div>
      )}
    </div>
  );
}
