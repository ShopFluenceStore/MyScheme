import React from "react";
import {
  CheckSquare,
  FileSearch,
  MousePointer,
  ArrowRight,
} from "lucide-react";
import CurvedLine from "./CurvedLine";
import { Button } from "./ui/Button";

const ProcessSteps: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: CheckSquare,
      title: "Enter Details",
      description: "Start by entering your basic details!",
    },
    {
      id: 2,
      icon: FileSearch,
      title: "Search",
      description: "Our search engine will find the relevant schemes!",
    },
    {
      id: 3,
      icon: MousePointer,
      title: "Select & Apply",
      description: "Select and apply for the best suited scheme",
    },
  ];

  return (
    <>
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] overflow-hidden">
        {/* Decorative dot pattern */}
        <div className="absolute left-0 top-0 w-32 h-full opacity-20">
          <div className="grid grid-cols-4 gap-2 h-full">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-[var(--primary)] rounded-full"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[var(--bg-secondary)] text-[var(--primary)] rounded-full text-sm font-medium mb-4">
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4">
              Easy steps to apply for Government Schemes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to discover and apply for government
              schemes that match your profile
            </p>
          </div>

          {/* Steps Container */}
          <div className="relative">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step Card */}
                  <div className="flex-1 max-w-sm">
                    <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--border)] relative group">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-8 w-8 h-8 bg-[var(--primary)] text-[var(--bg-secondary)] rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.id}
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] transition-colors duration-300">
                        <step.icon className="w-8 h-8 text-[var(--bg-secondary)]" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[var(--text)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-6 h-6 text-[var(--bg-secondary)]" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step Card */}
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg border border-[var(--border)] relative">
                    {/* Step Number */}
                    <div className="absolute -top-3 left-6 w-6 h-6 bg-[var(--primary)] text-[var(--bg-secondary)] rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {step.id}
                    </div>

                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-[var(--bg-secondary)]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[var(--text)] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[var(--text)] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-md">
                        <ArrowRight className="w-4 h-4 text-[var(--bg-secondary)] rotate-90" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button className="inline-flex items-center space-x-2 px-8 py-4 font-semibold text-md">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      <CurvedLine variant="bgSecondary" className="left-0" />
    </>
  );
};

export default ProcessSteps;
