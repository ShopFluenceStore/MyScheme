"use client";

import React, { useState } from "react";

interface Filters {
  category: string;
  state: string;
  tags: string[];
  isNew: boolean;
  deadline: string;
  [key: string]: string | string[] | boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key: keyof Filters, value: string | string[] | boolean) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleCheckboxChange = (key: keyof Filters, value: string) => {
    const current = (localFilters[key] || []) as string[];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    handleChange(key, updated);
  };

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const categories = [
    "Agriculture", "Education", "Employment", "Health", "Housing",
    "Women Empowerment", "Entrepreneurship", "Financial Assistance",
    "Social Welfare", "Digital India"
  ];

  const states = [
    "All India", "Punjab", "Maharashtra", "Uttar Pradesh", "Tamil Nadu",
    "Karnataka", "Gujarat", "Rajasthan", "West Bengal", "Bihar"
  ];

  const tags = [
    "Farmers", "Students", "Women", "Startups", "Unemployed",
    "Below Poverty Line", "Senior Citizens", "Youth", "Rural",
    "Urban", "Financial Aid", "Subsidy"
  ];

  return (
    <aside className="w-full lg:w-80 h-full sticky top-24 p-6 mr-4 overflow-y-auto bg-[var(--bg-primary)] text-[var(--text)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filter By</h2>
        <button
          onClick={() => {
            setLocalFilters({
              category: "",
              state: "",
              tags: [],
              isNew: false,
              deadline: "",
            });
            onFilterChange({
              category: "",
              state: "",
              tags: [],
              isNew: false,
              deadline: "",
            });
          }}
          className="text-sm text-blue-500 hover:underline"
        >
          Reset Filters
        </button>
      </div>

      {/* State Dropdown */}
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">State</label>
        <select
          value={localFilters.state || ""}
          onChange={(e) => handleChange("state", e.target.value)}
          className="w-full p-2 rounded border border-[var(--border)] bg-[var(--bg-primary)]"
        >
          <option value="">Select</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Category Toggle */}
      <div className="mb-2 border-t border-[var(--border)] pt-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <label className="text-sm font-medium">Scheme Category</label>
          <span className="text-xl">+</span>
        </div>
        {openSections["category"] && (
          <div className="mt-2 space-y-1">
            {categories.map((cat) => (
              <label key={cat} className="block text-sm">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={localFilters.category === cat}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="mr-2 accent-[var(--primary)]"
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mb-2 border-t border-[var(--border)] pt-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("tags")}
        >
          <label className="text-sm font-medium">Tags</label>
          <span className="text-xl">+</span>
        </div>
        {openSections["tags"] && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {tags.map((tag) => (
              <label key={tag} className="flex items-center text-sm gap-2">
                <input
                  type="checkbox"
                  checked={localFilters.tags.includes(tag)}
                  onChange={() => handleCheckboxChange("tags", tag)}
                  className="accent-[var(--primary)]"
                />
                {tag}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* New Schemes Toggle */}
      <div className="mb-2 border-t border-[var(--border)] pt-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={localFilters.isNew}
            onChange={(e) => handleChange("isNew", e.target.checked)}
            className="accent-[var(--primary)]"
          />
          Show New Schemes
        </label>
      </div>

      {/* Deadline Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Before Deadline</label>
        <input
          type="date"
          value={localFilters.deadline || ""}
          onChange={(e) => handleChange("deadline", e.target.value)}
          className="w-full p-2 rounded border border-[var(--border)] bg-[var(--bg-primary)]"
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
