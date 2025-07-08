'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SchemeCard from '@/components/schemes/SchemeCard';

// Mock data for the 3 schemes
const schemes = [
  {
    id: '1',
    title: 'PM Kisan Samman Nidhi',
    description: 'Income support of ₹6,000 per year to all farmer families across the country in three equal installments.',
    category: 'Agriculture',
    subCategory: 'Farmer Welfare',
    launchDate: '2018-12-01',
    deadline: 'Ongoing',
    beneficiaries: 'Small and Marginal Farmers',
    state: 'All India',
    logo: '/images/pm-kisan.png',
    isNew: false,
    lastUpdated: '2023-04-15',
    views: 12500,
    bookmarks: 3420,
    status: 'Active',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    tags: ['Farmers', 'Financial Assistance'],
    benefits: [
      '₹6,000 per year in three installments',
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
      'Bank Account Details'
    ],
    applyLink: 'https://pmkisan.gov.in/'
  },
  {
    id: '2',
    title: 'Ayushman Bharat PM-JAY',
    description: 'Health insurance coverage of up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
    category: 'Healthcare',
    subCategory: 'Health Insurance',
    launchDate: '2018-09-23',
    deadline: 'Ongoing',
    beneficiaries: 'Economically Weaker Sections',
    state: 'All India',
    logo: '/images/pmjay.png',
    isNew: false,
    lastUpdated: '2023-03-20',
    views: 18900,
    bookmarks: 5670,
    status: 'Active',
    ministry: 'Ministry of Health & Family Welfare',
    tags: ['Health', 'Insurance'],
    benefits: [
      'Health coverage up to ₹5 lakhs per family per year',
      'Cashless and paperless access to healthcare',
      'Covers pre and post-hospitalization expenses'
    ],
    eligibility: [
      'Families identified based on SECC database',
      'No restriction on family size, age or gender',
      'All pre-existing conditions covered from day one'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card',
      'Income Certificate'
    ],
    applyLink: 'https://pmjay.gov.in/'
  },
  {
    id: '3',
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for All by 2022 mission to provide affordable housing to the urban poor.',
    category: 'Housing',
    subCategory: 'Affordable Housing',
    launchDate: '2015-06-25',
    deadline: '2024-03-31',
    beneficiaries: 'Urban Poor',
    state: 'All India',
    logo: '/images/pmay.png',
    isNew: true,
    lastUpdated: '2023-05-10',
    views: 15400,
    bookmarks: 4230,
    status: 'Active',
    ministry: 'Ministry of Housing and Urban Affairs',
    tags: ['Housing', 'Subsidy'],
    benefits: [
      'Interest subsidy of up to 6.5% on home loans',
      'Subsidy amount up to ₹2.67 lakhs',
      'Available for both new construction and enhancement'
    ],
    eligibility: [
      'EWS/LIG families with annual income up to ₹6 lakhs',
      'Family should not own a pucca house',
      'Beneficiary family should not have availed central assistance'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Income Certificate',
      'Address Proof',
      'Property Documents'
    ],
    applyLink: 'https://pmaymis.gov.in/'
  }
];

const SchemesPage = () => {
  const router = useRouter();

  const handleSchemeClick = (schemeId: string) => {
    router.push(`/schemes/${schemeId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <div className="bg-[var(--bg-secondary)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--primary)]">Government Schemes</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[var(--text)]">Discover and apply for various government schemes in India</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">Featured Schemes</h2>
          <p className="text-[var(--sub-text)]">Explore these popular government schemes</p>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="h-full"
            >
              <SchemeCard
                id={scheme.id}
                title={scheme.title}
                description={scheme.description}
                category={scheme.category}
                subCategory={scheme.subCategory}
                launchDate={scheme.launchDate}
                deadline={scheme.deadline}
                beneficiaries={scheme.beneficiaries}
                state={scheme.state}
                logo={scheme.logo}
                isNew={scheme.isNew}
                lastUpdated={scheme.lastUpdated}
                views={scheme.views}
                bookmarks={scheme.bookmarks}
                status={scheme.status as 'active' | 'upcoming' | 'expired' | undefined}
                ministry={scheme.ministry}
                tags={scheme.tags}
                benefits={scheme.benefits}
                eligibility={scheme.eligibility}
                documentsRequired={scheme.documentsRequired}
                applyLink={scheme.applyLink}
                onClick={() => handleSchemeClick(scheme.id)}
                className="h-full flex flex-col"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Looking for more schemes?</h2>
          <p className="text-[var(--sub-text)] mb-6 max-w-2xl mx-auto">
            We&apos;re constantly updating our database with the latest government schemes.
            Check back soon for more options or contact us for specific queries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;