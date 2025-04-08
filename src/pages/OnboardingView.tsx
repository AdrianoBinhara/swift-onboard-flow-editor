
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

// A simplified flow to show when loading or when the app ID doesn't match
const defaultFlow: OnboardingFlow = {
  id: "default-flow",
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
  ],
  globalStyles: defaultGlobalStyles,
};

const OnboardingView = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Log information for debugging
    console.log("OnboardingView: Rendering onboarding for app ID:", appId);
    
    if (!appId) {
      console.error("OnboardingView: No app ID provided");
      toast.error("No onboarding flow ID provided");
      navigate("/");
    }
    
    // Here you would normally fetch the flow data from a backend API
    // For now, we're just using the default flow
    
  }, [appId, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <PhonePreview 
        slide={defaultFlow.slides[0]} 
        allSlides={defaultFlow.slides} 
        globalStyles={defaultFlow.globalStyles}
        flowName={defaultFlow.name}
      />
    </div>
  );
};

export default OnboardingView;
