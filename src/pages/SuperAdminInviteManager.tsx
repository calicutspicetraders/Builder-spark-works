import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UserPlus,
  Send,
  Users,
  Mail,
  Calendar,
  Shield,
  Trash2,
  Copy,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  Globe,
  UserCheck,
} from "lucide-react";

interface Invite {
  id: string;
  invite_code: string;
  email: string;
  full_name?: string;
  department?: string;
  role: string;
  status: string;
  expires_at: string;
  created_at: string;
  accepted_at?: string;
  invite_link: string;
  metadata?: {
    invite_message?: string;
    invited_by_name?: string;
    company_name?: string;
  };
}

interface RegisteredUser {
  id: string;
  email: string;
  full_name: string;
  department?: string;
  job_title?: string;
  role: string;
  status: string;
  last_login?: string;
  created_at: string;
  invited_by?: string;
  picture?: string;
}

const SuperAdminInviteManager = () => {
  const [activeTab, setActiveTab] = useState("invites");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateInviteOpen, setIsCreateInviteOpen] = useState(false);

  // Form state for creating invites
  const [inviteForm, setInviteForm] = useState({
    email: "",
    full_name: "",
    department: "",
    role: "user",
    message: "",
  });

  useEffect(() => {
    loadInvites();
    loadUsers();
  }, []);

  const loadInvites = async () => {
    try {
      const response = await fetch("/api/superadmin/invite-manager.php");
      const result = await response.json();
      if (result.success) {
        setInvites(result.invites || []);
      }
    } catch (error) {
      console.error("Failed to load invites:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch(
        "/api/superadmin/invite-manager.php?action=users",
      );
      const result = await response.json();
      if (result.success) {
        setUsers(result.users || []);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleCreateInvite = async () => {
    if (!inviteForm.email.trim()) {
      alert("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/superadmin/invite-manager.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          ...inviteForm,
          created_by: "superadmin",
          company_name: "Your Company",
          invited_by_name: "System Administrator",
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(
          `Invite created successfully! Invite link: ${result.invite_link}`,
        );
        setInviteForm({
          email: "",
          full_name: "",
          department: "",
          role: "user",
          message: "",
        });
        setIsCreateInviteOpen(false);
        loadInvites();
      } else {
        alert(`Failed to create invite: ${result.error}`);
      }
    } catch (error) {
      alert(`Error creating invite: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeInvite = async (inviteCode: string) => {
    if (!confirm("Are you sure you want to revoke this invite?")) return;

    try {
      const response = await fetch("/api/superadmin/invite-manager.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invite_code: inviteCode }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Invite revoked successfully");
        loadInvites();
      } else {
        alert(`Failed to revoke invite: ${result.error}`);
      }
    } catch (error) {
      alert(`Error revoking invite: ${error}`);
    }
  };

  const copyInviteLink = (inviteLink: string) => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      case "revoked":
        return (
          <Badge variant="secondary">
            <Trash2 className="w-3 h-3 mr-1" />
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "superadmin":
        return (
          <Badge className="bg-red-100 text-red-800">
            <Sparkles className="w-3 h-3 mr-1" />
            SuperAdmin
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Users className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5">
                <UserPlus className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Invite Management
                </h1>
                <p className="text-gray-400">
                  Manage user invitations and access control
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Link to="/superadmin">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Dialog
              open={isCreateInviteOpen}
              onOpenChange={setIsCreateInviteOpen}
            >
              <DialogTrigger asChild>
                <Button className="modern-button">
                  <Send className="w-4 h-4 mr-2" />
                  Send Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/20 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Send User Invitation
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create an invitation for a new user to join the platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteForm.email}
                        onChange={(e) =>
                          setInviteForm({
                            ...inviteForm,
                            email: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="user@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="full_name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="full_name"
                        value={inviteForm.full_name}
                        onChange={(e) =>
                          setInviteForm({
                            ...inviteForm,
                            full_name: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department" className="text-white">
                        Department
                      </Label>
                      <Select
                        value={inviteForm.department}
                        onValueChange={(value) =>
                          setInviteForm({ ...inviteForm, department: value })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="export">Export</SelectItem>
                          <SelectItem value="import">Import</SelectItem>
                          <SelectItem value="quality">
                            Quality Control
                          </SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="role" className="text-white">
                        Role
                      </Label>
                      <Select
                        value={inviteForm.role}
                        onValueChange={(value) =>
                          setInviteForm({ ...inviteForm, role: value })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">
                      Welcome Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={inviteForm.message}
                      onChange={(e) =>
                        setInviteForm({
                          ...inviteForm,
                          message: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-white h-24"
                      placeholder="Welcome to our platform! We're excited to have you join our team..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white"
                      onClick={() => setIsCreateInviteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="modern-button"
                      onClick={handleCreateInvite}
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Send Invitation"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
            <TabsTrigger
              value="invites"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Pending Invites
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Registered Users
            </TabsTrigger>
          </TabsList>

          {/* Pending Invites Tab */}
          <TabsContent value="invites">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-white">
                  Pending Invitations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage sent invitations and track their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invites.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No invitations sent
                    </h3>
                    <p className="text-gray-400">
                      Send your first invitation to get started
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">
                            Department
                          </TableHead>
                          <TableHead className="text-gray-300">Role</TableHead>
                          <TableHead className="text-gray-300">
                            Status
                          </TableHead>
                          <TableHead className="text-gray-300">
                            Expires
                          </TableHead>
                          <TableHead className="text-gray-300">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invites.map((invite) => (
                          <TableRow key={invite.id} className="border-white/10">
                            <TableCell className="text-white">
                              {invite.email}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {invite.full_name || "-"}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {invite.department || "-"}
                            </TableCell>
                            <TableCell>{getRoleBadge(invite.role)}</TableCell>
                            <TableCell>
                              {getStatusBadge(invite.status)}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(invite.expires_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white"
                                  onClick={() =>
                                    copyInviteLink(invite.invite_link)
                                  }
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                {invite.status === "pending" && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() =>
                                      handleRevokeInvite(invite.invite_code)
                                    }
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registered Users Tab */}
          <TabsContent value="users">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-white">Registered Users</CardTitle>
                <CardDescription className="text-gray-400">
                  View and manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No users registered
                    </h3>
                    <p className="text-gray-400">
                      Users will appear here once they accept invitations
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-gray-300">User</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">
                            Department
                          </TableHead>
                          <TableHead className="text-gray-300">Role</TableHead>
                          <TableHead className="text-gray-300">
                            Last Login
                          </TableHead>
                          <TableHead className="text-gray-300">
                            Joined
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id} className="border-white/10">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {user.picture ? (
                                  <img
                                    src={user.picture}
                                    alt={user.full_name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                                    {user.full_name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <p className="text-white font-medium">
                                    {user.full_name}
                                  </p>
                                  {user.job_title && (
                                    <p className="text-xs text-gray-400">
                                      {user.job_title}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {user.email}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {user.department || "-"}
                            </TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell className="text-gray-300">
                              {user.last_login
                                ? new Date(user.last_login).toLocaleDateString()
                                : "Never"}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminInviteManager;
