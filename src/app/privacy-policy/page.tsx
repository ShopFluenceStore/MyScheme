import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mb-16 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-12 lg:py-18">
        <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-6">
            Privacy Policy
          </h1>
          
          <div className="prose max-w-none text-[var(--sub-text)] space-y-6">
            <section>
              <p className="mb-4">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">1. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Personal Information:</strong> Name, email address, and contact details when you register or contact us</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform</li>
                <li><strong>Device Information:</strong> IP address, browser type, and device identifiers</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your experience on our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">3. Information Sharing</h2>
              <p>We do not sell or share your personal information with third parties except:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With service providers who assist in operating our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction or deletion of your information</li>
                <li>Object to or restrict processing of your data</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">6. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@myscheme.gov.in<br />
                Address: [Your Company Address]<br />
                Phone: [Your Contact Number]
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
