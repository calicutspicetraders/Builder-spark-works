import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Paintbrush,
  Settings,
  Database,
  Cloud,
  Zap,
  Monitor,
  Terminal,
  Users,
  Activity,
  Server,
  HardDrive,
  Cpu,
  Clock,
  CheckCircle,
  AlertTriangle,
  Code,
  Puzzle,
  Globe,
  LogOut,
  FileText,
  Image,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [systemStatus] = useState({
    health: 100,
    plugins: 0,
    scripts: 0,
    lastUpdated: "Just now",
  });

  const handleLogout = () => {
    localStorage.removeItem("superadmin_authenticated");
    navigate("/superadmin/login");
  };

  const quickActions = [
    {
      title: "Content Manager",
      description: "Manage logos, text, media, and plugins across all pages",
      icon: Paintbrush,
      href: "/superadmin/content",
      gradient: "from-purple-500 to-pink-500",
      featured: true,
    },
    {
      title: "System Settings",
      description: "Advanced system configuration and monitoring",
      icon: Settings,
      href: "/superadmin",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Database Admin",
      description: "Direct database access and administration",
      icon: Database,
      href: "/superadmin?tab=database",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Plugin Manager",
      description: "Install and manage workflow enhancement plugins",
      icon: Puzzle,
      href: "/superadmin?tab=plugins",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Custom Code",
      description:
        "Write and execute custom scripts for advanced functionality",
      icon: Code,
      href: "/superadmin?tab=custom-code",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Integrations",
      description: "Configure connections to external services and APIs",
      icon: Globe,
      href: "/superadmin?tab=integrations",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const systemMetrics = [
    {
      title: "System Health",
      value: `${systemStatus.health}%`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Plugins",
      value: systemStatus.plugins,
      icon: Puzzle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Custom Scripts",
      value: systemStatus.scripts,
      icon: Code,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Last Updated",
      value: systemStatus.lastUpdated,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const contentMetrics = [
    {
      title: "Content Blocks",
      value: "2 Active",
      description: "Dynamic content across all pages",
      icon: FileText,
      href: "/superadmin/content?tab=content",
    },
    {
      title: "Media Files",
      value: "0 Files",
      description: "Logos, images, and documents",
      icon: Image,
      href: "/superadmin/content?tab=media",
    },
    {
      title: "Custom Plugins",
      value: "0 Plugins",
      description: "React components and scripts",
      icon: Layers,
      href: "/superadmin/content?tab=plugins",
    },
    {
      title: "Page Positions",
      value: "20+ Available",
      description: "Dynamic content placement",
      icon: Sparkles,
      href: "/superadmin/content",
    },
  ];

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-2.5">
                <Shield className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  SuperAdmin Dashboard
                </h1>
                <p className="text-gray-400">
                  Complete system control and customization
                </p>
              </div>
              <Badge variant="destructive" className="ml-4">
                Restricted Access
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Monitor className="w-4 h-4 mr-2" />
              System Status
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Activity className="w-4 h-4 mr-2" />
              Logs
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="modern-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {metric.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-2xl ${metric.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured: Content Management System */}
        <Card className="modern-card mb-8 border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                  <Paintbrush className="w-full h-full text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">
                    Content Management System
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Complete control over logos, text, media, and plugins across
                    all pages
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                ✨ Featured
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {contentMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Link key={index} to={metric.href}>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                          <Icon className="w-full h-full text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {metric.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {metric.value}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {metric.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link to="/superadmin/content">
              <Button className="w-full modern-button h-12 text-lg">
                <Paintbrush className="w-5 h-5 mr-3" />
                Open Content Manager
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.href}>
                <Card
                  className={`modern-card hover:scale-105 transition-all duration-300 cursor-pointer group ${
                    action.featured ? "ring-2 ring-purple-500/50" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.gradient} p-2.5 group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">
                          {action.title}
                        </CardTitle>
                      </div>
                      {action.featured && (
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {action.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mt-4">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 p-0"
                      >
                        Access Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="modern-card mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest system changes and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-2">
                  <CheckCircle className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    Content Management System Initialized
                  </p>
                  <p className="text-sm text-gray-400">
                    Dynamic content renderer and management interface deployed
                  </p>
                </div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                  <Database className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    Database Schema Updated
                  </p>
                  <p className="text-sm text-gray-400">
                    Added tables for content blocks, plugins, and media files
                  </p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                  <Shield className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    SuperAdmin Access Configured
                  </p>
                  <p className="text-sm text-gray-400">
                    Role-based authentication and protected routes implemented
                  </p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
