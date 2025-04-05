
import React from "react";
import { Progress } from "../ui/progress";
import { getProgressPercentage } from "./utils";

export function ProgressBar() {
  return (
    <div className="absolute top-0 left-0 right-0 px-4 pt-4 z-10">
      <Progress value={getProgressPercentage()} className="h-1.5" />
    </div>
  );
}
