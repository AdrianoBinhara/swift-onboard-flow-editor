import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { SlideList } from "@/components/SlideList";
import { SlideEditor } from "@/components/SlideEditor";
import { GlobalStylesEditor } from "@/components/GlobalStylesEditor";
import { PhonePreview } from "@/components/PhonePreview";
import { OnboardingFlow, Slide, GlobalStyles } from "@/types/editor";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Layers } from "lucide-react";
import { SdkIntegration } from "@/components/SdkIntegration";

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
  globalStyles: defaultGlobalStyles,
};

const generateStableAppId = (flowName: string): string => {
  const storageKey = 'flowkit-app-id';
  const storedAppId = localStorage.getItem(storageKey);
  
  if (storedAppId) {
    return storedAppId;
  }
  
  const newAppId = `${flowName.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 10)}`;
  localStorage.setItem(storageKey, newAppId);
  return newAppId;
};

const Index = () => {
  const [flow, setFlow] = useState<OnboardingFlow>(defaultFlow);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(flow.slides[0]?.id || null);
  const [editorTab, setEditorTab] = useState<"slide" | "global">("slide");
  const [sdkIntegrationOpen, setSdkIntegrationOpen] = useState(false);
  const [appId, setAppId] = useState<string>('');
  
  const { appId: urlAppId } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  
  const isPreviewMode = urlParams.has('preview');
  const isFrameOnlyMode = urlParams.has('frame') || location.pathname === '/frame' || urlAppId !== undefined;
  const isSdk = urlParams.get('sdk') === 'ios';

  const selectedSlide = flow.slides.find((slide) => slide.id === selectedSlideId) || null;

  useEffect(() => {
    if (urlAppId) {
      setAppId(urlAppId);
    } else {
      setAppId(generateStableAppId(flow.name));
    }
  }, [urlAppId, flow.name]);

  useEffect(() => {
    const handleSlideChange = (event: CustomEvent<{ slideId: string }>) => {
      setSelectedSlideId(event.detail.slideId);
    };

    window.addEventListener('slide-change', handleSlideChange as EventListener);

    return () => {
      window.removeEventListener('slide-change', handleSlideChange as EventListener);
    };
  }, []);

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

    if (type === "date") {
      newSlide.title = "Select a Date";
      newSlide.description = "Please choose a date to continue";
      newSlide.datePlaceholder = "Select a date...";
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
    setEditorTab("slide");
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

  const handleUpdateGlobalStyles = (updatedStyles: GlobalStyles) => {
    setFlow((prev) => ({
      ...prev,
      globalStyles: updatedStyles,
    }));
    toast.success("Global styles updated");
  };

  const handleOpenSdkIntegration = () => {
    setSdkIntegrationOpen(true);
  };
  
  if (isFrameOnlyMode || isPreviewMode) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <PhonePreview 
          slide={flow.slides[0]} 
          allSlides={flow.slides} 
          globalStyles={flow.globalStyles}
          flowName={flow.name}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header 
        flowName={flow.name} 
        onFlowNameChange={handleFlowNameChange} 
        onPublish={handleOpenSdkIntegration} 
        onCodeClick={() => {
          const frameUrl = `${window.location.origin}/${appId}`;
          navigator.clipboard.writeText(frameUrl);
          toast.success("Direct URL copied to clipboard", {
            description: "Use this URL in your app to show only the onboarding flow."
          });
        }}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/5 flex flex-col border-r border-border">
          <div className="h-48 overflow-y-auto border-b border-border">
            <SlideList
              slides={flow.slides}
              selectedSlideId={selectedSlideId}
              onSelectSlide={(id) => {
                setSelectedSlideId(id);
                setEditorTab("slide");
              }}
              onAddSlide={handleAddSlide}
              onDeleteSlide={handleDeleteSlide}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Tabs value={editorTab} onValueChange={(value) => setEditorTab(value as "slide" | "global")}>
              <TabsList className="w-full mb-2 sticky top-0 z-10 bg-background">
                <TabsTrigger value="slide" className="flex-1 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Slide Editor</span>
                </TabsTrigger>
                <TabsTrigger value="global" className="flex-1 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Global Styles</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="slide" className="focus-visible:outline-none">
                <SlideEditor slide={selectedSlide} onSlideUpdate={handleUpdateSlide} />
              </TabsContent>

              <TabsContent value="global" className="focus-visible:outline-none">
                <GlobalStylesEditor
                  globalStyles={flow.globalStyles}
                  onGlobalStylesUpdate={handleUpdateGlobalStyles}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <PhonePreview 
            slide={selectedSlide} 
            allSlides={flow.slides} 
            globalStyles={flow.globalStyles}
            flowName={flow.name}
          />
        </div>
      </div>

      <SdkIntegration
        open={sdkIntegrationOpen}
        onOpenChange={setSdkIntegrationOpen}
        appId={appId}
        appName={flow.name}
      />
    </div>
  );
}

export default Index;
