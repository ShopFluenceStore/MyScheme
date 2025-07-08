import React from 'react';

const SchemeSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="space-y-1">
              <div className="h-5 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-100 rounded w-24"></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export const SchemesGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SchemeSkeleton key={index} />
      ))}
    </div>
  );
};

export default SchemeSkeleton;
