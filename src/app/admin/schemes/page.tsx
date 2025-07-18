"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminScheme {
  id: string;
  title: string;
  description: string;
  category: string;
  state: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'published';
  views: number;
  bookmarks: number;
  createdAt: string;
  lastUpdated: string;
  isNew: boolean;
}

export default function AdminSchemesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [schemes, setSchemes] = useState<AdminScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'published'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

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

    const fetchAllSchemes = async () => {
      try {
        // Mock data - replace with actual API call
        const mockSchemes: AdminScheme[] = [
          {
            id: '1',
            title: 'Digital India Scholarship Program',
            description: 'Comprehensive scholarship program for students pursuing technology courses.',
            category: 'Education',
            state: 'All India',
            author: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com'
            },
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
            author: {
              id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com'
            },
            status: 'pending',
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

    if (status === "authenticated") {
      fetchAllSchemes();
    }
  }, [status, router, session]);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || scheme.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || scheme.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: schemes.length,
    pending: schemes.filter(s => s.status === 'pending').length,
    approved: schemes.filter(s => s.status === 'approved').length,
    published: schemes.filter(s => s.status === 'published').length,
    rejected: schemes.filter(s => s.status === 'rejected').length
  };

  const categories = Array.from(new Set(schemes.map(s => s.category)));

  const handleStatusChange = async (schemeId: string, newStatus: AdminScheme['status']) => {
    try {
      // API call to update status
      setSchemes(prev => prev.map(scheme => 
        scheme.id === schemeId 
          ? { ...scheme, status: newStatus, lastUpdated: new Date().toISOString() }
          : scheme
      ));
    } catch (error) {
      console.error('Error updating scheme status:', error);
    }
  };

  const handleDelete = async (schemeId: string) => {
    if (!confirm('Are you sure you want to delete this scheme? This action cannot be undone.')) {
      return;
    }

    try {
      // API call to delete scheme
      setSchemes(prev => prev.filter(scheme => scheme.id !== schemeId));
    } catch (error) {
      console.error('Error deleting scheme:', error);
    }
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
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Manage Schemes</h1>
            <p className="text-[var(--sub-text)]">
              Review, approve, and manage all government schemes
            </p>
          </div>
          <Link href="/admin/addArticle">
            <Button className="mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Add New Scheme
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
              <Clock className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.pending}</p>
                <p className="text-sm text-[var(--sub-text)]">Pending Review</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.approved}</p>
                <p className="text-sm text-[var(--sub-text)]">Approved</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.published}</p>
                <p className="text-sm text-[var(--sub-text)]">Published</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stats.rejected}</p>
                <p className="text-sm text-[var(--sub-text)]">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--sub-text)] w-4 h-4" />
              <input
                type="text"
                placeholder="Search schemes, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[var(--sub-text)]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="published">Published</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schemes Table */}
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--sub-text)] uppercase tracking-wider">
                    Scheme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--sub-text)] uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--sub-text)] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--sub-text)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--sub-text)] uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--sub-text)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredSchemes.map((scheme) => (
                  <tr key={scheme.id} className="hover:bg-[var(--bg-primary)]">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-[var(--text)]">
                            {scheme.title}
                          </h3>
                          {scheme.isNew && (
                            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--sub-text)] mt-1 line-clamp-2">
                          {scheme.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-[var(--text)]">
                          {scheme.author.name}
                        </div>
                        <div className="text-sm text-[var(--sub-text)]">
                          {scheme.author.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-[var(--bg-primary)] text-[var(--primary)] rounded-full border border-[var(--border)]">
                        {scheme.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={scheme.status}
                        onChange={(e) => handleStatusChange(scheme.id, e.target.value as AdminScheme['status'])}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-[var(--primary)] ${
                          scheme.status === 'published' ? 'bg-green-100 text-green-800' :
                          scheme.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          scheme.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="published">Published</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4 text-sm text-[var(--sub-text)]">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {scheme.views}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {scheme.bookmarks}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link href={`/schemes/${scheme.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/schemes/edit/${scheme.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(scheme.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[var(--sub-text)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--text)] mb-2">
                No schemes found
              </h3>
              <p className="text-[var(--sub-text)]">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}