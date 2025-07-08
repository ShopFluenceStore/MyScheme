import React from "react";
import { Eye, Search, FileText, Target } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

const AboutPage = () => {
  return (
    <div className="min-h-screen my-16 bg-[var(--bg-secondary)]">
      {/* Section 1: Vision & Mission */}
      <section className="bg-[var(--bg-secondary)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Video */}
            <div className="w-full lg:w-1/2 relative">
              {/* <div className="relative rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 -z-10 transform rotate-1 scale-95"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-green-100 -z-10 transform -rotate-1 scale-95"></div>
                <div className="relative aspect-video bg-green-200 flex items-center justify-center">
                  <Image
                    src="/placeholder-video.jpg"
                    alt="About Us Video"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Play className="text-white w-8 h-8 ml-1" />
                    </div>
                  </div>
                </div>
              </div> */}
              <VideoPlayer
                videoId="bNOWkB-6cmc"
                title="myScheme Platform Overview"
                description="Discover how we're transforming access to government schemes"
                duration="2:45"
                showThumbnail={true}
                className="w-full"
              />
            </div>

            {/* Right Side - Vision & Mission */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 bg-[var(--bg-primary)] rounded-full p-2 border-2 border-[var(--primary)]">
                  <Eye className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text)] mb-2">
                    Our Vision
                  </h3>
                  <p className="text-[var(--sub-text)]">
                    To create a seamless platform connecting citizens with
                    government schemes and initiatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 bg-[var(--bg-primary)] rounded-full p-2 border-2 border-[var(--primary)]">
                  <Target className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text)] mb-2">
                    Our Mission
                  </h3>
                  <p className="text-[var(--sub-text)]">
                    To empower every citizen with easy access to government
                    schemes through transparent and efficient digital solutions,
                    ensuring no one is left behind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Platform Description */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-[var(--sub-text)] max-w-none">
            <p className="mb-6">
              Welcome to our platform, a comprehensive digital solution designed
              to bridge the gap between government initiatives and citizens. Our
              mission is to simplify access to various schemes and programs,
              making it easier for individuals and businesses to find and
              benefit from the support they need.
            </p>
            <p className="mb-6">
              We understand that navigating through numerous government schemes
              can be overwhelming. Thats why weve created an intuitive platform
              that categorizes and presents information in a clear, accessible
              manner. Our goal is to ensure that every citizen can easily find
              and understand the opportunities available to them.
            </p>
            <p className="mb-6">
              Our team is committed to maintaining the most up-to-date
              information and continuously improving the platform based on user
              feedback. We believe in the power of technology to create positive
              change and are dedicated to making government services more
              accessible to all.
            </p>
            <p className="text-[var(--sub-text)] mt-8">
              This platform is developed and maintained by NCeG, MeitY, and
              DARPG, with the vision of creating a more connected and empowered
              society.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Search Illustration */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] text-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Find the Right Scheme for You
              </h2>
              <p className="mb-6 text-[var(--sub-text)]">
                Our advanced search functionality helps you quickly find the
                government schemes that match your needs. Whether youre a
                student, entrepreneur, farmer, or senior citizen, weve got you
                covered.
              </p>
              <p className="text-[var(--sub-text)]">
                With just a few clicks, you can filter through hundreds of
                schemes based on your location, eligibility, and requirements.
                Our user-friendly interface ensures that you can find what youre
                looking for without any hassle.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <div className="absolute inset-0 bg-[var(--primary)] rounded-full opacity-20 transform scale-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="w-32 h-32 text-[var(--primary)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Feature Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--primary)]">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-16 h-16 bg-[var(--bg-primary)] border-2 border-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Eligibility Check
                </h3>
                <p className="text-[var(--sub-text)] text-center">
                  Quickly determine which schemes you qualify for based on your
                  profile and requirements.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-16 h-16 bg-[var(--bg-primary)] border-2 border-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Search className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Scheme Finder
                </h3>
                <p className="text-[var(--sub-text)] text-center">
                  Use our intelligent search to find the perfect government
                  schemes tailored to your needs.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="w-16 h-16 bg-[var(--bg-primary)] border-2 border-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FileText className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Detailed Information
                </h3>
                <p className="text-[var(--sub-text)] text-center">
                  Get comprehensive details about each scheme, including
                  benefits, documents required, and application process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
