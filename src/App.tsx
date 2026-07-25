
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));


// Removed unused import of App.css

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
