'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiMapPin, FiUsers, FiFileText } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  launchDate: string;
  deadline: string;
  beneficiaries: string;
  state: string;
  logo: string;
  isNew: boolean;
  lastUpdated: string;
  views: number;
  bookmarks: number;
  status: 'Active' | 'Inactive' | 'Upcoming';
  ministry: string;
  tags: string[];
  benefits: string[];
  eligibility: string[];
  documentsRequired: string[];
}

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  launchDate: string;
  deadline: string;
  beneficiaries: string;
  state: string;
  logo: string;
  isNew: boolean;
  lastUpdated: string;
  views: number;
  bookmarks: number;
  status: 'Active' | 'Inactive' | 'Upcoming';
  ministry: string;
  tags: string[];
  benefits: string[];
  eligibility: string[];
  documentsRequired: string[];
}

// This would normally come from an API
const demoSchemes: Scheme[] = [
  {
    id: '1',
    title: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for all landholding farmers in the country.',
    category: 'Agriculture',
    subCategory: 'Farmer Welfare',
    launchDate: '2018-12-01',
    deadline: 'Ongoing',
    beneficiaries: 'Small and Marginal Farmers',
    state: 'All India',
    logo: '/schemes/pm-kisan.png',
    isNew: false,
    lastUpdated: '2023-04-01',
    views: 12500,
    bookmarks: 3420,
    status: 'Active',
    ministry: 'Ministry of Agriculture',
    tags: ['Farmers', 'Financial Assistance', 'Direct Benefit Transfer'],
    benefits: [
      '₹6,000 per year in three equal installments',
      'Direct transfer to bank accounts',
      'No middlemen involved'
    ],
    eligibility: [
      'Small and marginal farmer families',
      'Landholding farmers with cultivable landholding',
      'Family with combined landholding of up to 2 hectares'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Mobile Number Linked with Aadhaar'
    ],
  },
  {
    id: '2',
    title: 'PM Awas Yojana (Urban)',
    description: 'Housing for All by 2022 mission for urban areas.',
    category: 'Housing',
    subCategory: 'Affordable Housing',
    launchDate: '2015-06-25',
    deadline: '2024-12-31',
    beneficiaries: 'Urban Poor',
    state: 'All India',
    logo: '/schemes/pmay.png',
    isNew: true,
    lastUpdated: '2023-05-15',
    views: 18900,
    bookmarks: 5120,
    status: 'Active',
    ministry: 'Ministry of Housing and Urban Affairs',
    tags: ['Housing', 'Subsidy', 'EWS/LIG'],
    benefits: [
      'Interest subsidy of 6.5% for 20 years',
      'Financial assistance for construction',
      'In-situ slum rehabilitation'
    ],
    eligibility: [
      'Families from EWS/LIG categories',
      'Beneficiary family should not own a pucca house',
      'Beneficiary family should not have availed central assistance under any housing scheme'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Income Certificate',
      'Address Proof',
      'Caste Certificate (if applicable)'
    ],
  },
  {
    id: '3',
    title: 'Ayushman Bharat - PMJAY',
    description: 'World\'s largest health insurance scheme providing health coverage up to ₹5 lakhs per family per year.',
    category: 'Health',
    subCategory: 'Health Insurance',
    launchDate: '2018-09-23',
    deadline: 'Ongoing',
    beneficiaries: 'Economically Weaker Sections',
    state: 'All India',
    logo: '/schemes/pmjay.png',
    isNew: false,
    lastUpdated: '2023-03-10',
    views: 24500,
    bookmarks: 8900,
    status: 'Active',
    ministry: 'Ministry of Health and Family Welfare',
    tags: ['Health', 'Insurance', 'EWS'],
    benefits: [
      'Health coverage up to ₹5 lakhs per family per year',
      'Cashless and paperless access to healthcare',
      'Covers pre-existing conditions from day one'
    ],
    eligibility: [
      'Families identified based on SECC database',
      'No restriction on family size, age or gender',
      'All pre-existing conditions covered from day one'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card',
      'Income Certificate',
      'Caste Certificate (if applicable)'
    ],
  }
];

export default function SchemeDetailPage() {
  const params = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the scheme data here
    const foundScheme = demoSchemes.find(s => s.id === params.id);
    setScheme(foundScheme || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
    </div>;
  }

  if (!scheme) {
    notFound();
  }

  return (
    <div className="min-h-screen mb-16 bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link href="/schemes" className="mr-4 text-[var(--text)] hover:text-[var(--primary)]">
              <FiArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">{scheme.title}</h1>
              <div className="flex items-center mt-1 text-sm text-[var(--sub-text)]">
                <span className="flex items-center">
                  <FiMapPin className="mr-1" /> {scheme.state}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <FiCalendar className="mr-1" /> Launched on {new Date(scheme.launchDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scheme.status === 'Active' ? 'bg-[var(--primary)] text-[var(--bg-primary)]' : 'bg-[var(--primary)] text-[var(--bg-primary)]'
              }`}>
                {scheme.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">Overview</h2>
              <p className="text-[var(--sub-text)] mb-6">{scheme.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <FiUsers className="w-5 h-5 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-[var(--sub-text)]">Beneficiaries</h3>
                    <p className="text-[var(--primary)]">{scheme.beneficiaries}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiFileText className="w-5 h-5 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-[var(--sub-text)]">Category</h3>
                    <p className="text-[var(--primary)]">{scheme.category} • {scheme.subCategory}</p>
                  </div>
                </div>
              </div>

              {scheme.tags && scheme.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {scheme.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--sub-text)] text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">Key Benefits</h2>
              <ul className="space-y-3">
                {scheme.benefits.map((benefit, index) => (
                  <li key={index} className="flex">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--text)]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {scheme.eligibility.map((item, index) => (
                  <li key={index} className="flex">
                    <svg className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-[var(--text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">How to Apply</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                  <h4 className="font-medium text-[var(--text] mb-2">Documents Required</h4>
                  <ul className="space-y-1">
                    {scheme.documentsRequired.map((doc, index) => (
                      <li key={index} className="text-sm text-[var(--sub-text)] flex items-start">
                        <svg className="h-4 w-4 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  // href={scheme.applyLink}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                >
                  Apply Now
                  <FiExternalLink className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-[var(--primary)] hover:text-[var(--primary)] text-sm font-medium"
                  >
                    Save for Later
                  </button>
                </div>
              </div>
            </div>

            {/* Scheme Details */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">Scheme Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-[var(--text)]">Ministry</dt>
                  <dd className="mt-1 text-sm text-[var(--sub-text)]">{scheme.ministry}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--text)]">Launched On</dt>
                  <dd className="mt-1 text-sm text-[var(--sub-text)]">
                    {new Date(scheme.launchDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--text)]">Last Updated</dt>
                  <dd className="mt-1 text-sm text-[var(--sub-text)]">
                    {new Date(scheme.lastUpdated).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--text)]">Status</dt>
                  <dd className="mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      scheme.status === 'Active' ? 'bg-[var(--bg-secondary)] text-[var(--primary)]' : 'bg-[var(--primary)] text-[var(--bg-primary)]'
                    }`}>
                      {scheme.status}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

