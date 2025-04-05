
import { useState } from "react";
import { Header } from "@/components/Header";
import { SlideList } from "@/components/SlideList";
import { SlideEditor } from "@/components/SlideEditor";
import { PhonePreview } from "@/components/PhonePreview";
import { OnboardingFlow, Slide } from "@/types/editor";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const defaultFlow: OnboardingFlow = {
  id: "flow-1",
  name: "My Onboarding Flow",
  slides: [
    {
      id: "slide-1",
      type: "text",
      title: "Welcome to the App",
      description: "This is the first step in your onboarding journey",
      verticalAlignment: "center",
      horizontalAlignment: "center",
    },
  ],
};

const Index = () => {
  const [flow, setFlow] = useState<OnboardingFlow>(defaultFlow);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(flow.slides[0]?.id || null);

  const selectedSlide = flow.slides.find((slide) => slide.id === selectedSlideId) || null;

  const handleFlowNameChange = (name: string) => {
    setFlow((prev) => ({ ...prev, name }));
    toast.success("Flow name updated");
  };

  const handleAddSlide = (type: Slide["type"]) => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type,
      verticalAlignment: "center",
      horizontalAlignment: "center",
    };

    // Add type-specific default properties
    if (type === "date") {
      newSlide.title = "Select a Date";
      newSlide.description = "Please choose a date to continue";
      newSlide.datePlaceholder = "Select a date...";
      // Add other date-specific properties with defaults
      newSlide.defaultDate = "";
      newSlide.dateRequired = false;
      newSlide.minDate = "";
      newSlide.maxDate = "";
    } else if (type === "choice") {
      newSlide.title = "Make a Selection";
      newSlide.description = "Please choose one of the following options";
      newSlide.options = ["Option 1", "Option 2"];
    }

    setFlow((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));

    setSelectedSlideId(newSlide.id);
    toast.success(`New ${type} slide added`);
  };

  const handleDeleteSlide = (slideId: string) => {
    setFlow((prev) => ({
      ...prev,
      slides: prev.slides.filter((slide) => slide.id !== slideId),
    }));

    if (selectedSlideId === slideId) {
      setSelectedSlideId(flow.slides[0]?.id || null);
    }

    toast.success("Slide deleted");
  };

  const handleUpdateSlide = (updatedSlide: Slide) => {
    setFlow((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === updatedSlide.id ? updatedSlide : slide
      ),
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header flowName={flow.name} onFlowNameChange={handleFlowNameChange} />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/5 flex flex-col border-r border-border">
          <div className="h-48 overflow-y-auto border-b border-border">
            <SlideList
              slides={flow.slides}
              selectedSlideId={selectedSlideId}
              onSelectSlide={setSelectedSlideId}
              onAddSlide={handleAddSlide}
              onDeleteSlide={handleDeleteSlide}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <SlideEditor slide={selectedSlide} onSlideUpdate={handleUpdateSlide} />
          </div>
        </div>
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <PhonePreview slide={selectedSlide} allSlides={flow.slides} />
        </div>
      </div>
    </div>
  );
};

export default Index;
