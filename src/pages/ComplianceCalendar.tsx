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
  Calendar,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Award,
  FileText,
  Bell,
  Download,
  Upload,
  RefreshCw,
  Filter,
} from "lucide-react";

const ComplianceCalendar = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  const statusColors = {
    expired: "bg-red-100 text-red-800",
    expiring: "bg-yellow-100 text-yellow-800",
    valid: "bg-green-100 text-green-800",
    pending: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="container mx-auto px-4 py-8 header-safe">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Compliance Calendar</h1>
          <p className="text-muted-foreground">
            Track certificates, regulations, and compliance deadlines
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Calendar
          </Button>
          <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Compliance Reminder</DialogTitle>
                <DialogDescription>
                  Set up a new compliance deadline or certificate renewal
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., FSSAI Certificate Renewal"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="license">License</SelectItem>
                      <SelectItem value="permit">Permit</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="regulation">Regulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="due-date" className="text-right">
                    Due Date
                  </Label>
                  <Input id="due-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reminder" className="text-right">
                    Reminder
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="When to remind" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days before</SelectItem>
                      <SelectItem value="15">15 days before</SelectItem>
                      <SelectItem value="7">7 days before</SelectItem>
                      <SelectItem value="1">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddReminderOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddReminderOpen(false)}>
                  Add Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Compliance Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Valid Certificates
                </p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Expiring Soon
                </p>
                <p className="text-2xl font-bold text-yellow-600">0</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Expired
                </p>
                <p className="text-2xl font-bold text-red-600">0</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Renewals
                </p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>

        {/* Calendar View */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Compliance Calendar
              </CardTitle>
              <CardDescription>
                View all compliance deadlines and renewals in calendar format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No events scheduled
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add compliance reminders to track important deadlines
                </p>
                <Button onClick={() => setIsAddReminderOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates */}
        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Certificates & Licenses
              </CardTitle>
              <CardDescription>
                Manage export certificates and business licenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Certificate Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <Shield className="h-12 w-12 text-green-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">FSSAI</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Food Safety Standards Authority
                      </p>
                      <Badge variant="outline">Not uploaded</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <Award className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">ISO 22000</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Food Safety Management System
                      </p>
                      <Badge variant="outline">Not uploaded</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <FileText className="h-12 w-12 text-purple-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Spice Board</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Export License Registration
                      </p>
                      <Badge variant="outline">Not uploaded</Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center py-8">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Upload Your Certificates
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add your compliance certificates to track expiry dates
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulations */}
        <TabsContent value="regulations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Export Regulations
              </CardTitle>
              <CardDescription>
                Stay updated with changing export regulations by country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      🇦🇪 UAE Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Halal Certification</span>
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Emirates Standards</span>
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Import Permits</span>
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      🇬🇧 UK Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Organic Certification</span>
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pesticide Standards</span>
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">UKCA Marking</span>
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audits */}
        <TabsContent value="audits">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Compliance Audits
              </CardTitle>
              <CardDescription>
                Track internal and external compliance audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No audits scheduled
                </h3>
                <p className="text-muted-foreground mb-4">
                  Schedule compliance audits and track their progress
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceCalendar;
