import { useState, useRef, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  MessageSquare,
  Send,
  Plus,
  Phone,
  Video,
  PhoneOff,
  VideoOff,
  Mic,
  MicOff,
  Users,
  Search,
  Settings,
  Paperclip,
  Smile,
  MoreVertical,
  Monitor,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Zap,
  Sparkles,
  Globe,
  Star,
  Heart,
  Camera,
  Share,
} from "lucide-react";

const Communication = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Rajesh Kumar",
      content: "Good morning team! 🌅 UAE shipment SP-2024-001 update:",
      timestamp: "09:15 AM",
      type: "text",
      sent: false,
      avatar: "RK",
    },
    {
      id: 2,
      sender: "Rajesh Kumar",
      content:
        "✅ Customs clearance completed\n✅ Documents verified\n🚚 In transit to Dubai warehouse",
      timestamp: "09:16 AM",
      type: "text",
      sent: false,
      avatar: "RK",
    },
    {
      id: 3,
      sender: "You",
      content: "Excellent! What's the expected delivery date? 📅",
      timestamp: "09:18 AM",
      type: "text",
      sent: true,
      avatar: "YO",
    },
    {
      id: 4,
      sender: "Mohammed Ali",
      content: "Based on current logistics, delivery expected by Dec 28th ⏰",
      timestamp: "09:20 AM",
      type: "text",
      sent: false,
      avatar: "MA",
    },
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: 1,
      name: "Export Team 🚚",
      lastMessage: "UAE shipment has cleared customs ✅",
      timestamp: "2 min ago",
      unread: 3,
      avatar: "ET",
      online: true,
      type: "group",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      lastMessage: "Quality certificates ready 📋",
      timestamp: "15 min ago",
      unread: 1,
      avatar: "RK",
      online: true,
      type: "direct",
      role: "Export Manager",
    },
    {
      id: 3,
      name: "Quality Control",
      lastMessage: "Lab results uploaded 🧪",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "QC",
      online: false,
      type: "group",
    },
    {
      id: 4,
      name: "Al-Baraka Trading 🇦🇪",
      lastMessage: "Payment processing confirmed 💳",
      timestamp: "3 hours ago",
      unread: 0,
      avatar: "AB",
      online: true,
      type: "external",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const endCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCallActive(false);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
    setIsScreenSharing(false);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
        sent: true,
        avatar: "YO",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-2.5">
                <MessageSquare className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Communication Hub
                </h1>
                <p className="text-gray-400">
                  Connect, collaborate, and communicate
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button onClick={startVideoCall} className="modern-button">
              <Video className="w-4 h-4 mr-2" />
              Start Video Call
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-2xl"
            >
              <Phone className="w-4 h-4 mr-2" />
              Audio Call
            </Button>
          </div>
        </div>

        {/* Video Call Modal */}
        {isCallActive && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto p-6">
              <Card className="modern-card bg-black/50 border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      Video Conference
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Connected with Export Team
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                    🔴 Live
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-96 bg-gray-900 rounded-2xl object-cover"
                    />

                    {/* Video call controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                      <Button
                        onClick={toggleAudio}
                        className={`w-12 h-12 rounded-full ${isAudioEnabled ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}`}
                      >
                        {isAudioEnabled ? (
                          <Mic className="w-5 h-5" />
                        ) : (
                          <MicOff className="w-5 h-5" />
                        )}
                      </Button>

                      <Button
                        onClick={toggleVideo}
                        className={`w-12 h-12 rounded-full ${isVideoEnabled ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}`}
                      >
                        {isVideoEnabled ? (
                          <Camera className="w-5 h-5" />
                        ) : (
                          <VideoOff className="w-5 h-5" />
                        )}
                      </Button>

                      <Button
                        onClick={() => setIsScreenSharing(!isScreenSharing)}
                        className={`w-12 h-12 rounded-full ${isScreenSharing ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                      >
                        <Monitor className="w-5 h-5" />
                      </Button>

                      <Button
                        onClick={endCall}
                        className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600"
                      >
                        <PhoneOff className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Participant thumbnails */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <div className="w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-emerald-400">
                        <Users className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Avatar className="w-8 h-8 mx-auto mb-1">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                              RK
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs text-white">Rajesh</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Main Communication Interface */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
            <TabsTrigger
              value="messages"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <Video className="w-4 h-4 mr-2" />
              Calls
            </TabsTrigger>
            <TabsTrigger
              value="meetings"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Meetings
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Files
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <Card className="modern-card lg:col-span-1 overflow-hidden">
                <CardHeader className="pb-3 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Conversations</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1 p-4">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-white/5 rounded-2xl transition-all duration-200 group"
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12 ring-2 ring-white/10">
                            <AvatarFallback className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-semibold">
                              {conversation.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900 animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
                                {conversation.name}
                              </p>
                              {conversation.type === "group" && (
                                <Users className="w-3 h-3 text-gray-400" />
                              )}
                              {conversation.type === "external" && (
                                <Globe className="w-3 h-3 text-blue-400" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">
                                {conversation.timestamp}
                              </span>
                              {conversation.unread > 0 && (
                                <Badge className="h-5 w-5 p-0 text-xs bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          {conversation.role && (
                            <p className="text-xs text-blue-400 mt-1">
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
              <Card className="modern-card lg:col-span-2 flex flex-col overflow-hidden">
                <CardHeader className="pb-3 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
                          ET
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-white text-lg">
                          Export Team
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          5 members • 3 online
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={startVideoCall}
                        className="text-gray-400 hover:text-white"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Area */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl p-4 ${
                          message.sent
                            ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white ml-12"
                            : "bg-white/5 text-white backdrop-blur-sm mr-12"
                        }`}
                      >
                        {!message.sent && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-xs font-medium text-blue-400">
                              {message.sender}
                            </p>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sent ? "text-white/70" : "text-gray-400"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl pr-12 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="modern-button px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Calls Tab */}
          <TabsContent value="calls">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="modern-card text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Video Conference
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    HD video calls with screen sharing
                  </p>
                  <Button
                    onClick={startVideoCall}
                    className="modern-button w-full"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Call
                  </Button>
                </CardContent>
              </Card>

              <Card className="modern-card text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Audio Call
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Crystal clear voice communication
                  </p>
                  <Button className="modern-button w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Start Audio Call
                  </Button>
                </CardContent>
              </Card>

              <Card className="modern-card text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Group Meeting
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Multi-participant video conference
                  </p>
                  <Button className="modern-button w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Scheduled Meetings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Upcoming video conferences and team meetings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-blue-600 p-4">
                    <Users className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No meetings scheduled
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Schedule your first team meeting to get started
                  </p>
                  <Button className="modern-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Paperclip className="w-5 h-5 mr-2" />
                  Shared Files
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Documents and media shared in conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-4">
                    <Paperclip className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No files shared yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Files shared in conversations will appear here
                  </p>
                  <Button className="modern-button">
                    <Share className="w-4 h-4 mr-2" />
                    Share File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Communication;
