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
  FileText,
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Sparkles,
  Zap,
  Bot,
  Shield,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Share2,
  Star,
  File,
  Image,
  FileSpreadsheet,
  Brain,
  Wand2,
  FileCheck,
  FileX,
  FileImage,
  Folder,
  Hash,
  Calendar,
  Users,
  Globe,
} from "lucide-react";

const Documents = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const categories = [
    { id: "all", label: "All Documents", count: 0, icon: File },
    { id: "compliance", label: "Compliance", count: 0, icon: Shield },
    { id: "export", label: "Export Docs", count: 0, icon: Globe },
    { id: "quality", label: "Quality Reports", count: 0, icon: Award },
    { id: "legal", label: "Legal", count: 0, icon: FileCheck },
    { id: "ai-generated", label: "AI Generated", count: 0, icon: Bot },
  ];

  const documentTemplates = [
    {
      id: 1,
      name: "Export Certificate",
      description: "AI-generated export certificates with compliance data",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      fields: [
        "Product Name",
        "Destination Country",
        "Quantity",
        "Quality Grade",
      ],
      estimatedTime: "30 seconds",
    },
    {
      id: 2,
      name: "Quality Report",
      description: "Automated quality analysis reports with lab data",
      icon: Award,
      color: "from-emerald-500 to-teal-500",
      fields: [
        "Product Type",
        "Test Parameters",
        "Lab Results",
        "Compliance Status",
      ],
      estimatedTime: "45 seconds",
    },
    {
      id: 3,
      name: "Compliance Certificate",
      description: "FSSAI, ISO, and other compliance documentation",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      fields: ["Certificate Type", "Validity Period", "Compliance Standards"],
      estimatedTime: "60 seconds",
    },
    {
      id: 4,
      name: "Invoice & Shipping",
      description: "Complete invoice with shipping documentation",
      icon: FileText,
      color: "from-orange-500 to-red-500",
      fields: [
        "Client Details",
        "Product Items",
        "Shipping Address",
        "Payment Terms",
      ],
      estimatedTime: "40 seconds",
    },
  ];

  const recentDocuments: any[] = [];

  const getFileIcon = (format: string, aiGenerated: boolean = false) => {
    if (aiGenerated) {
      return <Bot className="w-5 h-5 text-purple-400" />;
    }
    switch (format) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-400" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="w-5 h-5 text-green-400" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <Image className="w-5 h-5 text-blue-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  const generateDocument = async (templateId: number) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation process
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsGeneratorOpen(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 p-2.5">
                <FileText className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Smart Documents
                </h1>
                <p className="text-gray-400">
                  AI-powered document generation and management
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-2xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
              <DialogTrigger asChild>
                <Button className="modern-button hover:scale-105 active:scale-95 transition-transform duration-200 touch-manipulation">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generator
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] glass-card border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-purple-400" />
                    AI Document Generator
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Generate professional documents using artificial
                    intelligence
                  </DialogDescription>
                </DialogHeader>

                {isGenerating ? (
                  <div className="py-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 animate-pulse">
                        <Brain className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Generating Document...
                      </h3>
                      <p className="text-gray-400">
                        AI is analyzing and creating your document
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Progress value={generationProgress} className="h-3" />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Processing...</span>
                        <span>{generationProgress}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documentTemplates.map((template) => {
                        const Icon = template.icon;
                        return (
                          <Card
                            key={template.id}
                            className="modern-card cursor-pointer group hover:scale-105 transition-all duration-300 bg-white/5 border-white/10"
                            onClick={() => generateDocument(template.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${template.color} p-2 group-hover:scale-110 transition-transform duration-300`}
                                >
                                  <Icon className="w-full h-full text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white text-sm mb-1">
                                    {template.name}
                                  </h4>
                                  <p className="text-xs text-gray-400 mb-2">
                                    {template.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Badge
                                      variant="outline"
                                      className="text-xs border-white/20 text-gray-300"
                                    >
                                      <Zap className="w-3 h-3 mr-1" />
                                      {template.estimatedTime}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-2xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] glass-card border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Upload Document
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Add a new document to your workspace
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="docName" className="text-right text-white">
                      Name
                    </Label>
                    <Input
                      id="docName"
                      className="col-span-3 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right text-white">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-white/20">
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="export">Export Documents</SelectItem>
                        <SelectItem value="quality">Quality Reports</SelectItem>
                        <SelectItem value="legal">Legal Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right text-white">
                      File
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      className="col-span-3 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadOpen(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsUploadOpen(false)}
                    className="modern-button"
                  >
                    Upload Document
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Documents
                  </p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5">
                  <FileText className="w-full h-full text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    AI Generated
                  </p>
                  <p className="text-2xl font-bold text-white">2</p>
                  <div className="flex items-center mt-1">
                    <Bot className="w-3 h-3 text-purple-400 mr-1" />
                    <span className="text-xs text-purple-400">100% AI</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-2.5">
                  <Bot className="w-full h-full text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Compliance Docs
                  </p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5">
                  <Shield className="w-full h-full text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-white">96.5%</p>
                  <div className="flex items-center mt-1">
                    <Sparkles className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-yellow-400">AI Accuracy</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-2.5">
                  <Award className="w-full h-full text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="modern-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents with AI..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-2xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                Smart Filter
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
          <TabsList className="grid w-full grid-cols-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-600 data-[state=active]:text-white flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-white/10 text-gray-300"
                  >
                    {category.count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab}>
            {recentDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentDocuments.map((doc) => (
                  <Card
                    key={doc.id}
                    className="modern-card group hover:scale-105 transition-all duration-300 overflow-hidden border-white/10"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.format, doc.aiGenerated)}
                          <div className="flex-1">
                            <CardTitle className="text-base text-white group-hover:text-gradient transition-all duration-300">
                              {doc.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-400">
                              {doc.type} • {doc.size}
                            </CardDescription>
                          </div>
                        </div>
                        {doc.aiGenerated && (
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Generated by:</span>
                          <span className="text-white">{doc.uploadedBy}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{doc.uploadDate}</span>
                        </div>
                        {doc.confidence && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">
                              AI Confidence:
                            </span>
                            <div className="flex items-center">
                              <Progress
                                value={doc.confidence}
                                className="w-12 h-2 mr-2"
                              />
                              <span className="text-emerald-400">
                                {doc.confidence}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="modern-card">
                <CardContent className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                    <Wand2 className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Generate Your First Document
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Use our AI-powered document generator to create professional
                    export documents instantly
                  </p>
                  <Button
                    onClick={() => setIsGeneratorOpen(true)}
                    className="modern-button"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start AI Generator
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documents;
