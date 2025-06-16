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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Target,
  DollarSign,
  FileText,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  Package,
  Handshake,
  BarChart3,
  Filter,
  Search,
  Download,
  Upload,
} from "lucide-react";

const CRM = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // Mock data for leads
  const leads = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      company: "Dubai Spice Trading Co.",
      email: "ahmed@dubaispice.ae",
      phone: "+971-50-123-4567",
      country: "UAE",
      flag: "🇦🇪",
      status: "hot",
      value: "$25,000",
      product: "Cardamom Premium",
      lastContact: "2024-12-20",
      source: "Trade Show",
      probability: 85,
      notes: "Interested in bulk cardamom orders for Q1 2025",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "London Spice Importers",
      email: "sarah@londonspice.co.uk",
      phone: "+44-20-7123-4567",
      country: "UK",
      flag: "🇬🇧",
      status: "warm",
      value: "$18,500",
      product: "Organic Turmeric",
      lastContact: "2024-12-18",
      source: "Website Inquiry",
      probability: 65,
      notes: "Requires organic certification documentation",
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      company: "Kuwait Food Industries",
      email: "mohammed@kuwaitfood.kw",
      phone: "+965-9876-5432",
      country: "Kuwait",
      flag: "🇰🇼",
      status: "cold",
      value: "$12,000",
      product: "Black Pepper",
      lastContact: "2024-12-15",
      source: "Cold Email",
      probability: 30,
      notes: "Price sensitive, looking for competitive rates",
    },
    {
      id: 4,
      name: "Fatima Al-Zahra",
      company: "Casablanca Spice Hub",
      email: "fatima@casablancaspice.ma",
      phone: "+212-522-123-456",
      country: "Morocco",
      flag: "🇲🇦",
      status: "hot",
      value: "$30,000",
      product: "Mixed Spices Package",
      lastContact: "2024-12-21",
      source: "Referral",
      probability: 90,
      notes: "Ready to place order, waiting for final quote",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Al-Baraka Trading LLC",
      contact: "Omar Al-Mansouri",
      country: "UAE",
      flag: "🇦🇪",
      totalOrders: 15,
      totalValue: "$285,000",
      lastOrder: "2024-12-15",
      status: "active",
      products: ["Cardamom", "Black Pepper", "Turmeric"],
    },
    {
      id: 2,
      name: "Royal Spices Ltd",
      contact: "James Mitchell",
      country: "UK",
      flag: "🇬🇧",
      totalOrders: 22,
      totalValue: "$420,000",
      lastOrder: "2024-12-10",
      status: "active",
      products: ["Organic Range", "Premium Spices"],
    },
    {
      id: 3,
      name: "Gulf Spice Distribution",
      contact: "Ali Al-Kuwari",
      country: "Kuwait",
      flag: "🇰🇼",
      totalOrders: 8,
      totalValue: "$156,000",
      lastOrder: "2024-11-28",
      status: "inactive",
      products: ["Bulk Spices", "Rice"],
    },
  ];

  const salesMetrics = [
    {
      label: "Total Leads",
      value: "156",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Hot Leads",
      value: "23",
      change: "+5%",
      icon: Target,
      color: "text-red-600",
    },
    {
      label: "Pipeline Value",
      value: "$1.2M",
      change: "+18%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Conversion Rate",
      value: "28%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "hot":
        return "bg-red-100 text-red-800";
      case "warm":
        return "bg-yellow-100 text-yellow-800";
      case "cold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "hot":
        return <AlertCircle className="w-3 h-3" />;
      case "warm":
        return <Clock className="w-3 h-3" />;
      case "cold":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">CRM & Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Manage leads, track customers, and boost your spice export sales
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Capture new potential customer information
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input id="company" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uae">🇦🇪 UAE</SelectItem>
                      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                      <SelectItem value="kuwait">🇰🇼 Kuwait</SelectItem>
                      <SelectItem value="morocco">🇲🇦 Morocco</SelectItem>
                      <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddLeadOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddLeadOpen(false)}>
                  Save Lead
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {salesMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                  <span className="text-green-600">{metric.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Lead Management</CardTitle>
                  <CardDescription>
                    Track and manage potential customers
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{lead.name}</h4>
                          <span className="text-lg">{lead.flag}</span>
                          <Badge className={getStatusColor(lead.status)}>
                            {getStatusIcon(lead.status)}
                            <span className="ml-1">
                              {lead.status.toUpperCase()}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {lead.company}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lead.product} • Last contact: {lead.lastContact}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{lead.value}</div>
                      <div className="text-sm text-muted-foreground">
                        {lead.probability}% probability
                      </div>
                      <Progress
                        value={lead.probability}
                        className="w-20 h-2 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Portfolio</CardTitle>
              <CardDescription>
                Manage existing customer relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                  <Card
                    key={customer.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{customer.flag}</span>
                          <div>
                            <CardTitle className="text-lg">
                              {customer.name}
                            </CardTitle>
                            <CardDescription>
                              {customer.contact}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={
                            customer.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Total Orders
                          </span>
                          <span className="font-medium">
                            {customer.totalOrders}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Total Value
                          </span>
                          <span className="font-medium">
                            {customer.totalValue}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Last Order
                          </span>
                          <span className="font-medium">
                            {customer.lastOrder}
                          </span>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-muted-foreground mb-2">
                            Products:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {customer.products.map((product, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Sales Pipeline
                </CardTitle>
                <CardDescription>
                  Track deals through sales stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium">Hot Prospects</p>
                      <p className="text-sm text-muted-foreground">
                        Ready to close
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$285,000</p>
                      <p className="text-sm text-muted-foreground">8 deals</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">Warm Leads</p>
                      <p className="text-sm text-muted-foreground">
                        In negotiation
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$450,000</p>
                      <p className="text-sm text-muted-foreground">15 deals</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cold Prospects</p>
                      <p className="text-sm text-muted-foreground">
                        Initial contact
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$320,000</p>
                      <p className="text-sm text-muted-foreground">25 deals</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Market Distribution
                </CardTitle>
                <CardDescription>Sales by geographic region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🇦🇪</span>
                      <span>UAE</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={75} className="w-20" />
                      <span className="text-sm font-medium">$750K</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🇬🇧</span>
                      <span>UK</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-20" />
                      <span className="text-sm font-medium">$420K</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🇰🇼</span>
                      <span>Kuwait</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">$280K</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🌍</span>
                      <span>Africa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={35} className="w-20" />
                      <span className="text-sm font-medium">$185K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Lead Sources
                </CardTitle>
                <CardDescription>
                  Where your leads are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Trade Shows</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={80} className="w-24" />
                      <span className="text-sm">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Website Inquiries</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-24" />
                      <span className="text-sm">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Referrals</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={40} className="w-24" />
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cold Outreach</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={20} className="w-24" />
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Top Products
                </CardTitle>
                <CardDescription>
                  Best performing spice products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Premium Cardamom</p>
                      <p className="text-sm text-muted-foreground">Grade AAA</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$450K</p>
                      <p className="text-sm text-green-600">+15%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Black Pepper</p>
                      <p className="text-sm text-muted-foreground">
                        Bold & Pungent
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$320K</p>
                      <p className="text-sm text-green-600">+8%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Organic Turmeric</p>
                      <p className="text-sm text-muted-foreground">
                        High Curcumin
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$285K</p>
                      <p className="text-sm text-green-600">+12%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRM;
