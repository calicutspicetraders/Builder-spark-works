import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import DynamicHomepage from "./pages/DynamicHomepage";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
import Communication from "./pages/Communication";
import Documents from "./pages/Documents";
import CRM from "./pages/CRM";
import ShipmentTracking from "./pages/ShipmentTracking";
import ComplianceCalendar from "./pages/ComplianceCalendar";
import PartnerManagement from "./pages/PartnerManagement";
import Settings from "./pages/Settings";
import SuperAdmin from "./pages/SuperAdmin";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminContentManager from "./pages/SuperAdminContentManager";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

// Protected route component for SuperAdmin
const ProtectedSuperAdminRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated =
    localStorage.getItem("superadmin_authenticated") === "true";

  if (!isAuthenticated) {
    window.location.href = "/superadmin/login";
    return null;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Sonner />
          <Navigation />
          <Routes>
            <Route path="/" element={<DynamicHomepage />} />
            <Route path="/static" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/shipments" element={<ShipmentTracking />} />
            <Route path="/compliance" element={<ComplianceCalendar />} />
            <Route path="/partners" element={<PartnerManagement />} />
            <Route path="/settings" element={<Settings />} />

            {/* SuperAdmin Routes */}
            <Route path="/superadmin/login" element={<SuperAdminLogin />} />
            <Route
              path="/superadmin"
              element={
                <ProtectedSuperAdminRoute>
                  <SuperAdmin />
                </ProtectedSuperAdminRoute>
              }
            />
            <Route
              path="/superadmin/content"
              element={
                <ProtectedSuperAdminRoute>
                  <SuperAdminContentManager />
                </ProtectedSuperAdminRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
