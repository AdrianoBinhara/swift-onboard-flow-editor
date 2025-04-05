
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Slide } from "@/types/editor";
import { X } from "lucide-react";

interface PreviewDataProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: Slide[];
}

interface UserResponse {
  slideId: string;
  slideType: string;
  question: string;
  answer: string | null;
  sdkKey: string;
}

export function PreviewData({ open, onOpenChange, slides }: PreviewDataProps) {
  // In a real app, these would come from actual user interactions
  // For now, we'll simulate some responses based on the slides
  const userResponses: UserResponse[] = slides.map(slide => {
    let question = slide.title || "Untitled Question";
    let sdkKey = slide.id.replace("slide-", "");
    
    // Default to null answer (no response yet)
    let answer: string | null = null;
    
    // Simulate responses for demo purposes
    if (slide.type === "input") {
      answer = "Response recorded";
      sdkKey = `key_${sdkKey}`;
    } else if (slide.type === "choice" && slide.options && slide.options.length) {
      answer = slide.options[0];
      sdkKey = `key_${sdkKey}`;
    } else if (slide.type === "date") {
      answer = "Response recorded";
      sdkKey = slide.id.replace("slide-", "nextWorkout");
    }
    
    return {
      slideId: slide.id,
      slideType: slide.type,
      question,
      answer,
      sdkKey
    };
  });

  // Generate SDK Payload JSON
  const sdkPayload = {
    "app": {
      "gender": "male",
      "name": "John",
      "workouts": "3-4",
      "nextWorkout": "April 16, 2025"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Preview Data</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* SDK Payload */}
          <div>
            <h3 className="text-sm font-medium mb-2">SDK Payload (sent to app):</h3>
            <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
              <code>{JSON.stringify(sdkPayload, null, 2)}</code>
            </pre>
          </div>
          
          {/* User Responses */}
          <div>
            <h3 className="text-sm font-medium mb-2">User Responses:</h3>
            <div className="space-y-4">
              {userResponses.filter(r => r.answer).map((response, index) => (
                <div key={index} className="border rounded-md p-3">
                  {response.slideType === "input" && (
                    <>
                      <p className="text-sm"><span className="font-medium">Input:</span> {response.question}</p>
                      <p className="text-sm"><span className="text-muted-foreground text-xs">SDK Key: {response.sdkKey}</span></p>
                      <p className="text-sm mt-1"><span className="font-medium">Response:</span> {response.answer}</p>
                    </>
                  )}
                  
                  {response.slideType === "choice" && (
                    <>
                      <p className="text-sm"><span className="font-medium">Choice:</span> {response.question}</p>
                      <p className="text-sm"><span className="text-muted-foreground text-xs">SDK Key: {response.sdkKey}</span></p>
                      <p className="text-sm mt-1"><span className="font-medium">Choice:</span> {response.answer}</p>
                    </>
                  )}
                  
                  {response.slideType === "date" && (
                    <>
                      <p className="text-sm"><span className="font-medium">Date:</span> {response.question}</p>
                      <p className="text-sm"><span className="text-muted-foreground text-xs">SDK Key: {response.sdkKey}</span></p>
                      <p className="text-sm mt-1"><span className="font-medium">Response:</span> {response.answer}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
