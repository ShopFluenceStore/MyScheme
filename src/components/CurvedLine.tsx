import React from "react";

type Variant = 'primary' | 'secondary' | 'bgSecondary' | 'gray';

interface CurvedLineProps {
  variant?: Variant;
  className?: string;
}

const variantColors = {
  primary: 'bg-[var(--primary)]',
  secondary: 'bg-[var(--secondary)]',
  bgSecondary: 'bg-[var(--bg-secondary)]',
  gray: 'bg-[var(--gray)]',
};

const CurvedLine: React.FC<CurvedLineProps> = ({
  variant = 'primary',
  className = '',
}) => {
  const baseClasses = 'absolute left-0 w-full h-10 transform skew-y-1 origin-top-left -translate-y-8';
  const variantClass = variantColors[variant] || variantColors.primary;
  
  return (
    <div className={`${baseClasses} ${variantClass} ${className}`}></div>
  );
};

// Named exports for each variant
export const PrimaryCurvedLine = () => <CurvedLine variant="primary" />;
export const SecondaryCurvedLine = () => <CurvedLine variant="secondary" />;
export const BgSecondaryCurvedLine = () => <CurvedLine variant="bgSecondary" />;
export const GrayCurvedLine = () => <CurvedLine variant="gray" />;

export default CurvedLine;
