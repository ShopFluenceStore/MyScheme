import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Import logo images
import logo1 from "/public/images/logo/logo1.svg";
import logo2 from "/public/images/logo/logo2.svg";
import Link from "next/link";

type LogoVariant = "text" | "image1" | "image2";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 24, height: 24, text: "text-lg" },
  md: { width: 36, height: 36, text: "text-xl md:text-2xl" },
  lg: { width: 48, height: 48, text: "text-2xl md:text-3xl" },
};

const Logo: React.FC<LogoProps> = ({
  variant = "text",
  className = "",
  size = "md",
}) => {
  const { width, height, text } = sizeMap[size];

  const renderLogo = () => {
    switch (variant) {
      case "image1":
        return (
          <div className={cn("flex items-center gap-3", className)}>
            <Image
              src={logo1}
              alt="Logo 1"
              width={width}
              height={height}
              className="rounded-md"
              priority
            />
          </div>
        );

      case "image2":
        return (
          <div className={cn("flex items-center gap-3", className)}>
            <Image
              src={logo2}
              alt="Logo 2"
              width="80"
              height="80"
              className="rounded-full"
              priority
            />
          </div>
        );

      case "text":
      default:
        return (
          <Link href="/">
            <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
              <h1 className={cn("font-semibold tracking-tight", text)}>
                <span className="text-[var(--primary)] dark:text-[var(--primary)]">
                  my
                </span>
                <span className="text-[var(--text)] dark:text-[var(--text)]">
                  Scheme
                </span>
              </h1>
            </div>
          </Link>
        );
    }
  };

  return renderLogo();
};

export default Logo;
