import React, { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Download,
  Sparkles,
  CheckCircle,
  Clock,
  AlertTriangle,
  Brain,
  Globe,
  Package,
  Calculator,
  Shield,
  Truck,
} from "lucide-react";

interface ExportDocument {
  id: string;
  type: string;
  name: string;
  status: "generating" | "ready" | "error";
  progress: number;
  downloadUrl?: string;
  estimatedTime?: string;
  aiConfidence?: number;
}

interface ShipmentData {
  productName: string;
  hsCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  destination: string;
  buyer: {
    name: string;
    address: string;
    country: string;
  };
  seller: {
    name: string;
    address: string;
    country: string;
  };
  shipping: {
    incoterms: string;
    port: string;
    vessel?: string;
    eta?: string;
  };
}

const AIExportGenerator: React.FC = () => {
  const [documents, setDocuments] = useState<ExportDocument[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [shipmentData, setShipmentData] = useState<Partial<ShipmentData>>({});
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  const documentTypes = [
    {
      id: "commercial_invoice",
      name: "Commercial Invoice",
      description: "AI-generated invoice with auto-calculated duties",
      icon: FileText,
      estimatedTime: "2-3 minutes",
      aiFeatures: [
        "Auto HS Code detection",
        "Currency conversion",
        "Tax calculation",
      ],
    },
    {
      id: "certificate_origin",
      name: "Certificate of Origin",
      description: "Auto-compliant CoO with DGFT regulations",
      icon: Globe,
      estimatedTime: "3-5 minutes",
      aiFeatures: ["Origin verification", "Rule compliance", "Auto-filling"],
    },
    {
      id: "packing_list",
      name: "Packing List",
      description: "Detailed packing with weight calculations",
      icon: Package,
      estimatedTime: "1-2 minutes",
      aiFeatures: [
        "Volume optimization",
        "Weight distribution",
        "Container planning",
      ],
    },
    {
      id: "insurance_cert",
      name: "Insurance Certificate",
      description: "Risk-assessed insurance documentation",
      icon: Shield,
      estimatedTime: "2-4 minutes",
      aiFeatures: [
        "Risk assessment",
        "Premium calculation",
        "Coverage optimization",
      ],
    },
    {
      id: "bill_of_lading",
      name: "Bill of Lading",
      description: "Smart B/L with logistics optimization",
      icon: Truck,
      estimatedTime: "3-6 minutes",
      aiFeatures: [
        "Route optimization",
        "Port selection",
        "Transit time prediction",
      ],
    },
  ];

  const generateDocument = async (docType: string) => {
    setIsGenerating(true);

    const newDoc: ExportDocument = {
      id: Date.now().toString(),
      type: docType,
      name: documentTypes.find((d) => d.id === docType)?.name || docType,
      status: "generating",
      progress: 0,
      estimatedTime: documentTypes.find((d) => d.id === docType)?.estimatedTime,
      aiConfidence: 0,
    };

    setDocuments((prev) => [...prev, newDoc]);

    // Simulate AI document generation with progressive updates
    const progressSteps = [
      { progress: 15, message: "Analyzing shipment data..." },
      { progress: 30, message: "Applying DGFT regulations..." },
      { progress: 50, message: "Calculating duties and taxes..." },
      { progress: 70, message: "Generating document content..." },
      { progress: 85, message: "Validating compliance..." },
      { progress: 100, message: "Document ready for download!" },
    ];

    for (const step of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDoc.id
            ? {
                ...doc,
                progress: step.progress,
                aiConfidence: Math.min(95, step.progress - 5),
              }
            : doc,
        ),
      );
    }

    // Mark as complete
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === newDoc.id
          ? {
              ...doc,
              status: "ready",
              downloadUrl: `/api/export/download/${newDoc.id}`,
              aiConfidence: 95,
            }
          : doc,
      ),
    );

    setIsGenerating(false);

    // Add AI insights
    const insights = generateAIInsights(docType);
    setAiInsights((prev) => [...prev, ...insights]);
  };

  const generateAIInsights = (docType: string): string[] => {
    const insightMap: Record<string, string[]> = {
      commercial_invoice: [
        "💡 AI detected optimal HS Code: 090411 for your cardamom export",
        "💰 Suggested pricing adjustment: +5% based on market trends",
        "📊 Tax optimization: Use MEIS scheme for additional 2% benefit",
      ],
      certificate_origin: [
        "🌍 Origin compliance: 100% Indian origin verified",
        "📋 DGFT requirement: Additional phytosanitary certificate needed",
        "⚡ Fast-track available: Apply for AEO status for 50% faster clearance",
      ],
      packing_list: [
        "📦 Container optimization: 23% space saved with new arrangement",
        "⚖️ Weight distribution: Optimized for port handling efficiency",
        "🚚 Suggested: Use 20ft containers instead of 40ft for this shipment",
      ],
    };

    return (
      insightMap[docType] || ["✨ AI analysis complete - document optimized"]
    );
  };

  const downloadDocument = (doc: ExportDocument) => {
    // Simulate download
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${doc.name.replace(/\s+/g, "_")}_${doc.id}.pdf`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="modern-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-2.5">
              <Brain className="w-full h-full text-white" />
            </div>
            <div>
              <CardTitle className="text-white">
                AI Export Document Generator
              </CardTitle>
              <CardDescription className="text-gray-400">
                Generate compliant export documents with 95% accuracy using AI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">95%</div>
              <div className="text-sm text-gray-400">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">2-6 min</div>
              <div className="text-sm text-gray-400">Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-gray-400">DGFT Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Shipment Data */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-white">Shipment Information</CardTitle>
          <CardDescription className="text-gray-400">
            Enter basic details for AI-powered document generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Product Name</Label>
              <Input
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., Organic Cardamom AAA Grade"
                value={shipmentData.productName || ""}
                onChange={(e) =>
                  setShipmentData((prev) => ({
                    ...prev,
                    productName: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label className="text-white">Destination Country</Label>
              <Select
                value={shipmentData.destination || ""}
                onValueChange={(value) =>
                  setShipmentData((prev) => ({ ...prev, destination: value }))
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uae">United Arab Emirates</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Quantity</Label>
              <Input
                type="number"
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., 1000"
                value={shipmentData.quantity || ""}
                onChange={(e) =>
                  setShipmentData((prev) => ({
                    ...prev,
                    quantity: parseFloat(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label className="text-white">Unit Price (USD)</Label>
              <Input
                type="number"
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., 25.50"
                value={shipmentData.unitPrice || ""}
                onChange={(e) =>
                  setShipmentData((prev) => ({
                    ...prev,
                    unitPrice: parseFloat(e.target.value),
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          return (
            <Card
              key={docType.id}
              className="modern-card hover:border-white/20 transition-all"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">
                      {docType.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {docType.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm">{docType.description}</p>

                <div className="space-y-2">
                  <Label className="text-white text-xs">AI Features:</Label>
                  <div className="flex flex-wrap gap-1">
                    {docType.aiFeatures.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-purple-500/30 text-purple-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full modern-button"
                  onClick={() => generateDocument(docType.id)}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generated Documents */}
      {documents.length > 0 && (
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-white">Generated Documents</CardTitle>
            <CardDescription className="text-gray-400">
              Track AI document generation progress and download completed files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg p-1.5 ${
                        doc.status === "ready"
                          ? "bg-emerald-500"
                          : doc.status === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {doc.status === "ready" ? (
                        <CheckCircle className="w-full h-full text-white" />
                      ) : doc.status === "error" ? (
                        <AlertTriangle className="w-full h-full text-white" />
                      ) : (
                        <Clock className="w-full h-full text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{doc.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>AI Confidence: {doc.aiConfidence}%</span>
                        {doc.estimatedTime && (
                          <span>• ETA: {doc.estimatedTime}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {doc.status === "ready" && (
                    <Button
                      size="sm"
                      className="modern-button"
                      onClick={() => downloadDocument(doc)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>

                {doc.status === "generating" && (
                  <div className="space-y-2">
                    <Progress value={doc.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Generating...</span>
                      <span>{doc.progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                >
                  <p className="text-white text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIExportGenerator;
