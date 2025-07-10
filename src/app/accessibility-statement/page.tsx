import React from "react";
import Link from "next/link";

const AccessibilityStatement = () => {
  return (
    <main className="min-h-screen mb-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-8">
            Accessibility Statement
          </h1>

          <div className="prose prose-lg text-[var(--text)] max-w-none">
            <p className="mb-4">
              We are committed to ensure that the myScheme app is accessible to
              all users irrespective of device in use, technology or ability. It
              has been built, with an aim, to provide maximum accessibility and
              usability to its visitors. As a result this platform can be viewed
              from a variety of devices such as Desktop / Laptop computers,
              web-enabled mobile devices; etc.
            </p>

            <p className="mb-4">
              We have put in our best efforts to ensure that all information on
              this platform is accessible to people with disabilities. For
              example, a user with visual disability can access this platform
              using assistive technologies, such as screen readers and screen
              magnifiers.
            </p>

            <p className="mb-4">
              We also aim to be standards compliant and follow principles of
              usability and universal design, which should help all visitors of
              this platform.
            </p>

            <p className="mb-4">
              This platform is designed using latest technologies such as React
              JS, Next JS to meet Guidelines for Indian Government Websites and
              also adheres to level A of the Web Content Accessibility
              Guidelines (WCAG) 2.0 laid down by the World Wide Web Consortium
              (W3C). Part of the information in the platform is also made
              available through links to external Websites. External Websites
              are maintained by the respective departments who are responsible
              for making these sites accessible.
            </p>

            <p className="mb-6">
              myScheme is working towards making its platform accessible for
              persons with disabilities, however currently Portable Document
              Format (PDF) files are not accessible. In addition, information
              provided in Hindi language is also not accessible.
            </p>

            <div className="border-t border-[var(--border)] pt-6">
              <p className="mb-2">
                If you have any problem or suggestion regarding the
                accessibility of this platform, please write to us at{" "}
                <Link
                  href="mailto:support-myscheme@myscheme.gov.in"
                  className="text-[var(--link-color)] hover:underline"
                >
                  support-myscheme@myscheme.gov.in
                </Link>{" "}
                to enable us to respond in a helpful manner.
              </p>
              <p>
                Do let us know the nature of the problem along with your contact
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccessibilityStatement;
