import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

const FindScheme = () => {
  return (
    <section className="py-16 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4">
        {/* Hashtags */}
        <div className="text-center mb-8">
          <p className="text-lg text-[var(--text)] font-medium">#GOVERNMENTSCHEMES / #SCHEMESFORYOU</p>
        </div>
        
        {/* Main Button */}
        <div className="flex justify-center mb-16">
          <Button className="flex items-center gap-2 py-3 px-8 font-semibold text-lg">
            Find Schemes For You
            <ArrowRight size={20} />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Total Schemes Card */}
          <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-6 rounded-2xl flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[var(--primary)] mb-2">3680+</h3>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text)]">Total Schemes</span>
              <ArrowRight size={16} className="text-[var(--primary)]" />
            </div>
          </div>
          
          {/* Central Schemes Card */}
          <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-6 rounded-2xl flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[var(--primary)] mb-2">570+</h3>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text)]">Central Schemes</span>
              <ArrowRight size={16} className="text-[var(--primary)]" />
            </div>
          </div>
          
          {/* States/UTs Schemes Card */}
          <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-6 rounded-2xl flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[var(--primary)] mb-2">3110+</h3>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text)]">States/UTs Schemes</span>
              <ArrowRight size={16} className="text-[var(--primary)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindScheme;
