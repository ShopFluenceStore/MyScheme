"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-4 transition-all duration-300 hover:shadow-xl",
        className,
      )}
    >
      {/* Image or header content */}
      <div className="w-full h-full rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
        {header}
        <Image
          src="/images/about-img.svg"
          alt="Card Header"
          className="object-contain w-full h-full"
          width={500}
          height={800}
        />
      </div>

      {/* Icon, title, description */}
      <div className="transition-all duration-300 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-[var(--text)]">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-[var(--text-muted)]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default BentoGridItem;
