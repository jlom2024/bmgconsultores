import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import { PrivacidadPage, TerminosPage } from "./pages/legal/Index";

// The home page is prerendered and hydrated at boot, so it stays eager. The huge
// service pages load on demand to avoid shipping them in the initial bundle.
const ServicePage = lazy(() => import("./pages/service/Index"));
const FundadoraPage = lazy(() => import("./pages/fundadora/Index"));
const EstrategiaPremiumPage = lazy(() => import("./pages/estrategia-premium/Index"));
const NotFound = lazy(() => import("./pages/not-found/Index"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-10 h-10 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="mt-4 text-sm text-muted-foreground">Cargando…</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/emprendedor" element={<ServicePage serviceId="emprendedor" />} />
            <Route path="/contable" element={<ServicePage serviceId="contable" />} />
            <Route path="/legal" element={<ServicePage serviceId="legal" />} />
            <Route path="/comercio-exterior" element={<ServicePage serviceId="comercio-exterior" />} />
            <Route path="/ia" element={<ServicePage serviceId="ia" />} />
            <Route path="/lobby" element={<ServicePage serviceId="lobby" />} />
            <Route path="/inmobiliario" element={<ServicePage serviceId="inmobiliario" />} />
            <Route path="/travel" element={<ServicePage serviceId="travel" />} />
            <Route path="/seguros" element={<ServicePage serviceId="seguros" />} />
            <Route path="/fundadora" element={<FundadoraPage />} />
            <Route path="/estrategia-premium" element={<EstrategiaPremiumPage />} />
            <Route path="/privacidad" element={<PrivacidadPage />} />
            <Route path="/terminos" element={<TerminosPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
