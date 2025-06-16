import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Server,
  Users,
  FileText,
  Zap,
  Shield,
  Globe,
  RefreshCw,
  Download,
} from "lucide-react";

interface SystemMetrics {
  database: {
    health: "healthy" | "warning" | "critical";
    size_gb: number;
    connection_count: number;
    response_time_ms: number;
    query_count_per_hour: number;
  };
  api: {
    response_time_ms: number;
    success_rate: number;
    requests_per_hour: number;
    error_rate: number;
  };
  users: {
    active_sessions: number;
    registrations_today: number;
    login_success_rate: number;
    invite_acceptance_rate: number;
  };
  performance: {
    memory_usage_mb: number;
    memory_limit_mb: number;
    cpu_usage_percent: number;
    disk_usage_percent: number;
  };
  security: {
    failed_login_attempts: number;
    blocked_ips: number;
    malicious_requests: number;
    last_security_scan: string;
  };
}

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    database: {
      health: "healthy",
      size_gb: 0.45,
      connection_count: 8,
      response_time_ms: 125,
      query_count_per_hour: 1247,
    },
    api: {
      response_time_ms: 245,
      success_rate: 99.2,
      requests_per_hour: 856,
      error_rate: 0.8,
    },
    users: {
      active_sessions: 23,
      registrations_today: 5,
      login_success_rate: 94.7,
      invite_acceptance_rate: 87.3,
    },
    performance: {
      memory_usage_mb: 445,
      memory_limit_mb: 1536,
      cpu_usage_percent: 23,
      disk_usage_percent: 15,
    },
    security: {
      failed_login_attempts: 12,
      blocked_ips: 3,
      malicious_requests: 0,
      last_security_scan: "2024-01-15 10:30:00",
    },
  });

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshMetrics = async () => {
    setLoading(true);
    try {
      // Simulate API call to get real metrics
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update with simulated real-time data
      setMetrics((prev) => ({
        ...prev,
        database: {
          ...prev.database,
          connection_count: Math.floor(Math.random() * 15) + 5,
          response_time_ms: Math.floor(Math.random() * 100) + 100,
        },
        api: {
          ...prev.api,
          response_time_ms: Math.floor(Math.random() * 200) + 200,
          requests_per_hour: Math.floor(Math.random() * 500) + 600,
        },
        performance: {
          ...prev.performance,
          memory_usage_mb: Math.floor(Math.random() * 200) + 400,
          cpu_usage_percent: Math.floor(Math.random() * 30) + 15,
        },
      }));

      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshMetrics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (
    value: number,
    thresholds: { warning: number; critical: number },
    invert = false,
  ) => {
    if (invert) {
      if (value <= thresholds.critical) return "critical";
      if (value <= thresholds.warning) return "warning";
      return "healthy";
    } else {
      if (value >= thresholds.critical) return "critical";
      if (value >= thresholds.warning) return "warning";
      return "healthy";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-emerald-400";
      case "warning":
        return "text-yellow-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "critical":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  // Calculate memory usage percentage
  const memoryUsagePercent =
    (metrics.performance.memory_usage_mb /
      metrics.performance.memory_limit_mb) *
    100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="modern-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-2.5">
                <Activity className="w-full h-full text-white" />
              </div>
              <div>
                <CardTitle className="text-white">
                  System Performance Monitor
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time monitoring for Hostinger
                  workspace.calicutspicetraders.com
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshMetrics}
                disabled={loading}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Database Health */}
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-400" />
              <Badge className={`${getStatusColor(metrics.database.health)}`}>
                {metrics.database.health}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {metrics.database.size_gb.toFixed(2)} GB
              </div>
              <div className="text-sm text-gray-400">Database Size</div>
              <div className="text-xs text-gray-500">
                {metrics.database.connection_count}/25 connections
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Performance */}
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-green-400" />
              <Badge className="text-green-400">
                {metrics.api.success_rate}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {metrics.api.response_time_ms}ms
              </div>
              <div className="text-sm text-gray-400">Avg Response Time</div>
              <div className="text-xs text-gray-500">
                {metrics.api.requests_per_hour} req/hour
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <Badge className="text-purple-400">
                +{metrics.users.registrations_today}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {metrics.users.active_sessions}
              </div>
              <div className="text-sm text-gray-400">Active Sessions</div>
              <div className="text-xs text-gray-500">
                {metrics.users.login_success_rate}% success rate
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card className="modern-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-orange-400" />
              <Badge
                className={getStatusColor(
                  getHealthStatus(memoryUsagePercent, {
                    warning: 70,
                    critical: 85,
                  }),
                )}
              >
                {memoryUsagePercent.toFixed(1)}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {metrics.performance.memory_usage_mb} MB
              </div>
              <div className="text-sm text-gray-400">Memory Usage</div>
              <Progress value={memoryUsagePercent} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Monitoring */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database Health (Hostinger MySQL)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Storage Used</div>
                <div className="text-lg font-semibold text-white">
                  {metrics.database.size_gb.toFixed(2)} / 3.0 GB
                </div>
                <Progress
                  value={(metrics.database.size_gb / 3.0) * 100}
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Active Connections</div>
                <div className="text-lg font-semibold text-white">
                  {metrics.database.connection_count} / 25
                </div>
                <Progress
                  value={(metrics.database.connection_count / 25) * 100}
                  className="h-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-sm text-gray-400">Avg Query Time</div>
                <div className="text-lg font-semibold text-white">
                  {metrics.database.response_time_ms}ms
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Queries/Hour</div>
                <div className="text-lg font-semibold text-white">
                  {metrics.database.query_count_per_hour.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Memory Usage</span>
                <span className="text-white font-semibold">
                  {metrics.performance.memory_usage_mb} /{" "}
                  {metrics.performance.memory_limit_mb} MB
                </span>
              </div>
              <Progress value={memoryUsagePercent} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-white font-semibold">
                  {metrics.performance.cpu_usage_percent}%
                </span>
              </div>
              <Progress
                value={metrics.performance.cpu_usage_percent}
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Disk Usage</span>
                <span className="text-white font-semibold">
                  {metrics.performance.disk_usage_percent}%
                </span>
              </div>
              <Progress
                value={metrics.performance.disk_usage_percent}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* API & Security */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security & API Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">API Success Rate</div>
                <div className="text-2xl font-bold text-emerald-400">
                  {metrics.api.success_rate}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Error Rate</div>
                <div className="text-2xl font-bold text-red-400">
                  {metrics.api.error_rate}%
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Failed Logins</span>
                <span className="text-white">
                  {metrics.security.failed_login_attempts}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Blocked IPs</span>
                <span className="text-white">
                  {metrics.security.blocked_ips}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Malicious Requests</span>
                <span className="text-white">
                  {metrics.security.malicious_requests}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Analytics */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Active Sessions</div>
                <div className="text-2xl font-bold text-blue-400">
                  {metrics.users.active_sessions}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">New Today</div>
                <div className="text-2xl font-bold text-green-400">
                  +{metrics.users.registrations_today}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Login Success Rate</span>
                <span className="text-white font-semibold">
                  {metrics.users.login_success_rate}%
                </span>
              </div>
              <Progress
                value={metrics.users.login_success_rate}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Invite Acceptance</span>
                <span className="text-white font-semibold">
                  {metrics.users.invite_acceptance_rate}%
                </span>
              </div>
              <Progress
                value={metrics.users.invite_acceptance_rate}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-white">System Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="modern-button">
              <Download className="w-4 h-4 mr-2" />
              Export Metrics
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Database className="w-4 h-4 mr-2" />
              Database Cleanup
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security Scan
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Zap className="w-4 h-4 mr-2" />
              Optimize Performance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
