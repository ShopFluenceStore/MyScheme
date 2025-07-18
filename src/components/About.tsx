"use client";
import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
const About: React.FC = () => {


  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Enhanced Content */}
          <div className="space-y-8">
            {/* Enhanced Section Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 border border-[var(--border)] rounded-full text-sm font-medium bg-[var(--bg-secondary)] text-[var(--primary)]">
                <div
                  className="w-2 h-2 rounded-full leading-snug tracking-wide"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>
                <span>About myScheme</span>
              </div>

              <h2
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "var(--text)" }}
              >
                Empowering Citizens Through
                <span className="block" style={{ color: "var(--primary)" }}>
                  Digital Innovation
                </span>
              </h2>
            </div>

            {/* Enhanced Content Paragraphs */}
            <div className="space-y-6 text-[var(--sub-text)]">
              <p className="text-lg leading-snug tracking-wide">
                myScheme is Indias most comprehensive digital platform,
                connecting millions of citizens with over{" "}
                <strong className="font-semibold text-[var(--primary)]">
                  4,000+ government schemes
                </strong>{" "}
                across all states and central ministries.
              </p>

              <p className="text-lg leading-snug tracking-wide">
                Our AI-powered recommendation engine analyzes your profile to
                suggest the most relevant schemes, eliminating the complexity of
                navigating multiple government portals and ensuring you never
                miss an opportunity.
              </p>

              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="text-center p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <div className="text-2xl font-bold text-[var(--primary)]">
                    4,000+
                  </div>
                  <div className="text-sm text-[var(--sub-text)]">
                    Active Schemes
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <div className="text-2xl font-bold text-[var(--primary)]">
                    10M+
                  </div>
                  <div className="text-sm text-[var(--sub-text)]">
                    Citizens Helped
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/schemes">
                <Button
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-base font-semibold"
                  variant="primary"
                >
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-base font-semibold"
                  variant="secondary"
                >
                  <span>Learn More</span>
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Enhanced Video */}
          <VideoPlayer 
            videoId="bNOWkB-6cmc"
            title="myScheme Platform Overview"
            description="Discover how we're transforming access to government schemes"
            duration="2:45"
            showThumbnail={true}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
