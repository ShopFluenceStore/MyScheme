import { ReactNode } from 'react';
import Breadcrumb from './Breadcrumb';

interface MainLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

export default function MainLayout({ children, showBreadcrumb = true }: MainLayoutProps) {
  return (
    <div>
      {showBreadcrumb && <Breadcrumb />}
      <div>
        {children}
      </div>
    </div>
  );
}
