
import React from "react";
import { Button } from "../ui/button";

interface ReplayButtonProps {
  onReplay: () => void;
}

export function ReplayButton({ onReplay }: ReplayButtonProps) {
  return (
    <div className="absolute bottom-4 right-4">
      <Button
        size="sm"
        variant="outline"
        onClick={onReplay}
        className="text-xs"
      >
        Replay Animation
      </Button>
    </div>
  );
}
