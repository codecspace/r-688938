
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";

const queryClient = new QueryClient();

// Global 3D context provider to improve performance
const ThreeJSProvider = ({ children }) => (
  <>
    <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden">
      <Canvas>
        <Suspense fallback={null}>
          <Preload all />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
    {children}
  </>
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
