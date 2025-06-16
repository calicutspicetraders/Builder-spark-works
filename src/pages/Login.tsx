import React, { useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Sparkles,
  Ship,
  Globe,
  Award,
  Clock,
  ArrowRight,
  Anchor,
} from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, login } = useUser();
  const inviteCode = searchParams.get("invite");

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
                {/* Google Login Section */}
                <div className="space-y-4">
                  <GoogleLoginButton
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                    className="w-full"
                  />
                </div>

                {!inviteCode && (
                  <>
                    <div className="relative">
                      <Separator className="bg-white/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-slate-800 px-3 text-sm text-blue-100/70">
                          Need Access?
                        </span>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <p className="text-sm text-blue-100/70">
                        This platform is invitation-only. Contact your
                        administrator to request access.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                        onClick={() => {
                          window.location.href =
                            "mailto:admin@calicutspicetraders.com?subject=Access Request - CST Workspace";
                        }}
                      >
                        Request Access
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}

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
