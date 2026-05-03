import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Tutorials from "./pages/Tutorials";
import TutorialDetail from "./pages/TutorialDetail";
import Analyzer from "./pages/Analyzer";
import Forum from "./pages/Forum";
import ThreadDetail from "./pages/ThreadDetail";
import Auth from "./pages/Auth";
import Pro from "./pages/Pro";
import Luts from "./pages/Luts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/:slug" element={<TutorialDetail />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ThreadDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pro" element={<Pro />} />
          <Route path="/luts" element={<Luts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
