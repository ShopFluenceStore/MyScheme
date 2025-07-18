import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
));
Input.displayName = "Input";
