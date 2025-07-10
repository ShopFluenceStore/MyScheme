"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setRecentSearches(prev => 
        [searchQuery, ...prev].slice(0, 5)
      );
      // TODO: Implement actual search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="container mb-16 mx-auto px-4 py-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
          Search Schemes
        </h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[var(--muted-foreground)]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, category, or ministry..."
              className="block w-full pl-10 pr-12 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-16 flex items-center pr-3 text-[var(--muted-foreground)] hover:text-[var(--text)]"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <Button 
              type="submit" 
              variant="primary"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-[calc(100%-8px)] px-6"
            >
              Search
            </Button>
          </div>
        </form>

        {recentSearches.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-[var(--text)] mb-3">
              Recent Searches
            </h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(search)}
                >
                  <span className="text-[var(--text)]">{search}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setRecentSearches(prev => prev.filter((_, i) => i !== index));
                    }}
                    className="text-[var(--muted-foreground)] hover:text-[var(--text)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-lg font-medium text-[var(--text)] mb-4">
            Popular Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Education', 'Agriculture', 'Healthcare', 'Finance', 'Women Empowerment', 'Startup'].map((category) => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text)] rounded-full text-sm hover:bg-[var(--bg-hover)] transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
