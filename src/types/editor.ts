
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
