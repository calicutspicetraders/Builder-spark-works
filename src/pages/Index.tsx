import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import {
  ArrowRight,
  Globe,
  Shield,
  Truck,
  Star,
  MapPin,
  Leaf,
  Award,
  TrendingUp,
  Users,
  Package,
  BarChart3,
} from "lucide-react";

const Index = () => {
  const spiceCategories = [
    {
      name: "Cardamom",
      image: "🫚",
      quality: "Premium AAA",
      origin: "Western Ghats",
    },
    {
      name: "Black Pepper",
      image: "⚫",
      quality: "Bold & Pungent",
      origin: "Malabar Coast",
    },
    {
      name: "Turmeric",
      image: "🟡",
      quality: "High Curcumin",
      origin: "Kerala Farms",
    },
    {
      name: "Ginger",
      image: "🫚",
      quality: "Fresh & Dried",
      origin: "Hill Stations",
    },
    {
      name: "Coriander",
      image: "🌿",
      quality: "Aromatic Seeds",
      origin: "Organic Certified",
    },
    {
      name: "Cumin",
      image: "🟤",
      quality: "Pure & Natural",
      origin: "Selected Farms",
    },
    {
      name: "Fennel",
      image: "🌾",
      quality: "Sweet Variety",
      origin: "Traditional Methods",
    },
    {
      name: "Red Chilli",
      image: "🌶️",
      quality: "Various Heat Levels",
      origin: "Kerala Varieties",
    },
    {
      name: "Rice",
      image: "🌾",
      quality: "Basmati & Traditional",
      origin: "Premium Grains",
    },
  ];

  const targetMarkets = [
    {
      country: "UAE",
      flag: "🇦🇪",
      specialties: ["Halal Certified", "Bulk Orders", "Regular Supply"],
    },
    {
      country: "Kuwait",
      flag: "🇰🇼",
      specialties: ["Premium Quality", "Custom Packaging", "Fast Delivery"],
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      specialties: ["Organic Certified", "Retail Packaging", "Quality Assured"],
    },
    {
      country: "African Markets",
      flag: "🌍",
      specialties: ["Bulk Export", "Competitive Pricing", "Various Grades"],
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
      label: "Happy Clients",
      value: "150+ Partners",
      color: "text-blue-600",
    },
    {
      icon: Package,
      label: "Product Range",
      value: "9+ Categories",
      color: "text-purple-600",
    },
    {
      icon: Globe,
      label: "Countries",
      value: "15+ Markets",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2">
                <Leaf className="w-4 h-4 mr-2" />
                Kerala's Premium Spice Exporters Since 2020
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-brand-gold-600 bg-clip-text text-transparent">
              Calicut Spice Traders LLP
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your trusted partner for premium Kerala spices export to global
              markets. From the aromatic hills of Western Ghats to your
              international destinations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                View Our Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Globe className="mr-2 w-5 h-5" />
                Export Markets
              </Button>
            </div>

            {/* Stats */}
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

      {/* Spice Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Premium Spice Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sourced directly from Kerala's finest farms and processed with
              traditional methods to ensure maximum flavor and quality for our
              international partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spiceCategories.map((spice, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{spice.image}</div>
                  <CardTitle className="text-xl">{spice.name}</CardTitle>
                  <CardDescription>{spice.quality}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {spice.origin}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Badge
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      Export Quality
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Global Reach
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We proudly serve premium spice markets across four major regions,
              ensuring quality compliance and timely delivery for all our
              international partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetMarkets.map((market, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="text-6xl mb-4">{market.flag}</div>
                  <CardTitle className="text-xl">{market.country}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {market.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Quality & Compliance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">FSSAI Certified</h3>
                <p className="text-muted-foreground">
                  Food safety standards compliance
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-brand-gold-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">ISO 22000</h3>
                <p className="text-muted-foreground">
                  International quality management
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Leaf className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Spice Board Registered
                </h3>
                <p className="text-muted-foreground">
                  Government certified exporter
                </p>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">
                    Reliable Export Solutions
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  From farm to your doorstep - we handle all export
                  documentation, quality control, and logistics to ensure your
                  spices arrive fresh and compliant.
                </p>
                <Button size="lg" className="mx-auto">
                  <BarChart3 className="mr-2 w-5 h-5" />
                  Access Workspace Dashboard
                </Button>
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
                Premium Kerala spices for global markets. Quality, compliance,
                and reliability in every shipment.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <div>Product Catalog</div>
                <div>Export Documentation</div>
                <div>Quality Certificates</div>
                <div>Contact Partners</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Workspace Access</h4>
              <p className="text-primary-foreground/80 mb-4">
                Team members and partners can access our digital workspace for
                real-time updates, documents, and communication tools.
              </p>
              <Button variant="secondary">Login to Workspace</Button>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>
              &copy; 2024 Calicut Spice Traders LLP. All rights reserved. |
              Kerala, India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
