
import { Slide } from "@/types/editor";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PhonePreviewProps {
  slide: Slide | null;
}

export function PhonePreview({ slide }: PhonePreviewProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Reset animation state when slide changes
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timer);
  }, [slide?.id]);

  if (!slide) {
    return (
      <div className="phone-frame w-[320px] h-[650px] bg-white flex items-center justify-center rounded-3xl border-8 border-gray-200 shadow-lg overflow-hidden">
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

  const getAnimationClasses = () => {
    if (!animated) return "opacity-0";
    
    switch (slide.animation) {
      case "fade":
        return "animate-fade-in";
      case "slide-up":
        return "animate-slide-up";
      case "slide-left":
        return "animate-slide-from-right";
      case "zoom":
        return "animate-scale-in";
      default:
        return "opacity-100";
    }
  };

  const getTitleClasses = () => {
    let classes = "font-bold mb-4";
    
    // Font size
    if (slide.titleFontSize === "small") {
      classes += " text-xl";
    } else if (slide.titleFontSize === "large") {
      classes += " text-4xl";
    } else {
      classes += " text-3xl"; // medium (default)
    }
    
    // Text color
    if (slide.titleColor) {
      classes += ` text-[${slide.titleColor}]`;
    }
    
    return classes;
  };

  const getDescriptionClasses = () => {
    let classes = "";
    
    // Font size
    if (slide.descriptionFontSize === "small") {
      classes += " text-sm";
    } else if (slide.descriptionFontSize === "large") {
      classes += " text-lg";
    } else {
      classes += " text-base"; // medium (default)
    }
    
    // Text color
    if (slide.descriptionColor) {
      classes += ` text-[${slide.descriptionColor}]`;
    } else {
      classes += " text-muted-foreground";
    }
    
    return classes;
  };

  const getButtonClasses = () => {
    let classes = "w-full";
    
    if (slide.buttonColor) {
      classes += ` bg-[${slide.buttonColor}]`;
    }
    
    if (slide.buttonTextColor) {
      classes += ` text-[${slide.buttonTextColor}]`;
    }
    
    return classes;
  };

  const getContainerStyle = () => {
    const style: React.CSSProperties = {};
    
    if (slide.backgroundColor) {
      style.backgroundColor = slide.backgroundColor;
    }
    
    if (slide.backgroundImage) {
      style.backgroundImage = `url(${slide.backgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }
    
    if (slide.backgroundGradient) {
      style.backgroundImage = slide.backgroundGradient;
    }
    
    return style;
  };

  const renderSlideContent = () => {
    const animationClasses = getAnimationClasses();
    const contentClasses = cn(getContentAlignment(), animationClasses);
    
    switch (slide.type) {
      case "text":
        return (
          <div className={contentClasses}>
            <h1 className={getTitleClasses()}>{slide.title || "Add your title here"}</h1>
            <p className={getDescriptionClasses()}>
              {slide.description || "Add your content here"}
            </p>
          </div>
        );
      
      case "image":
        return (
          <div className={contentClasses}>
            <h1 className={getTitleClasses()}>{slide.title || "Add your title here"}</h1>
            {slide.imageUrl ? (
              <img 
                src={slide.imageUrl} 
                alt={slide.title || "Slide image"} 
                className={cn("max-w-full max-h-[300px] object-contain my-4", slide.roundedCorners && "rounded-lg")} 
              />
            ) : (
              <div className={cn("bg-muted w-full h-[200px] flex items-center justify-center my-4", slide.roundedCorners && "rounded-lg")}>
                <p className="text-muted-foreground">Image placeholder</p>
              </div>
            )}
            <p className={getDescriptionClasses()}>
              {slide.description || "Add your content here"}
            </p>
          </div>
        );
      
      case "video":
        return (
          <div className={contentClasses}>
            <h1 className={getTitleClasses()}>{slide.title || "Add your title here"}</h1>
            {slide.videoUrl ? (
              <div className="w-full my-4">
                <video 
                  src={slide.videoUrl} 
                  controls
                  className={cn("max-w-full max-h-[300px] object-contain", slide.roundedCorners && "rounded-lg")}
                />
              </div>
            ) : (
              <div className={cn("bg-muted w-full h-[200px] flex items-center justify-center my-4", slide.roundedCorners && "rounded-lg")}>
                <p className="text-muted-foreground">Video placeholder</p>
              </div>
            )}
            <p className={getDescriptionClasses()}>
              {slide.description || "Add your content here"}
            </p>
          </div>
        );
      
      case "choice":
        return (
          <div className={contentClasses}>
            <h1 className={getTitleClasses()}>{slide.title || "Add your title here"}</h1>
            <p className={cn(getDescriptionClasses(), "mb-8")}>
              {slide.description || "Add your content here"}
            </p>
            <div className="w-full space-y-3">
              {(slide.options?.length ? slide.options : ["Option 1", "Option 2"]).map((option, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-full p-3 border border-primary/30 hover:bg-primary/5 transition-colors",
                    slide.roundedCorners ? "rounded-lg" : "rounded",
                    slide.buttonColor && `bg-[${slide.buttonColor}]`,
                    slide.buttonTextColor && `text-[${slide.buttonTextColor}]`
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case "input":
        return (
          <div className={contentClasses}>
            <h1 className={getTitleClasses()}>{slide.title || "Add your title here"}</h1>
            <p className={cn(getDescriptionClasses(), "mb-6")}>
              {slide.description || "Add your content here"}
            </p>
            <div className="w-full">
              <input
                type={slide.inputType || "text"}
                placeholder={slide.inputPlaceholder || "Enter text..."}
                className={cn(
                  "w-full p-3 border focus:outline-none focus:ring-2 focus:ring-primary/30",
                  slide.roundedCorners ? "rounded-lg" : "rounded"
                )}
              />
            </div>
          </div>
        );
      
      case "date":
        return (
          <div className={contentClasses}>
            <h1 className={getTitleClasses()}>{slide.title || "Add your title here"}</h1>
            <p className={cn(getDescriptionClasses(), "mb-6")}>
              {slide.description || "Add your content here"}
            </p>
            <div className="w-full">
              <input
                type="date"
                className={cn(
                  "w-full p-3 border focus:outline-none focus:ring-2 focus:ring-primary/30",
                  slide.roundedCorners ? "rounded-lg" : "rounded"
                )}
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
    <div className="phone-frame w-[320px] h-[650px] bg-white flex flex-col rounded-3xl border-8 border-gray-200 shadow-lg overflow-hidden">
      {/* Status bar */}
      <div className="h-8 bg-gray-100 flex items-center px-4">
        <ChevronLeft className="h-4 w-4" />
        <div className="w-full bg-gray-300 h-1 mx-4 rounded-full overflow-hidden">
          <div className="bg-primary h-full" style={{ width: "60%" }}></div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-hidden" style={getContainerStyle()}>
        {renderSlideContent()}
      </div>
      
      {/* Bottom button */}
      <div className="p-4 pb-8">
        <Button className={getButtonClasses()}>Continue</Button>
      </div>
    </div>
  );
}
