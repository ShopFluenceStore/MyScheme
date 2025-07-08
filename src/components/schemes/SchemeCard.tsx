import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  User, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  AlertCircle,
  Award,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Scheme } from '@/hooks/useSchemes';

interface SchemeCardProps extends Omit<Scheme, 'id' | 'description' | 'lastUpdated' | 'views' | 'bookmarks'> {
  id: string;
  description: string;
  isNew?: boolean;
  onClick?: (id: string) => void;
  className?: string;
  showDetails?: boolean;
  lastUpdated?: string;
  views?: number;
  bookmarks?: number;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  id,
  title,
  description,
  category,
  subCategory,
  deadline,
  beneficiaries,
  launchDate,
  state,
  logo,
  ministry,
  status = 'active',
  tags = [],
  benefits = [],
  eligibility = [],
  documentsRequired = [],
  applyLink,
  lastUpdated,
  views = 0,
  isNew = false,
  onClick,
  className = '',
  showDetails = false
}) => {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isLoading = id === 'temp';
  
  // Show new badge if scheme is marked as new and not loading
  const showNewBadge = isNew && !isLoading;
  
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800',
    expired: 'bg-gray-100 text-gray-800'
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoading && onClick) {
      onClick(id);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: `${window.location.origin}/schemes/${id}`,
      }).catch(console.error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article 
      className={`bg-[var(--bg-primary)] rounded-xl shadow-sm overflow-hidden border border-[var(--border)] transition-all duration-300 hover:shadow-md ${
        isLoading ? 'animate-pulse' : 'cursor-pointer'
      } ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleCardClick(e as unknown as React.MouseEvent)}
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <div className={`w-12 h-12 rounded-lg ${
              isLoading ? 'bg-gray-200' : 'bg-gradient-to-br from-blue-50 to-blue-100'
            } flex-shrink-0 flex items-center justify-center overflow-hidden`}>
              {logo && !isLoading ? (
                <Image 
                  src={logo} 
                  alt={title} 
                  width={28}
                  height={28}
                  className="object-contain"
                />
              ) : isLoading ? (
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              ) : (
                <Award className="w-6 h-6 text-blue-600" />
              )}
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <h3 className={`text-lg font-semibold ${
                  isLoading ? 'h-6 bg-gray-200 rounded w-3/4' : 'text-gray-900'
                }`}>
                  {isLoading ? '' : title}
                </h3>
                
                {!isLoading && status && (
                  <>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[status] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    {showNewBadge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    )}
                  </>
                )}
              </div>
              
              <div className="mt-1 flex flex-wrap gap-2">
                {isLoading ? (
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                ) : (
                  <>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-700 bg-blue-50">
                      {category}
                    </span>
                    {subCategory && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-purple-700 bg-purple-50">
                        {subCategory}
                      </span>
                    )}
                    {ministry && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-amber-700 bg-amber-50">
                        {ministry}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {!isLoading && (
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleBookmark}
                className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button 
                onClick={handleShare}
                className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        {!isLoading && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-600 bg-gray-50"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-500 bg-gray-50">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Body */}
      <div className="p-5">
        <p className={`text-gray-600 mb-4 ${
          isLoading ? 'h-4 bg-gray-200 rounded w-full' : ''
        }`}>
          {isLoading ? '' : description}
        </p>
        
        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start">
            <Calendar className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${
              isLoading ? 'text-gray-300' : 'text-blue-500'
            }`} />
            <div>
              <div className="text-xs text-[var(--text)]">Launched</div>
              <div className={isLoading ? 'h-4 bg-[var(--bg-secondary)] rounded w-24 mt-1' : 'text-[var(--sub-text)]'}>
                {isLoading ? '' : formatDate(launchDate)}
              </div>
            </div>
          </div>
          
          {deadline && (
            <div className="flex items-start">
              <Clock className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${
                isLoading ? 'text-gray-300' : 'text-red-500'
              }`} />
              <div>
                <div className="text-xs text-[var(--text)]">Deadline</div>
                <div className={isLoading ? 'h-4 bg-[var(--bg-secondary)] rounded w-24 mt-1' : 'text-[var(--sub-text)]'}>
                  {isLoading ? '' : formatDate(deadline)}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-start">
            <User className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${
              isLoading ? 'text-gray-300' : 'text-green-500'
            }`} />
            <div>
              <div className="text-xs text-[var(--text)]">Beneficiaries</div>
              <div className={isLoading ? 'h-4 bg-[var(--bg-secondary)] rounded w-32 mt-1' : 'text-[var(--sub-text)]'}>
                {isLoading ? '' : beneficiaries || 'All Citizens'}
              </div>
            </div>
          </div>
          
          {state && (
            <div className="flex items-start">
              <MapPin className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${
                isLoading ? 'text-gray-300' : 'text-purple-500'
              }`} />
              <div>
                <div className="text-xs text-[var(--text)]">Location</div>
                <div className={isLoading ? 'h-4 bg-[var(--bg-secondary)] rounded w-24 mt-1' : 'text-[var(--sub-text)]'}>
                  {isLoading ? '' : state}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Expandable Details */}
        {!isLoading && (benefits.length > 0 || eligibility.length > 0 || documentsRequired.length > 0) && (
          <div className="mt-4">
            <button 
              onClick={toggleExpand}
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="ml-1 w-4 h-4" />
                </>
              ) : (
                <>
                  <span>View details</span>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </>
              )}
            </button>
            
            {isExpanded && (
              <div className="mt-3 space-y-4 pt-3 border-t border-gray-100">
                {benefits.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text)] mb-2 flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-1.5" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-1.5">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-1.5">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {eligibility.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text)] mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 text-amber-500 mr-1.5" />
                      Eligibility Criteria
                    </h4>
                    <ul className="space-y-1.5">
                      {eligibility.map((criteria, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-amber-500 mr-1.5">•</span>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {documentsRequired.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text)] mb-2 flex items-center">
                      <FileText className="w-4 h-4 text-blue-500 mr-1.5" />
                      Required Documents
                    </h4>
                    <ul className="space-y-1.5">
                      {documentsRequired.map((doc, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-1.5">•</span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-5 py-3 bg-[var(--bg-primary)] border-t border-[var(--border)] flex justify-between items-center">
        <div className="text-xs text-[var(--sub-text)]">
          {!isLoading && lastUpdated && (
            <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
          )}
          {!isLoading && views > 0 && (
            <span className="ml-2">• {views.toLocaleString()} views</span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {!isLoading && applyLink && (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[var(--primary)] hover:bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Apply Now
            </a>
          )}
          
          <Link
            href={`/schemes/${id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-sm font-medium text-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            View Details <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SchemeCard;
