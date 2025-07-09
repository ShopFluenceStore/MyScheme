"use client";
import React, { useState, useEffect } from "react";
import { Filter, MapPin, Star, ArrowRight, Building2 } from "lucide-react";

import StatesUTs from "./StatesUTs";
import CentralMinistries from "./CentralMinistries";
import { CategoryCard, getCategories } from "@/data/mockCategories";

const SchemeTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "states" | "ministries"
  >("categories");
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === "categories") {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
          setError("Failed to load categories. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchCategories();
    }
  }, [activeTab]);

  const tabs = [
    {
      id: "categories" as const,
      label: "Categories",
      icon: Filter,
      count: "15",
    },
    {
      id: "states" as const,
      label: "States/UTs",
      icon: MapPin,
      count: "29",
    },
    {
      id: "ministries" as const,
      label: "Central Ministries",
      icon: Building2,
      count: "36",
    },
  ];

  const handleTabChange = (tab: "categories" | "states" | "ministries") => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "categories":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-3">
              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-bold px-2 sm:px-0"
                style={{ color: "var(--text)" }}
              >
                Browse by Categories
              </h2>
              <p className="text-[var(--sub-text)] text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
                Explore over 4,000+ government schemes across 15 different
                categories
              </p>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-0">
              {isLoading ? (
                <div className="col-span-full text-center py-8">
                  Loading categories...
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-8 text-[var(--error)]">
                  {error}
                </div>
              ) : categories.length > 0 ? (
                categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="group cursor-pointer p-4 rounded-lg border transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {category.popular && (
                        <div className="flex justify-end mb-2">
                          <div
                            className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: "var(--primary)",
                              color: "white",
                            }}
                          >
                            <Star className="w-3 h-3 fill-current" />
                            <span>Popular</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${category.color}`}
                          style={{ backgroundColor: "var(--bg-secondary)" }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className="text-sm font-semibold leading-tight"
                              style={{ color: "var(--text)" }}
                            >
                              {category.title}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-medium"
                              style={{ color: "var(--primary)" }}
                            >
                              {category.schemeCount} schemes
                            </span>
                            <ArrowRight className="w-4 h-4 text-[var(--sub-text)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--primary)] transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-[var(--sub-text)]">
                  No categories found
                </div>
              )}
            </div>
          </div>
        );
      case "states":
        return <StatesUTs />;
      case "ministries":
        return <CentralMinistries />;
      default:
        return null;
    }
  };

  return (
    <section
      className="py-10 sm:py-12 md:py-16"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Tab Navigation */}
        <div className="mb-8 md:mb-12 px-2">
          <div className="relative">
            <div
              className="flex overflow-x-auto pb-2 -mx-2 scrollbar-hide"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
              }}
            >
              <div
                className="inline-flex rounded-lg p-1 border mx-auto"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border)",
                }}
              >
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`relative flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "shadow-sm"
                          : "hover:bg-[var(--bg-primary)] dark:hover:bg-[var(--bg-primary)]"
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? "var(--bg-primary)"
                          : "transparent",
                        color: isActive ? "var(--primary)" : "var(--text)",
                        borderColor: isActive ? "var(--border)" : "transparent",
                      }}
                    >
                      <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{tab.label}</span>
                      <span className="text-[10px] sm:text-xs opacity-75">
                        ({tab.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">{renderTabContent()}</div>
      </div>
    </section>
  );
};

export default SchemeTabs;
