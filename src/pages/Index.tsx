import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  Shield,
  Star,
  Rocket,
  Heart,
  Target,
  Layers,
  Play,
  Phone,
  Video,
} from "lucide-react";

const Index = () => {
  const workspaceFeatures = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "AI-powered insights and real-time business intelligence",
      color: "from-blue-500 to-cyan-500",
      route: "/analytics",
      stats: "↗ 24% growth",
    },
    {
      icon: FileText,
      title: "Smart Documents",
      description: "Auto-generating compliance docs with AI assistance",
      color: "from-emerald-500 to-teal-500",
      route: "/documents",
      stats: "⚡ Instant gen",
    },
    {
      icon: MessageSquare,
      title: "Unified Communication",
      description: "Video calls, chat, and collaboration in one place",
      color: "from-purple-500 to-pink-500",
      route: "/communication",
      stats: "🎥 HD quality",
    },
    {
      icon: Package,
      title: "Smart Tracking",
      description: "AI-powered shipment monitoring and predictions",
      color: "from-orange-500 to-red-500",
      route: "/shipments",
      stats: "📍 Live GPS",
    },
    {
      icon: Calendar,
      title: "Compliance AI",
      description: "Automated compliance monitoring and alerts",
      color: "from-indigo-500 to-purple-500",
      route: "/compliance",
      stats: "🛡️ 100% secure",
    },
    {
      icon: Settings,
      title: "Partner Hub",
      description: "Advanced team management and collaboration",
      color: "from-pink-500 to-rose-500",
      route: "/partners",
      stats: "👥 5 partners",
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      label: "Export Volume",
      value: "0",
      unit: "MT/Year",
      color: "from-emerald-400 to-teal-500",
      change: "Ready to start",
    },
    {
      icon: Users,
      label: "Active Partners",
      value: "0",
      unit: "Global",
      color: "from-blue-400 to-cyan-500",
      change: "Invite team",
    },
    {
      icon: Globe,
      label: "Countries",
      value: "0",
      unit: "Markets",
      color: "from-purple-400 to-pink-500",
      change: "Go global",
    },
    {
      icon: Star,
      label: "Satisfaction",
      value: "0%",
      unit: "Rating",
      color: "from-yellow-400 to-orange-500",
      change: "Get started",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section with Glassmorphism */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge className="px-6 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 mr-2 text-emerald-400" />
                <span className="text-emerald-300 font-medium">
                  Next-Gen Workspace Platform
                </span>
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">Smart Export</span>
              <br />
              <span className="text-white">Workspace</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionize your spice export business with AI-powered
              analytics, seamless communication, and automated compliance
              management.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/admin" className="touch-manipulation">
                <Button className="modern-button text-lg px-8 py-4 h-auto w-full sm:w-auto hover:scale-105 active:scale-95 transition-transform duration-200">
                  <Rocket className="mr-3 w-6 h-6" />
                  Launch Dashboard
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link to="/communication" className="touch-manipulation">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <Play className="mr-3 w-5 h-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="modern-card text-center group">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${stat.color} p-2.5 group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {stat.unit}
                    </div>
                    <div className="text-xs text-emerald-400 font-semibold">
                      {stat.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <Badge className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl">
                <Layers className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-purple-300">Advanced Features</span>
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Everything you need to
              <span className="text-gradient"> scale globally</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful tools designed for modern spice exporters. From AI
              analytics to real-time collaboration, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workspaceFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.route} className="group">
                  <Card className="modern-card h-full border-white/10 hover:border-white/20 transition-all duration-500 group-hover:shadow-2xl overflow-hidden relative">
                    {/* Animated background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                    />

                    <CardHeader className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`border-gradient-to-r ${feature.color} text-xs px-3 py-1 bg-gradient-to-r ${feature.color} bg-opacity-10 text-white border-white/20`}
                        >
                          {feature.stats}
                        </Badge>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Communication Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-xl mb-6 inline-flex">
                  <Video className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-blue-300">Communication Hub</span>
                </Badge>
                <h3 className="text-4xl font-bold text-white mb-6">
                  Connect with your team
                  <span className="text-gradient"> anywhere</span>
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  High-quality video calls, instant messaging, and file sharing.
                  Built for international teams and seamless collaboration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/communication">
                    <Button className="modern-button">
                      <Video className="mr-2 w-5 h-5" />
                      Start Video Call
                    </Button>
                  </Link>
                  <Link to="/communication">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl"
                    >
                      <MessageSquare className="mr-2 w-5 h-5" />
                      Open Chat
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="modern-card bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm">Audio Call</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                          <Video className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm">Video Chat</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm">Instant Chat</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm">File Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="modern-card max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-emerald-400 to-blue-600 p-4 animate-glow">
                <Rocket className="w-full h-full text-white" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to transform your
              <span className="text-gradient"> export business?</span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of exporters who trust our platform for their
              international trade operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/admin">
                <Button className="modern-button text-lg px-8 py-4 h-auto">
                  <Zap className="mr-3 w-6 h-6" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/crm">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl"
                >
                  <Target className="mr-3 w-5 h-5" />
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Link to="/communication">
        <div className="floating-action group">
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </Link>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-400 to-blue-600 p-2">
                  <Sparkles className="w-full h-full text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Calicut Spice Traders
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering spice exporters with cutting-edge technology and
                seamless global collaboration.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Access
              </h4>
              <div className="space-y-3">
                <Link
                  to="/analytics"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  Analytics Dashboard
                </Link>
                <Link
                  to="/documents"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  Smart Documents
                </Link>
                <Link
                  to="/shipments"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  Shipment Tracking
                </Link>
                <Link
                  to="/communication"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  Communication Hub
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Join our community of exporters and stay updated with the latest
                features.
              </p>
              <Link to="/settings">
                <Button className="modern-button w-full">
                  <Heart className="mr-2 w-4 h-4" />
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Calicut Spice Traders LLP. All rights reserved. |
              <span className="text-emerald-400 ml-1">
                Built with ❤️ for global trade
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
