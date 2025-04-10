import React, { useState } from "react";
import { Slide } from "@/types/editor";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DateSlideProps {
  slide: Slide;
  onSelect?: (date: string) => void;
}

export function DateSlide({ slide, onSelect }: DateSlideProps) {
  // State for controlling the calendar open/close state
  const [calendarOpen, setCalendarOpen] = useState(false);
  // State to track the selected date locally
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    slide.defaultDate ? new Date(slide.defaultDate) : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // If onSelect prop is provided, call it
      if (onSelect) {
        onSelect(formattedDate);
      } else {
        // Otherwise dispatch the event directly
        const responseEvent = new CustomEvent('user-response', {
          detail: {
            slideId: slide.id,
            slideType: 'date',
            question: slide.title || "Untitled Question",
            answer: formattedDate,
            sdkKey: `nextWorkout${slide.id.replace("slide-", "")}`
          }
        });
        
        window.dispatchEvent(responseEvent);
      }
      
      setCalendarOpen(false);
    }
  };

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
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className={selectedDate ? "" : "text-muted-foreground"}>
              {selectedDate 
                ? format(selectedDate, 'PPP') 
                : (slide.datePlaceholder || "Select a date...")}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
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
}
