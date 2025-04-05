
import React from "react";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";

interface ReplayButtonProps {
  onReplay: () => void;
}

export function ReplayButton({ onReplay }: ReplayButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onReplay}
      className="flex items-center gap-2"
    >
      <RotateCcw className="h-4 w-4" />
      Replay Animation
    </Button>
  );
}
