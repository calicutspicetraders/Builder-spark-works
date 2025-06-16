import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import CRM from "./pages/CRM";
import Documents from "./pages/Documents";
import Communication from "./pages/Communication";
import Analytics from "./pages/Analytics";
import ShipmentTracking from "./pages/ShipmentTracking";
import ComplianceCalendar from "./pages/ComplianceCalendar";
import PartnerManagement from "./pages/PartnerManagement";
import Settings from "./pages/Settings";
import SuperAdmin from "./pages/SuperAdmin";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import NotFound from "./pages/NotFound";

// SuperAdmin route protection
const ProtectedSuperAdminRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated =
    localStorage.getItem("superadmin_authenticated") === "true";
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/superadmin/login" replace />
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/shipments" element={<ShipmentTracking />} />
            <Route path="/compliance" element={<ComplianceCalendar />} />
            <Route path="/partners" element={<PartnerManagement />} />
            <Route path="/settings" element={<Settings />} />

            {/* SuperAdmin Routes - Separate Authentication */}
            <Route path="/superadmin/login" element={<SuperAdminLogin />} />
            <Route
              path="/superadmin"
              element={
                <ProtectedSuperAdminRoute>
                  <div className="min-h-screen bg-background">
                    <SuperAdmin />
                  </div>
                </ProtectedSuperAdminRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
