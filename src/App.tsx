
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

// This component handles the loading screen visibility
const AppContent = () => {
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisitedBefore');
    if (visited) {
      setHasVisitedBefore(true);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    setIsFirstLoad(false);
  }, []);

  return (
    <>
      {!hasVisitedBefore && isFirstLoad && location.pathname === "/" && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Index showLoadingScreen={!hasVisitedBefore && isFirstLoad} />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
