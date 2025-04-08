
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import OnboardingView from "./pages/OnboardingView";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a client instance inside the component function body
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Editor route */}
            <Route path="/" element={<Index />} />
            
            {/* Dedicated onboarding view route - for direct access to flows */}
            <Route path="/onboarding/:appId" element={<OnboardingView />} />
            
            {/* Legacy app ID route - redirect handled in Index component */}
            <Route path="/:appId" element={<Index />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
