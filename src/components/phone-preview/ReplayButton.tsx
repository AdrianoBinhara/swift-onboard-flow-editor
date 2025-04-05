
import React from "react";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReplayButtonProps {
  onReplay: () => void;
  buttonColor?: string;
  buttonTextColor?: string;
}

export function ReplayButton({ 
  onReplay, 
  buttonColor, 
  buttonTextColor 
}: ReplayButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onReplay}
      className={cn("flex items-center gap-2")}
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
