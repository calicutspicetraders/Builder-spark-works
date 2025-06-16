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
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Send,
  Plus,
  Phone,
  Video,
  Users,
  Search,
  Settings,
  Bell,
  Paperclip,
  Smile,
  MoreVertical,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Hash,
  AtSign,
  Calendar,
  FileText,
} from "lucide-react";

const Communication = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Export Team",
      type: "group",
      lastMessage: "UAE shipment SP-2024-001 has cleared customs",
      timestamp: "2 min ago",
      unread: 3,
      avatar: "ET",
      online: true,
      members: ["Rajesh Kumar", "Priya Nair", "Mohammed Ali"],
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      type: "direct",
      lastMessage: "Quality certificates for the cardamom batch are ready",
      timestamp: "15 min ago",
      unread: 1,
      avatar: "RK",
      online: true,
      role: "Export Manager",
    },
    {
      id: 3,
      name: "Quality Control",
      type: "group",
      lastMessage: "Lab results for turmeric samples uploaded to documents",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "QC",
      online: false,
      members: ["Priya Nair", "Lab Team", "Quality Inspectors"],
    },
    {
      id: 4,
      name: "Al-Baraka Trading (UAE)",
      type: "external",
      lastMessage: "Confirmed receipt of invoice, payment processing",
      timestamp: "3 hours ago",
      unread: 0,
      avatar: "AB",
      online: true,
      country: "🇦🇪",
    },
    {
      id: 5,
      name: "London Spice Importers",
      type: "external",
      lastMessage: "Request for organic certification documents",
      timestamp: "5 hours ago",
      unread: 2,
      avatar: "LS",
      online: false,
      country: "🇬🇧",
    },
    {
      id: 6,
      name: "Suresh Menon",
      type: "direct",
      lastMessage: "Logistics update: Kuwait shipment delayed by 1 day",
      timestamp: "Yesterday",
      unread: 0,
      avatar: "SM",
      online: false,
      role: "Logistics Coordinator",
    },
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: 1,
      sender: "Rajesh Kumar",
      content: "Good morning team! UAE shipment SP-2024-001 update:",
      timestamp: "09:15 AM",
      type: "text",
      sent: false,
    },
    {
      id: 2,
      sender: "Rajesh Kumar",
      content:
        "✅ Customs clearance completed\n✅ Documents verified\n🚚 In transit to Dubai warehouse",
      timestamp: "09:16 AM",
      type: "text",
      sent: false,
    },
    {
      id: 3,
      sender: "You",
      content: "Excellent! What's the expected delivery date?",
      timestamp: "09:18 AM",
      type: "text",
      sent: true,
    },
    {
      id: 4,
      sender: "Mohammed Ali",
      content: "Based on current logistics, delivery expected by Dec 28th",
      timestamp: "09:20 AM",
      type: "text",
      sent: false,
    },
    {
      id: 5,
      sender: "Priya Nair",
      content: "Quality certificates attached to shipment docs ✓",
      timestamp: "09:22 AM",
      type: "text",
      sent: false,
    },
    {
      id: 6,
      sender: "You",
      content: "Perfect! I'll notify the client about the delivery timeline.",
      timestamp: "09:25 AM",
      type: "text",
      sent: true,
    },
  ];

  // Announcement data
  const announcements = [
    {
      id: 1,
      title: "New Export Regulation Update",
      content:
        "UAE has updated their halal certification requirements for spice imports. All future shipments must include updated certificates.",
      author: "Admin",
      timestamp: "2 hours ago",
      priority: "high",
      category: "Compliance",
    },
    {
      id: 2,
      title: "Year-End Export Targets",
      content:
        "We're 85% towards our annual export target! Great work team. Let's push for the remaining 15% in December.",
      author: "Management",
      timestamp: "1 day ago",
      priority: "medium",
      category: "Business",
    },
    {
      id: 3,
      title: "Holiday Schedule",
      content:
        "Office will be closed from Dec 25-26 for Christmas holidays. Emergency contacts available for urgent matters.",
      author: "HR Team",
      timestamp: "3 days ago",
      priority: "low",
      category: "General",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConversationType = (type) => {
    switch (type) {
      case "group":
        return <Users className="w-3 h-3" />;
      case "external":
        return <Globe className="w-3 h-3" />;
      default:
        return <MessageSquare className="w-3 h-3" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Communication</h1>
          <p className="text-muted-foreground">
            Connect with your team and international partners
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Conference Call
          </Button>
          <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Conversation</DialogTitle>
                <DialogDescription>
                  Send a message to team members or partners
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipient" className="text-right">
                    To
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rajesh">
                        Rajesh Kumar - Export Manager
                      </SelectItem>
                      <SelectItem value="priya">
                        Priya Nair - Quality Control
                      </SelectItem>
                      <SelectItem value="mohammed">
                        Mohammed Ali - Documentation
                      </SelectItem>
                      <SelectItem value="export-team">
                        Export Team (Group)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input id="subject" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea id="message" className="col-span-3" rows={4} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsNewChatOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsNewChatOpen(false)}>
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Communication Interface */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-accent/50 transition-colors ${
                        selectedChat === conversation.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedChat(conversation.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="text-sm">
                            {conversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                        {conversation.country && (
                          <div className="absolute -top-1 -right-1 text-xs">
                            {conversation.country}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <p className="text-sm font-medium truncate">
                              {conversation.name}
                            </p>
                            {getConversationType(conversation.type)}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-muted-foreground">
                              {conversation.timestamp}
                            </span>
                            {conversation.unread > 0 && (
                              <Badge
                                variant="default"
                                className="h-5 w-5 p-0 text-xs"
                              >
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.role && (
                          <p className="text-xs text-blue-600">
                            {conversation.role}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="lg:col-span-2">
              {selectedChat ? (
                <>
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {
                              conversations.find((c) => c.id === selectedChat)
                                ?.avatar
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {
                              conversations.find((c) => c.id === selectedChat)
                                ?.name
                            }
                          </CardTitle>
                          <CardDescription>
                            {conversations.find((c) => c.id === selectedChat)
                              ?.type === "group"
                              ? `${conversations.find((c) => c.id === selectedChat)?.members?.length} members`
                              : conversations.find((c) => c.id === selectedChat)
                                  ?.role || "External Partner"}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Messages Area */}
                    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sent
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {!message.sent && (
                              <p className="text-xs font-medium mb-1 text-blue-600">
                                {message.sender}
                              </p>
                            )}
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sent
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              // Handle send message
                              setNewMessage("");
                            }
                          }}
                        />
                        <Button variant="ghost" size="sm">
                          <Smile className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setNewMessage("")}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the left to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Company Announcements</CardTitle>
                    <CardDescription>
                      Important updates and notifications
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Announcement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <Card
                      key={announcement.id}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">
                            {announcement.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getPriorityColor(
                                announcement.priority,
                              )}
                            >
                              {announcement.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {announcement.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {announcement.content}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>By {announcement.author}</span>
                          <span className="mx-2">•</span>
                          <span>{announcement.timestamp}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Video Meetings & Conferences
              </CardTitle>
              <CardDescription>Schedule and join team meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Quick Meeting</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Start an instant video meeting with your team
                    </p>
                    <Button className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Start Meeting
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Schedule Meeting
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Plan a meeting for later with agenda and invites
                    </p>
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-medium mb-4">Upcoming Meetings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Export Team Sync</p>
                      <p className="text-sm text-muted-foreground">
                        Today, 2:00 PM - 3:00 PM
                      </p>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        Client Review - Al-Baraka Trading
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tomorrow, 10:00 AM - 11:00 AM
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
              <CardDescription>
                Connect with external communication platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">WhatsApp Business</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect with international clients via WhatsApp
                    </p>
                    <Button variant="outline" className="w-full">
                      Configure
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Hash className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Slack Integration</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sync with existing Slack workspace
                    </p>
                    <Button variant="outline" className="w-full">
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <AtSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Integration</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Import conversations from email
                    </p>
                    <Button variant="outline" className="w-full">
                      Setup
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communication;
