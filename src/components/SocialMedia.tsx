"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  linkClassName?: string;
  tooltipClassName?: string;
}

const SocialLinks = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.github.com/",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/",
    icon: <Instagram className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, linkClassName, tooltipClassName }: Props) => {
  return (
    <div className={cn("flex items-center gap-4 justify-start w-full", className)}>
      {SocialLinks?.map((item) => (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[var(--secondary)] hover:text-white hover:bg-[var(--primary)] rounded-full",
                "border border-[var(--border)] hover:border-[var(--primary)]",
                "transition-all duration-300 p-2.5 hover:scale-110 focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                linkClassName
              )}
              aria-label={`Visit our ${item.title}`}
            >
              {item.icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent 
            side="top"
            align="center"
            className={cn(
              "bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text)]",
              "shadow-lg backdrop-blur-sm",
              tooltipClassName
            )}
          >
            <p className="text-sm font-medium">{item.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default SocialMedia;