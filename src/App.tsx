
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const queryClient = new QueryClient();

// Fallback component when 3D context fails
const ThreeDFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error("3D rendering error:", error);
  
  return (
    <div className="3d-fallback">
      {/* Content continues to render even if 3D fails */}
    </div>
  );
};

// Global 3D context provider with error handling
const ThreeJSProvider = ({ children }) => (
  <ErrorBoundary FallbackComponent={ThreeDFallback}>
    {children}
  </ErrorBoundary>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThreeJSProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </BrowserRouter>
      </ThreeJSProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
