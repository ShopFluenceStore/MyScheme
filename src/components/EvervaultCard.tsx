import React from "react";
import { EvervaultCard as Card, Icon } from "./ui/evervault-card";

export function EvervaultCard() {
  return (
    <div className="border border-[var(--border)] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-[var(--text)]" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-[var(--text)]" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-[var(--text)]" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-[var(--text)]" />

      <Card text="Schemes" />

      <h2 className="text-[var(--text)] mt-4 text-sm font-light">
        Find the best government schemes made just for you.
      </h2>
      <p className="text-sm border font-light border-[var(--border)] rounded-full bg-[var(--bg-secondary)] mt-4 text-[var(--primary)] px-2 py-0.5">
        Explore Benefits
      </p>
    </div>
  );
}

export default EvervaultCard;
