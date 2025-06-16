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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Truck,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Ship,
  Plane,
  Navigation,
  Download,
  Eye,
  Edit,
} from "lucide-react";

const ShipmentTracking = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "customs":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-gray-100 text-gray-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "in_transit":
        return <Truck className="w-4 h-4" />;
      case "customs":
        return <AlertTriangle className="w-4 h-4" />;
      case "preparing":
        return <Package className="w-4 h-4" />;
      case "delayed":
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shipment Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your export shipments from origin to destination
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isNewShipmentOpen} onOpenChange={setIsNewShipmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Shipment</DialogTitle>
                <DialogDescription>
                  Add a new export shipment to track
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shipment-id" className="text-right">
                    Shipment ID
                  </Label>
                  <Input id="shipment-id" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destination" className="text-right">
                    Destination
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uae">🇦🇪 Dubai, UAE</SelectItem>
                      <SelectItem value="uk">🇬🇧 London, UK</SelectItem>
                      <SelectItem value="kuwait">🇰🇼 Kuwait City</SelectItem>
                      <SelectItem value="nigeria">🇳🇬 Lagos, Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product" className="text-right">
                    Product
                  </Label>
                  <Input
                    id="product"
                    placeholder="e.g., Cardamom AAA Grade"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 5.2 MT"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="eta" className="text-right">
                    Expected Date
                  </Label>
                  <Input id="eta" type="date" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsNewShipmentOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsNewShipmentOpen(false)}>
                  Create Shipment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Shipments
                </p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  In Transit
                </p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Truck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  At Customs
                </p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Delivered
                </p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shipments by ID, destination, or product..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shipment Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="in_transit">In Transit</TabsTrigger>
          <TabsTrigger value="customs">At Customs</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="text-center py-12">
              <Truck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No shipments found</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your first export shipment
              </p>
              <Button onClick={() => setIsNewShipmentOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Shipment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transportation Methods */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Transportation Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Sea Freight</h4>
              <p className="text-sm text-muted-foreground">
                Cost-effective for bulk shipments
              </p>
              <Badge variant="outline" className="mt-2">
                15-30 days
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Plane className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Air Freight</h4>
              <p className="text-sm text-muted-foreground">
                Fast delivery for urgent shipments
              </p>
              <Badge variant="outline" className="mt-2">
                3-7 days
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Land Transport</h4>
              <p className="text-sm text-muted-foreground">
                Regional deliveries and last-mile
              </p>
              <Badge variant="outline" className="mt-2">
                1-5 days
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracking;
