
import { Slide } from "@/types/editor";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PhonePreviewProps {
  slide: Slide | null;
}

export function PhonePreview({ slide }: PhonePreviewProps) {
  if (!slide) {
    return (
      <div className="phone-frame w-[320px] h-[650px] bg-white flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Select a slide to preview</p>
        </div>
      </div>
    );
  }

  const getContentAlignment = () => {
    let classes = "flex flex-col px-8 w-full h-full";
    
    // Vertical alignment
    if (slide.verticalAlignment === "top") {
      classes += " justify-start pt-20";
    } else if (slide.verticalAlignment === "center") {
      classes += " justify-center";
    } else if (slide.verticalAlignment === "bottom") {
      classes += " justify-end pb-20";
    }
    
    // Horizontal alignment (apply to child elements)
    if (slide.horizontalAlignment === "left") {
      classes += " items-start text-left";
    } else if (slide.horizontalAlignment === "center") {
      classes += " items-center text-center";
    } else if (slide.horizontalAlignment === "right") {
      classes += " items-end text-right";
    }
    
    return classes;
  };

  const renderSlideContent = () => {
    switch (slide.type) {
      case "text":
        return (
          <div className={getContentAlignment()}>
            <h1 className="text-3xl font-bold mb-4">{slide.title || "Add your title here"}</h1>
            <p className="text-muted-foreground">
              {slide.description || "Add your content here"}
            </p>
          </div>
        );
      
      case "image":
        return (
          <div className={getContentAlignment()}>
            <h1 className="text-3xl font-bold mb-4">{slide.title || "Add your title here"}</h1>
            {slide.imageUrl ? (
              <img 
                src={slide.imageUrl} 
                alt={slide.title || "Slide image"} 
                className="rounded-lg max-w-full max-h-[300px] object-contain my-4" 
              />
            ) : (
              <div className="bg-muted rounded-lg w-full h-[200px] flex items-center justify-center my-4">
                <p className="text-muted-foreground">Image placeholder</p>
              </div>
            )}
            <p className="text-muted-foreground">
              {slide.description || "Add your content here"}
            </p>
          </div>
        );
      
      case "video":
        return (
          <div className={getContentAlignment()}>
            <h1 className="text-3xl font-bold mb-4">{slide.title || "Add your title here"}</h1>
            {slide.videoUrl ? (
              <div className="w-full my-4">
                <video 
                  src={slide.videoUrl} 
                  controls
                  className="rounded-lg max-w-full max-h-[300px] object-contain"
                />
              </div>
            ) : (
              <div className="bg-muted rounded-lg w-full h-[200px] flex items-center justify-center my-4">
                <p className="text-muted-foreground">Video placeholder</p>
              </div>
            )}
            <p className="text-muted-foreground">
              {slide.description || "Add your content here"}
            </p>
          </div>
        );
      
      case "choice":
        return (
          <div className={getContentAlignment()}>
            <h1 className="text-3xl font-bold mb-4">{slide.title || "Add your title here"}</h1>
            <p className="text-muted-foreground mb-8">
              {slide.description || "Add your content here"}
            </p>
            <div className="w-full space-y-3">
              {(slide.options?.length ? slide.options : ["Option 1", "Option 2"]).map((option, idx) => (
                <button
                  key={idx}
                  className="w-full p-3 rounded-lg border border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case "input":
        return (
          <div className={getContentAlignment()}>
            <h1 className="text-3xl font-bold mb-4">{slide.title || "Add your title here"}</h1>
            <p className="text-muted-foreground mb-6">
              {slide.description || "Add your content here"}
            </p>
            <div className="w-full">
              <input
                type={slide.inputType || "text"}
                placeholder={slide.inputPlaceholder || "Enter text..."}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        );
      
      case "date":
        return (
          <div className={getContentAlignment()}>
            <h1 className="text-3xl font-bold mb-4">{slide.title || "Add your title here"}</h1>
            <p className="text-muted-foreground mb-6">
              {slide.description || "Add your content here"}
            </p>
            <div className="w-full">
              <input
                type="date"
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Unknown slide type</p>
          </div>
        );
    }
  };

  return (
    <div className="phone-frame w-[320px] h-[650px] bg-white flex flex-col">
      {/* Status bar */}
      <div className="h-8 bg-gray-100 flex items-center px-4">
        <ChevronLeft className="h-4 w-4" />
        <div className="w-full bg-gray-300 h-1 mx-4 rounded-full overflow-hidden">
          <div className="bg-primary h-full" style={{ width: "60%" }}></div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {renderSlideContent()}
      </div>
      
      {/* Bottom button */}
      <div className="p-4 pb-8">
        <Button className="w-full">Complete</Button>
      </div>
    </div>
  );
}
