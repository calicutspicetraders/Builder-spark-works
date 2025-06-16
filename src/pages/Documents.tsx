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
  FileText,
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  FolderOpen,
  Shield,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Share2,
  Archive,
  Star,
  File,
  Image,
  FileSpreadsheet,
} from "lucide-react";

const Documents = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: "FSSAI Certificate 2024",
      type: "Certificate",
      category: "compliance",
      size: "2.4 MB",
      format: "pdf",
      uploadedBy: "Admin",
      uploadDate: "2024-12-20",
      expiryDate: "2025-12-20",
      status: "active",
      description: "Food Safety and Standards Authority certificate",
      tags: ["compliance", "fssai", "certificate"],
    },
    {
      id: 2,
      name: "ISO 22000 Certificate",
      type: "Certificate",
      category: "compliance",
      size: "1.8 MB",
      format: "pdf",
      uploadedBy: "Quality Team",
      uploadDate: "2024-12-15",
      expiryDate: "2027-12-15",
      status: "active",
      description: "International quality management certificate",
      tags: ["iso", "quality", "certificate"],
    },
    {
      id: 3,
      name: "UAE Export Invoice - SP2024001",
      type: "Invoice",
      category: "export",
      size: "845 KB",
      format: "pdf",
      uploadedBy: "Export Team",
      uploadDate: "2024-12-18",
      expiryDate: null,
      status: "active",
      description: "Export invoice for Dubai shipment",
      tags: ["export", "uae", "invoice", "cardamom"],
    },
    {
      id: 4,
      name: "Spice Board Registration",
      type: "License",
      category: "compliance",
      size: "1.2 MB",
      format: "pdf",
      uploadedBy: "Admin",
      uploadDate: "2024-12-10",
      expiryDate: "2026-12-10",
      status: "active",
      description: "Government spice board export license",
      tags: ["spice-board", "license", "export"],
    },
    {
      id: 5,
      name: "Product Catalog 2024",
      type: "Catalog",
      category: "marketing",
      size: "5.6 MB",
      format: "pdf",
      uploadedBy: "Marketing Team",
      uploadDate: "2024-12-05",
      expiryDate: null,
      status: "active",
      description: "Complete spice product catalog with pricing",
      tags: ["catalog", "products", "marketing"],
    },
    {
      id: 6,
      name: "UK Customs Declaration",
      type: "Declaration",
      category: "export",
      size: "678 KB",
      format: "pdf",
      uploadedBy: "Documentation",
      uploadDate: "2024-12-12",
      expiryDate: null,
      status: "processing",
      description: "Customs declaration for London shipment",
      tags: ["uk", "customs", "declaration"],
    },
    {
      id: 7,
      name: "Quality Test Report - Black Pepper",
      type: "Report",
      category: "quality",
      size: "1.5 MB",
      format: "pdf",
      uploadedBy: "Quality Lab",
      uploadDate: "2024-12-08",
      expiryDate: null,
      status: "active",
      description: "Laboratory quality analysis report",
      tags: ["quality", "test", "black-pepper"],
    },
    {
      id: 8,
      name: "Partner Agreement - Al Baraka Trading",
      type: "Contract",
      category: "legal",
      size: "2.1 MB",
      format: "pdf",
      uploadedBy: "Legal Team",
      uploadDate: "2024-11-28",
      expiryDate: "2025-11-28",
      status: "active",
      description: "Partnership agreement with UAE distributor",
      tags: ["contract", "partner", "uae"],
    },
  ];

  const categories = [
    { id: "all", label: "All Documents", count: documents.length },
    {
      id: "compliance",
      label: "Compliance",
      count: documents.filter((d) => d.category === "compliance").length,
    },
    {
      id: "export",
      label: "Export Documents",
      count: documents.filter((d) => d.category === "export").length,
    },
    {
      id: "quality",
      label: "Quality Reports",
      count: documents.filter((d) => d.category === "quality").length,
    },
    {
      id: "legal",
      label: "Legal Documents",
      count: documents.filter((d) => d.category === "legal").length,
    },
    {
      id: "marketing",
      label: "Marketing",
      count: documents.filter((d) => d.category === "marketing").length,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expiring":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (format) => {
    switch (format) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <Image className="w-5 h-5 text-blue-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesTab = activeTab === "all" || doc.category === activeTab;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesTab && matchesSearch;
  });

  const upcomingExpirations = documents.filter((doc) => {
    if (!doc.expiryDate) return false;
    const expiry = new Date(doc.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Management</h1>
          <p className="text-muted-foreground">
            Manage certificates, export documents, and compliance files
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Add a new document to the workspace
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="docName" className="text-right">
                    Name
                  </Label>
                  <Input id="docName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="export">Export Documents</SelectItem>
                      <SelectItem value="quality">Quality Reports</SelectItem>
                      <SelectItem value="legal">Legal Documents</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <Input id="file" type="file" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiry" className="text-right">
                    Expiry Date
                  </Label>
                  <Input id="expiry" type="date" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsUploadOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadOpen(false)}>
                  Upload Document
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
                  Total Documents
                </p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Compliance Docs
                </p>
                <p className="text-2xl font-bold">
                  {documents.filter((d) => d.category === "compliance").length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
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
                <p className="text-2xl font-bold">
                  {upcomingExpirations.length}
                </p>
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
                  Export Docs
                </p>
                <p className="text-2xl font-bold">
                  {documents.filter((d) => d.category === "export").length}
                </p>
              </div>
              <FolderOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expiration Alerts */}
      {upcomingExpirations.length > 0 && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Documents Expiring Soon
            </CardTitle>
            <CardDescription className="text-orange-700">
              These documents will expire within 30 days. Please renew them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExpirations.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-white rounded border"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.format)}
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {doc.expiryDate}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Renew
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
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

      {/* Document Categories */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="relative"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(doc.format)}
                      <div className="flex-1">
                        <CardTitle className="text-base">{doc.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {doc.type} • {doc.size}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {doc.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Uploaded by:
                      </span>
                      <span>{doc.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                    {doc.expiryDate && (
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Expires:</span>
                        <span>{doc.expiryDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {doc.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{doc.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Upload your first document to get started"}
                </p>
                <Button onClick={() => setIsUploadOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
