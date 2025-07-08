'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SchemeSearchProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onStateChange: (state: string) => void;
  categories: string[];
  states: string[];
  className?: string;
}

const SchemeSearch: React.FC<SchemeSearchProps> = ({
  onSearch,
  onCategoryChange,
  onStateChange,
  categories,
  states,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  const handleStateChange = (state: string) => {
    const newState = selectedState === state ? '' : state;
    setSelectedState(newState);
    onStateChange(newState);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedState('');
    onCategoryChange('');
    onStateChange('');
  };

  return (
    <div className={`${className}`}>
      {/* Desktop Search and Filters */}
      <div className="hidden md:block space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search schemes by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="text-sm font-medium text-gray-700">Categories:</div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          
          <div className="ml-4 text-sm font-medium text-gray-700">State:</div>
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          
          {(selectedCategory || selectedState) && (
            <button
              onClick={clearFilters}
              className="ml-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <X className="w-4 h-4 mr-1" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search and Filters */}
      <div className="md:hidden space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Filter className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {showMobileFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {(selectedCategory || selectedState) && (
              <button
                onClick={clearFilters}
                className="w-full mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeSearch;
