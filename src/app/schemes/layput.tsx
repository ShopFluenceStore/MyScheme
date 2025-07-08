import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schemes | MyScheme",
  description: "Discover government schemes and initiatives.",
};

export default function SchemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
