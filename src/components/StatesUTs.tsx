"use client";
import React from 'react';
import { MapPin, Flag, ChevronDown } from 'lucide-react';

interface StateData {
  name: string;
  schemes: number;
  code: string;
  region: string;
}

const statesData: StateData[] = [
  { name: 'Delhi', schemes: 15, code: 'DL', region: 'North' },
  { name: 'Maharashtra', schemes: 12, code: 'MH', region: 'West' },
  { name: 'Karnataka', schemes: 10, code: 'KA', region: 'South' },
  { name: 'West Bengal', schemes: 8, code: 'WB', region: 'East' }
];

const regionColors = {
  'North': 'text-blue-600',
  'South': 'text-green-600',
  'East': 'text-orange-600',
  'West': 'text-purple-600',
  'Central': 'text-red-600',
  'Northeast': 'text-teal-600'
};

const StatesUTs: React.FC = () => {

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text)' }}>
          Browse by States & UTs
        </h2>
        <p className="text-[var(--sub-text)] max-w-2xl mx-auto">
          Discover {statesData.reduce((sum, state) => sum + state.schemes, 0).toLocaleString()}+ schemes across India
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statesData.map((state) => {
            const regionColor = regionColors[state.region as keyof typeof regionColors];
            
            return (
              <div
                key={state.code}
                className="group cursor-pointer p-5 rounded-xl border transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border)'
                }}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${regionColor}`} 
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                  >
                    <Flag className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                          {state.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span 
                            className="inline-block px-2 py-0.5 text-xs font-medium rounded-full" 
                            style={{ 
                              backgroundColor: 'var(--bg-primary)', 
                              color: regionColor 
                            }}
                          >
                            {state.region}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs font-medium" style={{ color: 'var(--sub-text)' }}>
                        <span>{state.schemes}</span>
                        <span>schemes</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1 text-xs text-[var(--sub-text)]">
                        <MapPin className="w-3 h-3" />
                        <span>View details</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-[var(--sub-text)] transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default StatesUTs;