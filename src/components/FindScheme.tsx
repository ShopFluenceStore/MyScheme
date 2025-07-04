import React from "react";

const FindScheme = () => {
  return (
    <>
      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="container flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <h2 className="text-2xl font-bold text-[var(--text)] text-center">Find Scheme</h2>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <input type="text" placeholder="Enter scheme name to search..." className="w-full rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--bg-secondary)] py-2.5 px-6 pl-10 text-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 shadow-sm" />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button className="rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--bg-secondary)] py-2.5 px-6 pl-10 text-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 shadow-sm text-center">Search</button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default FindScheme;
