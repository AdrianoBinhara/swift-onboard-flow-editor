
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PhonePreview } from "@/components/PhonePreview";
import { OnboardingFlow, Slide, GlobalStyles } from "@/types/editor";
import { toast } from "sonner";

const defaultGlobalStyles: GlobalStyles = {
  buttonColor: "#4299e1",
  buttonTextColor: "#ffffff",
  buttonPosition: "bottom",
  buttonSize: "medium",
  buttonIcon: "arrow-right",
  showProgressBar: true,
  progressBarColor: "#4299e1",
  progressBarHeight: "medium",
  animation: "fade",
  titleFontSize: "medium",
  descriptionFontSize: "medium",
};

// A more complete sample flow with multiple slides to demonstrate navigation
const sampleFlow: OnboardingFlow = {
  id: "sample-flow",
  name: "Onboarding Flow",
  slides: [
    {
      id: "slide-1",
      type: "text",
      title: "Welcome",
      description: "Starting your onboarding experience...",
      verticalAlignment: "center",
      horizontalAlignment: "center",
    },
    {
      id: "slide-2",
      type: "text",
      title: "Discover",
      description: "Explore our platform's powerful features",
      verticalAlignment: "center",
      horizontalAlignment: "center",
    },
    {
      id: "slide-3",
      type: "text",
      title: "Get Started",
      description: "You're all set! Enjoy using our app",
      verticalAlignment: "center",
      horizontalAlignment: "center",
    },
  ],
  globalStyles: defaultGlobalStyles,
};

const OnboardingView = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const isSdk = urlParams.get('sdk') === 'ios';
  
  const [flow, setFlow] = useState<OnboardingFlow>(sampleFlow);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Log information for debugging
    console.log("OnboardingView: Rendering onboarding for app ID:", appId);
    
    if (!appId) {
      console.error("OnboardingView: No app ID provided");
      toast.error("No onboarding flow ID provided");
      navigate("/");
      return;
    }
    
    // In a real app, you'd fetch the flow data from a backend API
    // For now, we're simulating with our sample data
    const fetchFlow = async () => {
      try {
        setLoading(true);
        // Simulate API fetch with a timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, this would be an API call like:
        // const response = await fetch(`/api/flows/${appId}`);
        // const flowData = await response.json();
        
        // Using sample data for now
        setFlow(sampleFlow);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flow:", error);
        toast.error("Failed to load onboarding flow");
        setLoading(false);
      }
    };
    
    fetchFlow();
    
    // Register event listener for slide changes
    const handleSlideChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.slideId) {
        const slideIndex = flow.slides.findIndex(s => s.id === customEvent.detail.slideId);
        if (slideIndex >= 0) {
          setCurrentSlideIndex(slideIndex);
        }
      }
    };
    
    window.addEventListener('slide-change', handleSlideChange);
    
    return () => {
      window.removeEventListener('slide-change', handleSlideChange);
    };
  }, [appId, navigate, flow.slides]);

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading onboarding flow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className={isSdk ? "w-full h-full" : "w-auto h-auto"}>
        <PhonePreview 
          slide={flow.slides[currentSlideIndex]} 
          allSlides={flow.slides} 
          globalStyles={flow.globalStyles}
          flowName={flow.name}
          hideControls={isSdk}
          fullScreen={isSdk}
        />
      </div>
    </div>
  );
};

export default OnboardingView;
