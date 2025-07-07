export interface MinistryData {
  name: string;
  schemes: number;
  category: string;
  description: string;
}

// TODO: Replace with API call to backend
// This is temporary mock data that will be replaced with real data from the backend
export const ministriesData: MinistryData[] = [
  { 
    name: 'Ministry of Agriculture & Farmers Welfare', 
    schemes: 156, 
    category: 'Agriculture', 
    description: 'Farming support & rural development schemes'
  },
  { 
    name: 'Ministry of Ayush', 
    schemes: 23, 
    category: 'Health', 
    description: 'Traditional medicine & wellness programs'
  },
  { 
    name: 'Ministry of Commerce & Industry', 
    schemes: 67, 
    category: 'Commerce', 
    description: 'Trade promotion & industrial development'
  },
];

export const getMinistries = async (): Promise<MinistryData[]> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/ministries');
  // return await response.json();
  return ministriesData;
};
