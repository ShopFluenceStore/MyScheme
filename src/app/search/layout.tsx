import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | MyScheme",
  description: "Search for government schemes.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
