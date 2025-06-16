import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DynamicContentRenderer, {
  useDynamicContent,
  getContentValue,
} from "./DynamicContentRenderer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  LayoutDashboard,
  Users,
  Package,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Sparkles,
  Shield,
  Moon,
  Sun,
  Zap,
  Paintbrush,
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      gradient: "from-pink-500 to-violet-500",
    },
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart3,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      href: "/shipments",
      label: "Shipments",
      icon: Package,
      gradient: "from-orange-500 to-red-500",
    },
    {
      href: "/crm",
      label: "CRM & Sales",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      href: "/documents",
      label: "Documents",
      icon: FileText,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      href: "/communication",
      label: "Communication",
      icon: MessageSquare,
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light");
  };

  const NavItems = ({ isMobile = false }) => (
    <div
      className={`flex ${isMobile ? "flex-col space-y-1" : "items-center space-x-1"}`}
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => isMobile && setIsOpen(false)}
            className={`group relative flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                : "text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${isActive ? "animate-pulse" : "group-hover:animate-bounce"}`}
            />
            <span className={isMobile ? "block" : "hidden xl:block"}>
              {item.label}
            </span>
            {isActive && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="fixed top-0 z-50 w-full glass-nav border-b border-white/10">
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <DynamicContentRenderer
            page="navigation"
            position="header-left"
            defaultContent={
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 p-2 group-hover:scale-110 transition-all duration-300 animate-glow">
                  <Sparkles className="h-full w-full text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse" />
              </div>
            }
          />
          <DynamicContentRenderer
            page="navigation"
            position="header-center"
            defaultContent={
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">
                  Calicut Spice Traders
                </h1>
                <p className="text-xs text-gray-400">Modern Workspace</p>
              </div>
            }
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex">
          <NavItems />
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <DynamicContentRenderer
            page="navigation"
            position="header-right-before"
          />
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-yellow-400 animate-spin" />
            ) : (
              <Moon className="h-4 w-4 text-blue-400" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
            onClick={() => {
              // Add notification handling logic here
              console.log("Notifications clicked");
            }}
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-gray-300" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-[10px] text-white flex items-center justify-center font-semibold animate-bounce">
              0
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-2xl hover:scale-110 transition-all duration-300"
              >
                <Avatar className="h-10 w-10 ring-2 ring-emerald-400/50">
                  <AvatarImage src="/api/placeholder/40/40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-600 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 glass-card border-white/20 shadow-2xl"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-semibold leading-none text-white">
                    John Doe
                  </p>
                  <p className="text-xs leading-none text-gray-400">
                    john@calicutspicetraders.com
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400">Online</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <Link to="/settings">
                <DropdownMenuItem className="p-3 hover:bg-white/10 rounded-xl m-1 transition-all duration-200">
                  <Settings className="mr-3 h-4 w-4 text-gray-400" />
                  <span className="text-white">Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-white/10" />
              <Link to="/superadmin/login">
                <DropdownMenuItem className="p-3 hover:bg-red-500/20 rounded-xl m-1 transition-all duration-200 text-red-400 focus:text-red-400">
                  <Shield className="mr-3 h-4 w-4" />
                  <span>SuperAdmin</span>
                  <Zap className="ml-auto h-3 w-3" />
                </DropdownMenuItem>
              </Link>
              <Link to="/superadmin/content">
                <DropdownMenuItem className="p-3 hover:bg-purple-500/20 rounded-xl m-1 transition-all duration-200 text-purple-400 focus:text-purple-400">
                  <Paintbrush className="mr-3 h-4 w-4" />
                  <span>Content Manager</span>
                  <Sparkles className="ml-auto h-3 w-3" />
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="p-3 hover:bg-white/10 rounded-xl m-1 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  // Clear authentication state
                  localStorage.removeItem("superadmin_authenticated");
                  // You can add more logout logic here like clearing user data
                  console.log("User logged out");
                  // Optionally redirect to login page
                  window.location.href = "/";
                }}
              >
                <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                <span className="text-white">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-2xl hover:bg-white/10"
                >
                  <Menu className="h-5 w-5 text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 glass-card border-l border-white/20"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="px-2">
                    <h2 className="text-lg font-bold gradient-text mb-2">
                      Navigation
                    </h2>
                    <p className="text-sm text-gray-400">
                      Access all workspace features
                    </p>
                  </div>
                  <NavItems isMobile />

                  <div className="pt-6 border-t border-white/10">
                    <div className="space-y-2">
                      <Link to="/settings" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start rounded-2xl hover:bg-white/10"
                        >
                          <Settings className="mr-3 h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                      <Link
                        to="/superadmin/login"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start rounded-2xl hover:bg-red-500/20 text-red-400"
                        >
                          <Shield className="mr-3 h-4 w-4" />
                          SuperAdmin
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <DynamicContentRenderer
            page="navigation"
            position="header-right-after"
          />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
