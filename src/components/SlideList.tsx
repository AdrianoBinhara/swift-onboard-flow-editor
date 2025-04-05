
import { Plus } from "lucide-react";
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
  PaginationNext,
  PaginationPrevious,
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
        {/* Only show add button if there's space on the current page */}
        {currentSlides.length < slidesPerPage && (
          <div
            className="flex flex-col items-center justify-center h-32 w-32 border rounded-lg border-dashed cursor-pointer hover:border-primary transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-6 w-6 mb-2 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Add Slide</span>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination className="mb-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {/* Page indicators */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Always show a way to add slides, even if the current page is full */}
      {currentSlides.length >= slidesPerPage && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="mb-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Slide
        </Button>
      )}

      <SlideTypeSelector
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSelectType={(type) => {
          onAddSlide(type);
          setIsDialogOpen(false);
          // If adding a new slide would create a new page, navigate to it
          if (slides.length % slidesPerPage === 0) {
            setCurrentPage(totalPages + 1);
          }
        }}
      />
    </div>
  );
}
