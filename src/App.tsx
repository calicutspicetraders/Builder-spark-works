import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { UserProvider, useUser } from "./contexts/UserContext";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
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
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminContentManager from "./pages/SuperAdminContentManager";
import SuperAdminInviteManager from "./pages/SuperAdminInviteManager";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

// Protected route component for regular users
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};

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

// App content component to handle protected routing
const AppContent = () => {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Sonner />
      {isAuthenticated && <Navigation />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DynamicHomepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/static"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/communication"
          element={
            <ProtectedRoute>
              <Communication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crm"
          element={
            <ProtectedRoute>
              <CRM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipments"
          element={
            <ProtectedRoute>
              <ShipmentTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <ComplianceCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partners"
          element={
            <ProtectedRoute>
              <PartnerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* SuperAdmin Routes */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route
          path="/superadmin"
          element={
            <ProtectedSuperAdminRoute>
              <SuperAdminDashboard />
            </ProtectedSuperAdminRoute>
          }
        />
        <Route
          path="/superadmin/system"
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
        <Route
          path="/superadmin/invites"
          element={
            <ProtectedSuperAdminRoute>
              <SuperAdminInviteManager />
            </ProtectedSuperAdminRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
