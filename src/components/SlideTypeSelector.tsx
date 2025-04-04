
import { 
  Calendar, 
  Check, 
  Image, 
  Video, 
  Type, 
  FormInput,
  X
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
  const slideTypes: { type: Slide["type"]; icon: React.ReactNode; label: string; bgColor: string }[] = [
    {
      type: "choice",
      icon: <Check className="h-5 w-5 text-green-600" />,
      label: "Choice",
      bgColor: "bg-green-100"
    },
    {
      type: "text",
      icon: <Type className="h-5 w-5 text-purple-600" />,
      label: "Text",
      bgColor: "bg-purple-100"
    },
    {
      type: "image",
      icon: <Image className="h-5 w-5 text-indigo-600" />,
      label: "Image",
      bgColor: "bg-indigo-100"
    },
    {
      type: "video",
      icon: <Video className="h-5 w-5 text-red-600" />,
      label: "Video",
      bgColor: "bg-red-100"
    },
    {
      type: "input",
      icon: <FormInput className="h-5 w-5 text-cyan-600" />,
      label: "Input",
      bgColor: "bg-cyan-100"
    },
    {
      type: "date",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      label: "Date",
      bgColor: "bg-blue-100"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center mb-6 flex items-center justify-between">
          <div className="text-xl">Add New Slide</div>
          <DialogClose className="rounded-full p-1 hover:bg-muted">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogTitle>
        <div className="grid grid-cols-2 gap-4">
          {slideTypes.map((slideType) => (
            <DialogClose asChild key={slideType.type}>
              <button
                className="slide-type-button"
                onClick={() => onSelectType(slideType.type)}
              >
                <div className={`slide-type-icon ${slideType.bgColor}`}>
                  {slideType.icon}
                </div>
                <span>{slideType.label}</span>
              </button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
