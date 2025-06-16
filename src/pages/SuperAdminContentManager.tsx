import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Image,
  FileText,
  Upload,
  Download,
  Save,
  Eye,
  Code,
  Palette,
  Settings,
  Globe,
  Sparkles,
  Shield,
  Database,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  Plus,
  Trash2,
  Edit,
  Copy,
  RefreshCw,
  Zap,
  Package,
  Puzzle,
  Paintbrush,
  MessageSquare,
} from "lucide-react";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "logo" | "plugin" | "custom";
  name: string;
  content: any;
  page: string;
  position: string;
  isActive: boolean;
  metadata?: {
    className?: string;
    style?: Record<string, any>;
    responsive?: {
      mobile?: boolean;
      tablet?: boolean;
      desktop?: boolean;
    };
  };
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  code: string;
  type: "component" | "script" | "style";
  isActive: boolean;
  pages: string[];
}

const SuperAdminContentManager = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [selectedPage, setSelectedPage] = useState("all");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const pages = [
    { id: "all", name: "All Pages", icon: Globe },
    { id: "home", name: "Homepage", icon: Monitor },
    { id: "admin", name: "Admin Dashboard", icon: Shield },
    { id: "analytics", name: "Analytics", icon: Database },
    { id: "communication", name: "Communication", icon: FileText },
    { id: "documents", name: "Documents", icon: FileText },
    { id: "crm", name: "CRM & Sales", icon: Package },
    { id: "navigation", name: "Navigation Bar", icon: Layers },
  ];

  // Load content blocks and plugins
  useEffect(() => {
    loadContentBlocks();
    loadPlugins();
  }, []);

  const loadContentBlocks = async () => {
    try {
      const response = await fetch("/api/superadmin/content-blocks");
      const data = await response.json();
      setContentBlocks(data);
    } catch (error) {
      console.error("Failed to load content blocks:", error);
      // Initialize with default content
      setContentBlocks([
        {
          id: "1",
          type: "logo",
          name: "Main Logo",
          content: {
            url: "/logo.svg",
            alt: "Calicut Spice Traders",
            width: 48,
            height: 48,
          },
          page: "navigation",
          position: "header-left",
          isActive: true,
          metadata: {
            className: "company-logo",
            responsive: { mobile: true, tablet: true, desktop: true },
          },
        },
        {
          id: "2",
          type: "text",
          name: "Company Name",
          content: {
            text: "Calicut Spice Traders",
            tag: "h1",
            styling: {
              fontSize: "20px",
              fontWeight: "700",
              background:
                "linear-gradient(to right, rgb(52, 211, 153), rgb(59, 130, 246))",
              backgroundClip: "text",
              color: "transparent",
            },
          },
          page: "navigation",
          position: "header-center",
          isActive: true,
        },
      ]);
    }
  };

  const loadPlugins = async () => {
    try {
      const response = await fetch("/api/superadmin/plugins");
      const data = await response.json();
      setPlugins(data);
    } catch (error) {
      console.error("Failed to load plugins:", error);
      setPlugins([]);
    }
  };

  const handleFileUpload = async (
    file: File,
    type: "image" | "logo" | "document",
  ) => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await fetch("/api/superadmin/upload", {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        },
      });

      const result = await response.json();

      if (result.success) {
        // Add new content block
        const newBlock: ContentBlock = {
          id: Date.now().toString(),
          type,
          name: file.name,
          content: {
            url: result.url,
            originalName: file.name,
            size: file.size,
            mimeType: file.type,
          },
          page: selectedPage === "all" ? "home" : selectedPage,
          position: "content",
          isActive: true,
        };

        setContentBlocks((prev) => [...prev, newBlock]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const updateContentBlock = async (
    id: string,
    updates: Partial<ContentBlock>,
  ) => {
    try {
      const response = await fetch(`/api/superadmin/content-blocks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setContentBlocks((prev) =>
          prev.map((block) =>
            block.id === id ? { ...block, ...updates } : block,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update content block:", error);
    }
  };

  const deleteContentBlock = async (id: string) => {
    try {
      const response = await fetch(`/api/superadmin/content-blocks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContentBlocks((prev) => prev.filter((block) => block.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete content block:", error);
    }
  };

  const createPlugin = async (plugin: Omit<Plugin, "id">) => {
    try {
      const response = await fetch("/api/superadmin/plugins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plugin),
      });

      const newPlugin = await response.json();
      setPlugins((prev) => [...prev, newPlugin]);
    } catch (error) {
      console.error("Failed to create plugin:", error);
    }
  };

  const getFilteredContent = () => {
    if (selectedPage === "all") return contentBlocks;
    return contentBlocks.filter((block) => block.page === selectedPage);
  };

  const getPreviewIcon = () => {
    switch (previewMode) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-2.5">
                <Paintbrush className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Content Management System
                </h1>
                <p className="text-gray-400">
                  Customize logos, content, and plugins across all pages
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-white/5 rounded-2xl p-2">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                className="rounded-xl"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("tablet")}
                className="rounded-xl"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className="rounded-xl"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
            <Button className="modern-button">
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
            <TabsTrigger
              value="content"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              <Image className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger
              value="plugins"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <Puzzle className="w-4 h-4 mr-2" />
              Plugins
            </TabsTrigger>
            <TabsTrigger
              value="themes"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Palette className="w-4 h-4 mr-2" />
              Themes
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-500 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Page Selector */}
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Page Selection</CardTitle>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="w-64 bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-white/20">
                    {pages.map((page) => {
                      const Icon = page.icon;
                      return (
                        <SelectItem key={page.id} value={page.id}>
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <span>{page.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content List */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="modern-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">
                        Content Blocks
                      </CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="modern-button">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Content
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card border-white/20 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">
                              Add New Content Block
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Create a new content block for your website
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="contentType"
                                  className="text-white"
                                >
                                  Content Type
                                </Label>
                                <Select>
                                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">
                                      Text Block
                                    </SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="logo">Logo</SelectItem>
                                    <SelectItem value="plugin">
                                      Plugin
                                    </SelectItem>
                                    <SelectItem value="custom">
                                      Custom HTML
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label
                                  htmlFor="contentName"
                                  className="text-white"
                                >
                                  Name
                                </Label>
                                <Input
                                  className="bg-white/5 border-white/10 text-white"
                                  placeholder="Content block name"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="content" className="text-white">
                                Content
                              </Label>
                              <Textarea
                                className="bg-white/5 border-white/10 text-white h-32"
                                placeholder="Enter your content here..."
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                className="border-white/20 text-white"
                              >
                                Cancel
                              </Button>
                              <Button className="modern-button">
                                Create Content Block
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getFilteredContent().map((block) => (
                        <div
                          key={block.id}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2">
                              {block.type === "text" && (
                                <FileText className="w-full h-full text-white" />
                              )}
                              {block.type === "image" && (
                                <Image className="w-full h-full text-white" />
                              )}
                              {block.type === "logo" && (
                                <Sparkles className="w-full h-full text-white" />
                              )}
                              {block.type === "plugin" && (
                                <Puzzle className="w-full h-full text-white" />
                              )}
                              {block.type === "custom" && (
                                <Code className="w-full h-full text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {block.name}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <span>{block.page}</span>
                                <span>•</span>
                                <span>{block.position}</span>
                                <span>•</span>
                                <Badge
                                  variant={
                                    block.isActive ? "default" : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {block.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={block.isActive}
                              onCheckedChange={(checked) =>
                                updateContentBlock(block.id, {
                                  isActive: checked,
                                })
                              }
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-red-400"
                              onClick={() => deleteContentBlock(block.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {getFilteredContent().length === 0 && (
                        <div className="text-center py-12">
                          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-white mb-2">
                            No content blocks found
                          </h3>
                          <p className="text-gray-400">
                            Create your first content block to get started
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Preview */}
              <div className="space-y-4">
                <Card className="modern-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Live Preview</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getPreviewIcon()}
                        <span className="text-sm text-gray-400 capitalize">
                          {previewMode}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`
                      border border-white/10 rounded-2xl bg-black/20 p-4
                      ${previewMode === "mobile" ? "max-w-sm mx-auto" : ""}
                      ${previewMode === "tablet" ? "max-w-md mx-auto" : ""}
                    `}
                    >
                      <div className="text-center py-8">
                        <Monitor className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-400">
                          Live preview will show your changes here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="modern-card">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full modern-button" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Preview
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate Content
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Media Management Tab */}
          <TabsContent value="media">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="text-white">Upload Media</CardTitle>
                  <CardDescription className="text-gray-400">
                    Upload images, logos, and other media files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">
                        Drag & drop files here
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Or click to browse files
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach((file) => {
                            const type = file.type.startsWith("image/")
                              ? "image"
                              : "document";
                            handleFileUpload(file, type);
                          });
                        }}
                      />
                      <label htmlFor="file-upload">
                        <Button className="modern-button" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </label>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">Uploading...</span>
                          <span className="text-gray-400">
                            {uploadProgress}%
                          </span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    {/* Logo Management */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">
                        Logo Management
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-blue-600 p-2">
                              <Sparkles className="w-full h-full text-white" />
                            </div>
                            <h5 className="font-medium text-white mb-1">
                              Main Logo
                            </h5>
                            <p className="text-xs text-gray-400 mb-3">
                              48x48 current
                            </p>
                            <Button size="sm" className="modern-button w-full">
                              <Upload className="w-3 h-3 mr-1" />
                              Replace
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-600 p-2 flex items-center justify-center">
                              <span className="text-white font-bold text-xl">
                                CS
                              </span>
                            </div>
                            <h5 className="font-medium text-white mb-1">
                              Favicon
                            </h5>
                            <p className="text-xs text-gray-400 mb-3">
                              32x32 current
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white w-full"
                            >
                              <Upload className="w-3 h-3 mr-1" />
                              Replace
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="text-white">Media Library</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage all uploaded media files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No media files yet
                    </h3>
                    <p className="text-gray-400">
                      Upload your first media file to get started
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plugins Tab */}
          <TabsContent value="plugins">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">
                        Plugin Manager
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Add custom functionality to your workspace
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="modern-button">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Plugin
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-white/20 max-w-4xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            Create New Plugin
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Add custom components, scripts, or styles to enhance
                            your workspace
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="pluginName"
                                className="text-white"
                              >
                                Plugin Name
                              </Label>
                              <Input
                                className="bg-white/5 border-white/10 text-white"
                                placeholder="My Custom Plugin"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="pluginType"
                                className="text-white"
                              >
                                Plugin Type
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="component">
                                    React Component
                                  </SelectItem>
                                  <SelectItem value="script">
                                    JavaScript
                                  </SelectItem>
                                  <SelectItem value="style">
                                    CSS Styles
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="pluginCode" className="text-white">
                              Plugin Code
                            </Label>
                            <Textarea
                              className="bg-white/5 border-white/10 text-white h-64 font-mono"
                              placeholder="// Enter your plugin code here..."
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              className="border-white/20 text-white"
                            >
                              Cancel
                            </Button>
                            <Button className="modern-button">
                              Create Plugin
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Puzzle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No plugins installed
                    </h3>
                    <p className="text-gray-400">
                      Create your first plugin to extend functionality
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="text-white">Plugin Templates</CardTitle>
                  <CardDescription className="text-gray-400">
                    Pre-built plugins for common functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Analytics Widget",
                        description: "Add Google Analytics or custom tracking",
                        icon: Database,
                        type: "script",
                      },
                      {
                        name: "Chat Widget",
                        description: "Customer support chat integration",
                        icon: MessageSquare,
                        type: "component",
                      },
                      {
                        name: "Custom Styling",
                        description: "Add custom CSS for unique designs",
                        icon: Palette,
                        type: "style",
                      },
                      {
                        name: "API Integration",
                        description: "Connect to external APIs and services",
                        icon: Zap,
                        type: "script",
                      },
                    ].map((template, index) => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                              <Icon className="w-full h-full text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {template.name}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {template.description}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" className="modern-button">
                            Install
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Themes Tab */}
          <TabsContent value="themes">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-white">
                  Theme Customization
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customize colors, fonts, and overall appearance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Palette className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Theme Editor Coming Soon
                  </h3>
                  <p className="text-gray-400">
                    Advanced theme customization tools will be available in the
                    next update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="text-white">Global Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure workspace-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Maintenance Mode</Label>
                      <p className="text-sm text-gray-400">
                        Put the website in maintenance mode
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Auto-save Changes</Label>
                      <p className="text-sm text-gray-400">
                        Automatically save content changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Cache Content</Label>
                      <p className="text-sm text-gray-400">
                        Enable content caching for better performance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="text-white">Backup & Export</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage backups and export settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full modern-button">
                    <Download className="w-4 h-4 mr-2" />
                    Create Full Backup
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Restore from Backup
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminContentManager;
