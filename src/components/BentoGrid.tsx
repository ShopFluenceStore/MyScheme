"use client";
import React from "react";
import { BentoGrid as GridWrapper, BentoGridItem } from "./ui/bento-grid";
import {
  //   IconArrowWaveRightUp,
  //   IconBoxAlignRightFilled,
  //   IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function BentoGrid() {
  return (
    <section className="py-16 px-4">
    {/* Section Title */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
        Discover <span className="text-[var(--primary)]">Schemes</span> Tailored <span className="text-[var(--primary)]">For You</span>
      </h2>
      <p className="mt-2 text-[var(--text)] text-sm md:text-base">
        Browse categories and explore personalized government schemes.
      </p>
    </div>
    <GridWrapper className="max-w-4xl mx-auto transition-all duration-300">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 0 ? "md:col-span-2" : ""}
        />
      ))}
    </GridWrapper>
    </section>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] transition-all duration-300"></div>
);
const items = [
  {
    title: "Smart Scheme Match",
    description:
      "Get scheme suggestions based on your age, income, and profession.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-[var(--primary)]" />,
  },
  {
    title: "All-In-One Dashboard",
    description:
      "Track saved schemes, eligibility status, and deadlines in one place.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-[var(--primary)]" />,
  },
  {
    title: "Apply With Ease",
    description: "Step-by-step application guide for every government scheme.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-[var(--primary)]" />,
  },
  {
    title: "Scheme Categories",
    description:
      "Explore schemes by category: education, employment, housing, women & more.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-[var(--primary)]" />,
  },
  //   {
  //     title: "The Pursuit of Knowledge",
  //     description: "Join the quest for understanding and enlightenment.",
  //     header: <Skeleton />,
  //     icon: <IconArrowWaveRightUp className="h-4 w-4 text-[var(--primary)]" />,
  //   },
  //   {
  //     title: "The Joy of Creation",
  //     description: "Experience the thrill of bringing ideas to life.",
  //     header: <Skeleton />,
  //     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-[var(--primary)]" />,
  //   },
  //   {
  //     title: "The Spirit of Adventure",
  //     description: "Embark on exciting journeys and thrilling discoveries.",
  //     header: <Skeleton />,
  //     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-[var(--primary)]" />,
  //   },
];

export default BentoGrid;
