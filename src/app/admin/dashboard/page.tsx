"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardStats {
  totalSchemes: number;
  totalUsers: number;
  pendingReviews: number;
  totalViews: number;
  monthlyGrowth: {
    schemes: number;
    users: number;
    views: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'scheme_created' | 'user_registered' | 'scheme_approved';
    title: string;
    user: string;
    timestamp: string;
  }>;
  topCategories: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
      return;
    }

    // Check if user is admin
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.push("/dashboard");
      return;
    }

    const fetchDashboardStats = async () => {
      try {
        // Mock data - replace with actual API call
        const mockStats: DashboardStats = {
          totalSchemes: 1247,
          totalUsers: 8934,
          pendingReviews: 23,
          totalViews: 156789,
          monthlyGrowth: {
            schemes: 12.5,
            users: 8.3,
            views: 15.7
          },
          recentActivity: [
            {
              id: '1',
              type: 'scheme_created',
              title: 'New scheme "Digital Skills Training" created',
              user: 'John Doe',
              timestamp: '2024-01-22T10:30:00Z'
            },
            {
              id: '2',
              type: 'user_registered',
              title: 'New user registered',
              user: 'Jane Smith',
              timestamp: '2024-01-22T09:15:00Z'
            },
            {
              id: '3',
              type: 'scheme_approved',
              title: 'Scheme "Rural Healthcare Initiative" approved',
              user: 'Admin',
              timestamp: '2024-01-22T08:45:00Z'
            }
          ],
          topCategories: [
            { name: 'Education', count: 342, percentage: 27.4 },
            { name: 'Healthcare', count: 298, percentage: 23.9 },
            { name: 'Agriculture', count: 234, percentage: 18.8 },
            { name: 'Finance', count: 189, percentage: 15.2 },
            { name: 'Others', count: 184, percentage: 14.7 }
          ]
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchDashboardStats();
    }
  }, [status, router, session]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'scheme_created': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'user_registered': return <Users className="w-4 h-4 text-green-500" />;
      case 'scheme_approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--text)] mb-2">Failed to load dashboard</h2>
          <p className="text-[var(--sub-text)]">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Admin Dashboard</h1>
          <p className="text-[var(--sub-text)]">
            Overview of your platform's performance and activity
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--sub-text)] mb-1">Total Schemes</p>
                <p className="text-3xl font-bold text-[var(--text)]">{stats.totalSchemes.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">
                  +{stats.monthlyGrowth.schemes}% this month
                </p>
              </div>
              <FileText className="w-12 h-12 text-[var(--primary)]" />
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--sub-text)] mb-1">Total Users</p>
                <p className="text-3xl font-bold text-[var(--text)]">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">
                  +{stats.monthlyGrowth.users}% this month
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--sub-text)] mb-1">Pending Reviews</p>
                <p className="text-3xl font-bold text-[var(--text)]">{stats.pendingReviews}</p>
                <p className="text-sm text-orange-600 mt-1">
                  Requires attention
                </p>
              </div>
              <Clock className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--sub-text)] mb-1">Total Views</p>
                <p className="text-3xl font-bold text-[var(--text)]">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">
                  +{stats.monthlyGrowth.views}% this month
                </p>
              </div>
              <Eye className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/schemes">
              <Button className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Manage Schemes
              </Button>
            </Link>
            <Link href="/admin/addArticle">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Add New Scheme
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Site Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--text)]">Recent Activity</h2>
              <Link href="/admin/activity">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[var(--bg-primary)] transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text)] font-medium">{activity.title}</p>
                    <p className="text-xs text-[var(--sub-text)]">by {activity.user}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-[var(--sub-text)]">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--text)]">Top Categories</h2>
              <PieChart className="w-5 h-5 text-[var(--primary)]" />
            </div>
            
            <div className="space-y-4">
              {stats.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}></div>
                    <span className="text-sm font-medium text-[var(--text)]">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[var(--sub-text)]">{category.count}</span>
                    <span className="text-xs text-[var(--sub-text)]">({category.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-800">Database</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-800">API Services</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-800">File Storage</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}