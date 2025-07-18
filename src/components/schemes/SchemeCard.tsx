import React, { useState } from 'react';
import Image from 'next/image';
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Share2,
  Eye,
  Award,
  FileText,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface SchemeCardProps {
  id: string;
  title: string;
  description: string;
  category?: string;
  state?: string | string[];
  deadline: string;
  subCategory?: string;
  beneficiaries?: string[];
  launchDate?: string;
  ministry?: string;
  tags?: string[];
  isNew?: boolean;
  onClick?: (id: string) => void;
  className?: string;
  showDetails?: boolean;
  lastUpdated?: string;
  views?: number;
  bookmarks?: number;
  logo?: string;
  status?: 'active' | 'upcoming' | 'expired';
  benefits?: string[];
  eligibility?: string[];
  documentsRequired?: string[];
  applyLink?: string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  id,
  title,
  description,
  deadline,
  beneficiaries,
  launchDate,
  state,
  logo,
  status = 'active',
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
  const viewsCount = views || 0;
  
  // Show new badge if scheme is marked as new and not loading
  const showNewBadge = isNew && !isLoading;

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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: description,
          url: `${window.location.origin}/schemes/${id}`,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
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
      className={`bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--border)] transition-all ${
        isLoading ? 'animate-pulse' : 'cursor-pointer hover:shadow-md hover:border-[var(--primary)]'
      } ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleCardClick(e as unknown as React.MouseEvent)}
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-lg bg-[var(--bg-secondary)] flex-shrink-0 flex items-center justify-center`}>
            {logo && !isLoading ? (
              <Image 
                src={logo} 
                alt={title} 
                width={24}
                height={24}
                className="object-contain"
              />
            ) : (
              <Award className="w-6 h-6 text-[var(--primary)]" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold text-[var(--text)] ${isLoading ? 'h-6 bg-[var(--bg-secondary)] rounded w-3/4' : ''}`}>
              {isLoading ? '' : title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {!isLoading && status && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  status === 'active' ? 'bg-[var(--success-light)] text-[var(--success)]' : 
                  status === 'upcoming' ? 'bg-[var(--info-light)] text-[var(--info)]' :
                  'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              )}
              {showNewBadge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--success-light)] text-[var(--success)]">
                  New
                </span>
              )}
            </div>
          </div>
          
          {!isLoading && (
            <div className="flex gap-1">
              <button 
                onClick={handleBookmark}
                className={`p-1.5 rounded-full hover:bg-[var(--bg-secondary)] ${
                  isBookmarked ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--primary)]'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button 
                onClick={handleShare}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--primary)]"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4">
        <p className={`text-sm text-[var(--text-muted)] ${isLoading ? 'h-12 bg-[var(--bg-secondary)] rounded' : 'line-clamp-3'}`}>
          {isLoading ? '' : description}
        </p>
        
        {/* Key Details */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-[var(--primary)] flex-shrink-0" />
            <div>
              <div className="text-xs text-[var(--text-muted)]">Launched</div>
              <div className="text-sm text-[var(--text)]">
                {isLoading ? '--' : launchDate ? formatDate(launchDate) : 'N/A'}
              </div>
            </div>
          </div>
          
          {deadline && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-[var(--danger)] flex-shrink-0" />
              <div>
                <div className="text-xs text-[var(--text-muted)]">Deadline</div>
                <div className="text-sm text-[var(--text)]">
                  {isLoading ? '--' : formatDate(deadline)}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-[var(--success)] flex-shrink-0" />
            <div>
              <div className="text-xs text-[var(--text-muted)]">For</div>
              <div className="text-sm text-[var(--text)]">
                {isLoading ? '--' : beneficiaries || 'All Citizens'}
              </div>
            </div>
          </div>
          
          {state && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[var(--info)] flex-shrink-0" />
              <div>
                <div className="text-xs text-[var(--text-muted)]">Location</div>
                <div className="text-sm text-[var(--text)]">
                  {isLoading ? '--' : Array.isArray(state) ? state.join(', ') : state}
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
              className="flex items-center text-sm font-medium text-[var(--primary)] hover:opacity-80"
            >
              {isExpanded ? 'Show less' : 'View details'}
              {isExpanded ? (
                <ChevronUp className="ml-1 w-4 h-4" />
              ) : (
                <ChevronDown className="ml-1 w-4 h-4" />
              )}
            </button>
            
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                {benefits.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-[var(--text)] mb-2 flex items-center">
                      <Award className="w-4 h-4 text-[var(--primary)] mr-2" />
                      Key Benefits
                    </h5>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-[var(--text)]">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {eligibility.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-[var(--text)] mb-2 flex items-center">
                      <User className="w-4 h-4 text-[var(--primary)] mr-2" />
                      Eligibility
                    </h5>
                    <ul className="space-y-2">
                      {eligibility.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-sm text-[var(--text)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {documentsRequired.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-[var(--text)] mb-2 flex items-center">
                      <FileText className="w-4 h-4 text-[var(--primary)] mr-2" />
                      Required Documents
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {documentsRequired.map((doc, index) => (
                        <div key={index} className="flex items-start p-2 rounded bg-[var(--bg-secondary)]">
                          <FileText className="w-4 h-4 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-[var(--text)]">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          {!isLoading && lastUpdated && (
            <div className="text-xs text-[var(--text-muted)]">
              Updated {new Date(lastUpdated).toLocaleDateString()}
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center text-xs text-[var(--text-muted)]">
              <Eye className="w-3.5 h-3.5 mr-1" />
              {viewsCount.toLocaleString()}
            </div>
            
            {applyLink && (
              <Link
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className=""
              >
                <Button>
                  Apply Now
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SchemeCard;
