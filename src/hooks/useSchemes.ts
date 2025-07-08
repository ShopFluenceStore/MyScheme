import { useState, useEffect, useCallback } from 'react';

export interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  deadline?: string;
  beneficiaries?: string;
  launchDate: string;
  state?: string;
  logo?: string;
  isNew?: boolean;
  eligibility?: string[];
  benefits?: string[];
  documentsRequired?: string[];
  applyLink?: string;
  lastUpdated: string;
  ministry?: string;
  tags?: string[];
  status?: 'active' | 'upcoming' | 'expired';
  views: number;
  bookmarks: number;
}

interface UseSchemesProps {
  initialPage?: number;
  pageSize?: number;
  defaultFilters?: {
    category?: string;
    state?: string;
    status?: string;
    sortBy?: 'recent' | 'popular' | 'a-z' | 'z-a';
  };
}

const useSchemes = ({
  initialPage = 1,
  pageSize = 9,
  defaultFilters = {}
}: UseSchemesProps = {}) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(defaultFilters.category || '');
  const [stateFilter, setStateFilter] = useState(defaultFilters.state || '');
  const [statusFilter, setStatusFilter] = useState(defaultFilters.status || '');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'a-z' | 'z-a'>(defaultFilters.sortBy || 'recent');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [schemesPerPage] = useState(pageSize);

  // Helper function to parse date string to Date object
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Mock data - In a real app, this would be an API call
  const fetchSchemes = useCallback(async () => {
    try {
      // Mock data - replace with actual API call
      const mockSchemes: Scheme[] = [
        {
          id: '1',
          title: 'PM-KISAN',
          description: 'Income support of ₹6,000 per year to all farmer families across the country in three equal installments of ₹2,000 every four months.',
          category: 'Agriculture',
          subCategory: 'Farmer Welfare',
          launchDate: '01-12-2018',
          deadline: '31-03-2025',
          beneficiaries: 'Small and marginal farmers',
          state: 'All India',
          status: 'active',
          ministry: 'Ministry of Agriculture',
          tags: ['farmers', 'income support', 'pradhan mantri'],
          benefits: ['₹6,000 per year', 'Direct bank transfer', 'No middlemen'],
          eligibility: ['Small and marginal farmers', 'Landholding farmers'],
          documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account'],
          applyLink: 'https://pmkisan.gov.in/',
          lastUpdated: '01-04-2023',
          views: 1500,
          bookmarks: 320
        },
        {
          id: '2',
          title: 'Ayushman Bharat',
          description: 'Health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
          category: 'Healthcare',
          subCategory: 'Health Insurance',
          launchDate: '23-09-2018',
          deadline: '31-03-2026',
          beneficiaries: 'Economically vulnerable families',
          state: 'All India',
          status: 'active',
          ministry: 'Ministry of Health and Family Welfare',
          tags: ['healthcare', 'insurance', 'pradhan mantri'],
          benefits: ['Health coverage up to ₹5 lakhs per family per year', 'Cashless and paperless access'],
          eligibility: ['Economically vulnerable families', 'Based on SECC database'],
          documentsRequired: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
          applyLink: 'https://pmjay.gov.in/',
          lastUpdated: '15-03-2023',
          views: 2800,
          bookmarks: 540
        }
      ];
      
      // Update state with the fetched data
      setSchemes(mockSchemes);
      setFilteredSchemes(mockSchemes);
      setError(null);
    } catch (err) {
      setError('Failed to fetch schemes. Please try again later.');
      console.error('Error fetching schemes:', err);
      setSchemes([]);
      setFilteredSchemes([]);
    }
  }, []);

  // Apply filters, search and sorting
  useEffect(() => {
    let result = [...schemes];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        result = result.filter(
          scheme =>
            scheme.title.toLowerCase().includes(query) ||
            scheme.description.toLowerCase().includes(query) ||
            (scheme.category && scheme.category.toLowerCase().includes(query)) ||
            (scheme.tags && scheme.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(scheme => scheme.category === categoryFilter);
    }
    
    // Apply state filter
    if (stateFilter) {
      result = result.filter(
        scheme => !scheme.state || scheme.state === 'All India' || scheme.state === stateFilter
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(scheme => {
        if (statusFilter === 'active') return scheme.status === 'active';
        if (statusFilter === 'upcoming') return scheme.status === 'upcoming';
        if (statusFilter === 'expired') return scheme.status === 'expired';
        return true;
      });
    }
    
    // Apply sorting with null checks
    try {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return parseDate(b.launchDate).getTime() - parseDate(a.launchDate).getTime();
          case 'popular':
            return (b.views || 0) - (a.views || 0);
          case 'a-z':
            return a.title.localeCompare(b.title);
          case 'z-a':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    } catch (error) {
      console.error('Error sorting schemes:', error);
    }
    
    setFilteredSchemes(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [schemes, searchQuery, categoryFilter, stateFilter, statusFilter, sortBy]);

  // Get current schemes
  const currentSchemes = filteredSchemes.slice((currentPage - 1) * schemesPerPage, currentPage * schemesPerPage);
  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get all unique categories, subcategories, and ministries for filters
  const allCategories = Array.from(new Set(schemes.map(scheme => scheme.category).filter(Boolean)));
  const allSubCategories = Array.from(new Set(schemes.flatMap(scheme => scheme.subCategory ? [scheme.subCategory] : [])));
  const allMinistries = Array.from(new Set(schemes.map(scheme => scheme.ministry).filter(Boolean)));
  const allTags = Array.from(new Set(schemes.flatMap(scheme => scheme.tags || [])));
  const allStates = Array.from(new Set(schemes.map(scheme => scheme.state).filter(Boolean)));
  
  // Get filter counts with type safety
  const getFilterCounts = <K extends keyof Scheme>(field: K): Record<string, number> => {
    const counts: Record<string, number> = {};
    
    schemes.forEach(scheme => {
      const value = scheme[field];
      
      if (Array.isArray(value)) {
        // Handle array fields like tags, benefits, etc.
        value.forEach(v => {
          if (v) {
            counts[String(v)] = (counts[String(v)] || 0) + 1;
          }
        });
      } else if (value !== null && value !== undefined) {
        // Handle primitive fields like category, state, etc.
        const key = String(value);
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    
    return counts;
  };

  return {
    // Data
    schemes: currentSchemes,
    filteredSchemes,
    error,
    
    // Pagination
    currentPage,
    totalPages,
    totalSchemes: filteredSchemes.length,
    schemesPerPage,
    paginate,
    
    // Filters
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    stateFilter,
    setStateFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    
    // Available options for filters
    categories: allCategories,
    subCategories: allSubCategories,
    states: allStates as string[],
    ministries: allMinistries,
    tags: allTags,
    
    // Filter counts
    categoryCounts: getFilterCounts('category'),
    stateCounts: getFilterCounts('state'),
    tagCounts: getFilterCounts('tags'),
    
    // Actions
    refetch: fetchSchemes,
    clearFilters: () => {
      setSearchQuery('');
      setCategoryFilter('');
      setStateFilter('');
      setStatusFilter('');
      setSortBy('recent');
      setCurrentPage(1);
    }
  };
};

export default useSchemes;
