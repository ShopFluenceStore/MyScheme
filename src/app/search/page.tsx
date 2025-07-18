"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import SchemeCard from "@/components/schemes/SchemeCard";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Scheme } from "@/types/scheme";

interface SearchResult {
  type: 'scheme' | 'category' | 'tag' | 'state' | 'user';
  id: string;
  title: string;
  description?: string;
  category?: string;
  url: string;
  metadata?: any;
}

interface SearchFilter {
  query: string;
  category?: string;
  status?: 'active' | 'upcoming' | 'expired';
  type?: 'all' | 'schemes' | 'categories' | 'tags' | 'states' | 'users';
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<SearchFilter>({ query: '', type: 'all' });
  const router = useRouter();

  // Fetch search results with error handling and abort controller
  const fetchResults = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filter.query) params.append('q', filter.query);
      if (filter.category) params.append('category', filter.category);
      if (filter.status) params.append('status', filter.status);
      if (filter.type && filter.type !== 'all') params.append('type', filter.type);

      const response = await fetch(`/api/search?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Mock search results - replace with actual API response
      const mockResults: SearchResult[] = [
        {
          type: 'scheme',
          id: '1',
          title: 'PM Kisan Samman Nidhi',
          description: 'Income support scheme for farmers',
          category: 'Agriculture',
          url: '/schemes/1'
        },
        {
          type: 'category',
          id: 'education',
          title: 'Education',
          description: '45 schemes available',
          url: '/schemes?category=education'
        },
        {
          type: 'user',
          id: 'johndoe',
          title: 'John Doe',
          description: 'Government schemes expert',
          url: '/profile/johndoe'
        }
      ];
      
      setResults(filter.query ? mockResults.filter(r => 
        r.title.toLowerCase().includes(filter.query.toLowerCase())
      ) : []);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error fetching schemes:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(`Failed to load results: ${errorMessage}`);
        toast.error('Failed to load search results');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [filter]);

  // Initial data fetch
  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // Debounced search
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.trim()) {
        setFilter(prev => ({ ...prev, query: searchQuery.trim() }));
      } else {
        setFilter(prev => ({ ...prev, query: '' }));
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setRecentSearches(prev => 
        [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 5)
      );
      setFilter(prev => ({ ...prev, query: searchQuery.trim() }));
    }
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setFilter(prev => ({ ...prev, category }));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilter(prev => ({ ...prev, query: '', type: 'all' }));
  };

  const removeRecentSearch = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'scheme': return '📄';
      case 'category': return '📁';
      case 'tag': return '🏷️';
      case 'state': return '📍';
      case 'user': return '👤';
      default: return '🔍';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Search Government Schemes
        </h1>
        
        {/* Search Type Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Results' },
              { key: 'schemes', label: 'Schemes' },
              { key: 'categories', label: 'Categories' },
              { key: 'tags', label: 'Tags' },
              { key: 'states', label: 'States' },
              { key: 'users', label: 'Users' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(prev => ({ ...prev, type: key as any }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter.type === key
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, category, or ministry..."
              className="block w-full pl-10 pr-12 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              aria-label="Search schemes"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-16 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <Button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-[calc(100%-8px)] px-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </form>

        <AnimatePresence>
          {recentSearches.length > 0 && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 className="text-lg font-medium text-foreground mb-3">
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={`${search}-${index}`}
                    className="flex items-center gap-2 px-3 py-2 bg-muted rounded-full text-sm text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => setSearchQuery(search)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <span>{search}</span>
                    <button
                      onClick={(e) => removeRecentSearch(e, index)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Remove ${search} from recent searches`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12">
          {/* Results Summary */}
          {filter.query && (
            <div className="mb-6">
              <p className="text-[var(--sub-text)]">
                Found {results.length} results for "{filter.query}"
              </p>
            </div>
          )}
          
          <h2 className="text-lg font-medium text-foreground mb-4">
            Popular Categories
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "Education",
              "Agriculture",
              "Healthcare",
              "Finance",
              "Women Empowerment",
              "Startup",
            ].map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryClick(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p>Loading schemes...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-destructive">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => fetchResults()}
              >
                Retry
              </Button>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {filter.query 
                  ? `No results found matching "${filter.query}"` 
                  : 'Start typing to search for schemes, categories, and more.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {results.map((result) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="border border-[var(--border)] rounded-lg p-4 hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                    onClick={() => router.push(result.url)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getResultIcon(result.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-[var(--text)]">{result.title}</h3>
                          <span className="px-2 py-1 text-xs bg-[var(--bg-primary)] text-[var(--primary)] rounded-full border border-[var(--border)]">
                            {result.type}
                          </span>
                        </div>
                        {result.description && (
                          <p className="text-sm text-[var(--sub-text)] mb-2">{result.description}</p>
                        )}
                        {result.category && (
                          <span className="text-xs text-[var(--primary)]">{result.category}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
