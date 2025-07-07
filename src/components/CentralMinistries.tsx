"use client";
import React, { useEffect, useState } from 'react';
import { Building, ArrowRight } from 'lucide-react';
import { MinistryData, getMinistries } from '@/data/mockMinistries';

const MinistryCard = ({ ministry }: { ministry: MinistryData }) => (
  <div
    className="p-4 rounded-lg border transition-all duration-300 hover:shadow-md"
    style={{ 
      backgroundColor: 'var(--bg-primary)', 
      borderColor: 'var(--border)'
    }}
  >
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
           style={{ backgroundColor: 'var(--input-bg)', color: 'var(--primary)' }}>
        <Building className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded" 
                    style={{ backgroundColor: 'var(--input-bg)', color: 'var(--primary)' }}>
                {ministry.category}
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--primary)' }}>
                {ministry.schemes} schemes
              </span>
            </div>
            <h4 className="text-sm font-semibold leading-tight mb-1" style={{ color: 'var(--text)' }}>
              {ministry.name}
            </h4>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0 mt-1" />
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {ministry.description}
        </p>
      </div>
    </div>
  </div>
);

const CentralMinistries: React.FC = () => {
  const [ministries, setMinistries] = useState<MinistryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMinistries();
        setMinistries(data);
      } catch (err) {
        console.error('Failed to fetch ministries:', err);
        setError('Failed to load ministries. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading ministries...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--primary)' }}>
          <Building className="w-4 h-4" />
          <span>Government Ministries</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text)' }}>
          Browse by Central Ministries
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore schemes from 36 Central Ministries and discover programs tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.length > 0 ? (
          ministries.map((ministry) => (
            <MinistryCard key={ministry.name} ministry={ministry} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No ministries found
          </div>
        )}
      </div>

      <div className="text-center pt-4">
        <button className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-md"
          style={{ 
            backgroundColor: 'var(--primary)',
            color: 'white'
          }}
        >
          <span>View All Ministries</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CentralMinistries;