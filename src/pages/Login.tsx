import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Sparkles,
  Ship,
  Globe,
  Award,
  Clock,
  ArrowRight,
  Anchor,
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, login } = useUser();
  const inviteCode = searchParams.get("invite");

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"form" | "google">("form");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/admin");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSuccess = (userData: any) => {
    console.log("Login successful:", userData);
    login(userData);
    navigate("/admin");
  };

  const handleLoginError = (error: string) => {
    console.error("Login error:", error);
    // Error handling is done within GoogleLoginButton component
  };

  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate form
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Check if it's a domain email
      const emailDomain = email.split("@")[1];
      const allowedDomains = ["calicutspicetraders.com", "gmail.com"];

      if (!allowedDomains.includes(emailDomain)) {
        throw new Error(
          "Only @calicutspicetraders.com and @gmail.com emails are allowed",
        );
      }

      // For demo purposes, we'll accept any password for domain emails
      // In production, this should validate against a backend
      if (emailDomain === "calicutspicetraders.com" || password.length >= 6) {
        const userProfile = {
          id: `user_${Date.now()}`,
          fullName: email
            .split("@")[0]
            .replace(/[._]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          email: email,
          phone: "",
          jobTitle:
            emailDomain === "calicutspicetraders.com" ? "Team Member" : "User",
          department:
            emailDomain === "calicutspicetraders.com"
              ? "Operations"
              : "External",
          timezone: "UTC",
          bio: "",
          avatar: "",
          initials: email.substring(0, 2).toUpperCase(),
          role:
            emailDomain === "calicutspicetraders.com"
              ? "admin"
              : ("user" as const),
          preferences: {
            language: "en",
            currency: "USD",
            dateFormat: "dd-mm-yyyy",
            timeFormat: "24h",
            defaultDashboard: "overview",
          },
          isOnline: true,
          lastActive: new Date().toISOString(),
        };

        login(userProfile);
        navigate("/admin");
      } else {
        throw new Error("Invalid password. Minimum 6 characters required.");
      }
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Ship,
      title: "Shipment Tracking",
      description: "Real-time tracking of your cargo shipments worldwide",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connected with shipping partners across 50+ countries",
    },
    {
      icon: Award,
      title: "Compliance Management",
      description: "Automated compliance checks and certificate management",
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "Round-the-clock monitoring and support",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/799096/pexels-photo-799096.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/75 to-slate-800/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16">
          <div className="max-w-lg">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 p-3 shadow-2xl">
                  <Anchor className="h-full w-full text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Calicut Spice Traders
                </h1>
                <p className="text-blue-200">Modern Workspace Platform</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Welcome to the Future of
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    {" "}
                    Spice Trading
                  </span>
                </h2>
                <p className="text-xl text-blue-100/80 leading-relaxed">
                  Join our advanced platform for seamless global spice trade
                  management, real-time tracking, and automated compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-600/20 p-2.5 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-full w-full text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-blue-100/70 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center space-x-6 pt-6">
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Global Platform
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Secure & Compliant
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 p-2.5 shadow-xl">
                    <Anchor className="h-full w-full text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    CST Workspace
                  </h1>
                </div>
              </div>
              <p className="text-blue-100/70">Modern Spice Trading Platform</p>
            </div>

            <Card className="glass-card border-white/20 shadow-2xl">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-blue-600/20 p-3 mb-2">
                  <Shield className="h-full w-full text-emerald-400" />
                </div>
                <CardTitle className="text-2xl text-white">
                  {inviteCode ? "Complete Your Registration" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-blue-100/70 text-base">
                  {inviteCode
                    ? "You've been invited to join our platform. Please sign in to complete your registration."
                    : "Sign in with your Google account to access the workspace. Domain emails (@calicutspicetraders.com) and approved Gmail accounts are supported."}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Display */}
                {error && (
                  <Alert className="border-red-200 bg-red-50/10 backdrop-blur-sm">
                    <Shield className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-300">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Username/Password Login Form */}
                <form onSubmit={handleFormLogin} className="space-y-4">
                  <div className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-white text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="info@calicutspicetraders.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-emerald-400 focus:ring-emerald-400/50"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-white text-sm font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-emerald-400 focus:ring-emerald-400/50"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-blue-300 hover:text-white transition-colors"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Divider */}
                <div className="relative">
                  <Separator className="bg-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-slate-800 px-4 text-sm text-blue-100/70 font-medium">
                      OR
                    </span>
                  </div>
                </div>

                {/* Google Login Section - Centered */}
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <GoogleLoginButton
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginError}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Help Text */}
                <div className="text-center space-y-3">
                  <p className="text-sm text-blue-100/70">
                    <strong>Domain emails:</strong> @calicutspicetraders.com
                    (any password)
                    <br />
                    <strong>Gmail accounts:</strong> Use Google sign-in above
                  </p>

                  {!inviteCode && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs text-blue-100/50 mb-3">
                        Need access? Contact your administrator for an
                        invitation.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                        onClick={() => {
                          window.location.href =
                            "mailto:admin@calicutspicetraders.com?subject=Access Request - CST Workspace";
                        }}
                      >
                        Contact Administrator
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Footer Links */}
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-xs text-blue-100/50">
                    By signing in, you agree to our{" "}
                    <a
                      href="#"
                      className="text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Admin Access */}
            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-200/70 hover:text-white hover:bg-white/10 text-xs"
                onClick={() => navigate("/superadmin/login")}
              >
                <Shield className="w-3 h-3 mr-1" />
                Administrator Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
    </div>
  );
};

export default Login;
