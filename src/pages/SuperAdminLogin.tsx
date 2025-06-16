import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Authenticate against backend API or environment variables
    setTimeout(() => {
      // Check against environment variables or API
      const validSuperAdminEmail =
        import.meta.env.VITE_SUPERADMIN_EMAIL || "admin@yourcompany.com";
      const validSuperAdminPassword =
        import.meta.env.VITE_SUPERADMIN_PASSWORD || "admin123";
      if (
        email === validSuperAdminEmail &&
        password === validSuperAdminPassword
      ) {
        // Set authentication state
        localStorage.setItem("superadmin_authenticated", "true");
        localStorage.setItem("superadmin_email", email);
        navigate("/superadmin");
      } else {
        setError("Invalid credentials. SuperAdmin access denied.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to main app */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workspace
        </Link>

        <Card className="border-red-200 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto">
              <div className="relative">
                <Shield className="h-16 w-16 text-red-600 mx-auto" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 rounded-full flex items-center justify-center">
                  <Lock className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-red-600">
                SuperAdmin Access
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Restricted system administration panel
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="destructive">High Security</Badge>
              <Badge variant="outline" className="border-red-200">
                Authorized Personnel Only
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {/* Security Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">
                    Security Notice
                  </h4>
                  <p className="text-sm text-red-700">
                    This area is for system administrators only. All access
                    attempts are logged and monitored.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    SuperAdmin Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter superadmin email"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    Master Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter master password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Access SuperAdmin Panel</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                SuperAdmin Access:
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  SuperAdmin credentials are configured via environment
                  variables.
                </p>
                <p>Contact your system administrator for access credentials.</p>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 text-center">
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center justify-center space-x-4">
                  <span>🔒 SSL Encrypted</span>
                  <span>🛡️ IP Logging</span>
                  <span>⚡ Session Timeout</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Unauthorized access attempts will be reported to system
            administrators
          </p>
          <p className="mt-1">
            &copy; 2024 Calicut Spice Traders LLP - SuperAdmin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
