import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  FileText,
  Users,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Globe,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  MapPin,
  Bell,
  Download,
  Upload,
  Plus,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: "Total Export Volume",
      value: "127.5 MT",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Active Shipments",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Truck,
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹45.2L",
      change: "+8.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Compliance Score",
      value: "98.5%",
      change: "-0.5%",
      trend: "down",
      icon: Star,
      color: "text-orange-600",
    },
  ];

  const recentShipments = [
    {
      id: "SP-2024-001",
      destination: "Dubai, UAE",
      product: "Cardamom (AAA Grade)",
      quantity: "5.2 MT",
      status: "In Transit",
      eta: "Dec 28, 2024",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "SP-2024-002",
      destination: "London, UK",
      product: "Black Pepper",
      quantity: "3.8 MT",
      status: "Customs",
      eta: "Dec 30, 2024",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "SP-2024-003",
      destination: "Kuwait City",
      product: "Turmeric Powder",
      quantity: "7.1 MT",
      status: "Delivered",
      eta: "Completed",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  const complianceAlerts = [
    {
      type: "warning",
      title: "FSSAI Certificate Renewal",
      description: "Certificate expires in 30 days",
      priority: "High",
      dueDate: "Jan 15, 2025",
    },
    {
      type: "info",
      title: "ISO 22000 Audit Scheduled",
      description: "Annual compliance audit next month",
      priority: "Medium",
      dueDate: "Feb 10, 2025",
    },
    {
      type: "success",
      title: "UAE Halal Certification",
      description: "Successfully renewed for 2 years",
      priority: "Low",
      dueDate: "Completed",
    },
  ];

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Export Manager",
      status: "online",
      avatar: "RK",
    },
    {
      name: "Priya Nair",
      role: "Quality Controller",
      status: "away",
      avatar: "PN",
    },
    {
      name: "Mohammed Ali",
      role: "Documentation",
      status: "online",
      avatar: "MA",
    },
    {
      name: "Suresh Menon",
      role: "Logistics",
      status: "offline",
      avatar: "SM",
    },
    { name: "Lakshmi Pillai", role: "Finance", status: "online", avatar: "LP" },
  ];

  const marketData = [
    { market: "UAE", demand: 85, price: "High", trend: "up" },
    { market: "Kuwait", demand: 72, price: "Medium", trend: "stable" },
    { market: "UK", demand: 91, price: "Premium", trend: "up" },
    { market: "Nigeria", demand: 68, price: "Competitive", trend: "down" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workspace Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your spice export
            business.
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Shipments */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Recent Shipments
                </CardTitle>
                <CardDescription>
                  Latest export activities and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentShipments.map((shipment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{shipment.id}</span>
                          <Badge className={shipment.statusColor}>
                            {shipment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {shipment.product}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {shipment.destination}
                          <span className="mx-2">•</span>
                          {shipment.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{shipment.eta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Compliance Alerts
                </CardTitle>
                <CardDescription>
                  Important compliance deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {alert.type === "warning" && (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                        {alert.type === "info" && (
                          <Bell className="w-4 h-4 text-blue-600" />
                        )}
                        {alert.type === "success" && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {alert.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shipments Tab */}
        <TabsContent value="shipments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Shipments</CardTitle>
              <CardDescription>
                Comprehensive view of all export shipments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  Detailed shipment management interface will be implemented
                  here.
                </p>
                <p className="text-sm mt-2">
                  Features: Tracking, documentation, customs status, delivery
                  confirmations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Management</CardTitle>
              <CardDescription>
                Monitor certificates, regulations, and compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  Comprehensive compliance dashboard will be implemented here.
                </p>
                <p className="text-sm mt-2">
                  Features: Certificate tracking, renewal alerts, audit
                  management, regulatory updates
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Overview
              </CardTitle>
              <CardDescription>
                Current team status and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border rounded-lg"
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-muted-foreground">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Communication hub and team collaboration tools will be
                  implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Markets Tab */}
        <TabsContent value="markets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Market Intelligence
              </CardTitle>
              <CardDescription>
                Real-time market data and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketData.map((market, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{market.market}</h4>
                        <Badge variant="outline">{market.price}</Badge>
                        {market.trend === "up" && (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        )}
                        {market.trend === "down" && (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        {market.trend === "stable" && (
                          <div className="w-4 h-4 rounded bg-yellow-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Demand Level</span>
                          <span>{market.demand}%</span>
                        </div>
                        <Progress value={market.demand} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-muted-foreground">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Advanced market analytics and business intelligence will be
                  implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
