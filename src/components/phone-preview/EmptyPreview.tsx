
import React from "react";

export function EmptyPreview() {
  return (
    <div className="w-[375px] h-[667px] border-8 border-gray-800 rounded-[40px] bg-gray-100 flex items-center justify-center">
      <p className="text-muted-foreground">Select a slide to preview</p>
    </div>
  );
}
