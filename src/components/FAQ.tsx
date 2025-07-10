"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FAQProps {
  limit?: number;
  showReadMore?: boolean;
  showSupportContact?: boolean;
}

import { faqData } from "@/data/faqData";
import { Button } from "./ui/Button";

const FAQ: React.FC<FAQProps> = ({
  limit,
  showReadMore = true,
  showSupportContact = false,
}) => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  // Check if the section is in view on mount
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = React.useCallback((id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 mb-16"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Illustration */}
          <motion.div
            className="order-2 lg:order-1 will-change-transform"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              perspective: "1000px",
              willChange: "transform, opacity",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      x: { type: "spring", stiffness: 100, damping: 20 },
                    },
                  }
                : {}
            }
          >
            <div className="relative">
              <Image
                src="/images/questions.svg"
                alt="FAQ Support"
                width={550}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
              <motion.div
                className="absolute -top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg will-change-transform"
                style={{
                  backgroundColor: "var(--primary)",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                }}
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        transition: {
                          opacity: { duration: 0.5 },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          },
                          rotate: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          },
                        },
                      }
                    : {}
                }
              >
                <HelpCircle className="w-7 h-7 text-[var(--white)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - FAQ Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className={cn(
                  "inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium",
                  "bg-[var(--bg-secondary)] text-[var(--primary)]",
                  "transition-colors duration-200"
                )}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Support</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[var(--text)]">
                Get instant answers to common questions
              </h2>

              <p className="text-lg text-[var(--sub-text)]">
                Find quick solutions to your queries about government schemes
                and benefits.
              </p>
            </motion.div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqData.slice(0, limit).map((item, index) => {
                const isOpen = openItem === item.id;

                return (
                  <motion.div
                    key={item.id}
                    className="border rounded-lg will-change-transform"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: isOpen ? "var(--primary)" : "var(--border)",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                      perspective: "1000px",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.5,
                              delay: Math.min(index * 0.05, 0.3),
                              ease: [0.16, 1, 0.3, 1],
                            },
                          }
                        : {}
                    }
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-[var(--bg-secondary)] cursor-pointer transition-all duration-300 rounded-lg"
                      aria-expanded={isOpen}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className="inline-block px-2 py-1 text-xs font-medium rounded"
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              color: "var(--primary)",
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <span
                          className="text-lg font-medium"
                          style={{ color: "var(--text)" }}
                        >
                          {item.question}
                        </span>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        style={{
                          backgroundColor: isOpen
                            ? "var(--primary)"
                            : "var(--bg-secondary)",
                        }}
                      >
                        {isOpen ? (
                          <ChevronUp
                            className="w-4 h-4"
                            style={{ color: "white" }}
                          />
                        ) : (
                          <ChevronDown
                            className="w-4 h-4"
                            style={{ color: "var(--text)" }}
                          />
                        )}
                      </div>
                    </button>

                    {/* Answer Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="overflow-hidden will-change-[height,opacity]"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: isOpen ? "auto" : 0,
                            transition: {
                              height: {
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: {
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                              },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: {
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: {
                                duration: 0.1,
                                ease: [0.16, 1, 0.3, 1],
                              },
                            },
                          }}
                        >
                          <div className="px-4 pb-4">
                            <div
                              className="pt-2 border-t"
                              style={{ borderColor: "var(--border)" }}
                            >
                              <p className="text-md leading-relaxed text-[var(--sub-text)]">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Read More Button - Only show when limited and showReadMore is true */}
            {limit && showReadMore && (
              <div className="mt-8 text-center">
                <Link href="/faq">
                  <Button
                    variant="primary"
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[var(--primary)] rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Read More FAQs
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            )}

            {/* Support Contact - Only show when showSupportContact is true */}
            {showSupportContact && (
              <motion.div
                className="mt-12 bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)] will-change-transform"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[var(--text)]">
                  Still need help?
                </h3>
                <p className="text-[var(--sub-text)] mb-4">
                  Our support team is here to help you with any questions about
                  government schemes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-[var(--primary)] bg-opacity-10">
                      <Mail className="w-5 h-5 text-[var(--bg-secondary)]" />
                    </div>
                    <span className="text-[var(--text)]">
                      support@myscheme.gov.in
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-[var(--primary)] bg-opacity-10">
                      <Phone className="w-5 h-5 text-[var(--bg-secondary)]" />
                    </div>
                    <span className="text-[var(--text)]">
                      1800-123-4567 (Toll-Free)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-[var(--primary)] bg-opacity-10">
                      <Clock className="w-5 h-5 text-[var(--bg-secondary)]" />
                    </div>
                    <span className="text-[var(--text)]">
                      Mon-Sat, 9:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
