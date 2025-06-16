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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Plus,
  Code,
  Puzzle,
  Shield,
  Database,
  Cloud,
  Zap,
  Monitor,
  Terminal,
  Download,
  Upload,
  Trash2,
  Edit,
  Play,
  Save,
  RefreshCw,
  Key,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  Server,
  HardDrive,
  Cpu,
  Globe,
} from "lucide-react";

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("plugins");
  const [isInstallPluginOpen, setIsInstallPluginOpen] = useState(false);
  const [isCustomCodeOpen, setIsCustomCodeOpen] = useState(false);
  const [customCode, setCustomCode] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 header-safe">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold">SuperAdmin Panel</h1>
            <Badge variant="destructive">Restricted Access</Badge>
          </div>
          <p className="text-muted-foreground">
            Advanced system configuration and plugin management
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Monitor className="w-4 h-4 mr-2" />
            System Status
          </Button>
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Logs
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  System Health
                </p>
                <p className="text-2xl font-bold text-green-600">100%</p>
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
                  Active Plugins
                </p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Puzzle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Custom Scripts
                </p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Code className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="text-sm font-bold">Just now</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main SuperAdmin Interface */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="plugins">Plugins</TabsTrigger>
          <TabsTrigger value="custom-code">Custom Code</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Plugins Tab */}
        <TabsContent value="plugins">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Puzzle className="w-5 h-5 mr-2" />
                      Plugin Management
                    </CardTitle>
                    <CardDescription>
                      Install and manage workflow enhancement plugins
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isInstallPluginOpen}
                    onOpenChange={setIsInstallPluginOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Install Plugin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Install New Plugin</DialogTitle>
                        <DialogDescription>
                          Add a new plugin to enhance workspace functionality
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="plugin-name" className="text-right">
                            Name
                          </Label>
                          <Input id="plugin-name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="plugin-source" className="text-right">
                            Source
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="npm">NPM Package</SelectItem>
                              <SelectItem value="github">
                                GitHub Repository
                              </SelectItem>
                              <SelectItem value="url">Custom URL</SelectItem>
                              <SelectItem value="file">Upload File</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="plugin-url" className="text-right">
                            Package/URL
                          </Label>
                          <Input id="plugin-url" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="plugin-config" className="text-right">
                            Config
                          </Label>
                          <Textarea
                            id="plugin-config"
                            className="col-span-3"
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsInstallPluginOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsInstallPluginOpen(false)}>
                          Install Plugin
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Puzzle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No Plugins Installed
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Install plugins to enhance workflow automation,
                    integrations, and custom features
                  </p>
                  <Button onClick={() => setIsInstallPluginOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Install Your First Plugin
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plugin Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Workflow Automation
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Automate repetitive tasks and business processes
                  </p>
                  <Badge variant="outline">0 plugins</Badge>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <Globe className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">API Integrations</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Connect with external services and platforms
                  </p>
                  <Badge variant="outline">0 plugins</Badge>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <Database className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Data Processing</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Advanced data analysis and reporting tools
                  </p>
                  <Badge variant="outline">0 plugins</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Custom Code Tab */}
        <TabsContent value="custom-code">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Custom Code Editor
                    </CardTitle>
                    <CardDescription>
                      Write and execute custom scripts for advanced
                      functionality
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Script
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="script-name">Script Name:</Label>
                    <Input
                      id="script-name"
                      placeholder="Enter script name"
                      className="max-w-xs"
                    />
                    <Select>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Textarea
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      placeholder="// Write your custom code here
// Example: Automated export report generation
function generateExportReport() {
  // Your custom logic here
  console.log('Generating automated export report...');
}

// Example: Custom data validation
function validateSpiceQuality(data) {
  // Your validation logic
  return data.quality >= 'A' && data.certification.includes('organic');
}

// Execute your functions
generateExportReport();"
                      className="min-h-[400px] font-mono text-sm"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                      <Button size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Execute
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">Ready to execute</Badge>
                      <span className="text-sm text-muted-foreground">
                        Last saved: Never
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Terminal className="w-3 h-3 mr-1" />
                        Console
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saved Scripts */}
            <Card>
              <CardHeader>
                <CardTitle>Saved Scripts</CardTitle>
                <CardDescription>
                  Manage your custom automation scripts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Code className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No Custom Scripts
                  </h3>
                  <p className="text-muted-foreground">
                    Create your first custom script to automate workflows
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="w-5 h-5 mr-2" />
                External Integrations
              </CardTitle>
              <CardDescription>
                Configure connections to external services and APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Database className="h-12 w-12 text-green-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      MySQL Integration
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Direct database access and custom queries
                    </p>
                    <Button variant="outline" className="w-full">
                      Configure
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Globe className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">API Endpoints</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Custom REST API endpoints for integrations
                    </p>
                    <Button variant="outline" className="w-full">
                      Setup
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Webhooks</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Real-time event notifications and triggers
                    </p>
                    <Button variant="outline" className="w-full">
                      Create
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Server className="h-12 w-12 text-purple-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Custom Services
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Deploy custom microservices and functions
                    </p>
                    <Button variant="outline" className="w-full">
                      Deploy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Database Management
              </CardTitle>
              <CardDescription>
                Direct database access and administration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <HardDrive className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                        <p className="font-medium">Database Size</p>
                        <p className="text-sm text-muted-foreground">
                          Loading...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Activity className="mx-auto h-8 w-8 text-green-600 mb-2" />
                        <p className="font-medium">Active Connections</p>
                        <p className="text-sm text-muted-foreground">0</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Clock className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                        <p className="font-medium">Last Backup</p>
                        <p className="text-sm text-muted-foreground">Never</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      SQL Console
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Backup
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Optimize
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="w-5 h-5 mr-2" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Advanced system settings and monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Cpu className="mx-auto h-8 w-8 text-red-600 mb-2" />
                        <p className="font-medium">CPU Usage</p>
                        <p className="text-sm text-muted-foreground">
                          Loading...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <HardDrive className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                        <p className="font-medium">Memory</p>
                        <p className="text-sm text-muted-foreground">
                          Loading...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Server className="mx-auto h-8 w-8 text-green-600 mb-2" />
                        <p className="font-medium">Uptime</p>
                        <p className="text-sm text-muted-foreground">
                          Loading...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Activity className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                        <p className="font-medium">Load Average</p>
                        <p className="text-sm text-muted-foreground">
                          Loading...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="text-center py-8">
                  <Monitor className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    System Monitoring
                  </h3>
                  <p className="text-muted-foreground">
                    Real-time system metrics and performance data will be
                    displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Management
              </CardTitle>
              <CardDescription>
                Advanced security settings and access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Access Control
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SuperAdmin Access</span>
                        <Badge variant="destructive">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Two-Factor Auth</span>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Session Timeout</span>
                        <span className="text-sm text-muted-foreground">
                          24 hours
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-yellow-600 flex items-center">
                        <Key className="w-4 h-4 mr-2" />
                        API Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">API Keys</span>
                        <Badge variant="outline">0 active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Rate Limiting</span>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SSL Certificate</span>
                        <Badge className="bg-green-100 text-green-800">
                          Valid
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Security Actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="w-full">
                      <Key className="w-4 h-4 mr-2" />
                      Generate API Key
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Audit Logs
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Scan
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Lock
                    </Button>
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

export default SuperAdmin;
