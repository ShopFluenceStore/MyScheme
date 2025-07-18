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
  lastUpdated: string;
  ministry?: string;
  status?: 'active' | 'upcoming' | 'expired';
  views?: number;
  bookmarks?: number;
  tags?: string[];
  benefits?: string[];
  eligibility?: string[];
  documentsRequired?: string[];
  applyLink?: string;
}

export interface SchemeFormData extends Omit<Scheme, 'id' | 'lastUpdated' | 'views' | 'bookmarks'> {
  // Form-specific properties
  isDraft?: boolean;
  submitterNotes?: string;
}

export interface SchemeFilters {
  query?: string;
  category?: string;
  status?: 'active' | 'upcoming' | 'expired';
  state?: string;
  ministry?: string;
}
