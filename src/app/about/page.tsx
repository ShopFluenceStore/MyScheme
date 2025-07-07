import React from "react";
import VideoPlayer from "@/components/VideoPlayer";
const page = () => {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--bg-secondary)] text-[var(--primary)]">
                <div
                  className="w-2 h-2 rounded-full"
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
            <div className="space-y-8">
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
        </div>
      </section>
    </>
  );
};

export default page;
