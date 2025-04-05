
import React from "react";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReplayButtonProps {
  onReplay: () => void;
  buttonColor?: string;
  buttonTextColor?: string;
  roundedCorners?: boolean;
}

export function ReplayButton({ 
  onReplay, 
  buttonColor, 
  buttonTextColor,
  roundedCorners = true
}: ReplayButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onReplay}
      className={cn(
        "flex items-center gap-2",
        roundedCorners ? "rounded-md" : "rounded-none"
      )}
      style={{ 
        backgroundColor: buttonColor,
        color: buttonTextColor,
        borderColor: buttonColor
      }}
    >
      <RotateCcw className="h-4 w-4" />
      Replay Animation
    </Button>
  );
}
