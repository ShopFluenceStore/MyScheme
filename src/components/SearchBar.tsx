"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const link = "/search";
  return (
    <>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[var(--muted-foreground)]" />
      </div>
      <input
        onClick={() => router.push(link)}
        type="text"
        placeholder="Enter scheme name to search..."
        className="w-full rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--bg-secondary)] py-2.5 px-6 pl-10 text-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 shadow-sm"
      />
    </>
  );
};

export default SearchBar;
