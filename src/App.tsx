
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import Icon from "@/components/ui/icon";

const queryClient = new QueryClient();

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-golos">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center">
            <Icon name="MessageCircle" size={22} className="text-white" />
          </div>
          <Icon name="Loader2" size={18} className="text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;