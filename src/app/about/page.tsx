"use client";
import React, { useState } from "react";
import {
  Play,
  CheckCircle,
  Target,
  Search,
  FileText,
  Users,
} from "lucide-react";
import Image from "next/image";

const About: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoPlay = () => {
    setShowVideo(true);
  };

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#f0f9f4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              {!showVideo ? (
                <>
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video">
                    <Image
                      src="/images/VideoThumbnail.jpg"
                      width={1000}
                      height={562}
                      alt="myScheme Platform Overview"
                      className="w-full h-full object-cover"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handleVideoPlay}
                        className="w-16 h-16 lg:w-20 lg:h-20 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Play video"
                      >
                        <Play
                          className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1"
                          fill="currentColor"
                        />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* YouTube Video Embed */
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/bNOWkB-6cmc?autoplay=1&rel=0&modestbranding=1"
                    title="myScheme Platform Overview"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Content Sections */}
          <div className="space-y-8">
            {/* Our Vision Section */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our vision is to make citizens life easier
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission Section */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Our Mission
                  </h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      Our mission is to streamline the government - user
                      interface for government schemes and benefits.
                    </p>
                    <p>
                      Reduce time and effort required to find and avail a
                      government scheme
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>myScheme</strong> is a National Platform that aims to
                  offer one-stop search and discovery of the Government schemes.
                </p>
                <p>
                  It is an innovative, technology-based solution to discover
                  scheme information based upon the eligibility of the citizen.
                </p>
                <p>
                  This platform helps the citizen to find the right Government
                  schemes for them. It also guides on how to apply for different
                  Government schemes. Thus no need to visit multiple Government
                  websites.
                </p>
                <p>
                  myScheme platform is Developed, Designed and Operated by
                  National e-Governance Division (NeGD) in the Support of
                  Ministry of Electronics and Information Technology (MeitY),
                  Department of Administrative Reforms and Public Grievance
                  (DARPG) and in partnership with other Central and State
                  Ministries/Departments.
                </p>
              </div>
            </div>

            {/* Process Steps Icons */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {/* Eligibility Check */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Eligibility Check
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  You can check your eligibility for different schemes using
                  different criteria and personal attributes
                </p>
              </div>

              {/* Scheme Finder */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Scheme Finder
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  Fast and easy searching with filter based drill down for
                  various Government Schemes
                </p>
              </div>

              {/* Scheme in Detail */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Scheme in detail
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  Deep dive into dedicated scheme page for that government
                  scheme details before you apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
// import VideoPlayer from "@/components/VideoPlayer";

// <div className="space-y-8">
//   <VideoPlayer
//     videoId="bNOWkB-6cmc"
//     title="myScheme Platform Overview"
//     description="Discover how we're transforming access to government schemes"
//     duration="2:45"
//     showThumbnail={true}
//     className="w-full"
//   />
// </div>
