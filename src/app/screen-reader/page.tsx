import React from 'react';
import { Eye, Monitor, Users } from 'lucide-react';
import Link from 'next/link';

interface ScreenReader {
  name: string;
  website: string;
  type: 'Free' | 'Commercial';
}

const screenReaders: ScreenReader[] = [
  {
    name: 'Non Visual Desktop Access (NVDA)',
    website: 'http://www.nvda-project.org/',
    type: 'Free'
  },
  {
    name: 'System Access To Go',
    website: 'http://www.satogo.com',
    type: 'Free'
  },
  {
    name: 'Hal',
    website: 'http://www.yourdolphin.co.uk/productdetail.asp?id=5',
    type: 'Commercial'
  },
  {
    name: 'JAWS',
    website: 'http://www.freedomscientific.com/products/software/jaws/',
    type: 'Commercial'
  },
  {
    name: 'Supernova',
    website: 'http://www.yourdolphin.co.uk/productdetail.asp?id=1',
    type: 'Commercial'
  },
  {
    name: 'Window-Eyes',
    website: 'http://www.gwmicro.com/Window-Eyes/',
    type: 'Commercial'
  }
];

const Accessibility: React.FC = () => {
  return (
    <section className="py-16 mb-16 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[var(--bg-secondary)] text-[var(--primary)] rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            <span>Web Accessibility</span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-6">
            Accessibility Statement
          </h1>
        </div>

        {/* Accessibility Information */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3">
                  WCAG 2.0 Level AA Compliance
                </h3>
                <p className="text-[var(--sub-text)] leading-relaxed">
                  myScheme complies with World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.0 level AA. 
                  This will enable people with visual impairments access the platform using assistive technologies, such as screen readers. 
                  The information of the platform is accessible with different screen readers, such as JAWS.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Readers Table Section */}
        <div className="max-w-5xl mx-auto">
          
          {/* Table Header */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[var(--text)] mb-2">
              Information related to the various screen readers
            </h2>
          </div>

          {/* Responsive Table Container */}
          <div className="bg-[var(--bg-primary)] rounded-lg shadow-sm border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                
                {/* Table Header */}
                <thead>
                  <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                    <th className="px-6 py-4 text-left text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                      Screen Reader
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                      Free / Commercial
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[var(--border)]">
                  {screenReaders.map((reader, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-[var(--bg-secondary)] transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-[var(--text)] font-medium">
                        {reader.name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Link
                          href={reader.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--link-color)] hover:underline transition-colors duration-200"
                        >
                          {reader.website}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reader.type === 'Free' 
                            ? 'bg-[var(--bg-secondary)] text-[var(--primary)]' 
                            : 'bg-[var(--error)]/20 text-[var(--error)]'
                        }`}>
                          {reader.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[var(--card-secondary)] border border-[var(--border)] rounded-lg flex items-center justify-center flex-shrink-0">
                <Monitor className="w-5 h-5 text-[var(--card-sub-text)]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--card-text)] mb-2">
                  Need Assistance?
                </h4>
                <p className="text-[var(--card-sub-text)] text-sm leading-relaxed">
                  If you encounter any accessibility barriers while using myScheme, please contact our support team. 
                  We are committed to providing equal access to all users and will work to resolve any issues promptly.
                </p>
                <div className="mt-3">
                  <Link 
                    href="mailto:support-myscheme@digitalindia.gov.in"
                    className="text-[var(--link-color)] text-sm font-medium hover:underline"
                  >
                    support-myscheme@digitalindia.gov.in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accessibility;