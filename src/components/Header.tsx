"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  ArrowRightIcon,
  MenuIcon,
  XIcon,
  ChevronDown,
  Search,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import Image from "next/image";
import language from "/public/images/language.svg";
import { Button } from "./ui/Button";
import Line from "./Line";
import SocialMedia from "./SocialMedia";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";

const Header: React.FC = () => {
  const { data: session } = useSession(); // ✅ get session
  const [darkMode, setDarkMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
      }
      scrollRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 30);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (scrollRef.current) cancelAnimationFrame(scrollRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 w-full border-b border-[var(--border)] bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] text-[var(--text)] z-30",
          "transition-[padding,box-shadow] duration-200 ease-out will-change-transform",
          isScrolled ? "shadow-lg py-2" : "py-1.5"
        )}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Logo variant="image1" className="hidden sm:block" />
            <div className="h-8 w-0.5 bg-[var(--border)] hidden sm:block" />
            <Logo variant="text" />
            <div className="h-8 w-0.5 bg-[var(--border)] hidden sm:block" />
            <Logo variant="image2" className="hidden sm:block" />
          </div>

          {/* Search Bar */}
          <div className="relative hidden sm:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Toggle */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-1.5 text-[var(--primary)] text-sm font-medium hover:bg-[var(--bg-secondary)] rounded-md px-3 py-2 transition-all cursor-pointer"
              >
                <span className="rounded-full bg-[var(--primary)] p-1.5">
                  <Image
                    src={language}
                    alt="Language"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    priority
                  />
                </span>
                Eng
              </button>
              {languageOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg bg-[var(--bg-primary)] shadow-lg border border-[var(--border)] z-20">
                  <ul className="text-sm font-medium">
                    <li className="px-4 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer rounded-t-lg">
                      English
                    </li>
                    <li className="px-4 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer rounded-b-lg">
                      हिंदी
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Conditionally Render */}
            {!session && (
              <Link href="/auth">
                <Button variant="primary" className="flex items-center gap-1.5 px-4 text-sm">
                  Sign In <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </Link>
            )}

            {session && <UserDropdown />}

            {/* Theme Toggle */}
            <Button
              variant="secondary"
              className="p-2"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
              )}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="secondary"
              className="sm:hidden block"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Menu"
            >
              {sidebarOpen ? <XIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-[var(--bg-primary)] border-r border-[var(--border)] z-40 sm:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center gap-3">
                <Logo variant="image1" />
                <Logo variant="text" />
                <Logo variant="image2" />
              </div>
              <Line />
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[var(--muted-foreground)]" />
                </div>
                <input
                  type="text"
                  placeholder="Enter scheme name to search..."
                  className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] py-2.5 px-6 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <Link href="/about" className="py-2 px-4 hover:bg-[var(--bg-secondary)] rounded-md">About</Link>
                <Link href="/screen-reader" className="py-2 px-4 hover:bg-[var(--bg-secondary)] rounded-md">Screen Reader</Link>
                <Link href="/contact" className="py-2 px-4 hover:bg-[var(--bg-secondary)] rounded-md">Contact</Link>
                <Link href="/faq" className="py-2 px-4 hover:bg-[var(--bg-secondary)] rounded-md">FAQ</Link>
              </nav>
              <Line />
              <SocialMedia />
              <div className="mt-auto">
                <Line />
                <motion.div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[var(--primary)] hover:bg-[var(--bg-secondary)] rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[var(--bg-secondary)] p-1.5">अ</span>
                      <span>English</span>
                    </div>
                    <motion.span
                      animate={{ rotate: languageOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 w-full rounded-lg bg-[var(--bg-primary)] shadow-lg border border-[var(--border)]">
                          <ul className="text-sm font-medium">
                            <motion.li
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer rounded-t-lg"
                            >
                              English
                            </motion.li>
                            <motion.li
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer rounded-b-lg"
                            >
                              हिंदी
                            </motion.li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
