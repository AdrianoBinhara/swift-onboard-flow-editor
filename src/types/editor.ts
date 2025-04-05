
export interface Slide {
  id: string;
  type: 'text' | 'image' | 'video' | 'choice' | 'input' | 'date';
  title?: string;
  description?: string;
  verticalAlignment: 'top' | 'center' | 'bottom';
  horizontalAlignment: 'left' | 'center' | 'right';
  imageUrl?: string;
  videoUrl?: string;
  options?: string[];
  inputPlaceholder?: string;
  inputType?: 'text' | 'email' | 'number';
  // Date picker specific properties
  datePlaceholder?: string;
  defaultDate?: string;
  dateRequired?: boolean;
  minDate?: string;
  maxDate?: string;
  // New customization options
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  titleColor?: string;
  descriptionColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  animation?: 'none' | 'fade' | 'slide-up' | 'slide-left' | 'zoom';
  titleFontSize?: 'small' | 'medium' | 'large';
  descriptionFontSize?: 'small' | 'medium' | 'large';
  roundedCorners?: boolean;
  // New button and progress bar customization
  buttonPosition?: 'bottom' | 'below-content';
  buttonIcon?: 'arrow-right' | 'chevron-right' | 'chevron-down' | 'none';
  buttonSize?: 'small' | 'medium' | 'large';
  buttonFullWidth?: boolean;
  progressBarColor?: string;
  progressBarHeight?: 'thin' | 'medium' | 'thick';
  progressPercentage?: number;
  showProgressBar?: boolean;
}

export interface OnboardingFlow {
  id: string;
  name: string;
  slides: Slide[];
}

export interface EditorState {
  flow: OnboardingFlow;
  selectedSlideId: string | null;
  isDragging: boolean;
}
