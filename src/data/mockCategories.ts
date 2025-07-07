import { GraduationCap, Heart, Handshake, Wheat } from 'lucide-react';

export interface CategoryCard {
  id: string;
  title: string;
  schemeCount: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  popular?: boolean;
}

// TODO: Replace with API call to backend
// This is temporary mock data that will be replaced with real data from the backend
export const categoriesData: CategoryCard[] = [
  {
    id: 'education',
    title: 'Education & Learning',
    schemeCount: 45,
    icon: GraduationCap,
    color: 'text-blue-600',
    description: 'Scholarships and education support',
    popular: true
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    schemeCount: 32,
    icon: Heart,
    color: 'text-red-500',
    description: 'Healthcare services & assistance',
    popular: true
  },
  {
    id: 'business',
    title: 'Business & Startups',
    schemeCount: 28,
    icon: Handshake,
    color: 'text-green-600',
    description: 'Funding for entrepreneurs',
    popular: true
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    schemeCount: 36,
    icon: Wheat,
    color: 'text-green-700',
    description: 'Farming support schemes',
    popular: true
  }
];

export const getCategories = async (): Promise<CategoryCard[]> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/categories');
  // return await response.json();
  return categoriesData;
};
