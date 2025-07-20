import React from "react";
import Link from "next/link";
import { 
  User, 
  FileText, 
  Bookmark, 
  TrendingUp, 
  Calendar,
  Edit3,
  Plus,
  Eye,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import SchemeCard from "@/components/schemes/SchemeCard";

export default function DashboardPage() {
  // Demo user data
  const demoUser = {
    name: "Demo User",
    email: "demo@example.com",
    role: "admin"
  };

  // Mock data - replace with actual API calls
  const userStats = {
    publishedSchemes: 5,
    bookmarkedSchemes: 23,
    totalViews: 1250,
    totalLikes: 89
  };

  const recentSchemes = [
    {
      id: '1',
      title: 'Digital India Scholarship',
      description: 'Scholarship program for technology students',
      category: 'Education',
      state: 'All India',
      deadline: '2024-03-31',
      views: 450,
      isNew: false,
      lastUpdated: '2024-01-20'
    }
  ];

  const bookmarkedSchemes = [
    {
      id: '2',
      title: 'PM Kisan Samman Nidhi',
      description: 'Income support for farmers',
      category: 'Agriculture',
      state: 'All India',
      deadline: 'Ongoing',
      views: 2800,
      isNew: false,
      lastUpdated: '2024-01-15'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">
            Welcome back, {demoUser.name}!
          </h1>
          <p className="text-[var(--sub-text)]">
            Here's what's happening with your schemes and bookmarks
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-[var(--primary)] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{userStats.publishedSchemes}</p>
                <p className="text-sm text-[var(--sub-text)]">Published Schemes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center">
              <Bookmark className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{userStats.bookmarkedSchemes}</p>
                <p className="text-sm text-[var(--sub-text)]">Bookmarked</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{userStats.totalViews}</p>
                <p className="text-sm text-[var(--sub-text)]">Total Views</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{userStats.totalLikes}</p>
                <p className="text-sm text-[var(--sub-text)]">Total Likes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/addArticle">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create New Scheme
              </Button>
            </Link>
            <Link href="/dashboard/my-schemes">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Manage My Schemes
              </Button>
            </Link>
            <Link href="/schemes">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Browse All Schemes
              </Button>
            </Link>
            <Link href={`/profile/${session?.user?.name?.toLowerCase().replace(/\s+/g, '')}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                View My Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Schemes */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--text)]">My Recent Schemes</h2>
              <Link href="/dashboard/my-schemes">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            
            {recentSchemes.length > 0 ? (
              <div className="space-y-4">
                {recentSchemes.map((scheme) => (
                  <div key={scheme.id} className="border border-[var(--border)] rounded-lg p-4 hover:bg-[var(--bg-primary)] transition-colors">
                    <h3 className="font-medium text-[var(--text)] mb-1">{scheme.title}</h3>
                    <p className="text-sm text-[var(--sub-text)] mb-2 line-clamp-2">{scheme.description}</p>
                    <div className="flex items-center justify-between text-xs text-[var(--sub-text)]">
                      <span>{scheme.category}</span>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3" />
                        {scheme.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-[var(--sub-text)] mx-auto mb-3" />
                <p className="text-[var(--sub-text)] mb-4">You haven't published any schemes yet</p>
                <Link href="/admin/addArticle">
                  <Button size="sm">Create Your First Scheme</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Bookmarked Schemes */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--text)]">Bookmarked Schemes</h2>
              <Link href="/schemes?bookmarked=true">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            
            {bookmarkedSchemes.length > 0 ? (
              <div className="space-y-4">
                {bookmarkedSchemes.map((scheme) => (
                  <div key={scheme.id} className="border border-[var(--border)] rounded-lg p-4 hover:bg-[var(--bg-primary)] transition-colors">
                    <h3 className="font-medium text-[var(--text)] mb-1">{scheme.title}</h3>
                    <p className="text-sm text-[var(--sub-text)] mb-2 line-clamp-2">{scheme.description}</p>
                    <div className="flex items-center justify-between text-xs text-[var(--sub-text)]">
                      <span>{scheme.category}</span>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3" />
                        {scheme.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bookmark className="w-12 h-12 text-[var(--sub-text)] mx-auto mb-3" />
                <p className="text-[var(--sub-text)] mb-4">No bookmarked schemes yet</p>
                <Link href="/schemes">
                  <Button size="sm" variant="outline">Browse Schemes</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-8 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--text)]">Profile Information</h2>
            <Link href="/profile/edit">
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-xl font-bold">
              {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="text-lg font-medium text-[var(--text)]">{session?.user?.name}</h3>
              <p className="text-[var(--sub-text)]">{session?.user?.email}</p>
              <p className="text-sm text-[var(--sub-text)] mt-1">
                Member since {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}