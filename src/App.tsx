
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// Create a new QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Fallback component for all React errors
const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error("Application error:", error);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-4">The application encountered an error.</p>
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
};

// Fallback component when 3D context fails
const ThreeDFallback = ({ error }: FallbackProps) => {
  console.error("3D rendering error:", error);
  
  return (
    <div className="3d-fallback">
      {/* Content continues to render even if 3D fails */}
    </div>
  );
};

// Global 3D context provider with error handling
const ThreeJSProvider = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ThreeDFallback}>
    {children}
  </ErrorBoundary>
);

const App = () => (
  <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
