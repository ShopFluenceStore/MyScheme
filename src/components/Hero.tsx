"use client";
import React from "react";
import TextEffectDemo from "./TextEffect";
import { Button } from "./ui/Button";
import Link from "next/link";
import { EvervaultCard } from "../components/EvervaultCard";

const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full mb-8 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex flex-col md:flex-row items-center justify-between bg-[var(--bg-primary)] px-4 sm:px-8 md:px-16 py-10 gap-8 sm:gap-12">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Left Content */}
      <div className="relative z-10 max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text)] leading-tight mb-4">
          Empower Your Future <br className="hidden sm:block" />
          with <span className="text-[var(--primary)]">My<span className="text-[var(--secondary)]">Scheme</span></span>
        </h1>

        <div className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] mb-6 max-w-xl">
          <TextEffectDemo />
        </div>

        <div className="mt-6">
          <Link href="/search">
            <Button
              variant="primary"
              className="px-6 py-3 text-base sm:text-lg font-semibold rounded-xl"
            >
              Explore Schemes
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side Card */}
      <div className="relative z-10 w-full max-w-md mx-auto md:mx-0">
        <EvervaultCard />
      </div>
    </section>
  );
};

export default HeroBanner;
