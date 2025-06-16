import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const navigate = useNavigate();

  // Handler functions for button clicks
  const handleExportReport = () => {
    // Generate and download a sample export report
    const reportData = {
      date: new Date().toISOString().split("T")[0],
      totalShipments: 0,
      totalVolume: "0 MT",
      activeShipments: 0,
      revenue: "$0",
      exportDestinations: [],
      summary:
        "No shipments recorded yet. Start by creating your first shipment.",
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `export-report-${reportData.date}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleNewShipment = () => {
    navigate("/shipments");
  };

  const handleCreateFirstShipment = () => {
    navigate("/shipments");
  };

  const handleUploadCertificates = () => {
    navigate("/compliance");
  };

  const handleInviteTeam = () => {
    navigate("/partners");
  };

  return (
    <div className="container mx-auto px-4 py-8 header-safe">
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
          <Button
            variant="outline"
            onClick={handleExportReport}
            className="hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button
            onClick={handleNewShipment}
            className="hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Export Volume
            </CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 MT</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">0%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Shipments
            </CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">0</span>
              <span className="ml-1">new shipments</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">0%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Score
            </CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">All certificates valid</span>
            </div>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Shipments */}
            <Card>
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
                <div className="text-center py-8">
                  <Truck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No shipments yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first shipment to start tracking exports
                  </p>
                  <Button
                    onClick={handleNewShipment}
                    className="hover:scale-105 active:scale-95 transition-transform duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Shipment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Compliance Status
                </CardTitle>
                <CardDescription>
                  Important compliance deadlines and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    All systems green
                  </h3>
                  <p className="text-muted-foreground">
                    No compliance issues detected
                  </p>
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
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No shipments found</h3>
                <p className="text-muted-foreground mb-4">
                  Start tracking your export shipments here
                </p>
                <Button
                  onClick={handleCreateFirstShipment}
                  className="hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Shipment
                </Button>
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
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Setup compliance tracking
                </h3>
                <p className="text-muted-foreground mb-4">
                  Upload certificates and set renewal reminders
                </p>
                <Button
                  onClick={handleUploadCertificates}
                  className="hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Certificates
                </Button>
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
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Invite team members
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add your partners to start collaborating
                </p>
                <Button
                  onClick={handleInviteTeam}
                  className="hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Team
                </Button>
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
              <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No market data</h3>
                <p className="text-muted-foreground">
                  Market intelligence will appear as you expand your business
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
