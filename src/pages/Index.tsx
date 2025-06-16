import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Globe,
  Shield,
  Star,
  Leaf,
  Award,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  Lock,
} from "lucide-react";

const Index = () => {
  const workspaceFeatures = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time export analytics and business intelligence",
      color: "text-blue-600",
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Secure document sharing and compliance tracking",
      color: "text-green-600",
    },
    {
      icon: MessageSquare,
      title: "Team Communication",
      description: "Integrated messaging and collaboration tools",
      color: "text-purple-600",
    },
    {
      icon: Package,
      title: "Shipment Tracking",
      description: "Monitor export shipments and delivery status",
      color: "text-orange-600",
    },
    {
      icon: Calendar,
      title: "Compliance Calendar",
      description: "Track certificates and regulatory deadlines",
      color: "text-red-600",
    },
    {
      icon: Settings,
      title: "Partner Management",
      description: "Manage team access and permissions",
      color: "text-gray-600",
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      label: "Export Volume",
      value: "500+ MT/Year",
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Active Partners",
      value: "5 Partners",
      color: "text-blue-600",
    },
    {
      icon: Globe,
      label: "Export Markets",
      value: "4+ Countries",
      color: "text-purple-600",
    },
    {
      icon: Star,
      label: "Compliance Score",
      value: "98.5%",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2">
                <Lock className="w-4 h-4 mr-2" />
                Secure Partner Workspace
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-brand-gold-600 bg-clip-text text-transparent">
              Workspace Dashboard
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Collaborate with your partners and manage your spice export
              business efficiently. Access real-time data, documents, and
              communication tools in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                <BarChart3 className="mr-2 w-5 h-5" />
                Access Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <MessageSquare className="mr-2 w-5 h-5" />
                Team Communication
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Workspace Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your spice export business and
              collaborate with your partners in one secure platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-lg bg-primary/10">
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <Badge
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access Control & Security */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Secure & Compliant Workspace
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Role-Based Access
                </h3>
                <p className="text-muted-foreground">
                  Secure partner access with customizable permissions
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-brand-gold-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Export Compliance
                </h3>
                <p className="text-muted-foreground">
                  Track certifications and regulatory requirements
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Leaf className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Business Intelligence
                </h3>
                <p className="text-muted-foreground">
                  Real-time analytics and performance monitoring
                </p>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">
                    Authorized Access Required
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  This workspace is exclusively for Calicut Spice Traders LLP
                  partners and authorized team members. Secure login required
                  for access to collaboration tools and business data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="mx-auto">
                    <BarChart3 className="mr-2 w-5 h-5" />
                    Access Workspace Dashboard
                  </Button>
                  <Button variant="outline" size="lg" className="mx-auto">
                    <MessageSquare className="mr-2 w-5 h-5" />
                    Partner Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6" />
                <span className="text-xl font-bold">
                  Calicut Spice Traders LLP
                </span>
              </div>
              <p className="text-primary-foreground/80">
                Secure collaboration workspace for partners and team members.
                Access business intelligence, documents, and communication
                tools.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Workspace Access</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <div>Analytics Dashboard</div>
                <div>Document Management</div>
                <div>Team Communication</div>
                <div>Compliance Tracking</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Partner Support</h4>
              <p className="text-primary-foreground/80 mb-4">
                Need help accessing the workspace or have questions about your
                account? Contact our support team.
              </p>
              <Button variant="secondary">Contact Support</Button>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>
              &copy; 2024 Calicut Spice Traders LLP. All rights reserved. |
              Secure Partner Workspace
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
