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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Globe,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Target,
  Users,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30d");

  // Mock analytics data
  const keyMetrics = [
    {
      title: "Total Revenue",
      value: "₹2.45L",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      description: "Monthly export revenue",
    },
    {
      title: "Export Volume",
      value: "127.5 MT",
      change: "+8.3%",
      trend: "up",
      icon: Package,
      color: "text-blue-600",
      description: "Total spices exported",
    },
    {
      title: "Active Clients",
      value: "42",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      description: "International partners",
    },
    {
      title: "Avg. Order Value",
      value: "₹58,250",
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "text-orange-600",
      description: "Per shipment value",
    },
  ];

  const topProducts = [
    {
      name: "Premium Cardamom",
      revenue: "₹85,400",
      volume: "45.2 MT",
      growth: "+15%",
      trend: "up",
      marketShare: 35,
    },
    {
      name: "Black Pepper",
      revenue: "₹72,100",
      volume: "38.7 MT",
      growth: "+8%",
      trend: "up",
      marketShare: 28,
    },
    {
      name: "Organic Turmeric",
      revenue: "₹64,800",
      volume: "32.1 MT",
      growth: "+12%",
      trend: "up",
      marketShare: 22,
    },
    {
      name: "Ginger (Fresh)",
      revenue: "₹28,500",
      volume: "15.8 MT",
      growth: "-3%",
      trend: "down",
      marketShare: 10,
    },
    {
      name: "Coriander Seeds",
      revenue: "₹19,200",
      volume: "12.4 MT",
      growth: "+5%",
      trend: "up",
      marketShare: 5,
    },
  ];

  const marketPerformance = [
    {
      country: "UAE",
      flag: "🇦🇪",
      revenue: "₹98,500",
      orders: 28,
      growth: "+18%",
      trend: "up",
      satisfaction: 95,
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      revenue: "₹76,200",
      orders: 22,
      growth: "+12%",
      trend: "up",
      satisfaction: 92,
    },
    {
      country: "Kuwait",
      flag: "🇰🇼",
      revenue: "₹48,100",
      orders: 15,
      growth: "+6%",
      trend: "up",
      satisfaction: 88,
    },
    {
      country: "Nigeria",
      flag: "🇳🇬",
      revenue: "₹32,200",
      orders: 12,
      growth: "-2%",
      trend: "down",
      satisfaction: 85,
    },
  ];

  const monthlyData = [
    { month: "Jul", revenue: 180000, volume: 95, orders: 45 },
    { month: "Aug", revenue: 195000, volume: 102, orders: 48 },
    { month: "Sep", revenue: 210000, volume: 110, orders: 52 },
    { month: "Oct", revenue: 225000, volume: 118, orders: 55 },
    { month: "Nov", revenue: 235000, volume: 123, orders: 58 },
    { month: "Dec", revenue: 245000, volume: 127, orders: 60 },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-3 h-3" />;
      case "down":
        return <ArrowDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const alerts = [
    {
      type: "warning",
      title: "Low Stock Alert",
      message: "Cardamom inventory below threshold (2.5 MT remaining)",
      time: "2 hours ago",
    },
    {
      type: "success",
      title: "Target Achievement",
      message: "Monthly export target 95% achieved",
      time: "1 day ago",
    },
    {
      type: "info",
      title: "New Market Opportunity",
      message: "Potential client inquiry from Morocco market",
      time: "2 days ago",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Business Analytics</h1>
          <p className="text-muted-foreground">
            Track performance, analyze trends, and make data-driven decisions
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <div
                    className={`flex items-center ${getTrendColor(metric.trend)}`}
                  >
                    {getTrendIcon(metric.trend)}
                    <span className="ml-1">{metric.change}</span>
                  </div>
                  <span className="ml-2">vs last period</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Business Alerts
          </CardTitle>
          <CardDescription>
            Important notifications and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  alert.type === "warning"
                    ? "bg-yellow-50 border-yellow-200"
                    : alert.type === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex-shrink-0">
                  {alert.type === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  )}
                  {alert.type === "success" && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {alert.type === "info" && (
                    <Clock className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.slice(-6).map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={(data.revenue / 250000) * 100}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">
                          ₹{(data.revenue / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Export Performance
                </CardTitle>
                <CardDescription>Volume and shipment metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">127.5 MT</div>
                    <p className="text-sm text-muted-foreground">
                      Total Volume This Month
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Shipments Completed</span>
                      <span className="font-medium">58/60</span>
                    </div>
                    <Progress value={96.7} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>In Transit</span>
                      <span className="font-medium">23</span>
                    </div>
                    <Progress value={38} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>On-time Delivery</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Analysis</CardTitle>
              <CardDescription>
                Revenue and volume breakdown by spice products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.volume} exported
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{product.revenue}</div>
                        <div
                          className={`flex items-center text-sm ${getTrendColor(product.trend)}`}
                        >
                          {getTrendIcon(product.trend)}
                          <span className="ml-1">{product.growth}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Market Share</span>
                        <span>{product.marketShare}%</span>
                      </div>
                      <Progress value={product.marketShare} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Markets Tab */}
        <TabsContent value="markets">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Market Performance
              </CardTitle>
              <CardDescription>
                Revenue and customer satisfaction by geography
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketPerformance.map((market, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{market.flag}</span>
                          <h3 className="font-semibold">{market.country}</h3>
                        </div>
                        <Badge
                          className={getTrendColor(market.trend)
                            .replace("text-", "bg-")
                            .replace("-600", "-100")}
                        >
                          {getTrendIcon(market.trend)}
                          <span className="ml-1">{market.growth}</span>
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Revenue
                          </span>
                          <span className="font-medium">{market.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Orders
                          </span>
                          <span className="font-medium">{market.orders}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Satisfaction
                            </span>
                            <span className="font-medium">
                              {market.satisfaction}%
                            </span>
                          </div>
                          <Progress
                            value={market.satisfaction}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Trends</CardTitle>
                <CardDescription>
                  Demand patterns throughout the year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Seasonal trend chart would be displayed here</p>
                    <p className="text-sm">
                      Interactive chart showing monthly patterns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Trends</CardTitle>
                <CardDescription>
                  Market price movements and volatility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Price trend analysis would be displayed here</p>
                    <p className="text-sm">Real-time market price tracking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecasts Tab */}
        <TabsContent value="forecasts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Business Forecasts
              </CardTitle>
              <CardDescription>
                Predictive analytics and future projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      ₹3.2L
                    </div>
                    <p className="text-sm font-medium">Projected Revenue</p>
                    <p className="text-xs text-muted-foreground">Next month</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      +15% growth
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      165 MT
                    </div>
                    <p className="text-sm font-medium">Projected Volume</p>
                    <p className="text-xs text-muted-foreground">Next month</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">
                      +12% increase
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      48
                    </div>
                    <p className="text-sm font-medium">New Clients</p>
                    <p className="text-xs text-muted-foreground">
                      Next quarter
                    </p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">
                      +8% expansion
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">Market Opportunities</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Morocco Market Entry</p>
                      <p className="text-sm text-muted-foreground">
                        Potential revenue: ₹45,000/month
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      High Potential
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Organic Product Line</p>
                      <p className="text-sm text-muted-foreground">
                        Premium pricing opportunity
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      Medium Potential
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
