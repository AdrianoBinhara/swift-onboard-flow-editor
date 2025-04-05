
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  // Track user responses
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  
  // Listen for custom events from slide components
  useEffect(() => {
    const handleResponseEvent = (e: CustomEvent) => {
      const { slideId, slideType, question, answer, sdkKey } = e.detail;
      
      setUserResponses(prev => {
        // Check if this slideId already exists in the responses
        const existingIndex = prev.findIndex(r => r.slideId === slideId);
        
        if (existingIndex >= 0) {
          // Update existing response
          const updated = [...prev];
          updated[existingIndex] = { slideId, slideType, question, answer, sdkKey };
          return updated;
        } else {
          // Add new response
          return [...prev, { slideId, slideType, question, answer, sdkKey }];
        }
      });
    };
    
    // Add event listener for custom response events
    window.addEventListener('user-response', handleResponseEvent as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('user-response', handleResponseEvent as EventListener);
    };
  }, []);
  
  // Initialize empty responses for new slides
  useEffect(() => {
    // Map slides to initial empty responses
    const initialResponses = slides.map(slide => {
      let question = slide.title || "Untitled Question";
      let sdkKey = slide.id.replace("slide-", "");
      
      return {
        slideId: slide.id,
        slideType: slide.type,
        question,
        answer: null, // Default to null answer (no response yet)
        sdkKey: slide.type === "date" ? `nextWorkout${sdkKey}` : `key_${sdkKey}`
      };
    });

    // Merge with existing responses, prioritizing existing ones
    setUserResponses(prev => {
      const mergedResponses: UserResponse[] = [];
      
      initialResponses.forEach(initial => {
        const existing = prev.find(r => r.slideId === initial.slideId);
        if (existing) {
          mergedResponses.push(existing);
        } else {
          mergedResponses.push(initial);
        }
      });
      
      return mergedResponses;
    });
  }, [slides]);

  // Generate SDK Payload from responses
  const sdkPayload = {
    app: userResponses.reduce((acc, response) => {
      if (response.answer) {
        return { 
          ...acc, 
          [response.sdkKey]: response.answer 
        };
      }
      return acc;
    }, {})
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Preview Data</DialogTitle>
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
            {userResponses.some(r => r.answer) ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed rounded-md">
                <p className="text-muted-foreground">No responses yet</p>
                <p className="text-xs text-muted-foreground mt-1">Responses will appear here as users interact with the slides</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
