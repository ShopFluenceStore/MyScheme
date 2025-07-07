'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { useMemo } from 'react';
import { Home as HomeIcon, ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  const pathname = usePathname();
  
  // Format breadcrumb text (capitalize and replace dashes with spaces)
  const formatBreadcrumb = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Define breadcrumb item type
  type BreadcrumbItem = {
    label: string;
    href: string;
    isActive: boolean;
  };

  // Generate breadcrumbs based on current path
  const breadcrumbs = useMemo(() => {
    // Don't show breadcrumb on home page
    if (pathname === '/') return [];
    
    // Split the pathname into segments and filter out empty ones
    const segments = pathname.split('/').filter(Boolean);
    
    // Create breadcrumb items
    return [
      { label: 'Home', href: '/', isActive: false },
      ...segments.map((segment, index): BreadcrumbItem => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        return {
          label: formatBreadcrumb(segment),
          href: isLast ? '#' : href,
          isActive: isLast,
        };
      }),
    ];
  }, [pathname]);
  
  // Don't render anything on home page
  if (pathname === '/' || breadcrumbs.length === 0) return null;

  // Get the current page name (last breadcrumb)
  const currentPage = breadcrumbs[breadcrumbs.length - 1]?.label || 'Home';

  return (
    <div className="relative py-4 px-6 bg-[var(--bg-secondary)] border border-[var(--border)] mx-8 my-4 rounded-lg">

      {/* Centered current page name */}
      <h1 className="text-center text-3xl font-semibold text-[var(--text)] mb-2">
        {currentPage}
      </h1>
      
      {/* Left-aligned breadcrumb navigation with current page */}
      <nav aria-label="Breadcrumb" className="flex justify-center py-2">
        <ol className="flex items-center text-sm text-[var(--text)]">
          {breadcrumbs.map((breadcrumb, index) => (
            <Fragment key={breadcrumb.href}>
            {index > 0 ? (
              <ChevronRight key={`chevron-${index}`} className="h-4 w-4 text-[var(--primary)] mx-1" />
            ) : (
              <HomeIcon key="home-icon" className="h-4 w-4 text-[var(--primary)] mr-1" />
            )}
              <li className="flex items-center">
                {breadcrumb.isActive ? (
                <span className="text-[var(--primary)]">
                    {breadcrumb.label}
                  </span>
                ) : (
                    <Link
                      href={breadcrumb.href}
                  className="text-[var(--text)] hover:text-[var(--primary)] transition-colors duration-200"
                    >
                      {breadcrumb.label}
                    </Link>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
