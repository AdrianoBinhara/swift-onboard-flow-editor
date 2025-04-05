
import { Slide } from "@/types/editor";

export const getTitleFontSize = (titleFontSize?: string) => {
  switch (titleFontSize) {
    case 'small': return 'text-xl';
    case 'large': return 'text-4xl';
    default: return 'text-2xl';
  }
};

export const getDescriptionFontSize = (descriptionFontSize?: string) => {
  switch (descriptionFontSize) {
    case 'small': return 'text-sm';
    case 'large': return 'text-xl';
    default: return 'text-base';
  }
};

export const getAnimationClass = (isAnimating: boolean, animation?: string) => {
  if (isAnimating) {
    switch (animation) {
      case 'fade': return 'animate-fade-in';
      case 'slide-up': return 'animate-slide-up';
      case 'slide-left': return 'animate-slide-from-right';
      case 'zoom': return 'animate-scale-in';
      default: return '';
    }
  }
  return '';
};

export const getVerticalAlignment = (verticalAlignment?: string) => {
  switch (verticalAlignment) {
    case 'top': return 'items-start pt-20';
    case 'bottom': return 'items-end pb-20';
    default: return 'items-center';
  }
};

export const getHorizontalAlignment = (horizontalAlignment?: string) => {
  switch (horizontalAlignment) {
    case 'left': return 'justify-start text-left';
    case 'right': return 'justify-end text-right';
    default: return 'justify-center text-center';
  }
};

export const getBackgroundStyle = (slide: Slide) => {
  if (slide.backgroundGradient) {
    return { background: slide.backgroundGradient };
  }
  if (slide.backgroundImage) {
    return { 
      backgroundImage: `url(${slide.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  if (slide.backgroundColor) {
    return { backgroundColor: slide.backgroundColor };
  }
  return {};
};

export const getProgressPercentage = () => {
  // This is a placeholder. In a real implementation, you'd get this from the context/props
  // For demo purposes, let's assume 60% progress
  return 60;
};
