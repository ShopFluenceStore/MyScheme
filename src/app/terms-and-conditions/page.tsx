import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <main className="min-h-screen  bg-[var(--bg-primary)]">
      <div className="max-w-7xl mb-16 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-12 lg:py-18">
        <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-6">
            Terms & Conditions
          </h1>
          
          <div className="prose max-w-none text-[var(--sub-text)] space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this platform, you accept and agree to be bound by the terms and conditions set forth below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">2. Use of Service</h2>
              <p>
                This platform is designed to provide information about various government schemes. Users are expected to use this service for lawful purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information when using our services</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">4. Intellectual Property</h2>
              <p>
                All content on this platform, including text, graphics, logos, and software, is the property of the respective government authorities and is protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">5. Privacy Policy</h2>
              <p>
                Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">6. Limitation of Liability</h2>
              <p>
                The platform and its content are provided on an &quot;as is&quot; basis. We do not guarantee the accuracy, completeness, or usefulness of any information on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the platform after such changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">8. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">9. Contact Information</h2>
              <p>
                For any questions or concerns regarding these terms, please contact us through our official communication channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
