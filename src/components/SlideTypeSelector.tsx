
import { 
  Calendar, 
  Check, 
  Image, 
  Video, 
  Type, 
  FormInput,
  X,
  Plus
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Slide } from "@/types/editor";
import { DialogClose } from "@radix-ui/react-dialog";

interface SlideTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: Slide["type"]) => void;
}

export function SlideTypeSelector({ open, onOpenChange, onSelectType }: SlideTypeSelectorProps) {
  const slideTypes: { type: Slide["type"]; icon: React.ReactNode; label: string; bgColor: string; borderColor: string; textColor: string }[] = [
    {
      type: "choice",
      icon: <Check className="h-6 w-6" />,
      label: "Choice",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
      textColor: "text-green-700"
    },
    {
      type: "text",
      icon: <Type className="h-6 w-6" />,
      label: "Text",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-300",
      textColor: "text-purple-700"
    },
    {
      type: "image",
      icon: <Image className="h-6 w-6" />,
      label: "Image",
      bgColor: "bg-indigo-100",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-700"
    },
    {
      type: "video",
      icon: <Video className="h-6 w-6" />,
      label: "Video",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      textColor: "text-red-700"
    },
    {
      type: "input",
      icon: <FormInput className="h-6 w-6" />,
      label: "Input",
      bgColor: "bg-cyan-100",
      borderColor: "border-cyan-300",
      textColor: "text-cyan-700"
    },
    {
      type: "date",
      icon: <Calendar className="h-6 w-6" />,
      label: "Date",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300",
      textColor: "text-blue-700"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center mb-6 flex items-center justify-between">
          <div className="text-xl flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Add New Slide</span>
          </div>
          <DialogClose className="rounded-full p-1.5 hover:bg-muted">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogTitle>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {slideTypes.map((slideType) => (
            <DialogClose asChild key={slideType.type}>
              <button
                className={`flex flex-col items-center p-4 rounded-lg border-2 ${slideType.borderColor} ${slideType.bgColor} ${slideType.textColor} hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                onClick={() => onSelectType(slideType.type)}
              >
                <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                  {slideType.icon}
                </div>
                <span className="font-medium">{slideType.label}</span>
                <span className="text-xs mt-1 opacity-80">Add a {slideType.label.toLowerCase()} slide</span>
              </button>
            </DialogClose>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Select a slide type to add to your presentation
        </p>
      </DialogContent>
    </Dialog>
  );
}
