"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  MoreVertical,
  FileText,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import SchemeCard from "@/components/schemes/SchemeCard";

interface UserScheme {
  id: string;
  title: string;
  description: string;
  category: string;
  state: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  bookmarks: number;
  createdAt: string;
  lastUpdated: string;
  isNew: boolean;
}

export default function MySchemesPage() {
  // Demo user
  const demoUser = {
    name: "Demo User",
    email: "demo@example.com",
    role: "admin"
  };

  const router = useRouter();
  const [schemes, setSchemes] = useState<UserScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  useEffect(() => {
    const fetchUserSchemes = async () => {
      try {
        // Mock data - replace with actual API call
        const mockSchemes: UserScheme[] = [
          {
            id: '1',
            title: 'Digital India Scholarship Program',
            description: 'Comprehensive scholarship program for students pursuing technology courses.',
            category: 'Education',
            state: 'All India',
            status: 'published',
            views: 1250,
            bookmarks: 89,
            createdAt: '2024-01-15',
            lastUpdated: '2024-01-20',
            isNew: false
          },
          {
            id: '2',
            title: 'Rural Healthcare Initiative',
            description: 'Healthcare support scheme for rural communities.',
            category: 'Healthcare',
            state: 'Punjab',
            status: 'draft',
            views: 0,
            bookmarks: 0,
            createdAt: '2024-01-22',
            lastUpdated: '2024-01-22',
            isNew: true
          }
        ];
        
        setSchemes(mockSchemes);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSchemes();
  }, []);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || scheme.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: schemes.length,
    published: schemes.filter(s => s.status === 'published').length,
    drafts: schemes.filter(s => s.status === 'draft').length,
    totalViews: schemes.reduce((sum, s) => sum + s.views, 0),
    totalBookmarks: schemes.reduce((sum, s) => sum + s.bookmarks, 0)
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">My Schemes</h1>
            <p className="text-[var(--sub-text)]">
              Manage and track your published government schemes
            </p>
          </div>
          <Link href="/admin/addArticle">
            <Button className="mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create New Scheme
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-[var(--primary)] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.total}</p>
                <p className="text-sm text-[var(--sub-text)]">Total Schemes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.published}</p>
                <p className="text-sm text-[var(--sub-text)]">Published</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <Edit3 className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.drafts}</p>
                <p className="text-sm text-[var(--sub-text)]">Drafts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.totalViews}</p>
                <p className="text-sm text-[var(--sub-text)]">Total Views</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.totalBookmarks}</p>
                <p className="text-sm text-[var(--sub-text)]">Bookmarks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--sub-text)] w-4 h-4" />
              <input
                type="text"
                placeholder="Search your schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--sub-text)]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schemes List */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="relative group">
                <SchemeCard
                  id={scheme.id}
                  title={scheme.title}
                  description={scheme.description}
                  category={scheme.category}
                  state={scheme.state}
                  deadline=""
                  subCategory=""
                  launchDate={scheme.createdAt}
                  views={scheme.views}
                  isNew={scheme.isNew}
                  onClick={() => router.push(`/schemes/${scheme.id}`)}
                />
                
                {/* Action Menu */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg shadow-lg p-1">
                    <button
                      onClick={() => router.push(`/admin/schemes/edit/${scheme.id}`)}
                      className="flex items-center w-full px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--bg-secondary)] rounded"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this scheme?')) {
                          // Handle delete
                        }
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    scheme.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : scheme.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-[var(--sub-text)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--text)] mb-2">
              {searchQuery || statusFilter !== 'all' ? 'No schemes found' : 'No schemes yet'}
            </h3>
            <p className="text-[var(--sub-text)] mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first scheme to get started'
              }
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link href="/admin/addArticle">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Scheme
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}