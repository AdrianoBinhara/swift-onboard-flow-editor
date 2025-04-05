import React, { useState } from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { 
  getTitleFontSize, 
  getDescriptionFontSize, 
  getAnimationClass, 
  getHorizontalAlignment 
} from "./utils";
import { ImageIcon, Calendar, Check } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface SlideContentProps {
  slide: Slide;
  isAnimating: boolean;
}

export function SlideContent({ slide, isAnimating }: SlideContentProps) {
  return (
    <div className={cn(
      "flex flex-col max-w-[280px] w-full mx-auto", 
      getHorizontalAlignment(slide.horizontalAlignment),
      getAnimationClass(isAnimating, slide.animation)
    )}>
      {/* Display title first */}
      {slide.title && (
        <h2 
          className={cn(
            "font-bold mb-4", 
            getTitleFontSize(slide.titleFontSize)
          )}
          style={{ color: slide.titleColor }}
        >
          {slide.title}
        </h2>
      )}

      {/* Display description next */}
      {slide.description && (
        <p 
          className={cn(
            "mb-6",
            getDescriptionFontSize(slide.descriptionFontSize)
          )}
          style={{ color: slide.descriptionColor }}
        >
          {slide.description}
        </p>
      )}
      
      {/* Render media content (image or video) or choice/input options after title and description */}
      <SlideTypeContent slide={slide} />
    </div>
  );
}

function SlideTypeContent({ slide }: { slide: Slide }) {
  // State for controlling the calendar open/close state
  const [calendarOpen, setCalendarOpen] = useState(false);
  // State to track the selected date locally
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    slide.defaultDate ? new Date(slide.defaultDate) : undefined
  );
  // State for tracking the selected choice option
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  switch (slide.type) {
    case 'image':
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
    
    case 'video':
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
    
    case 'choice':
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
    
    case 'input':
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
    
    case 'date':
      return (
        <div className="mb-6 w-full">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <div 
                className={cn(
                  "relative w-full flex items-center border p-2 cursor-pointer",
                  slide.roundedCorners ? "rounded-lg" : "",
                  "transition-colors hover:bg-black/5"
                )}
                onClick={() => setCalendarOpen(true)}
              >
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <span className={selectedDate ? "" : "text-muted-foreground"}>
                  {selectedDate 
                    ? format(selectedDate, 'PPP') 
                    : (slide.datePlaceholder || "Select a date...")}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    console.log("Selected date:", date);
                    setCalendarOpen(false);
                  }
                }}
                disabled={(date) => {
                  if (slide.minDate && new Date(slide.minDate) > date) {
                    return true;
                  }
                  if (slide.maxDate && new Date(slide.maxDate) < date) {
                    return true;
                  }
                  return false;
                }}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {slide.dateRequired && !selectedDate && 
            <p className="text-xs text-red-500 mt-1">This field is required</p>
          }
        </div>
      );
    
    default:
      return null;
  }
}
