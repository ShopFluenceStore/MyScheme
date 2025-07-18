"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SchemeCard from "@/components/schemes/SchemeCard";
import FilterSidebar from "@/components/FilterSidebar";

interface Scheme {
  _id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  launchDate: string;
  deadline: string;
  state: string;
  logo: string;
  isNew: boolean;
  lastUpdated: string;
  bookmarks: number;
  tags: string[];
  benefits: string[];
  eligibility?: string[];
  documentsRequired?: string[];
}

const SchemesPage = () => {
  const router = useRouter();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  interface Filters {
    category: string;
    state: string;
    tags: string[];
    isNew: boolean;
    deadline: string;
    [key: string]: string | string[] | boolean;
  }

  const [filters, setFilters] = useState<Filters>({
    category: "",
    state: "",
    tags: [],
    isNew: false,
    deadline: "",
  });

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch("/api/schemes");
        const data = await res.json();
        if (data.success) setSchemes(data.schemes);
        else alert("Failed to load schemes");
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching schemes");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const handleSchemeClick = (schemeId: string) => {
    router.push(`/schemes/${schemeId}`);
  };

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <div className="bg-[var(--bg-secondary)] py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--primary)]">
          Government Schemes
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[var(--text)]">
          Discover and apply for various government schemes in India
        </p>
      </div>

      <div className="px-12 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">
            Featured Schemes
          </h2>
          <p className="text-[var(--sub-text)]">
            Explore these popular government schemes
          </p>
        </div>

        {/* left sidebar - all schemes filter */}
        <div className="flex gap-4">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          <div className="w-full">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="w-full">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder='Search (e.g. "Scheme Name")'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-4 pr-12 border border-[var(--border)] bg-[var(--white)]/10 rounded-full text-[var(--text)] focus:outline-none focus:ring focus:ring-[var(--primary)] focus:border-[var(--primary)] hover:border-[var(--primary)] shadow-sm placeholder:text-[var(--sub-text)]"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--white)] rounded-full p-2 cursor-pointer">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-[var(--sub-text)] mt-2">
                  For an exact match, put the words in quotes. For example:{" "}
                  <b className="text-[var(--primary)]">
                    &quot;Scheme Name&quot;
                  </b>
                </p>
              </div>
            </div>

            {/* Total Schemes */}
            <p className="mb-4 text-sm text-[var(--sub-text)]">
              Total{" "}
              <span className="font-bold text-[var(--card-sub-text)]">
                {filteredSchemes.length}
              </span>{" "}
              schemes available
            </p>

            {/* Schemes List */}
            {loading ? (
              <p className="flex justify-center items-center w-full text-center text-[var(--primary)] text-lg">
                Loading schemes....
              </p>
            ) : filteredSchemes.length > 0 ? (
              <div className="flex flex-col w-full h-auto gap-8">
                {filteredSchemes.map((scheme) => (
                  <motion.div
                    key={scheme._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <SchemeCard
                      id={scheme._id}
                      title={scheme.title}
                      description={scheme.description}
                      category={scheme.category}
                      subCategory={scheme.subCategory}
                      launchDate={scheme.launchDate}
                      deadline={scheme.deadline}
                      state={scheme.state}
                      logo={scheme.logo}
                      isNew={scheme.isNew}
                      lastUpdated={scheme.lastUpdated}
                      bookmarks={scheme.bookmarks}
                      tags={scheme.tags}
                      benefits={scheme.benefits}
                      eligibility={scheme.eligibility}
                      documentsRequired={scheme.documentsRequired}
                      onClick={() => handleSchemeClick(scheme._id)}
                      className="h-full flex flex-col"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[var(--text)] text-lg mt-4">
                No schemes found matching your search.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
            Looking for more schemes?
          </h2>
          <p className="text-[var(--sub-text)] mb-6 max-w-2xl mx-auto">
            We&apos;re constantly updating our database with the latest schemes.
            Check back soon or contact us for specific queries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;
