
import { Plus, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { SlideCard } from "./SlideCard";
import { Button } from "./ui/button";
import { Slide } from "@/types/editor";
import { useState } from "react";
import { SlideTypeSelector } from "./SlideTypeSelector";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

interface SlideListProps {
  slides: Slide[];
  selectedSlideId: string | null;
  onSelectSlide: (slideId: string) => void;
  onAddSlide: (type: Slide["type"]) => void;
  onDeleteSlide: (slideId: string) => void;
}

export function SlideList({
  slides,
  selectedSlideId,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
}: SlideListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of slides to show per page
  const slidesPerPage = 4;
  
  // Calculate total pages
  const totalPages = Math.ceil(slides.length / slidesPerPage);
  
  // Get current slides
  const indexOfLastSlide = currentPage * slidesPerPage;
  const indexOfFirstSlide = indexOfLastSlide - slidesPerPage;
  const currentSlides = slides.slice(indexOfFirstSlide, indexOfLastSlide);

  // Function to handle page navigation
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {currentSlides.map((slide) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            isSelected={selectedSlideId === slide.id}
            onSelect={() => onSelectSlide(slide.id)}
            onDelete={() => onDeleteSlide(slide.id)}
          />
        ))}
        {/* Enhanced Add Slide button when there's space */}
        {currentSlides.length < slidesPerPage && (
          <div
            className="flex flex-col items-center justify-center h-32 w-32 border-2 rounded-lg border-dashed border-primary/40 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 animate-pulse"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="bg-primary/10 p-2 rounded-full mb-2">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs font-medium text-primary">Add Slide</span>
          </div>
        )}
      </div>

      {/* Improved pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          
          <div className="flex items-center text-sm font-medium">
            <span className="text-primary">{currentPage}</span>
            <span className="mx-1.5 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalPages}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      )}

      {/* Enhanced Add Slide button when the current page is full */}
      {currentSlides.length >= slidesPerPage && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="mb-4 border-primary/70 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary group transition-all"
        >
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Add New Slide
          <ArrowDown className="ml-2 h-3 w-3 opacity-70 group-hover:animate-bounce" />
        </Button>
      )}

      <SlideTypeSelector
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSelectType={(type) => {
          onAddSlide(type);
          setIsDialogOpen(false);
          // If adding a new slide would create a new page and we're on the last page, navigate to it
          if ((slides.length % slidesPerPage === 0) && (currentPage === totalPages)) {
            setCurrentPage(totalPages + 1);
          }
        }}
      />
    </div>
  );
}
